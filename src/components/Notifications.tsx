import { useNotifications } from "@/hooks/useNotifications";
import { CalendarHeartIcon, MessageSquare, Mic } from "lucide-react";

const Notifications = () => {
  const { notifications } = useNotifications();

  // const { data: notifications } = useQuery<notTypes[]>({
  //   queryKey: ["notifications", user?.uid],
  //   queryFn: () => Promise.resolve([]),
  //   enabled: !!user?.uid,
  //   initialData: [],
  // });
  console.log(notifications);

  return (
    <div className="flex flex-col gap-3 min-h-[40px]" onClick={() => {}}>
      {notifications?.map((item, index) => (
        <div
          key={index}
          className="relative flex justify-start items-start bg-[#F8FAFC] p-1 gap-1"
        >
          <div className="p-2 bg-white">
            {item.type === "session" ? (
              <CalendarHeartIcon className="text-[#0D80F2]" />
            ) : item.type === "journal" ? (
              <Mic />
            ) : (
              <MessageSquare />
            )}
          </div>
          <div className="flex flex-col">
            <p className="text-md text-[#0D171C] font-semibold">{item.title}</p>
            <p className="text-sm font-medium text-[#a1a1a1]">{item.message}</p>
            <p className="text-xs font-normal text-gray-300">
              {/* {item.createdAt} */}
            </p>
          </div>
          {item.read === false && (
            <div className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-[#0D80F2]" />
          )}
        </div>
      ))}
    </div>
  );
};

export default Notifications;
