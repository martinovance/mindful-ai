import { assistantOverrides } from "@/lib/vapi/assistantConfig";
import vapi from "@/lib/vapi/vapiClient";
import { storeSessionData } from "@/services/fireStoreService";
import { VapiMessage } from "@/types/vapiTypes";
import { debounce } from "@/utils/debounce";
import {
  analyzeMood,
  generateMoodScore,
  generateSuggestions,
  getTimeOfDay,
  summarizeTranscript,
} from "@/utils/moodAnalyzer";
import { Timestamp } from "firebase/firestore";
import { useEffect, useMemo, useState } from "react";

export const useVapi = (userId: string) => {
  const [transcript, setTranscript] = useState<string[]>([]);
  const [pendingTranscript, setPendingTranscript] = useState<string[]>([]);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // const [isAgentActive, setIsAgentActive] = useState<boolean>(false);

  // debounce transcript update
  const updateTranscript = useMemo(
    () =>
      debounce(() => {
        if (setPendingTranscript.length > 0) {
          setTranscript((prev) => [...prev, ...pendingTranscript]);
          setPendingTranscript([]);
        }
      }, 500),
    [pendingTranscript]
  );

  useEffect(() => {
    const interval = setInterval(updateTranscript, 200);

    return () => {
      updateTranscript.flush();
      clearInterval(interval);
    };
  }, [updateTranscript]);

  useEffect(() => {
    const handleMessage = (message: VapiMessage) => {
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
    };

    const handleCallEnd = async () => {
      if (currentSessionId) return;

      setIsSpeaking(false);
      setIsLoading(false);
      updateTranscript.flush();
      await new Promise((resolve) => setTimeout(resolve, 500));

      try {
        const filteredTranscript = transcript.filter(Boolean);
        if (filteredTranscript.length === 0) {
          throw new Error("Empty transcript");
        }

        const rawTranscript = filteredTranscript.join(" ");
        const moodLabel = analyzeMood(rawTranscript);
        const summary = summarizeTranscript(filteredTranscript);
        const moodScore = generateMoodScore(moodLabel);
        const recommendations = generateSuggestions(moodLabel);
        const timeOfDay = getTimeOfDay();

        const session = {
          userId,
          transcript: filteredTranscript,
          summary,
          moodScore,
          moodLabel,
          recommendations,
          timeOfDay,
          createdAt: Timestamp.fromDate(new Date()),
        };

        const docId = await storeSessionData(session);
        setCurrentSessionId(docId);
      } catch (error) {
        console.log(error);
      }
    };

    const handleCallStart = () => {
      setIsLoading(false);
      setCurrentSessionId(null);
      setIsSpeaking(true);
      setTranscript([]);
      setPendingTranscript([]);
    };

    vapi.on("call-start", handleCallStart);
    vapi.on("message", handleMessage);
    vapi.on("call-end", handleCallEnd);

    return () => {
      vapi.off("call-start", handleCallStart);
      vapi.off("message", handleMessage);
      vapi.off("call-end", handleCallEnd);
      updateTranscript.flush();
    };
  }, [
    userId,
    transcript,
    pendingTranscript,
    currentSessionId,
    updateTranscript,
  ]);

  const startCall = async () => {
    setIsLoading(true);
    try {
      await vapi.start(
        import.meta.env.VITE_VAPI_ASSISTANT_ID!,
        assistantOverrides
      );
    } catch (error) {
      setIsLoading(false);
      console.log("Call failed to start:", error);
    }
  };

  const stopCall = () => vapi.stop();

  return {
    isLoading,
    transcript,
    isSpeaking,
    startCall,
    stopCall,
  };
};
