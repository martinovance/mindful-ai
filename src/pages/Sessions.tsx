import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Voice from "../components/Voice";
import Agent from "../components/Agent";
import { Separator } from "@/components/ui/separator";

const Sessions = () => {
  return (
    <div className="p-4 md:p-8 flex flex-col justify-center items-center">
      <div className="flex flex-col justify-start items-start gap-5 lg:w-[850px]">
        <Tabs defaultValue="agent" className="w-full">
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
        </Tabs>
      </div>
    </div>
  );
};

export default Sessions;
