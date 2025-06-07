import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import UserPin from "@/assets/UserPin.svg";
import AgentPin from "@/assets/AgentPin.svg";
import { useAuth } from "@/hooks/useAuth";
import { useVapi } from "@/hooks/useVapi";
import { useEffect } from "react";

const Agent = () => {
  const { user } = useAuth();
  const { isSpeaking, transcript, startCall, stopCall } = useVapi(
    user?.uid ?? ""
  );

  useEffect(() => {
    if (user) {
      console.log("Logged-in user:", user);
    }
  }, [user]);

  return (
    <div className="p-8 flex flex-col justify-center items-center gap-5">
      <p className="text-2xl font-bold">Your Personal AI Therapist</p>
      <p className="text-sm text-[#121417] text-center font-small">
        Engage in supportive, CBT-based talk therapy anytime, anywhere. Our AI
        therapist is here to listen and guide you towards better mental
        well-being.
      </p>
      <div className="flex flex-row justify-center items-center w-[850px] h-[400px] gap-3">
        <Card
          className={`max-w-[50%] h-[400px] p-0 overflow-hidden shadow-md transition duration-300,
          ${isSpeaking ? "animate-pulse ring-4 ring-blue-400" : ""} `}
        >
          <img
            src={AgentPin}
            alt="record"
            className="w-full h-full object-cover rounded-xl"
          />
        </Card>
        <Card className="max-w-[50%] h-[400px] p-0 overflow-hidden">
          <img
            src={UserPin}
            alt="record"
            className="w-full h-full object-cover rounded-xl"
          />
        </Card>
      </div>

      {transcript?.map((line, idx) => (
        <p key={idx}>{line}</p>
      ))}

      <Button
        onClick={isSpeaking ? stopCall : startCall}
        className={`bg-[#B2C9E5] text-[#121417] rounded-full hover:text-white 
              cursor-pointer, ${isSpeaking ? "bg-red-600" : "[#B2C9E5]"}`}
      >
        Start Voice Session
      </Button>
    </div>
  );
};

export default Agent;
