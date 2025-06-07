import { MoodType } from "@/types/vapiTypes";

export const analyzeMood = (text: string): MoodType => {
  const moodKeywords = {
    happy: ["happy", "great", "good", "awesome"],
    sad: ["sad", "down", "depressed", "tired"],
    anxious: ["anxious", "worried", "nervous"],
  };

  const lowerText = text.toLowerCase();
  for (const mood in moodKeywords) {
    if (
      moodKeywords[mood as keyof typeof moodKeywords].some((word) =>
        lowerText.includes(word)
      )
    ) {
      return mood as MoodType;
    }
  }
  return "Neutral";
};

export const generateMoodScore = (mood: MoodType): number => {
  switch (mood) {
    case "Happy":
      return 8 + Math.random() * 2;
    case "Neutral":
      return 5 + Math.random() * 2;
    case "Sad":
      return 8 + Math.random() * 2;
    case "Anxious":
      return 8 + Math.random() * 2;
  }
};

export const summarizeTranscript = (transcript: string[]): string => {
  return transcript.join(" ").slice(0, 200) + "...";
};

export const generateSuggestions = (mood: MoodType): string[] => {
  switch (mood) {
    case "Happy":
      return [
        "Keep a gratitude journal",
        "Continue engaging in positive habits",
      ];
    case "Neutral":
      return [
        "Try light exercise",
        "Reach out to a friend",
        "Consider a mental health check-in",
      ];
    case "Anxious":
      return [
        "Practice deep breathing",
        "Limit caffeine intake",
        "Try journaling your thoughts",
      ];
    default:
      return ["Maintain current balance", "Reflect weekly on emotions"];
  }
};

export const getTimeOfDay = (): "Morning" | "Afternoon" | "Evening" => {
  const hour = new Date().getHours();
  if (hour < 12) return "Morning";
  if (hour < 18) return "Afternoon";
  return "Evening";
};
