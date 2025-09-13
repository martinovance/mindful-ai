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
    title: "Can I use Mindful AI if I have existing health conditions?",
    desc: "Mindful AI is designed as a supportive wellness companion, not a medical treatment. If you have bladder issues, bone concerns, or other health conditions, the app can help with mindfulness, stress management, and daily wellness practices — but it should never replace advice from your doctor or therapist. Always consult your healthcare provider for medical guidance.",
  },
  {
    title: "Is Mindful AI the same as seeing a therapist?",
    desc: "No. Mindful AI is not a replacement for therapy or professional medical care. Instead, it serves as a friendly companion to help you track your moods, practice mindfulness, and reflect on your well-being. Think of it as a wellness buddy that’s available anytime, not a substitute for licensed mental health support.",
  },
  {
    title: "What if I miss a live session or can’t use the app every day?",
    desc: "That’s okay! Mindful AI is flexible and meant to fit into your life, not add pressure. You can revisit past guided sessions, explore journaling prompts, and use the app at your own pace. Progress comes from consistency over time, not perfection.",
  },
  {
    title: "Do I need special tools or equipment to get started?",
    desc: "No. Everything you need is built into the app — voice journaling, guided reflections, and mood tracking. You don’t need any extra gear, just your phone or computer. Optional items like headphones or a quiet space may enhance the experience, but they’re not required.",
  },
  {
    title: "Can Mindful AI help me in an emergency or crisis situation?",
    desc: "If you are in need of immediate help or in immediate danger, please call 911 or your local toll-free/emergency number.",
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
