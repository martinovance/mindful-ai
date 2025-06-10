import { Search } from "lucide-react";
import { Input } from "./ui/input";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Button } from "./ui/button";

import RedStatus from "@/assets/RedStatus.svg";
import GreenStatus from "@/assets/GreenStatus.svg";
import YellowStatus from "@/assets/YellowStatus.svg";
import NeutralStatus from "@/assets/NeutralStatus.svg";
import { useState } from "react";
import { Link } from "react-router-dom";
import { MoodColorMap, MoodSession } from "@/types/vapiTypes";
import {
  formatDate,
  getCallTitle,
  getMoodColor,
} from "@/utils/sessionDataTransformer";

interface CallHistoryProps {
  sessions?: MoodSession[];
}

const CallHistory = ({ sessions = [] }: CallHistoryProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const calls = sessions?.map((session) => ({
    id: session.id,
    title: `AI Call Title: ${getCallTitle(session.summary)}`,
    summary: session.summary || "No summary available",
    date: formatDate(session.createdAt.toDate()),
    mood: session.moodLabel,
    moodColor: getMoodColor(session.moodLabel),
  }));

  const filteredCalls = calls.filter(
    (call) =>
      call.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      call.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      call.mood.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const moodColorMap: MoodColorMap = {
    red: "bg-red-500",
    green: "bg-green-500",
    yellow: "bg-yellow-500",
    blue: "bg-blue-500",
    gray: "bg-gray-500",
  };

  const moodImages = {
    happy: GreenStatus,
    sad: RedStatus,
    neutral: NeutralStatus,
    anxious: YellowStatus,
    default: YellowStatus,
  };

  const getMoodImage = (mood?: string) => {
    if (!mood) return moodImages.default;

    const lowerCaseMood = mood.toLowerCase();
    return (
      moodImages[lowerCaseMood as keyof typeof moodImages] || moodImages.default
    );
  };

  return (
    <div className="w-full flex flex-col gap-3">
      <p className="text-2xl font-bold">Call History</p>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search className="w-5 h-5 text-[#4F7396] color-[#4F7396]" />
        </div>
        <Input
          type="search"
          placeholder="Search calls"
          className="block w-full p-4 pl-10 text-sm placeholder:text-[#4F7396] placeholder: rounded-lg bg-[#E8EDF2] border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="space-y-4">
        {filteredCalls.length > 0 ? (
          filteredCalls.map((call, index) => (
            <Card key={index} className="min-h-35 p-0">
              <div className="flex h-full flex-col sm:flex-row justify-start items-center gap-4 p-2">
                <img
                  src={getMoodImage(call?.mood)}
                  alt={`${call.mood} mood`}
                  className="h-25 sm:h-35"
                />
                <div className="w-full">
                  <CardHeader className="px-1">
                    <h3 className="font-semibold text-lg">{call.title}</h3>
                  </CardHeader>
                  <CardContent className="px-1">
                    <p className="text-gray-600 mb-2">
                      {call.summary.slice(0, 60)}...
                    </p>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-4 text-sm">
                      <span className="text-gray-500">Date: {call.date}</span>
                      <span className="flex items-center">
                        Mood: {call.mood}
                        <span
                          className={`w-3 h-3 rounded-full ml-2 ${
                            moodColorMap[call.moodColor]
                          }`}
                        ></span>
                      </span>
                    </div>
                  </CardContent>
                  <CardFooter className="px-1">
                    <Button variant="link" className="text-blue-600 p-0 h-auto">
                      To view details, click here.
                    </Button>
                  </CardFooter>
                </div>
              </div>
            </Card>
          ))
        ) : sessions?.length === 0 ? (
          <div className="flex flex-col justify-center items-center gap-3 text-center">
            <p className="text-gray-500">You haven't had any calls yet.</p>
            <Link to="/sessions">
              <Button className="bg-[#B2C9E5] text-[#121417] font-bold rounded-full hover:text-white cursor-pointer">
                Start a call with your AI therapist
              </Button>
            </Link>
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center gap-3 text-center py-8">
            <p className="text-gray-500">
              No therapy calls found matching your search.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CallHistory;
