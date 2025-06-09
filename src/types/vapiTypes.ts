import { Timestamp } from "firebase/firestore";

export type MoodType = "Happy" | "Neutral" | "Sad" | "Anxious";

export interface MoodSession {
  id?: string;
  userId: string;
  transcript: string[];
  summary: string;
  moodScore: number;
  moodLabel: MoodType;
  recommendations: string[];
  timeOfDay: "Morning" | "Afternoon" | "Evening";
  createdAt: Timestamp;
}

export interface TherapyCall {
  title: string;
  summary: string;
  date: string;
  mood: string;
  moodColor: "red" | "green" | "yellow" | "blue" | "gray";
}
