import Vidmate from "@/assets/Vidmate.svg";
import Mic from "@/assets/MicRec.svg";
import Conversation from "@/assets/Conversation.svg";
import Bot1 from "@/assets/Bot1.svg";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getUserDocById } from "@/services/fireStoreService";
import { CombinedEntry } from "@/types/vapiTypes";
import WaveformPlayer from "@/shared/WaveformPlayer";

const CallInfo = () => {
  const { type, id } = useParams<{
    type: "session" | "journal";
    id: string;
  }>();
  const collectionName = type === "session" ? "sessions" : "voiceJournals";

  const { data: getSession } = useQuery<CombinedEntry | null>({
    queryKey: [collectionName, id],
    queryFn: () => {
      if (!id) throw new Error("No session id provided");
      return getUserDocById(collectionName, id);
    },
  });

  return (
    <div className="p-4 md:p-8 flex flex-col justify-center items-center gap-5">
      <div className="flex flex-col justify-start items-start gap-5 lg:w-[850px]">
        <div
          className="h-full w-full bg-[#fff] rounded-sm shadow-xs p-2 md:p-6 
          flex flex-col gap-6 justify-start"
        >
          <div className="flex justify-start items-start gap-2">
            <div className="p-2 bg-[#ECF5FE] rounded-full">
              <img
                src={getSession?.type === "session" ? Vidmate : Mic}
                alt=""
              />
            </div>
            <div className="flex flex-col items-start">
              <p className="font-semibold text-sm">
                {getSession?.type === "session"
                  ? "Therapy Session"
                  : getSession?.data.title}
              </p>
              <p className="font-normal text-xs">
                {getSession?.type === "session"
                  ? "AI Therapist Call"
                  : "Voice Journal Entry"}
              </p>
            </div>
          </div>
          <div className="w-full flex flex-col gap-4 items-center">
            <div className="w-full flex justify-between items-center">
              <p className="font-bold text-sm">Date</p>
              <p className="font-bold text-sm text-[#61758A]">
                {getSession?.data.createdAt.toDate().toDateString()}
              </p>
            </div>
            {getSession?.type === "voiceJournal" && (
              <div className="w-full flex justify-between items-center">
                <p className="font-bold text-sm">Duration</p>
                <p className="font-bold text-sm text-[#61758A]">45 minutes</p>
              </div>
            )}
            {getSession?.type === "session" && (
              <>
                <div className="w-full flex justify-between items-center">
                  <p className="font-bold text-sm">Mood</p>
                  <p className="font-bold text-sm text-[#61758A]">
                    {getSession.data.moodLabel}
                  </p>
                </div>
                <div className="w-full flex justify-between items-center">
                  <p className="font-bold text-sm">Type</p>
                  <p className="font-bold text-sm text-[#61758A]">
                    AI Therapist call
                  </p>
                </div>
              </>
            )}
          </div>
        </div>

        <div
          className="h-full w-full bg-[#fff] rounded-sm shadow-xs p-2 md:p-6 
          flex flex-col gap-6 justify-start"
        >
          {getSession?.type === "session" ? (
            <div className="flex flex-col justify-start items-start">
              <p className="font-semibold text-sm">Session Summary</p>
              <p className="font-normal text-xs text-[#61758A]">
                {getSession.data.summary}
              </p>
            </div>
          ) : (
            getSession?.type === "voiceJournal" && (
              <div className="w-full flex flex-col justify-start items-start">
                <div className="w-full flex justify-start items-start gap-2">
                  <div className="p-2 bg-[#ECF5FE] rounded-full">
                    <img src={Mic} alt="" />
                  </div>
                  <div className="flex flex-col items-start">
                    <p className="font-bold text-sm">Mindful AI</p>
                    <p className="font-normal text-xs text-[#61758A]">
                      Your wellness assistant
                    </p>
                  </div>
                </div>
                <WaveformPlayer audioURL={getSession?.data?.audioUrl} />
              </div>
            )
          )}
        </div>

        {getSession?.type === "session" && (
          <div className="w-full flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <img src={Conversation} alt="" />
              <p className="font-semibold text-md text-[#0D80F2]">
                Conversation Transcript
              </p>
            </div>
            <div
              className="h-full w-full bg-[#fff] rounded-sm shadow-xs p-2 md:p-6 
          flex flex-col gap-6 justify-start"
            >
              <div className="w-full flex flex-col items-start justify-start gap-6">
                <div className="w-full flex justify-start items-start gap-2">
                  <div className="p-2 bg-[#ECF5FE] rounded-full">
                    <img src={Bot1} alt="" />
                  </div>
                  <div className="flex flex-col items-start">
                    <p className="font-bold text-sm">Mindful AI</p>
                    <p className="font-normal text-xs text-[#61758A]">
                      Your wellness assistant
                    </p>
                  </div>
                </div>

                <div className="w-full flex flex-col space-y-4 mx-auto">
                  {getSession.data.transcript.map((msg, i) => (
                    <div
                      key={i}
                      className={`flex ${
                        msg.includes("🤖") ? "justify-start" : "justify-end"
                      }`}
                    >
                      <div
                        className={`px-4 py-2 rounded-lg max-w-xs text-sm shadow
              ${
                msg.includes("🤖")
                  ? "bg-gray-100 text-left"
                  : "bg-blue-100 text-right"
              }`}
                      >
                        {msg}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CallInfo;
