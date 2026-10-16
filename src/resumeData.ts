export interface ProjectConstruct {
  id: string;
  chapterCode: string;
  title: string;
  subtitle: string;
  dateContext: string;
  role?: string;
  repository: string;
  technologies: string[];
  highlights: string[];
  disclaimer?: string;
}

export const RESUME_DATA = {
  heroName: "ABHEDHYA FAUJDAR",
  name: "Abhedhya Faujdar",
  positioning: "Python Backend and AI Developer",
  location: "Noida, India",
  email: "fabhedhya@gmail.com",
  github: "https://github.com/Abhedhyafaujdar",
  linkedIn: "https://linkedin.com/in/abhedhya-faujdar",
  education: {
    degree: "Bachelor of Computer Applications (BCA), AI/ML Specialization",
    institution: "Maharishi University of Information Technology (MUIT), Noida, India",
    expectedGraduation: "2027",
    coursework: [
      "Computer Networks",
      "Cloud Computing",
      "Design and Analysis of Algorithms",
      "AI Applications"
    ]
  },
  projects: [
    {
      id: "ultraquery",
      chapterCode: "CONSTRUCT // 01",
      title: "UltraQuery",
      subtitle: "UltraQuery — High-Performance Data Handling Library",
      dateContext: "May 2026 | Published to PyPI",
      repository: "https://github.com/Abhedhyafaujdar/UltraQuery",
      technologies: ["Python", "C++", "Matplotlib", "CLI tooling", "PyPI"],
      highlights: [
        "Python library for parsing, analyzing, listing, and visualizing large CSV datasets (up to 5GB+) in seconds, installable with pip.",
        "Hybrid architecture with a C++ processing core that processes 1M+ rows in under 3 seconds, wrapped in a Python CLI.",
        "Supports bar, pie, and other chart types using Matplotlib, published to PyPI."
      ]
    },
    {
      id: "ekdanta",
      chapterCode: "CONSTRUCT // 02",
      title: "Ekdanta",
      subtitle: "Ekdanta — AI-Powered Digital Cybercrime Investigator (MVP)",
      dateContext: "2026",
      role: "Backend Architect and Full-Stack Integrator",
      repository: "https://github.com/Abhedhyafaujdar/EKDANT",
      technologies: ["Python", "FastAPI", "Pydantic", "HTTPX", "React", "Vite", "TypeScript"],
      highlights: [
        "Ingests unstructured cybercrime case files (.docx with system logs, physical access records, and network events).",
        "Integrates an LLM through an OpenAI-compatible API with strict system prompts to distinguish red herrings from meaningful evidence.",
        "Extracts suspects, devices, IP addresses, and credentials into an attack chain validated with Pydantic schemas.",
        "Includes HTTPX fallbacks and error handling for rate limits, authentication failures, and schema-validation errors.",
        "Connects to a React/Vite/TypeScript frontend with asynchronous REST calls and file uploads for graph visualization."
      ],
      disclaimer: "Investigative MVP prototype — not an officially deployed law-enforcement product."
    },
    {
      id: "sentinelvoice",
      chapterCode: "CONSTRUCT // 03",
      title: "SentinelVoice",
      subtitle: "SentinelVoice — Multimodal AI-Generated Media Screening Tool",
      dateContext: "Brewing Codes 4.0 Hackathon, 2026",
      repository: "https://github.com/Abhedhyafaujdar/Sentinel",
      technologies: ["Python", "Flask", "Librosa", "scikit-learn", "Hugging Face Transformers", "HTML", "CSS", "JavaScript"],
      highlights: [
        "Screens audio, images, sampled video frames (up to 8 frames), and text documents for signs of AI-generated content.",
        "Returns a verdict, confidence score, and plain-English explanation.",
        "CPU-based voice-clone detector using Librosa audio features (MFCCs, pitch, jitter) and a scikit-learn classifier.",
        "Integrates pretrained Hugging Face models for image and text detection; supports 25+ file formats and a 100 MB upload limit.",
        "Documents model limitations and licensing constraints (non-commercial image model, English-only text detector)."
      ]
    }
  ] as ProjectConstruct[]
};
