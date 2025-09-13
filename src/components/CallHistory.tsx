import { Plus, Search } from "lucide-react";
import { Input } from "./ui/input";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Button } from "./ui/button";

import RedStatus from "@/assets/Images/RedStatus.webp";
import GreenStatus from "@/assets/Images/GreenStatus.webp";
import YellowStatus from "@/assets/Images/YellowStatus.webp";
import NeutralStatus from "@/assets/Images/NeutralStatus.webp";
import { useState } from "react";
import { Link } from "react-router-dom";
import { MoodColorMap, MoodSession } from "@/types/vapiTypes";
import {
  formatDate,
  getCallTitle,
  getMoodColor,
} from "@/utils/sessionDataTransformer";
import { Skeleton } from "./ui/skeleton";

interface CallHistoryProps {
  sessions?: MoodSession[];
  paginatedSessions?: MoodSession[];
  totalItems: number;
  itemsPerPage?: number;
  currentPage: number;
  onPageChange?: (page: number) => void;
  isPending: boolean;
}

const CallHistory = ({
  sessions = [],
  paginatedSessions = [],
  totalItems,
  itemsPerPage = 1,
  currentPage,
  onPageChange,
  isPending,
}: CallHistoryProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const transformSession = (session: MoodSession) => ({
    id: session.id,
    title: `AI Call Title: ${getCallTitle(session.summary)}`,
    summary: session.summary || "No summary available",
    date: formatDate(session.createdAt.toDate()),
    mood: session.moodLabel,
    moodColor: getMoodColor(session.moodLabel),
  });

  const paginatedCalls = paginatedSessions.map(transformSession);
  const allCalls = sessions.map(transformSession);

  const filteredCalls = searchQuery
    ? allCalls.filter(
        (call) =>
          call.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          call.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
          call.mood.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : paginatedCalls;

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (page: number) => {
    onPageChange?.(page);
  };

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
    <Card className="shadow-none bg-[#fff] pt-0 pb-8 w-full flex flex-col gap-3">
      <div className="flex justify-between items-center px-3 sm:px-8 border-b-2 border-[#F5F5F5] h-[60px]">
        <p className="text-xl font-semibold ">Call History</p>
        <Link to="/sessions">
          <Button
            className="bg-[#0D80F2] text-[#FFFFFF] rounded-full 
          hover:text-[#B2C9E5] cursor-pointer h-[30px]"
          >
            <Plus /> New Call
          </Button>
        </Link>
      </div>
      <div className="px-3 sm:px-8 flex flex-col gap-4 ">
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
          {isPending ? (
            Array.from({ length: 3 }).map((_, i) => (
              <Card
                key={i}
                className="bg-[#f1f1f1] min-h-20 p-0 shadow-none border-none animate-pulse"
              >
                <div className="flex h-full flex-col sm:flex-row justify-start items-center gap-4 p-2">
                  <Skeleton className="h-20 w-20 rounded-md" />
                  <div className="w-full space-y-2">
                    <CardHeader className="px-1 space-y-2">
                      <Skeleton className="h-5 w-32" />
                      <div className="flex gap-4">
                        <Skeleton className="h-4 w-20" />
                        <Skeleton className="h-4 w-16" />
                      </div>
                    </CardHeader>
                    <CardContent className="px-1">
                      <Skeleton className="h-4 w-full" />
                    </CardContent>
                    <CardFooter className="px-1">
                      <Skeleton className="h-4 w-28" />
                    </CardFooter>
                  </div>
                </div>
              </Card>
            ))
          ) : filteredCalls.length > 0 ? (
            filteredCalls.map((call, index) => (
              <Card
                key={index}
                className="bg-[#f1f1f1] min-h-20 p-0 shadow-none border-none"
              >
                <div className="flex h-full flex-col sm:flex-row justify-start items-center gap-4 p-2">
                  <img
                    src={getMoodImage(call?.mood)}
                    alt={`${call.mood} mood`}
                    className="h-25 sm:h-20"
                  />
                  <div className="w-full">
                    <CardHeader className="px-1 flex flex-col md:flex-row justify-start md:justify-between gap-1">
                      <h3 className="font-semibold text-lg">{call.title}</h3>
                      <div className="flex items-start sm:items-center gap-1 sm:gap-4 text-sm">
                        <span className="text-gray-500">{call.date}</span>
                        <span className="flex items-center">
                          {call.mood}
                          <span
                            className={`w-3 h-3 rounded-full ml-2 ${
                              moodColorMap[call.moodColor]
                            }`}
                          ></span>
                        </span>
                      </div>
                    </CardHeader>
                    <CardContent className="px-1">
                      <p className="text-gray-600 mb-2">
                        {call.summary.slice(0, 60)}...
                      </p>
                    </CardContent>
                    <CardFooter className="px-1">
                      <Link to={`/sessions/session/${call.id}`}>
                        <Button
                          variant="link"
                          className="text-blue-600 p-0 h-auto cursor-pointer"
                        >
                          To view details, click here.
                        </Button>
                      </Link>
                    </CardFooter>
                  </div>
                </div>
              </Card>
            ))
          ) : sessions?.length === 0 ? (
            <div className="flex flex-col justify-center items-center gap-3 text-center">
              <p className="text-gray-500">You haven't had any call yet.</p>
              <Link to="/sessions">
                <Button className="bg-[#0D80F2] text-[#fff] font-bold rounded-full hover:text-white cursor-pointer">
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

        {!searchQuery && totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-4">
            <Button
              variant="outline"
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              Previous
            </Button>

            {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (currentPage <= 3) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }

              return (
                <Button
                  key={pageNum}
                  variant={currentPage === pageNum ? "default" : "outline"}
                  onClick={() => handlePageChange(pageNum)}
                >
                  {pageNum}
                </Button>
              );
            })}

            <Button
              variant="outline"
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
            >
              Next
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
};

export default CallHistory;
