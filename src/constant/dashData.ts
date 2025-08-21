import Written from "@/assets/Written.svg";
import Connect from "@/assets/Connect.svg";
import Match from "@/assets/Match.svg";
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
