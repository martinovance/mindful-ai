import { ArrowRight, Home, Search } from "lucide-react";
import { Input } from "./ui/input";
import { Card, CardHeader } from "./ui/card";
import { Button } from "./ui/button";

import MicRec from "@/assets/MicRec.svg";
import Vidmate from "@/assets/Vidmate.svg";
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  CombinedEntry,
  MoodSession,
  VoiceJournalEntry,
} from "@/types/vapiTypes";
import {
  formatDate,
  getCallTitle,
  getMoodColor,
} from "@/utils/sessionDataTransformer";
import { Skeleton } from "./ui/skeleton";

interface CallHistoryProps {
  entries?: CombinedEntry[];
  totalItems: number;
  itemsPerPage?: number;
  currentPage: number;
  onPageChange?: (page: number) => void;
  isPending: boolean;
}

const RecentSession = ({
  entries = [],
  totalItems,
  itemsPerPage = 5,
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
    type: "session" as const,
    data: session,
  });

  const transformJournal = (journal: VoiceJournalEntry) => ({
    id: journal.id,
    title: `Voice Journal - ${journal.title}`,
    summary: "",
    date: formatDate(journal.createdAt.toDate()),
    mood: "",
    moodColor: "",
    type: "journal" as const,
    data: journal,
  });

  const transformEntry = (entry: CombinedEntry) => {
    return entry.type === "session"
      ? transformSession(entry.data)
      : transformJournal(entry.data);
  };

  const tranformedEntries = entries.map(transformEntry);

  const filteredCalls = searchQuery
    ? tranformedEntries.filter(
        (call) =>
          call.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          call.date.toLowerCase().includes(searchQuery.toLowerCase()) ||
          call.type.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : tranformedEntries;

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (page: number) => {
    onPageChange?.(page);
  };

  return (
    <Card className="shadow-none bg-[#fff] pt-0 pb-8 w-full flex flex-col gap-3">
      <div className="flex justify-between items-center px-3 sm:px-8 border-b-2 border-[#F5F5F5] h-[60px]">
        <p className="text-xl font-semibold">Recent Session</p>
        <Link to="/dashboard">
          <Button
            className="bg-[#0D80F2] text-[#FFFFFF] rounded-full 
          hover:text-[#B2C9E5] cursor-pointer h-[30px]"
          >
            <Home /> Dashboard
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
            className="block w-full p-4 pl-10 text-sm placeholder:text-[#4F7396] placeholder: rounded-lg 
            bg-[#E8EDF2] border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="space-y-4">
          {isPending ? (
            [...Array(3)].map((_, i) => (
              <Card
                key={i}
                className="p-4 bg-[#f1f1f1] flex justify-center rounded-md gap-1"
              >
                <div className="w-full flex flex-col sm:flex-row gap-2 justify-between items-center">
                  <div
                    className="w-full flex h-full justify-start 
                      items-start sm:items-center gap-2 p-2"
                  >
                    <Skeleton className="h-10 w-10 rounded-full bg-gray-300" />
                    <div className="w-full flex flex-col space-y-2">
                      <Skeleton className="h-4 w-[30%] bg-gray-300" />
                      <Skeleton className="h-4 w-[20%] bg-gray-200" />
                    </div>
                  </div>
                  <Skeleton className="h-4 w-[20%] bg-gray-200" />
                </div>
              </Card>
            ))
          ) : filteredCalls.length > 0 ? (
            filteredCalls.map((call, index) => (
              <Card
                key={index}
                className="bg-[#f1f1f1] flex justify-center min-h-16 rounded-xs 
                p-0 shadow-none border-none"
              >
                <div
                  className="flex h-full flex-col sm:flex-row justify-start 
                items-start sm:items-center gap-2 p-2"
                >
                  <div className="w-full flex justify-start items-start sm:items-center gap-2">
                    <div className="p-2 bg-[#ECF5FE] rounded-full">
                      <img
                        src={call?.type === "journal" ? MicRec : Vidmate}
                        alt="Bot-icon"
                        className="h-8 w-8"
                      />
                    </div>
                    <CardHeader className="w-full px-1 flex flex-col justify-start md:justify-between">
                      <h3 className="font-semibold text-lg">{call.title}</h3>
                      <div className="flex items-start sm:items-center gap-1 sm:gap-4 text-sm">
                        <span className="text-gray-500">{call.date}</span>
                      </div>
                    </CardHeader>
                  </div>
                  <Link to={`/sessions/${call.type}/${call.id}`}>
                    <Button
                      variant="link"
                      className="text-[#5D5CDE] p-0 h-auto cursor-pointer"
                    >
                      View details
                      <ArrowRight />
                    </Button>
                  </Link>
                </div>
              </Card>
            ))
          ) : tranformedEntries?.length === 0 ? (
            <div className="flex flex-col justify-center items-center gap-3 text-center">
              <p className="text-gray-500">You haven't had any session.</p>
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

export default RecentSession;
