import { Button } from "@/components/ui/button";
import { GETSTARTED, HOMESCREEN } from "@/constant/homeDetails";
import { Link } from "react-router-dom";
import Rectangle4 from "@/assets/Images/Rectangle4.png";
import Meditate from "@/assets/Images/Meditate.webp";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, X } from "lucide-react";
import { useState } from "react";
import { Faqs } from "@/constant/dashData";

const LandingPage = () => {
  const [isOpen, setIsOpen] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setIsOpen(isOpen === index ? null : index);
  };

  return (
    <div className="p-8 flex flex-col justify-center items-center gap-8">
      <div className="w-full flex flex-col gap-3 justify-center items-center lg:w-[800px]">
        <p className="font-bold text-center text-3xl">
          Your Personal Mental Wellness Companion
        </p>
        <p className="font-small text-justify sm:text-center text-md">
          Discover a new way to manage stress, improve your mood, and build
          resilience with our AI-powered mental wellness app. Get personalized
          support and guidance anytime, anywhere.
        </p>
        <div className="flex items-center gap-3">
          <Link to="/">
            <Button
              className="bg-[#0D80F2] text-[#FFFFFF] font-bold rounded-md hover:text-white 
          cursor-pointer"
            >
              Get started
            </Button>
          </Link>

          <Link to="/">
            <Button
              variant="outline"
              className="text-[#121417] font-bold rounded-md cursor-pointer"
            >
              How it works
            </Button>
          </Link>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 justify-center items-center lg:w-[800px]">
        <img
          src={Rectangle4}
          alt="therapist"
          className="object-cover w-full h-full rounded-sm"
        />
      </div>

      <div className="w-full flex flex-col justify-start items-start gap-3 lg:w-[800px]">
        <div className="flex flex-col justify-start items-start">
          <p className="font-semibold text-md">How Mindful AI Supports You</p>
          <p className="font-normal text-sm">
            Comprehensive mental wellness tools powered by A1 and CBT techniques
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 justify-between items-center gap-4">
          {HOMESCREEN?.map((item, i) => (
            <div key={i} className="flex flex-col gap-1 w-full min-h-[332px]">
              <div className="w-full min-h-[180px]">
                <img
                  src={item.img}
                  alt="therapist"
                  className="object-cover w-full h-full rounded-sm"
                />
              </div>
              <p className="font-semibold text-md mt-2">{item.header}</p>
              <p className="text-sm text-[#6B7582]">{item.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-[#0D80F2] w-full h-full md:h-[294px] flex flex-col justify-center items-center gap-3 ">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 lg:w-[800px]">
          {GETSTARTED.map((items) => (
            <div
              key={items.title}
              className="p-2 rounded-sm w-full flex justify-center items-center gap-3 h-[134px] 
              bg-[#FFFFFF]"
            >
              <div className="p-2 bg-[#ECF2F9] text-[#0D80F2] rounded-full">
                <items.icon />
              </div>
              <div className="flex flex-col justify-start gap-1">
                <p className="text-[#0D171C] font-semibold text-md">
                  {items.title}
                </p>
                <p>{items.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full flex flex-col justify-center items-center gap-5 lg:w-[800px]">
        <p className="font-bold text-2xl">Frequently Asked Questions</p>
        <div className="w-full flex flex-col justify-start items-start gap-5">
          {Faqs.map((faq, index) => (
            <Card
              key={index}
              className="bg-[#F5FAFE] border-[#F5FAFE] w-full min-h-[82px]"
            >
              <CardContent>
                <div className="w-full flex flex-col justify-start items-start gap-3">
                  <div className="w-full flex flex-row justify-between items-start gap-3">
                    <p className="text-md font-medium">{faq.title}</p>
                    {isOpen === index ? (
                      <X
                        onClick={() => handleToggle(index)}
                        className="cursor-pointer w-6 h-6"
                      />
                    ) : (
                      <Plus
                        onClick={() => handleToggle(index)}
                        className="cursor-pointer w-5 h-5"
                      />
                    )}
                  </div>
                  {isOpen === index && (
                    <p className="text-sm font-medium text-[#4F7A96]">
                      {faq.desc}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="relative flex flex-wrap gap-2 justify-center items-center bg-gray-50 h-[300px]">
          <img
            src={Meditate}
            alt="therapist"
            className="object-cover w-full h-full rounded-sm opacity-100"
          />
          <div className="absolute flex flex-col justify-center items-center gap-3">
            <div className="flex flex-col justify-center items-center">
              <p className="text-[#FFFFFF] text-2xl font-bold">
                Ready to Improve Your Mental Well-being?
              </p>
              <p className="font-semibold text-xs text-[#FFFFFF]">
                Join thousands of users who found balance, clarity, and support
                with Mindful AI.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Link to="/">
                <Button
                  className="bg-[#B2C9E5] text-[#121417] font-bold rounded-md hover:text-white 
          cursor-pointer"
                >
                  Get started
                </Button>
              </Link>

              <Link to="/">
                <Button
                  variant="outline"
                  className="text-[#121417] font-bold rounded-md cursor-pointer"
                >
                  learn more
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
