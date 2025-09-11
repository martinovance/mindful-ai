import Vidmate from "@/assets/Vidmate.svg";
import Mic from "@/assets/MicRec.svg";
import Conversation from "@/assets/Conversation.svg";
import Bot1 from "@/assets/Bot1.svg";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteUserDoc, getUserDocById } from "@/services/fireStoreService";
import { CombinedEntry } from "@/types/vapiTypes";
import WaveformPlayer from "@/shared/WaveformPlayer";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader2, Trash2 } from "lucide-react";
import CustomDialog from "@/shared/Dialog";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { showToast } from "@/shared/Toast";

const CallInfo = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const { type, id } = useParams<{
    type: "session" | "journal";
    id: string;
  }>();
  const collectionName = type === "session" ? "sessions" : "voiceJournals";

  const { data: getSession, isPending: loadingCallInfo } =
    useQuery<CombinedEntry | null>({
      queryKey: [collectionName, id],
      queryFn: () => {
        if (!id) throw new Error("No session id provided");
        return getUserDocById(collectionName, id);
      },
    });

  const { mutate: deleteSession, isPending } = useMutation({
    mutationFn: async (docId: string | undefined) => {
      if (!user?.uid) return;

      return await deleteUserDoc(collectionName, docId ?? "");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["combinedEntries", user?.uid],
      });
      queryClient.invalidateQueries({ queryKey: ["sessions", user?.uid] });
      queryClient.invalidateQueries({ queryKey: ["voiceJournals", user?.uid] });
      navigate("/sessions");
      showToast({
        title:
          type === "session"
            ? "Session deleted successfully"
            : "Voice journal deleted successfully",
        status: "success",
      });
    },
    onError: (error) => {
      showToast({
        title:
          type === "session"
            ? "Session couldn't be deleted"
            : "Voice journal couldn't be deleted",
        description: error && `${error}`,
        status: "error",
      });
    },
  });

  return (
    <div className="p-4 md:p-8 flex flex-col justify-center items-center gap-5">
      <div className="flex flex-col justify-start items-start gap-5 lg:w-[850px]">
        {loadingCallInfo ? (
          <>
            <div className="h-full w-full bg-[#fff] rounded-sm shadow-xs p-2 md:p-6 flex flex-col gap-6">
              <div className="flex justify-start items-start gap-2">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="flex flex-col gap-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-24" />
                </div>
              </div>

              <div className="w-full flex flex-col gap-4">
                <div className="flex justify-between items-center">
                  <Skeleton className="h-3 w-16" />
                  <Skeleton className="h-3 w-28" />
                </div>
                <div className="flex justify-between items-center">
                  <Skeleton className="h-3 w-16" />
                  <Skeleton className="h-3 w-20" />
                </div>
              </div>
            </div>

            <div className="h-full w-full bg-[#fff] rounded-sm shadow-xs p-2 md:p-6 flex flex-col gap-6">
              <Skeleton className="h-4 w-40" />
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-[80%]" />
            </div>

            <div className="w-full flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <Skeleton className="h-6 w-6 rounded-full" />
                <Skeleton className="h-4 w-40" />
              </div>
              <div className="h-full w-full bg-[#fff] rounded-sm shadow-xs p-4 flex flex-col gap-6">
                <div className="flex gap-2 items-center">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <div className="flex flex-col gap-2">
                    <Skeleton className="h-3 w-24" />
                    <Skeleton className="h-3 w-32" />
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  <Skeleton className="h-9 w-[40%] rounded-lg" />
                  <Skeleton className="h-9 w-[50%] rounded-lg self-end" />
                  <Skeleton className="h-9 w-[30%] rounded-lg" />
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
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
                    <p className="font-bold text-sm text-[#61758A]">
                      45 minutes
                    </p>
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
                <div className="w-full flex justify-between items-center">
                  <CustomDialog
                    open={Boolean(deleteModalOpen)}
                    onOpenChange={setDeleteModalOpen}
                    trigger={
                      <Button
                        variant="ghost"
                        className="mt-auto ml-auto cursor-pointer text-red-400"
                        // onClick={() => setDeleteModalOpen(id)}
                      >
                        <Trash2 />
                        Delete
                      </Button>
                    }
                  >
                    <div className="flex flex-col justify-center items-center gap-5 text-center">
                      <Trash2 className="h-8 w-8 text-red-400" />
                      <p className="text-lg font-bold text-[#000]">
                        Are you sure you want to delete this affirmation?
                      </p>
                      <div className="flex items-center gap-3 mb-3">
                        <Button
                          variant="default"
                          onClick={() => deleteSession(id)}
                          className="cursor-pointer bg-[#EA4335] text-[#fff]"
                        >
                          {isPending ? (
                            <Loader2 className="animate-spin" />
                          ) : (
                            "Yes"
                          )}
                        </Button>
                        <Button
                          variant="default"
                          onClick={() => setDeleteModalOpen(false)}
                          className="cursor-pointer text-[#0D80F2] bg-transparent 
                        border border-[#0D80F2]"
                        >
                          No
                        </Button>
                      </div>
                    </div>
                  </CustomDialog>
                </div>
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
                    <div className="w-full flex justify-between items-center gap-2">
                      <div className="w-full flex justify-start items-start gap-2">
                        <div className="p-2 bg-[#ECF5FE] rounded-full">
                          <img src={Mic} loading="lazy" alt="" />
                        </div>
                        <div className="flex flex-col items-start">
                          <p className="font-bold text-sm">Mindful AI</p>
                          <p className="font-normal text-xs text-[#61758A]">
                            Your wellness assistant
                          </p>
                        </div>
                      </div>
                      <Link to="/sessions">
                        <Button
                          className="bg-[#0D80F2] text-[#FFFFFF] rounded-full 
                          hover:text-[#B2C9E5] cursor-pointer h-[30px]"
                        >
                          <ArrowLeft /> Sessions
                        </Button>
                      </Link>
                    </div>
                    <WaveformPlayer audioURL={getSession?.data?.audioUrl} />
                  </div>
                )
              )}
            </div>

            {getSession?.type === "session" && (
              <div className="w-full flex flex-col gap-2">
                <div className="w-full flex justify-between items-center gap-2">
                  <div className="flex items-center gap-2">
                    <img src={Conversation} loading="lazy" alt="" />
                    <p className="font-semibold text-md text-[#0D80F2]">
                      Conversation Transcript
                    </p>
                  </div>
                  <Link to="/sessions">
                    <Button
                      className="bg-[#0D80F2] text-[#FFFFFF] rounded-full 
                      hover:text-[#B2C9E5] cursor-pointer h-[30px]"
                    >
                      <ArrowLeft /> Sessions
                    </Button>
                  </Link>
                </div>
                <div
                  className="h-full w-full bg-[#fff] rounded-sm shadow-xs p-2 md:p-6 
                    flex flex-col gap-6 justify-start"
                >
                  <div className="w-full flex flex-col items-start justify-start gap-6">
                    <div className="w-full flex justify-start items-start gap-2">
                      <div className="p-2 bg-[#ECF5FE] rounded-full">
                        <img src={Bot1} loading="lazy" alt="" />
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
          </>
        )}
      </div>
    </div>
  );
};

export default CallInfo;
