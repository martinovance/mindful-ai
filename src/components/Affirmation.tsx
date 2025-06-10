import { affirmations } from "@/constant/dashData";
import { Card } from "./ui/card";

const Affirmation = () => {
  return (
    <div className="pt-4 w-full">
      <h1 className="font-bold text-xl mb-5">Daily Affirmations</h1>
      <div className="flex flex-col gap-5">
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
      </div>
    </div>
  );
};

export default Affirmation;
