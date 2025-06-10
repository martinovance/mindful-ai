import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Faqs, steps } from "@/constant/dashData";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";

const Resources = () => {
  const [isOpen, setIsOpen] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setIsOpen(isOpen === index ? null : index);
  };

  return (
    <div className="p-4 md:p-8 flex flex-col justify-center items-center gap-5">
      <p className="font-bold text-center text-2xl">Connect with a Therapist</p>
      <p className="text-sm text-muted-foreground text-center font-medium w-full lg:w-[800px]">
        If you're feeling overwhelmed or need additional support, we can connect
        you with a licensed therapist. Please note that this service is not a
        substitute for emergency care. If you are in immediate danger, please
        call 911 or your local emergency number.
      </p>

      <div className="w-full lg:w-[800px] flex flex-col justify-center items-start gap-5">
        <p className="font-bold text-2xl">How it Works</p>
        <div className="flex flex-col gap-1">
          {steps.map((step, index) => (
            <div key={index} className="flex items-start gap-4 relative">
              <div className="flex flex-col items-center">
                <img
                  src={step.icon}
                  alt={`${step.title} icon`}
                  className="w-5 h-5 object-contain"
                />
                {index !== steps.length - 1 && (
                  <div className="w-px h-10 bg-muted-foreground/30 mt-1" />
                )}
              </div>

              <div>
                <h4 className="text-sm font-medium">{step.title}</h4>
                <p className="text-sm text-muted-foreground">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="w-full flex flex-col justify-center items-start gap-5">
          <p className="font-bold text-2xl">FAQs</p>
          <div className="w-full flex flex-col justify-start items-start gap-5">
            {Faqs.map((faq, index) => (
              <Card key={index} className="w-full min-h-[82px]">
                <CardContent>
                  <div className="w-full flex flex-col justify-start items-start gap-3">
                    <div className="w-full flex flex-row justify-between items-start gap-3">
                      <p className="text-lg font-medium">{faq.title}</p>
                      {isOpen === index ? (
                        <ChevronDown onClick={() => handleToggle(index)} />
                      ) : (
                        <ChevronRight onClick={() => handleToggle(index)} />
                      )}
                    </div>
                    {isOpen === index && (
                      <p className="text-sm font-medium text-muted-foreground">
                        {faq.desc}
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <Button
        className="bg-[#B2C9E5] text-[#121417] rounded-full hover:text-white 
              cursor-pointer"
      >
        Request a Therapist Connection
      </Button>
    </div>
  );
};

export default Resources;
