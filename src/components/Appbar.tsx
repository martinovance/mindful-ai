import Logo from "@/assets/logo.svg";
import { Link, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import AvatarImg from "@/assets/AvatarImg.svg";
import { Bell } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const Appbar = () => {
  const location = useLocation();
  const pathname = location.pathname;

  const getTitle = () => {
    switch (pathname) {
      case "/":
        return "Mindful AI";
      case "/dashboard":
        return "MindfulPath";
      case "/voice":
        return "MindfulTalk";

      default:
        return "Mindful AI";
    }
  };

  return (
    <header
      className="top-0 z-50 h-[65PX] w-full p-8 border-b 
    bg-[E5E8EB] backdrop-blur supports-[backdrop-filter]:bg-white/60 
    dark:bg-gray-950/90"
    >
      <div className="flex flex-row justify-between items-center h-full">
        <Link
          to={
            ["/", "/create-account", "/login"].includes(pathname)
              ? "/"
              : "/dashboard"
          }
        >
          <div className="flex flex-row gap-4 items-center">
            <img src={Logo} alt="app-logo" className="h[20px] w-[20px]" />
            {getTitle() && (
              <p className="text-[#121417] text-xl font-bold">{getTitle()}</p>
            )}
          </div>
        </Link>

        <div className="flex flex-row justify-end items-center gap-10 ">
          {!["/", "/create-account", "/login"].includes(pathname) ? (
            <nav className="flex flex-row items-center gap-8 ">
              <Link
                to="/dashboard"
                className="text-md font-small hover:text-primary transition-colors"
              >
                Home
              </Link>
              <Link
                to="/sessions"
                className="text-md font-small hover:text-primary transition-colors"
              >
                Sessions
              </Link>
              <Link
                to="/resources"
                className="text-md font-small hover:text-primary transition-colors"
              >
                Resources
              </Link>
            </nav>
          ) : (
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
          )}

          {["/", "/create-account", "/login"].includes(pathname) ? (
            <Link to="/create-account">
              <Button
                className="bg-[#B2C9E5] text-[#121417] rounded-full hover:text-white 
              cursor-pointer"
              >
                {pathname === "/create-account" ? "Login" : "Get Started"}
              </Button>
            </Link>
          ) : (
            <div className="flex flex-row justify-end items-center gap-5">
              <div className="relative cursor-pointer">
                <Bell className="h-7 w-7 p-1 bg-[#F0F2F5] rounded-full text-gray-600" />
                <Badge
                  variant="destructive"
                  className="absolute -top-2 -right-2 h-4 w-4 p-0 flex items-center justify-center"
                >
                  3
                </Badge>
              </div>
              <Avatar className="h-[30px] w-[30px] cursor-pointer">
                <AvatarImage src={AvatarImg} />
                <AvatarFallback>MO</AvatarFallback>
              </Avatar>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Appbar;
