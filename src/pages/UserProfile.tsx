import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import AvatarImg from "@/assets/AvatarImg.svg";
import { Switch } from "@/components/ui/switch";
import { useAuth } from "@/hooks/useAuth";

const UserProfile = () => {
  const { user } = useAuth();

  const userDefault = {
    firstName: "Martins",
    lastName: "Ogunsina",
    email: "max@gmail.com",
    password: "#########",
  };

  return (
    <div className="p-4 md:p-8 flex flex-col justify-center items-center">
      <div className="flex flex-col md:flex-row justify-start items-start gap-5 w-full lg:w-[900px]">
        <div className="w-full md:w-[70%] order-2 md:order-1 flex flex-col gap-4 justify-start items-start">
          <div className="w-full h-full bg-[#fff] shadow-sm p-4 rounded-md">
            <div className="flex flex-col gap-5 justify-start items-start">
              <p className="font-semibold text-md mb-2">Personal Information</p>
              <div className="flex flex-col gap-2 w-full">
                <Label htmlFor="first-name">First Name</Label>
                <Input
                  id="first-name"
                  readOnly
                  value={userDefault.firstName}
                  className="w-full h-[45px]"
                />
              </div>
              <div className="flex flex-col gap-2 w-full">
                <Label htmlFor="last-name">Last Name</Label>
                <Input
                  id="last-name"
                  readOnly
                  value={userDefault.lastName}
                  className="w-full h-[45px]"
                />
              </div>
              <div className="flex flex-col gap-2 w-full">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  readOnly
                  value={user?.email || userDefault.email}
                  className="w-full h-[45px]"
                />
              </div>
              <div className="flex flex-col gap-2 w-full">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  readOnly
                  value={userDefault.password}
                  className="w-full h-[45px]"
                />
              </div>
              <Button className="bg-[#0D80F2] rounded-xs cursor-pointer">
                Update Profile
              </Button>
            </div>
          </div>

          <div className="w-full h-full bg-[#fff] shadow-sm p-4 rounded-md">
            <div className="w-full flex flex-col gap-5 justify-start items-start">
              <p className="font-semibold text-md mb-1">Preferences</p>
              <div className=" w-full flex justify-between items-center">
                <div className="flex flex-col items-start">
                  <p className="font-medium text-sm">Email Notifications</p>
                  <p className="font-black text-xs text-[#61758A]">
                    Receive session reminders and updates
                  </p>
                </div>
                <Switch className="data-[state=checked]:bg-[#0D80F2] data-[state=unchecked]:bg-[#818282]" />
              </div>
              <div className="w-full flex justify-between items-center">
                <div className="flex flex-col items-start">
                  <p className="font-medium text-sm">Voice Reminders</p>
                  <p className="font-black text-xs text-[#61758A]">
                    Audio reminders for journaling
                  </p>
                </div>
                <Switch className="data-[state=checked]:bg-[#0D80F2] data-[state=unchecked]:bg-[#818282]" />
              </div>
            </div>
          </div>
        </div>

        <div
          className="w-full md:w-[30%] order-1 md:order-2 h-full flex flex-col justify-center 
          items-center gap-3 bg-[#fff] shadow-sm p-4 rounded-sm"
        >
          <h1 className="font-semibold text-sm">Profile Picture</h1>
          <Avatar className="h-30 w-30 rounded-full">
            <AvatarImage src={AvatarImg} />
          </Avatar>
          <Button className="bg-[#0D80F2] rounded-xs cursor-pointer">
            Change Picture
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
