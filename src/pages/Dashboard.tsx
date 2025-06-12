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
        <p className="font-bold text-2xl">Mood Trends</p>
        <p className="font-medium text-center text-md text-[#637387]">
          Track your emotional well-being over time to identify patterns and
          triggers.
        </p>
        <Tabs defaultValue="weekly" className="w-full">
          <TabsList className="w-full">
            <TabsTrigger value="daily" className="cursor-pointer">
              Daily
            </TabsTrigger>
            <TabsTrigger value="weekly" className="cursor-pointer">
              Weekly
            </TabsTrigger>
            <TabsTrigger value="monthly" className="cursor-pointer">
              Monthly
            </TabsTrigger>
          </TabsList>

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
        <div className="flex justify-between items-center gap-5 w-full mt-10">
          <p className="text-[#637387] text-sm font-medium">Terms of Service</p>
          <p className="text-[#637387] text-sm font-medium">Privacy Policy</p>
        </div>
        <p className=" text-[#637387] text-sm text-center font-medium w-full">
          @2025 Mindful-HQ. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
