import Voice from "../components/Voice";
import Agent from "../components/Agent";
import Bot1 from "@/assets/Bot1.svg";
import MicRec from "@/assets/MicRec.svg";
import { Button } from "@/components/ui/button";
import RecentSession from "@/components/RecentSession";
import CustomDialog from "@/shared/Dialog";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";
import { showToast } from "@/shared/Toast";
import { getCombinedEntries } from "@/services/fireStoreService";

const Sessions = () => {
  const { user } = useAuth();
  const [currentPage, setCurrentPage] = useState(1);
  const [lastItems, setLastItems] = useState<
    Record<number, { sessionId?: string; journalId?: string } | null>
  >({});
  const itemsPerPage = 5;

  const { data: combinedData } = useQuery({
    queryKey: ["combinedEntries", user?.uid, currentPage],
    queryFn: async () => {
      if (!user?.uid) {
        showToast({
          title: "User not logged in",
          status: "error",
        });
        throw new Error("User not logged in");
      }
      const lastItem = lastItems ? lastItems[currentPage - 1] : null;
      const data = await getCombinedEntries(user.uid, lastItem, itemsPerPage);

      setLastItems((prev) => ({
        ...prev,
        [currentPage]: data.lastVisible,
      }));

      return data;
    },
    enabled: !!user?.uid,
  });
  console.log(combinedData);

  const { entries = [], total = 0 } = combinedData || {};

  return (
    <div className="p-4 md:p-8 flex flex-col justify-center items-center">
      <div className="flex flex-col justify-start items-start gap-5 lg:w-[850px]">
        <div className="flex flex-col">
          <p className="text-lg font-semibold">Sessions</p>
          <p className="text-sm font-normal text-[#61758A]">
            Manage and review your therapy sessions and progress.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 h-full w-full">
          <div
            className="h-full w-full bg-[#fff] shadow-xs rounded-sm p-2 md:p-6 
          flex flex-col gap-6 justify-start"
          >
            <div className="flex justify-start items-center gap-2">
              <div className="p-1 bg-[#ECF5FE] rounded-full">
                <img src={Bot1} alt="Bot-icon" />
              </div>
              <div className="flex flex-col">
                <p className="text-sm font-semibold">AI Therapist</p>
                <p className="text-sm font-normal text-[#61758A]">
                  CBT-based therapy sessions
                </p>
              </div>
            </div>

            <CustomDialog
              title="Your Personal AI Therapist"
              description="Engage in supportive CBT-based talk therapy anytime, anywhere. Gideon is here and ready to guide you towards better mental well-being"
              trigger={
                <Button className="cursor-pointer bg-[#0D80F2] rounded-full">
                  Start Session
                </Button>
              }
            >
              <Agent />
            </CustomDialog>
          </div>
          <div
            className="h-full w-full bg-[#fff] rounded-sm shadow-xs p-2 md:p-6 
          flex flex-col gap-6 justify-start"
          >
            <div className="flex justify-start items-center gap-2">
              <div className="p-1 bg-[#ECF5FE] rounded-full">
                <img src={MicRec} alt="Bot-icon" />
              </div>
              <div className="flex flex-col">
                <p className="text-sm font-semibold">Voice Journaling</p>
                <p className="text-sm font-normal text-[#61758A]">
                  Record your thoughts and feelings
                </p>
              </div>
            </div>

            <CustomDialog
              title="Record your thought"
              description="Capture your reflection and insights in your personal voice journal"
              trigger={
                <Button className="cursor-pointer bg-[#34A853] rounded-full">
                  Start Session
                </Button>
              }
            >
              <Voice />
            </CustomDialog>
          </div>
        </div>

        <RecentSession
          entries={entries}
          totalItems={total}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />

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

        {/* <Tabs defaultValue="agent" className="w-full">
          <TabsList className="w-full sm:w-[50%] mb-0">
            <TabsTrigger value="agent" className="cursor-pointer">
              AI Therapist
            </TabsTrigger>
            <TabsTrigger value="record" className="cursor-pointer">
              Voice Journaling
            </TabsTrigger>
          </TabsList>
          <Separator className="mt-0" />

          <TabsContent className="m-0" value="agent">
            <Agent />
          </TabsContent>
          <TabsContent value="record">
            <Voice />
          </TabsContent>
        </Tabs> */}
      </div>
    </div>
  );
};

export default Sessions;
