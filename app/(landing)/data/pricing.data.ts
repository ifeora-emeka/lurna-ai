export interface PricingPlan {
  id: string;
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  popular?: boolean;
  buttonText: string;
  buttonVariant: "default" | "outline";
}

export const pricingPlans: PricingPlan[] = [
  {
    id: "free",
    name: "Free",
    price: "₦0",
    period: "forever",
    description: "Perfect for getting started with AI-powered learning",
    features: [
      "₦1,000 free credits monthly",
      "Upload up to 5 PDFs",
      "Basic learning paths",
      "Simple flashcards",
      "Community support",
      "Basic progress tracking"
    ],
    buttonText: "Get Started Free",
    buttonVariant: "outline"
  },
  {
    id: "pro",
    name: "Pro",
    price: "₦2,500",
    period: "per month",
    description: "For serious learners who want advanced features",
    features: [
      "₦5,000 credits monthly",
      "Unlimited PDF uploads",
      "Advanced learning paths",
      "Gamified experience",
      "Priority support",
      "Advanced analytics",
      "Custom study schedules",
      "Spaced repetition"
    ],
    popular: true,
    buttonText: "Start Pro Trial",
    buttonVariant: "default"
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: "Custom",
    period: "pricing",
    description: "For institutions and organizations",
    features: [
      "Unlimited credits",
      "White-label solution",
      "Custom integrations",
      "Dedicated support",
      "Advanced reporting",
      "Multi-user management",
      "API access",
      "Custom branding"
    ],
    buttonText: "Contact Sales",
    buttonVariant: "outline"
  }
];

export interface CreditPricing {
  id: string;
  name: string;
  price: string;
  description: string;
  icon: string;
}

export const creditPricing: CreditPricing[] = [
  {
    id: "assessment",
    name: "Assessment Generation",
    price: "₦100",
    description: "per quiz/test creation",
    icon: "/icons/assessment.svg"
  },
  {
    id: "set-creation",
    name: "Learning Set Creation",
    price: "₦300",
    description: "per complete learning set",
    icon: "/icons/set-creation.svg"
  },
  {
    id: "flashcard-pack",
    name: "Flashcard Pack",
    price: "₦50",
    description: "per 50 flashcards",
    icon: "/icons/flashcard-pack.svg"
  },
  {
    id: "ai-feedback",
    name: "AI Feedback & Analysis",
    price: "₦25",
    description: "per detailed feedback session",
    icon: "/icons/ai-analysis.svg"
  }
];
