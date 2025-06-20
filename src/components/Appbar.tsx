import Logo from "@/assets/Logo.svg";
import { Link, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import AvatarImg from "@/assets/AvatarImg.svg";
import { Bell, LogOut, Menu, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Auth from "@/utils/auth";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import CustomDialog from "@/shared/Dialog";
import Login from "@/pages/auth/Login";
import CreateAccount from "@/pages/auth/CreateAccount";
import CustomDropdown from "@/shared/Dropdown";

const Appbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const pathname = location.pathname;
  const { user } = useAuth();
  const isAuthPage = ["/"].includes(pathname);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);

  console.log(user);

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

  const renderAuthLinks = () => (
    <nav className="hidden md:flex items center gap-6">
      <Link
        to="/"
        className="text-sm font-medium hover:text-primary transition-colors"
      >
        Home
      </Link>
      <Link
        to="/"
        className="text-sm font-medium hover:text-primary transition-colors"
      >
        About
      </Link>
      <Link
        to="/"
        className="text-sm font-medium hover:text-primary transition-colors"
      >
        Services
      </Link>
      <Link
        to="/"
        className="text-sm font-medium hover:text-primary transition-colors"
      >
        Contact
      </Link>
    </nav>
  );

  const renderAppLinks = () => (
    <nav className="hidden md:flex items-center gap-6">
      <Link
        to="/dashboard"
        className="text-sm font-medium hover:text-primary transition-colors"
      >
        Home
      </Link>
      <Link
        to="/sessions"
        className="text-sm font-medium hover:text-primary transition-colors"
      >
        Sessions
      </Link>
      <Link
        to="/resources"
        className="text-sm font-medium hover:text-primary transition-colors"
      >
        Resources
      </Link>
    </nav>
  );

  const renderAuthButton = () => (
    <>
      <CustomDialog
        title="Login"
        open={isLoginOpen}
        onOpenChange={setIsLoginOpen}
        trigger={
          <Button
            size="sm"
            variant="link"
            className="hidden sm:flex cursor-pointer text-[#121417]"
          >
            Login
          </Button>
        }
      >
        <Login
          setIsSignupOpen={setIsSignupOpen}
          setIsLoginOpen={setIsLoginOpen}
        />
      </CustomDialog>
      <CustomDialog
        title="Create Account"
        open={isSignupOpen}
        onOpenChange={setIsSignupOpen}
        trigger={
          <Button
            size="sm"
            variant="default"
            className="cursor-pointer bg-[#B2C9E5] text-[#121417] rounded-full hover:bg-[#9fb8d9]"
          >
            Get Started
          </Button>
        }
      >
        <CreateAccount
          setIsLoginOpen={setIsLoginOpen}
          setIsSignupOpen={setIsSignupOpen}
        />
      </CustomDialog>
    </>
  );

  const renderUserControls = () => (
    <div className="flex items-center gap-4">
      <div className="relative cursor-pointer">
        <Bell className="h-6 w-6 p-1 bg-[#F0F2F5] rounded-full text-gray-600" />
        <Badge
          variant="destructive"
          className="absolute -top-2 -right-2 h-4 w-4 p-0 flex items-center justify-center"
        >
          3
        </Badge>
      </div>
      <CustomDropdown
        title={user?.displayName || "User"}
        email={user?.email ?? ""}
        image={user?.photoURL ?? AvatarImg}
        trigger={
          <Avatar className="h-8 w-8 cursor-pointer">
            <AvatarImage src={AvatarImg} />
            <AvatarFallback>MO</AvatarFallback>
          </Avatar>
        }
      >
        <Button
          variant="outline"
          onClick={() => Auth.logOut()}
          className="cursor-pointer border-none"
        >
          <LogOut className="mr-5" />
          Log Out
        </Button>
      </CustomDropdown>
    </div>
  );

  return (
    <header
      className="top-0 z-50 w-full border-b 
    bg-[E5E8EB] backdrop-blur supports-[backdrop-filter]:bg-white/60 
    dark:bg-gray-950/90"
    >
      <div className="flex h-16 items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>

          <Link
            to={user ? "/dashboard" : "/"}
            className="flex items-center gap-2"
          >
            <img src={Logo} alt="app-logo" className="h-5 w-5" />
            <p className="text-lg font-bold text-foreground">{getTitle()}</p>
          </Link>
        </div>

        <div className="flex items-center gap-6">
          {isAuthPage ? renderAuthLinks() : user ? renderAppLinks() : null}

          <div className="flex items-center gap-4">
            {user ? renderUserControls() : renderAuthButton()}
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-background border-b shadow-md p-4">
          <div className="flex flex-col space-y-3">
            {isAuthPage ? (
              <>
                <Link to="/" className="py-2 px-3 rounded-md hover:bg-accent">
                  Home
                </Link>
                <Link to="/" className="py-2 px-3 rounded-md hover:bg-accent">
                  About
                </Link>
                <Link to="/" className="py-2 px-3 rounded-md hover:bg-accent">
                  Services
                </Link>
                <Link to="/" className="py-2 px-3 rounded-md hover:bg-accent">
                  Contact
                </Link>
              </>
            ) : user ? (
              <>
                <Link
                  to="/dashboard"
                  className="py-2 px-3 rounded-md hover:bg-accent"
                >
                  Home
                </Link>
                <Link
                  to="/sessions"
                  className="py-2 px-3 rounded-md hover:bg-accent"
                >
                  Sessions
                </Link>
                <Link
                  to="/resources"
                  className="py-2 px-3 rounded-md hover:bg-accent"
                >
                  Resources
                </Link>
              </>
            ) : null}

            {!user && (
              <CustomDialog
                title="Create Account"
                open={isSignupOpen}
                onOpenChange={setIsSignupOpen}
                trigger={
                  <Button
                    size="sm"
                    variant="default"
                    className="cursor-pointer bg-[#B2C9E5] text-[#121417] rounded-full hover:bg-[#9fb8d9]"
                  >
                    Get started
                  </Button>
                }
              >
                <CreateAccount
                  setIsLoginOpen={setIsLoginOpen}
                  setIsSignupOpen={setIsSignupOpen}
                />
              </CustomDialog>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Appbar;
