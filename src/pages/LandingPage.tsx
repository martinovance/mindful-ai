import { Button } from "@/components/ui/button";
import { HOMESCREEN } from "@/constant/homeDetails";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="p-8 flex flex-col justify-center items-center gap-8">
      <p className="font-bold text-center text-3xl">
        Your AI-Powered Mental Wellness Companion
      </p>
      <p className="font-small text-justify sm:text-center text-lg lg:w-[980px]">
        Discover the power of Cognitive Behavioral Therapy (CBT) with our AI
        therapist. Engage in personalized, voice-based therapy sessions designed
        to help you manage stress, anxiety, and improve your overall mental
        well-being.
      </p>

      <div className="flex flex-wrap gap-2 justify-center items-center lg:w-[980px]">
        {HOMESCREEN?.map((item, i) => (
          <div
            key={i}
            className="flex flex-col gap-1 w-full sm:w-[223px] min-h-[332px]"
          >
            <div className="w-full min-h-[223px]">
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

      <Link to="/">
        <Button
          className="bg-[#B2C9E5] text-[#121417] font-bold rounded-full hover:text-white 
          cursor-pointer"
        >
          Start your journey
        </Button>
      </Link>
    </div>
  );
};

export default LandingPage;
