import { NotificationContext } from "@/context/NotificationsProvider";
import { useContext } from "react";

export const useNotifications = () => {
  const ctx = useContext(NotificationContext);
  if (!ctx)
    throw new Error(
      "useNotifications must be used inside NotificationsProvider"
    );
  return ctx;
};
