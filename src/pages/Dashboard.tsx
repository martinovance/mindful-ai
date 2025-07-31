import Affirmation from "@/components/Affirmation";
import CallHistory from "@/components/CallHistory";
import MoodChart from "@/components/MoodChart";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/hooks/useAuth";
import { getUserSessions } from "@/services/fireStoreService";
import {
  calculateAverage,
  transformToChartData,
} from "@/utils/sessionDataTransformer";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";

const Dashboard = () => {
  const { user } = useAuth();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const { data: sessionsData } = useQuery({
    queryKey: ["session", user?.uid, currentPage],
    queryFn: () => {
      if (!user?.uid) {
        toast("User not logged in");
        throw new Error("User not logged in");
      }
      return getUserSessions(user?.uid, currentPage, itemsPerPage);
    },
    enabled: !!user?.uid,
  });
  console.log(sessionsData);

  const {
    paginatedSessions = [],
    sessions = [],
    total = 0,
  } = sessionsData || {};

  const chartData = transformToChartData(
    sessions.length > 0 ? sessions : paginatedSessions
  );

  const averageScore = calculateAverage(sessions);
  const totalSessions = sessions?.length;
  const happyPercentage = sessions?.length
    ? Math.round(
        (chartData.moodDistribution.find((m) => m.type === "Happy")?.value ||
          0 / sessions.length) * 100
      )
    : 0;

  return (
    <div className="p-4 md:p-8 flex flex-col justify-center items-center">
      <div className="flex flex-col justify-start items-start gap-5 w-full lg:w-[900px]">
        <div
          className="p-5 w-full h-full md:h-[180px] flex flex-col justify-center items-start gap-3
        bg-[#0D80F2] rounded-md"
        >
          <p className="text-[#FFFFFF] font-bold text-xl">
            How are you feeling today?
          </p>
          <p className="text-[#F0F5FA] font-normal text-sm opacity-90">
            Track your mood to better understand your emotional patterns
          </p>
          <div className="flex items-center gap-1 flex-wrap">
            <div
              className="p-3 rounded-full flex justify-center items-center gap-2 bg-[#3D99F5] 
            text-[#F0F5FA] w-fit h-[35px]"
            >
              <p className="text-sm">🙂Happy</p>
            </div>
            <div
              className="p-3 rounded-full flex justify-center items-center gap-2 bg-[#3D99F5] 
            text-[#F0F5FA] w-fit h-[35px]"
            >
              <p className="text-sm">😐Neutral</p>
            </div>
            <div
              className="p-3 rounded-full flex justify-center items-center gap-2 bg-[#3D99F5] 
            text-[#F0F5FA] w-fit h-[35px]"
            >
              <p className="text-sm">☹Sad</p>
            </div>
            <div
              className="p-3 rounded-full flex justify-center items-center gap-2 bg-[#3D99F5] 
            text-[#F0F5FA] w-fit h-[35px]"
            >
              <p className="text-sm">😥Anxious</p>
            </div>
          </div>
        </div>

        <Tabs defaultValue="weekly" className="w-full">
          <div
            className="flex flex-col md:flex-row justify-start md:justify-between 
          items-start md:items-center gap-2"
          >
            <div className="flex flex-col gap-0 justify-start items-start">
              <p className="font-semibold text-xl">Mood Trends</p>
              <p className="font-medium text-sm text-[#61758A]">
                Track your emotional well-being over time to identify patterns
                and triggers.
              </p>
            </div>
            <TabsList className="w-full md:w-[237px] rounded-full">
              <TabsTrigger
                value="daily"
                className="rounded-full cursor-pointer 
              data-[state=active]:bg-[#0D80F2] 
              data-[state=active]:text-[#fff]"
              >
                Daily
              </TabsTrigger>
              <TabsTrigger
                value="weekly"
                className="rounded-full cursor-pointer 
              data-[state=active]:bg-[#0D80F2] 
              data-[state=active]:text-[#fff]"
              >
                Weekly
              </TabsTrigger>
              <TabsTrigger
                value="monthly"
                className="rounded-full cursor-pointer  
              data-[state=active]:bg-[#0D80F2] 
              data-[state=active]:text-[#fff]"
              >
                Monthly
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="daily">
            <MoodChart
              data={chartData.daily}
              distData={chartData.moodDistribution}
              averageScore={averageScore}
              totalSessions={totalSessions}
              happyPercentage={happyPercentage}
            />
          </TabsContent>
          <TabsContent value="weekly">
            <MoodChart
              data={chartData.weekly}
              distData={chartData.moodDistribution}
              averageScore={averageScore}
              totalSessions={totalSessions}
              happyPercentage={happyPercentage}
            />
          </TabsContent>
          <TabsContent value="monthly">
            <MoodChart
              data={chartData.monthly}
              distData={chartData.moodDistribution}
              averageScore={averageScore}
              totalSessions={totalSessions}
              happyPercentage={happyPercentage}
            />
          </TabsContent>
        </Tabs>
        <CallHistory
          paginatedSessions={paginatedSessions}
          sessions={sessions}
          totalItems={total}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
        <Affirmation />
      </div>
    </div>
  );
};

export default Dashboard;
