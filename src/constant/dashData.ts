import Written from "@/assets/Written.svg";
import Connect from "@/assets/Connect.svg";
import Match from "@/assets/Match.svg";
import Affirm1 from "@/assets/Affirm1.svg";
import Affirm2 from "@/assets/Affirm2.svg";
import Affirm3 from "@/assets/Affirm3.svg";
import Affirm4 from "@/assets/Affirm4.svg";
import Affirm5 from "@/assets/Affirm5.svg";
import { TherapyCall } from "@/types/vapiTypes";

export const moodData = {
  daily: [
    { type: "Morning", value: 4 },
    { type: "Afternoon", value: 7 },
    { type: "Evening", value: 5 },
  ],
  weekly: [
    { type: "Mon", value: 3 },
    { type: "Tue", value: 6.5 },
    { type: "Wed", value: 4.3 },
    { type: "Thu", value: 5.8 },
    { type: "Fri", value: 7.5 },
    { type: "Sat", value: 2.5 },
    { type: "Sun", value: 6 },
  ],
  monthly: [
    { type: "Week1", value: 5.5 },
    { type: "Week2", value: 6.2 },
    { type: "Week3", value: 6.2 },
    { type: "Week3", value: 6.2 },
  ],
  moodDistribution: [
    { type: "Happy", value: 4 },
    { type: "Neutral", value: 4 },
    { type: "Sad", value: 4 },
    { type: "Anxious", value: 4 },
  ],
};

interface Affirmation {
  icon: string;
  title: string;
  description: string;
}

export const affirmations: Affirmation[] = [
  {
    icon: Affirm1,
    title: "I am capable of handling challenges with grace and resilience.",
    description:
      "This affirmation reminds you of your inner strength and ability to overcome obstacles. Repeat it throughout the day to reinforce your confidence and resilience.",
  },
  {
    icon: Affirm2,
    title: "I choose to focus on the positive aspects of my life.",
    description:
      "This affirmation encourages you to shift your focus towards the good things in your life, fostering gratitude and optimism. Take a moment to appreciate the positive moments, no matter how small.s",
  },
  {
    icon: Affirm3,
    title: "I am worthy of love, respect, and happiness.",
    description:
      "This affirmation reinforces your self-worth and reminds you that you deserve to be treated with kindness and respect. Embrace your inherent value and believe in your right to happiness.",
  },
  {
    icon: Affirm4,
    title: "I am in control of my thoughts and emotions.",
    description:
      "This affirmation empowers you to take charge of your mental and emotional state. Recognize that you have the ability to choose your responses and cultivate inner peace.",
  },
  {
    icon: Affirm5,
    title: "I am grateful for the opportunities and experiences in my life.",
    description:
      "This affirmation promotes gratitude and appreciation for the blessings in your life. Reflect on the opportunities and experiences that have shaped you, and express gratitude for their impact.",
  },
];

interface recordType {
  title: string;
  date: string;
}

export const Recordings: recordType[] = [
  {
    title: "Morning Reflections",
    date: "July 14, 2024",
  },
  {
    title: "Evening Gratitude",
    date: "July 13, 2025",
  },
  {
    title: "Daily Check-in",
    date: "July 12, 2025",
  },
];

interface Step {
  icon: string;
  title: string;
  description: string;
}

export const steps: Step[] = [
  {
    icon: Written,
    title: "Request",
    description: "Submit a request for therapist connection.",
  },
  {
    icon: Match,
    title: "Match",
    description: "We’ll match you with a therapist based on your needs.",
  },
  {
    icon: Connect,
    title: "Connect",
    description: "Start your therapy sessions.",
  },
];

interface faqsType {
  title: string;
  desc: string;
}

export const Faqs: faqsType[] = [
  {
    title: "Will this help if I already have bladder issues or bone concerns?",
    desc: "Yes! Many women see improvement in bladder control within just a few weeks of regular practice. The bone health techniques work regardless of where you're starting from, and everything can be modified to meet you where you are.",
  },
  {
    title: "Is Mindful Ai a replacement for therapy?",
    desc: "All therapists are licensed professionals with extensive experience in mental health care.",
  },
  {
    title: "What if I can't attend the live Q&A sessions?",
    desc: "If you are in immediate help or in immediate danger, please call 911 or your local emergency number.",
  },
  {
    title: "Will I need special equipment?",
    desc: "If you are in immediate help or in immediate danger, please call 911 or your local emergency number.",
  },
];

export const calls: TherapyCall[] = [
  {
    title: "AI Therapy Call: Coping with Stress",
    summary:
      "In this call, the user discussed their coping mechanisms for stress.",
    date: "April 14, 2023",
    mood: "Anxious",
    moodColor: "yellow",
  },
  {
    title: "AI Therapy Call: Overcoming Trauma",
    summary: "In this call, the user discussed their experience with trauma.",
    date: "April 15, 2023",
    mood: "Happy",
    moodColor: "green",
  },
  {
    title: "AI Therapy Call: Managing Relationships",
    summary: "In this call, the user discussed their relationship dynamics.",
    date: "April 16, 2023",
    mood: "Sad",
    moodColor: "red",
  },
  {
    title: "AI Therapy Call: Managing Relationships",
    summary: "In this call, the user discussed their relationship dynamics.",
    date: "April 16, 2023",
    mood: "Neutral",
    moodColor: "yellow",
  },
];
