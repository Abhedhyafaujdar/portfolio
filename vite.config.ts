import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { createReadStream, readdirSync, readFileSync, statSync } from 'node:fs';
import { resolve } from 'node:path';
import type { Plugin } from 'vite';

function portfolioMediaPlugin(): Plugin {
  let mediaFiles: Record<string, { path: string; contentType: string }> = {};

  return {
    name: 'portfolio-media',
    configResolved(config) {
      const rootFiles = readdirSync(config.root);
      const introFile = rootFiles.find((file) => file.startsWith('Cinematic_intro_') && file.toLowerCase().endsWith('.mp4'));
      const musicFile = rootFiles.find((file) => file.startsWith('Engelbert Humperdinck') && file.toLowerCase().endsWith('.mp3'));

      if (!introFile || !musicFile) {
        throw new Error('Expected the portfolio intro MP4 and background music MP3 in the project root.');
      }

      mediaFiles = {
        '/assets/moonfall_cinematic_intro.mp4': {
          path: resolve(config.root, introFile),
          contentType: 'video/mp4'
        },
        '/assets/moonfall_background_music.mp3': {
          path: resolve(config.root, musicFile),
          contentType: 'audio/mpeg'
        }
      };
    },
    configureServer(server) {
      server.middlewares.use((request, response, next) => {
        const requestPath = new URL(request.url || '/', 'http://localhost').pathname;
        const media = mediaFiles[requestPath];
        if (!media || (request.method !== 'GET' && request.method !== 'HEAD')) {
          next();
          return;
        }

        const fileSize = statSync(media.path).size;
        const rangeHeader = request.headers.range;
        let start = 0;
        let end = fileSize - 1;

        if (rangeHeader) {
          const range = /^bytes=(\d*)-(\d*)$/.exec(rangeHeader);
          if (!range) {
            response.statusCode = 416;
            response.setHeader('Content-Range', `bytes */${fileSize}`);
            response.end();
            return;
          }
          if (range[1]) {
            start = Number(range[1]);
            end = range[2] ? Number(range[2]) : end;
          } else if (range[2]) {
            start = Math.max(0, fileSize - Number(range[2]));
          }
          if (start > end || end >= fileSize) {
            response.statusCode = 416;
            response.setHeader('Content-Range', `bytes */${fileSize}`);
            response.end();
            return;
          }
          response.statusCode = 206;
          response.setHeader('Content-Range', `bytes ${start}-${end}/${fileSize}`);
        }

        response.setHeader('Content-Type', media.contentType);
        response.setHeader('Accept-Ranges', 'bytes');
        response.setHeader('Content-Length', String(end - start + 1));
        if (request.method === 'HEAD') {
          response.end();
          return;
        }
        createReadStream(media.path, { start, end }).pipe(response);
      });
    },
    buildStart() {
      for (const [fileName, media] of Object.entries(mediaFiles)) {
        this.emitFile({
          type: 'asset',
          fileName: fileName.slice(1),
          source: readFileSync(media.path)
        });
      }
    }
  };
}

export default defineConfig({
  plugins: [react(), portfolioMediaPlugin()],
  server: {
    port: 5173,
    open: true
  }
});
