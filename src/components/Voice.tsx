import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import VoiceImg from "@/assets/VoiceImg.svg";
import Recorder from "@/assets/Recorder.svg";
import Play from "@/assets/Play.svg";
import { Recordings } from "@/constant/dashData";

const Voice = () => {
  return (
    <div className="p-0 md:p-8 flex flex-col justify-center items-center gap-5">
      <p className="text-2xl font-bold">Record Your Thoughts</p>
      <p className="text-sm text-[#121417] font-small">
        Capture your reflections and insights in your personal voice journal.
      </p>
      <Card className="w-full lg:w-[850px] max-h-[619px] p-0 overflow-hidden">
        <img
          src={VoiceImg}
          alt="record"
          className="w-full h-full object-cover rounded-xl"
        />
      </Card>
      <Button
        className="bg-[#B2C9E5] text-[#121417] rounded-full hover:text-white 
              cursor-pointer"
      >
        Start Recording
      </Button>

      <div className="flex flex-col justify-center w-full lg:w-[850px] items-start gap-5">
        <p className="text-lg font-medium">Recent Recordings</p>
        <div className="flex flex-col justify-start items-start w-full gap-4">
          {Recordings.map((record, i) => (
            <div
              key={i}
              className="flex flex-row justify-between items-center w-full"
            >
              <div className="flex flex-row gap-3 items-center">
                <div className="flex justify-center items-center w-[48px] h-[48px] bg-[#F0F2F5] rounded-8">
                  <img src={Recorder} alt="recorder" />
                </div>
                <div className="flex flex-col justify-between items-start gap-2 h-[48px]">
                  <p className="text-sm font-medium">{record.title}</p>
                  <p className="text-sm font-normal text-[#637387]">
                    {record.date}
                  </p>
                </div>
              </div>

              <div className="flex justify-end items-end">
                <img src={Play} alt="play" />
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col justify-start items-start w-full gap-4 mt-4">
          <p className="text-lg font-medium">Tips for Effective Journaling</p>
          <p className="text-sm font-medium">
            1. Find a quiet space where you can speak freely.
          </p>
          <p className="text-sm font-medium">
            2. Set a timer to keep your recordings concise.
          </p>
          <p className="text-sm font-medium">
            3. Focus on one topic or question per entry.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Voice;
