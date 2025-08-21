import MindLogo from "@/assets/MindLogo.svg";
import { ArrowRight } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import XLogo from "@/assets/XLogo.svg";
import LinkedinLogo from "@/assets/LinkedinLogo.svg";
import TwitterLogo from "@/assets/TwitterLogo.svg";
import InstagramLogo from "@/assets/InstagramLogo.svg";

const Footer = () => {
  return (
    <footer
      className="bg-[#1F2937] h-full lg:h-[312px] mt-auto p-10 grid grid-cols-1 
    md:grid-cols-2 lg:grid-cols-4 justify-between items-center gap-8 lg:gap-3"
    >
      <div className="flex flex-col justify-start items-start gap-3">
        <div className="flex gap-1 items-center">
          <img src={MindLogo} loading="lazy" alt="Ming-Logo" />
          <p className="font-bold text-lg text-[#FFFFFF]">Mindful AI</p>
        </div>
        <p className="font-normal text-sm text-[#D1DEE8]">
          Your AI-powered
          <br /> mental wellness
          <br /> companion,
          <br /> available 24/7.
        </p>
        <div className="flex gap-2 items-center">
          <img src={XLogo} loading="lazy" alt="X" />
          <img src={LinkedinLogo} loading="lazy" alt="Linkedin" />
          <img src={TwitterLogo} loading="lazy" alt="Twitter" />
          <img src={InstagramLogo} loading="lazy" alt="Instagram" />
        </div>
      </div>

      <div className="flex flex-col justify-start items-start gap-3">
        <p className="font-bold text-lg text-[#FFFFFF]">Product</p>
        <p className="font-normal text-sm text-[#D1DEE8]">Features</p>
        <p className="font-normal text-sm text-[#D1DEE8]">Pricing</p>
        <p className="font-normal text-sm text-[#D1DEE8]">Demo</p>
        <p className="font-normal text-sm text-[#D1DEE8]">Download</p>
      </div>

      <div className="flex flex-col justify-start items-start gap-3">
        <p className="font-bold text-lg text-[#FFFFFF]">Company</p>
        <p className="font-normal text-sm text-[#D1DEE8]">About Us</p>
        <p className="font-normal text-sm text-[#D1DEE8]">Career</p>
        <p className="font-normal text-sm text-[#D1DEE8]">Blog</p>
        <p className="font-normal text-sm text-[#D1DEE8]">Press</p>
      </div>

      <div className="flex flex-col justify-start items-start gap-3 w-full">
        <p className="font-bold text-lg text-[#FFFFFF]">Subscribe</p>
        <p className="font-normal text-sm text-[#D1DEE8]">
          Subscribe to our newsletter for the latest updates and tutorials.
        </p>
        <div className="flex items-center h-[40px] w-full">
          <Input
            placeholder="Your email address"
            className="rounded-tr-xs rounded-br-xs h-full w-[87%] bg-[#074079] 
            border-[#074079] hover:border-none focus:border-none placeholder:text-[#ECF5FE]"
          />
          <Button
            className="h-full rounded-tl-xs rounded-bl-xs w-[13%] bg-[#0D80F2] 
          text-[#fff] hover:bg-[#0D80F2]"
          >
            <ArrowRight />
          </Button>
        </div>
        <p className="font-normal text-sm text-[#D1DEE8]">
          © 2025 Mindful AI. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
