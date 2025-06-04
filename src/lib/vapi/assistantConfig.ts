import { AssistantOverrides } from "@vapi-ai/web/dist/api";

export const assistantOverrides: AssistantOverrides = {
  name: "Gideon",
  firstMessage: "Hi, how are you feeling today?",
  transcriber: {
    provider: "deepgram",
    model: "nova-3",
    language: "en",
  },
  voice: {
    provider: "vapi",
    voiceId: "Cole",
  },
  model: {
    provider: "openai",
    model: "gpt-4o",
  },
};
