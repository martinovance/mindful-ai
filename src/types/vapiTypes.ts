import { Timestamp } from "firebase/firestore";

export type MoodType = "Happy" | "Neutral" | "Sad" | "Anxious";

export interface VapiMessage {
  type: string;
  conversation: Array<{
    role: "system" | "user" | "assistant" | "bot";
    content?: string;
  }>;
  messages: Array<{
    role: "system" | "user" | "assistant" | "bot";
    message?: string;
    time?: number;
  }>;
  messagesOpenAIFormatted?: Array<unknown>;
}

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

export interface MoodColorMap {
  red: string;
  green: string;
  yellow: string;
  blue: string;
  gray: string;
  [key: string]: string;
}
