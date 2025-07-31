import { affirmations } from "@/constant/dashData";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import CustomDialog from "@/shared/Dialog";
import CreateAffirmation from "./CreateAffirmation";

const Affirmation = () => {
  return (
    <div className="pt-4 w-full">
      <div className="flex justify-between items-center gap-3">
        <div className="flex flex-col justify-start items-start mb-5">
          <h1 className="font-bold text-xl">Daily Affirmations</h1>
          <p className="font-medium text-sm text-[#61758A]">
            Improve communication and strengthen your wellness.
          </p>
        </div>

        <CustomDialog
          title="Create Affirmation"
          trigger={
            <Button
              className="bg-[#0D80F2] text-[#FFFFFF] rounded-full 
          hover:text-[#B2C9E5] cursor-pointer h-[30px]"
            >
              <Plus /> Create
            </Button>
          }
        >
          <CreateAffirmation />
        </CustomDialog>
      </div>
      <Card className="shadow-none bg-[#fff] p-3 md:p-8 w-full flex flex-col gap-3">
        {affirmations.map((affirm, i) => (
          <div key={i} className="flex flex-col sm:flex-row gap-3">
            <Card className="w-full sm:max-w-[50%] min-h-full sm:max-h-[256px] p-0 overflow-hidden">
              <img
                src={affirm.icon}
                alt={`${affirm.title}`}
                className="w-full h-full object-cover rounded-xl"
              />
            </Card>
            <div className="w-full sm:w-[50%] flex flex-col justify-start items-start gap-2">
              <p className="text-md font-medium">{affirm.title}</p>
              <p className="text-sm font-normal text-[#637387]">
                {affirm.description}
              </p>
            </div>
          </div>
        ))}
      </Card>
    </div>
  );
};

export default Affirmation;
