import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import AvatarImg from "@/assets/AvatarImg.svg";
import { Switch } from "@/components/ui/switch";
import { useAuth } from "@/hooks/useAuth";
import { useRef } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { uploadProfilePicture } from "@/services/fireStoreService";
import { Loader2 } from "lucide-react";
import { showToast } from "@/shared/Toast";

const UserProfile = () => {
  const { user } = useAuth();
  const displayName = user?.displayName || "";
  const [firstName, lastName] = displayName && displayName.split(" ");

  const fileInputRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();

  const { mutate: uploadPicture, isPending: uploading } = useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append(
        "upload_preset",
        import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
      );
      formData.append("folder", "user");

      const res = await fetch(
        import.meta.env.VITE_CLOUDINARY_IMAGE_UPLOAD_URL,
        {
          method: "post",
          body: formData,
        }
      );

      if (!res.ok) throw new Error("Upload to Cloudinary failed");

      const data = await res.json();
      const photoURL = data.secure_url;

      if (!user?.uid) throw new Error("User not authenticated");
      await uploadProfilePicture({ photoURL });
      return photoURL;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["auth", "currentUser"],
      });
      showToast({
        title: "Profile image changed successful",
        status: "success",
      });
    },
    onError: (error) => {
      showToast({
        title: "Error",
        description: error.message,
        status: "error",
      });
    },
  });

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    console.log(file);
    if (!file) return;

    try {
      uploadPicture(file);
    } finally {
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
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
                  value={firstName || ""}
                  className="w-full h-[45px]"
                />
              </div>
              <div className="flex flex-col gap-2 w-full">
                <Label htmlFor="last-name">Last Name</Label>
                <Input
                  id="last-name"
                  readOnly
                  value={lastName || ""}
                  className="w-full h-[45px]"
                />
              </div>
              <div className="flex flex-col gap-2 w-full">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  readOnly
                  value={user?.email || ""}
                  className="w-full h-[45px]"
                />
              </div>
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
                <Switch
                  className="data-[state=checked]:bg-[#0D80F2] 
                data-[state=unchecked]:bg-[#818282]"
                />
              </div>
              <div className="w-full flex justify-between items-center">
                <div className="flex flex-col items-start">
                  <p className="font-medium text-sm">Voice Reminders</p>
                  <p className="font-black text-xs text-[#61758A]">
                    Audio reminders for journaling
                  </p>
                </div>
                <Switch
                  className="data-[state=checked]:bg-[#0D80F2] 
                data-[state=unchecked]:bg-[#818282]"
                />
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
            <AvatarImage src={user?.photoURL || AvatarImg} />
          </Avatar>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleUpload}
            accept="image/*"
            className="hidden"
          />
          <Button
            onClick={() => fileInputRef.current?.click()}
            className="bg-[#0D80F2] rounded-sm cursor-pointer"
          >
            {uploading ? (
              <Loader2 className="animate-spin text-[#fff]" />
            ) : user?.photoURL === null ? (
              "Upload picture"
            ) : (
              "Change Picture"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
