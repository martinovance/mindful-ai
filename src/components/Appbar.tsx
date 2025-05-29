import Logo from "@/assets/logo.svg";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

const Appbar = () => {
  return (
    <header
      className="top-0 z-50 h-[65PX] w-full p-8 border-b 
    bg-[E5E8EB] backdrop-blur supports-[backdrop-filter]:bg-white/60 
    dark:bg-gray-950/90"
    >
      <div className="flex flex-row justify-between items-center h-full">
        <Link to="/">
          <div className="flex flex-row gap-4 items-center">
            <img src={Logo} alt="app-logo" className="h[20px] w-[20px]" />
            <p className="text-[#121417] text-xl font-bold">Mindful AI</p>
          </div>
        </Link>

        <div className="flex flex-row justify-end items-center gap-10 ">
          <nav className="flex flex-row items-center gap-8 ">
            <Link
              to="/"
              className="text-md font-small hover:text-primary transition-colors"
            >
              Home
            </Link>
            <Link
              to="/"
              className="text-md font-small hover:text-primary transition-colors"
            >
              About
            </Link>
            <Link
              to="/"
              className="text-md font-small hover:text-primary transition-colors"
            >
              Services
            </Link>
            <Link
              to="/"
              className="text-md font-small hover:text-primary transition-colors"
            >
              Contact
            </Link>
          </nav>

          <Link to="/create-account">
            <Button className="bg-[#B2C9E5] text-[#121417] rounded-full hover:text-white cursor-pointer">
              Get Started
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Appbar;
