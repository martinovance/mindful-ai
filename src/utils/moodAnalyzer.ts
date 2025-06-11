import { MoodType } from "@/types/vapiTypes";

export const analyzeMood = (text: string): MoodType => {
  const moodKeywords = {
    Happy: [
      "happy",
      "joy",
      "excited",
      "great",
      "good",
      "awesome",
      "positive",
      "fantastic",
      "wonderful",
      "content",
      "pleased",
      "delighted",
    ],
    Sad: [
      "sad",
      "depressed",
      "down",
      "unhappy",
      "miserable",
      "gloomy",
      "heartbroken",
      "upset",
      "low",
      "blue",
      "tearful",
      "sorrow",
    ],
    Anxious: [
      "anxious",
      "worried",
      "nervous",
      "stressed",
      "tense",
      "panicked",
      "fearful",
      "uneasy",
      "apprehensive",
      "restless",
      "jittery",
      "afraid",
    ],
  };

  const lowerText = text.toLowerCase();
  const scores = {
    Happy: 0,
    Sad: 0,
    Anxious: 0,
    Neutral: 0,
  };

  // Score each mood based on keyword matches
  for (const mood in moodKeywords) {
    scores[mood as MoodType] = moodKeywords[
      mood as keyof typeof moodKeywords
    ].filter((word) => lowerText.includes(word.toLowerCase())).length;
  }

  // Get mood with highest score
  const maxMood = Object.entries(scores).reduce(
    (max, [mood, score]) => (score > max.score ? { mood, score } : max),
    { mood: "Neutral", score: 0 }
  );

  // Only return non-neutral if significant matches found
  return maxMood.score >= 2 ? (maxMood.mood as MoodType) : "Neutral";
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
