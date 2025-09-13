import React, { useState } from "react";
import WaveJournalPlayer from "@/shared/JournalPlayer";
import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import { fetchVoiceJournals } from "@/services/fireStoreService";
import { useAuth } from "@/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { Button } from "./ui/button";
import Recorder from "@/assets/Images/Recorder.webp";
import { Card } from "./ui/card";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import { Skeleton } from "./ui/skeleton";

const VoiceHistory = () => {
  const { user } = useAuth();
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;
  const [lastItems, setLastItems] = useState<
    Record<number, QueryDocumentSnapshot<DocumentData> | null>
  >({});

  const { data: voiceJournals, isPending: LoadingJournals } = useQuery({
    queryKey: ["voiceJournals", user?.uid, page],
    queryFn: async () => {
      const lastDoc = lastItems[page - 1] || null;
      if (!user?.uid) throw new Error("User not authenticated");
      const data = await fetchVoiceJournals(user?.uid, lastDoc, itemsPerPage);

      setLastItems((prev) => ({
        ...prev,
        [page]: data.lastVisible,
      }));
      return data;
    },
    enabled: !!user?.uid,
  });

  const totalPages = voiceJournals?.total
    ? Math.ceil(voiceJournals?.total / itemsPerPage)
    : 1;

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) setPage(page);
  };

  return (
    <Card className="shadow-none bg-[#fff] pt-0 pb-8 w-full flex flex-col gap-3">
      <div className="flex justify-between items-center px-3 sm:px-8 border-b-2 border-[#F5F5F5] h-[60px]">
        <p className="text-xl font-semibold">Recent Journals</p>
        <Link to="/sessions">
          <Button
            className="bg-[#0D80F2] text-[#FFFFFF] rounded-full 
          hover:text-[#B2C9E5] cursor-pointer h-[30px]"
          >
            <Plus /> New
          </Button>
        </Link>
      </div>
      <div className="flex flex-col justify-center w-full items-start gap-5 px-3 sm:px-8">
        <div className="flex flex-col justify-start items-center w-full min-h-[80px] gap-4">
          {LoadingJournals ? (
            // Skeleton loader list
            Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="flex flex-row justify-between items-center w-full min-h-[80px] gap-3 animate-pulse"
              >
                {/* Left icon skeleton */}
                <div className="flex justify-center items-center w-[80px] min-h-[80px]">
                  <Skeleton className="h-10 w-10 rounded-md" />
                </div>

                {/* Right content skeleton */}
                <div className="flex flex-col justify-between items-start gap-2 h-full w-full">
                  <Skeleton className="h-4 w-32 rounded-md" /> {/* Title */}
                  <Skeleton className="h-8 w-full rounded-md" />{" "}
                  {/* Audio player */}
                  <Skeleton className="h-3 w-24 rounded-md" /> {/* Timestamp */}
                </div>
              </div>
            ))
          ) : (voiceJournals?.result ?? [])?.length > 0 ? (
            voiceJournals?.result?.map((record, i) => (
              <div
                key={i}
                className="flex flex-row justify-between items-center w-full min-h-[80px] gap-3"
              >
                <div className="flex flex-row gap-3 items-center w-full min-h-[80px]">
                  <div className="flex justify-center items-center w-[80px] min-h-[80px] bg-[#F0F2F5] rounded-8">
                    <img
                      src={Recorder}
                      loading="lazy"
                      alt="recorder"
                      className="h-10 w-10"
                    />
                  </div>

                  <div className="flex flex-col justify-between items-start gap-2 h-full w-full">
                    <p className="text-sm font-medium">{record.title}</p>
                    <WaveJournalPlayer audioURL={record.audioUrl} />
                    <p className="text-sm font-normal text-[#637387]">
                      {new Date(
                        record.createdAt.seconds * 1000
                      ).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="flex justify-center items-center gap-3 text-center w-full">
              <p className="text-gray-500 text-center">
                You haven't recorded any journal yet.
              </p>
            </div>
          )}

          <div className="flex justify-center items-center gap-2 mt-4">
            <Button
              variant="outline"
              disabled={page === 1}
              onClick={() => handlePageChange(page - 1)}
            >
              Previous
            </Button>

            {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (page <= 3) {
                pageNum = i + 1;
              } else if (page >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = page - 2 + i;
              }

              return (
                <Button
                  key={pageNum}
                  variant={page === pageNum ? "default" : "outline"}
                  onClick={() => handlePageChange(pageNum)}
                >
                  {pageNum}
                </Button>
              );
            })}

            <Button
              variant="outline"
              disabled={page === totalPages}
              onClick={() => handlePageChange(page + 1)}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default VoiceHistory;
