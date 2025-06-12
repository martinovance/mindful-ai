import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import UserPin from "@/assets/UserPin.svg";
import AgentPin from "@/assets/AgentPin.svg";
import { useAuth } from "@/hooks/useAuth";
import { useVapi } from "@/hooks/useVapi";
import { useEffect } from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

const Agent = () => {
  const { user } = useAuth();
  const { isLoading, isSpeaking, transcript, startCall, stopCall } = useVapi(
    user?.uid ?? ""
  );

  useEffect(() => {
    if (user) {
      console.log("Logged-in user:", user);
    }
  }, [user]);

  return (
    <div className="p-0 md:p-8 w-full flex flex-col justify-center items-center gap-5">
      <p className="text-2xl text-center font-bold">
        Your Personal AI Therapist
      </p>
      <p className="text-sm text-[#121417] text-center font-small">
        Engage in supportive, CBT-based talk therapy anytime, anywhere. Our AI
        therapist is here to listen and guide you towards better mental
        well-being.
      </p>
      <div className="flex flex-row justify-center items-center w-full lg:w-[850px] h-full sm:h-[400px] gap-3">
        <Card
          className={`w-[50%] h-full p-0 overflow-hidden shadow-md transition duration-300,
          ${isSpeaking ? "animate-pulse ring-4 ring-blue-400" : ""} `}
        >
          <img
            src={AgentPin}
            alt="record"
            className="w-full h-full object-cover rounded-xl"
          />
        </Card>
        <Card className="w-[50%] h-full p-0 overflow-hidden">
          <img
            src={UserPin}
            alt="record"
            className="w-full h-full object-cover rounded-xl"
          />
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
        onClick={isSpeaking ? stopCall : startCall}
        className={`bg-[#B2C9E5] text-[#121417] rounded-full hover:text-white 
              cursor-pointer, ${isSpeaking ? "bg-red-600" : "[#B2C9E5]"}`}
      >
        {isLoading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <p>Connecting to your assistant...</p>
          </>
        ) : isSpeaking ? (
          "End Call"
        ) : (
          "Start Voice Session"
        )}
      </Button>
    </div>
  );
};

export default Agent;
