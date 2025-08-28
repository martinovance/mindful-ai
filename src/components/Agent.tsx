import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import UserPin2 from "@/assets/Images/UserPin2.webp";
import Bot from "@/assets/Images/Bot.webp";
import { useAuth } from "@/hooks/useAuth";
import { useVapi } from "@/hooks/useVapi";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { showToast } from "@/shared/Toast";
import { createNotifications } from "@/services/fireStoreService";

const Agent = ({ setCallOpen }: { setCallOpen: (open: boolean) => void }) => {
  const { user } = useAuth();
  const { isLoading, isSpeaking, transcript, startCall, stopCall } = useVapi(
    user?.uid ?? ""
  );

  const handleStopCall = async () => {
    stopCall();
    setCallOpen(false);
    await createNotifications(user?.uid ?? "", {
      title: `${"AI Therapy Companion"}`,
      message: "A new call session was initiated.",
      type: "session",
    });
    showToast({
      title: "Call Ended",
      description: "Your call session has been saved",
      status: "success",
    });
  };

  return (
    <div className="w-full flex flex-col justify-center items-center gap-5">
      <div className="flex flex-row justify-center items-center w-full h-full sm:h-[150px] gap-3">
        <Card
          className="bg-[#F9F9F9] shadow-none w-[50%] h-full p-0 overflow-hidden transition 
            duration-300"
        >
          <div className="w-full h-full flex justify-center items-center p-4">
            <img
              src={Bot}
              alt="record"
              className={`w-20 h-20 object-cover rounded-full ${
                isSpeaking ? "animate-pulse ring-4 ring-blue-400" : ""
              }`}
            />
          </div>
        </Card>
        <Card className="w-[50%] bg-[#F9F9F9] shadow-none h-full p-0 overflow-hidden">
          <div className="w-full h-full flex justify-center items-center p-4">
            <img
              src={user?.photoURL || UserPin2}
              alt="record"
              className="w-20 h-20 object-cover rounded-full"
            />
          </div>
        </Card>
      </div>

      {transcript.length > 0 && (
        <div className="border-gradient p-0.5 rounded-lg w-full">
          <div className="dark-gradient rounded-lg min-h-12 px-5 py-3 flex items-center justify-center">
            <p
              className={cn(
                "transition-opacity duration-500 opacity-0 text-white",
                "animate-fadeIn opacity-100"
              )}
            >
              {transcript[transcript.length - 1]}
            </p>
          </div>
        </div>
      )}

      <Button
        onClick={isSpeaking ? handleStopCall : startCall}
        className={`bg-[#0D80F2] rounded-full hover:text-white w-full 
              cursor-pointer ${isSpeaking ? "bg-red-600" : "bg-[#0D80F2]"}`}
      >
        {isLoading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <p>Connecting to your assistant...</p>
          </>
        ) : isSpeaking ? (
          "End Call"
        ) : (
          "Start Call Session"
        )}
      </Button>
    </div>
  );
};

export default Agent;
