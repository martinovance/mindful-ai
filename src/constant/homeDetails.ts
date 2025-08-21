import Image1 from "@/assets/Images/Mic1.webp";
import Image2 from "@/assets/Images/Analysis1.webp";
import Image3 from "@/assets/Images/Galaxy1.webp";
import Image4 from "@/assets/Images/Therapist1.webp";
import { Mic, UserPlus } from "lucide-react";

export const HOMESCREEN = [
  {
    img: Image1,
    header: "Voice Journaling",
    description:
      "Express yourself freely with voice journaling. Record your thoughts and feelings anytime, anywhere.",
  },
  {
    img: Image2,
    header: "Mood Tracking",
    description:
      "Track your emotional well-being over time. Identify patterns and gain insights into your mood fluctuations.",
  },
  {
    img: Image3,
    header: "Personalized Affirmations",
    description:
      "Receive daily affirmations tailored to your needs. Boost your self-esteem and cultivate a positive mindset.",
  },
  {
    img: Image4,
    header: "Therapist Support",
    description:
      "Connect with licensed therapists for professional guidance. Access support and resources to enhance your mental health.",
  },
];

export const GETSTARTED = [
  {
    icon: UserPlus,
    title: "Sign Up",
    description: "Create your account and personalize your profile.",
  },
  {
    icon: Mic,
    title: "Start Talking",
    description: "Begin your conversation with our AI companion.",
  },
  {
    icon: UserPlus,
    title: "Track & Improve",
    description: "Monitor your progress and see improvements over time.",
  },
];
