export interface Feature {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  benefits: string[];
}

export const features: Feature[] = [
  {
    id: "learning-path",
    title: "Personalized Learning Paths",
    description: "AI-powered curriculum generation that adapts to your learning style and pace",
    icon: "/icons/learning-path.svg",
    color: "from-blue-500 to-blue-600",
    benefits: [
      "Custom curriculum from your PDFs",
      "Adaptive difficulty progression",
      "Structured module organization",
      "Progress tracking & analytics"
    ]
  },
  {
    id: "flashcards",
    title: "Interactive Flashcards",
    description: "Smart flashcard generation with spaced repetition for optimal retention",
    icon: "/icons/flashcards.svg",
    color: "from-green-500 to-green-600",
    benefits: [
      "Auto-generated from content",
      "Spaced repetition algorithm",
      "Progress-based difficulty",
      "Mobile-friendly design"
    ]
  },
  {
    id: "gamified-learning",
    title: "Gamified Experience",
    description: "Engaging game mechanics that make learning fun and motivating",
    icon: "/icons/gamified.svg",
    color: "from-purple-500 to-purple-600",
    benefits: [
      "Points & achievement system",
      "Leaderboards & challenges",
      "Streak tracking",
      "Reward milestones"
    ]
  },
  {
    id: "adaptive-assessment",
    title: "Adaptive Assessments",
    description: "AI-driven quizzes that adjust based on your performance and knowledge gaps",
    icon: "/icons/adaptive.svg",
    color: "from-orange-500 to-orange-600",
    benefits: [
      "Real-time difficulty adjustment",
      "Weakness identification",
      "Targeted practice questions",
      "Performance analytics"
    ]
  },
  {
    id: "ai-feedback",
    title: "AI-Powered Feedback",
    description: "Instant, personalized feedback with detailed explanations and improvement suggestions",
    icon: "/icons/ai-feedback.svg",
    color: "from-indigo-500 to-indigo-600",
    benefits: [
      "Instant detailed explanations",
      "Personalized study tips",
      "Progress recommendations",
      "Knowledge gap analysis"
    ]
  },
  {
    id: "multi-format",
    title: "Multi-Format Support",
    description: "Support for various file formats and content types for comprehensive learning",
    icon: "/icons/multi-format.svg",
    color: "from-pink-500 to-pink-600",
    benefits: [
      "PDF, DOCX, TXT support",
      "Image text extraction",
      "Audio transcription",
      "Video content analysis"
    ]
  }
];
