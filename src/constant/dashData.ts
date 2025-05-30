import Written from "@/assets/Written.svg";
import Connect from "@/assets/Connect.svg";
import Match from "@/assets/Match.svg";

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
    title: "What qualifications do the therapists have?",
    desc: "All therapists are licensed professionals with extensive experience in mental health care.",
  },
  {
    title: "How long does it take to get connected?",
    desc: "All therapists are licensed professionals with extensive experience in mental health care.",
  },
  {
    title: "What if I need immediate help?",
    desc: "If you are in immediate help or in immediate danger, please call 911 or your local emergency number.",
  },
];
