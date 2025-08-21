import { useNotifications } from "@/hooks/useNotifications";
import { markNotificationAsRead } from "@/services/fireStoreService";
import { CalendarHeartIcon, MessageSquare, Mic } from "lucide-react";

const Notifications = () => {
  const { notifications } = useNotifications();

  return (
    <div className="flex flex-col gap-3 min-h-[80px] max-h-[270px] overflow-y-auto">
      {notifications.length > 0 ? (
        notifications.map((item, index) => (
          <div
            key={index}
            className="relative flex justify-start items-start bg-[#F8FAFC] p-1 gap-1 cursor-pointer"
            onClick={() => markNotificationAsRead("notifications", item.id)}
          >
            <div className="p-2 bg-white">
              {item.type === "session" ? (
                <CalendarHeartIcon className="text-[#0D80F2]" />
              ) : item.type === "journal" ? (
                <Mic className="text-[#0D80F2]" />
              ) : (
                <MessageSquare className="text-[#0D80F2]" />
              )}
            </div>
            <div className="flex flex-col">
              <p className="text-md text-[#0D171C] font-semibold">
                {item.title}
              </p>
              <p className="text-sm font-medium text-[#a1a1a1]">
                {item.message}
              </p>
              <p className="text-xs font-semibold text-gray-700">
                {item.createdAt.toDateString()}
              </p>
            </div>
            {item.read === false && (
              <div className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-[#0D80F2]" />
            )}
          </div>
        ))
      ) : (
        <div className="flex justify-center items-center h-full w-full">
          <p className="font-semibold text-sm">No new notification</p>
        </div>
      )}
    </div>
  );
};

export default Notifications;
