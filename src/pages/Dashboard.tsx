import MoodChart from "@/components/MoodChart";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Dashboard = () => {
  return (
    <div className="p-8 flex flex-col justify-center items-center">
      <div className="flex flex-col justify-start items-start gap-5 w-[900px]">
        <p className="font-bold text-2xl">Mood Trends</p>
        <p className="font-medium text-md text-[#637387]">
          Track your emotional well-being over time to identify patterns and
          triggers.
        </p>

        <Tabs defaultValue="weekly" className="w-full cursor-pointer">
          <TabsList className="w-full">
            <TabsTrigger value="daily">Daily</TabsTrigger>
            <TabsTrigger value="weekly">Weekly</TabsTrigger>
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
          </TabsList>
          <TabsContent value="daily">Your daily mood data here</TabsContent>
          <TabsContent value="weekly">
            <MoodChart />
          </TabsContent>
          <TabsContent value="monthly">Your monthly mood data here</TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
