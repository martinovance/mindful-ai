import { useAuth } from "@/hooks/useAuth";
import { getUserNotifications } from "@/services/fireStoreService";
import { notTypes } from "@/types/firestoreType";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { CalendarHeartIcon, MessageSquare, Mic } from "lucide-react";

const Notifications = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: notifications } = useQuery<notTypes[]>({
    queryKey: ["notifications", user?.uid],
    queryFn: () => {
      if (!user?.uid) return Promise.resolve([]);

      return new Promise<notTypes[]>((resolve, reject) => {
        try {
          const unsubscribe = getUserNotifications(user?.uid, (data) => {
            queryClient.setQueryData(["notifications", user?.uid], data);
            resolve(data);
          });

          return () => unsubscribe();
        } catch (error) {
          reject(error);
        }
      });
    },
    enabled: !!user?.uid,
    initialData: [],
  });
  console.log(notifications?.filter((item) => !item.read === true).length);

  return (
    <div className="flex flex-col gap-3" onClick={() => {}}>
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
