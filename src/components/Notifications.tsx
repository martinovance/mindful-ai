import {
  CalendarHeartIcon,
  LucideIcon,
  MessageSquare,
  Mic,
} from "lucide-react";

interface NoteTypes {
  icon: LucideIcon;
  title: string;
  description: string;
  time: string;
  status: string;
}
const Notes: NoteTypes[] = [
  {
    icon: CalendarHeartIcon,
    title: "Session Reminder",
    description: "Your therapy session starts in 30 minutes",
    time: "2 hours ago",
    status: "unread",
  },
  {
    icon: Mic,
    title: "Voice Journal Complete",
    description: "Your morning reflection has been processed",
    time: "Yesterday",
    status: "unread",
  },
  {
    icon: MessageSquare,
    title: "Daily Affirmation Saved",
    description: "Your daily affirmation has been saved",
    time: "2 days ago",
    status: "read",
  },
];

const Notifications = () => {
  return (
    <div className="flex flex-col gap-3">
      {Notes.map((item, index) => (
        <div
          key={index}
          className="relative flex justify-start items-start bg-[#F8FAFC] p-1 gap-1"
        >
          <div className="p-2 bg-white">
            <item.icon className="text-[#0D80F2]" />
          </div>
          <div className="flex flex-col">
            <p className="text-md text-[#0D171C] font-semibold">{item.title}</p>
            <p className="text-sm font-medium text-[#a1a1a1]">
              {item.description}
            </p>
            <p className="text-xs font-normal text-gray-300">{item.time}</p>
          </div>
          {item.status === "unread" && (
            <div className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-[#0D80F2]" />
          )}
        </div>
      ))}
    </div>
  );
};

export default Notifications;
