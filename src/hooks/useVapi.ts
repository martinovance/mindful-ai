import { assistantOverrides } from "@/lib/vapi/assistantConfig";
import vapi from "@/lib/vapi/vapiClient";
import { storeSessionData } from "@/services/fireStoreService";
import {
  analyzeMood,
  generateMoodScore,
  generateSuggestions,
  getTimeOfDay,
  summarizeTranscript,
} from "@/utils/moodAnalyzer";
import { Timestamp } from "firebase/firestore";
import { useEffect, useState } from "react";

export const useVapi = (userId: string) => {
  const [transcript, setTranscript] = useState<string[]>([]);
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    vapi.on("call-start", () => {
      console.log("Call started");
      setIsSpeaking(true);
      setTranscript([]);
    });

    vapi.on("message", (message) => {
      if (message.type === "conversation-update") {
        const lastConversationItem =
          message.conversation[message.conversation.length - 1];
        const lastMessageItem = message.messages[message.messages.length - 1];

        const content =
          lastMessageItem?.message || lastConversationItem?.content;
        const role = lastMessageItem?.role || lastConversationItem?.role;

        if (content) {
          const emoji = role === "user" ? "🧑" : "🤖";
          setTranscript((prev) => [...prev, `${emoji} ${content}`]);
        }
      }
    });

    vapi.on("call-end", async () => {
      setIsSpeaking(false);
      const rawTranscript = transcript.join(" ");
      const moodLabel = analyzeMood(rawTranscript);
      const summary = summarizeTranscript(transcript);
      const moodScore = generateMoodScore(moodLabel);
      const recommendations = generateSuggestions(moodLabel);
      const timeOfDay = getTimeOfDay();

      const session = {
        userId,
        transcript,
        summary,
        moodScore,
        moodLabel,
        recommendations,
        timeOfDay,
        createdAt: Timestamp.fromDate(new Date()),
      };

      await storeSessionData(session);
    });

    return () => {
      vapi.removeAllListeners();
    };
  }, [userId, transcript]);

  const startCall = () => {
    vapi.start(import.meta.env.VITE_VAPI_ASSISTANT_ID!, assistantOverrides);
  };

  const stopCall = () => vapi.stop();

  return { transcript, isSpeaking, startCall, stopCall };
};
