import { getUserNotifications } from "@/services/fireStoreService";
import { notTypes } from "@/types/firestoreType";
import { useQueryClient } from "@tanstack/react-query";
import { createContext, ReactNode, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

export interface notificationType {
  notifications: notTypes[];
  unreadCount: number;
}

export const NotificationContext = createContext<notificationType | undefined>(
  undefined
);

export const NotificationProvider = ({
  userId,
  children,
}: {
  userId: string;
  children: ReactNode;
}) => {
  const queryClient = useQueryClient();
  const [notifications, setNotifications] = useState<notTypes[]>([]);
  const prevUnreadCount = useRef(0);

  useEffect(() => {
    if (!userId) return;

    const unsubscribe = getUserNotifications(userId, (data) => {
      setNotifications(data);
      queryClient.setQueryData(["notifications", userId], data);

      // 🔔 check for new unread notifications
      const unreadCount = data.filter((n) => !n.read).length;
      if (unreadCount > prevUnreadCount.current) {
        toast.success("🔔 New notification!", {
          position: "top-right",
          style: { marginTop: 25 },
        });
        const audio = new Audio("/ding.mp3");
        audio.play().catch((err) => {
          console.warn("Audio play blocked by browser:", err);
        });
        window.navigator.vibrate?.(200);
      }
      prevUnreadCount.current = unreadCount;
    });

    return () => unsubscribe();
  }, [userId, queryClient]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <NotificationContext.Provider value={{ notifications, unreadCount }}>
      {children}
    </NotificationContext.Provider>
  );
};
