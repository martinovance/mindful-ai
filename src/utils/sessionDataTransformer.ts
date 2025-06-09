import { MoodSession } from "@/types/vapiTypes";

// Calculate average mood score for a set of sessions
export const calculateAverage = (sessions: MoodSession[] = []) => {
  if (!sessions?.length) return 0;
  const sum = sessions?.reduce((acc, session) => acc + session.moodScore, 0);
  return parseFloat((sum / sessions?.length).toFixed(1));
};

// Get sessions from specific time period
const getSessionsByPeriod = (
  sessions: MoodSession[],
  period: "daily" | "weekly" | "monthly"
) => {
  const now = new Date();
  return sessions?.filter((session) => {
    const sessionsDate = session.createdAt.toDate();
    const diffDays = Math.floor(
      (now.getTime() - sessionsDate.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (period === "daily") return diffDays <= 1;
    if (period === "weekly") return diffDays <= 7;
    if (period === "monthly") return diffDays <= 30;

    return false;
  });
};

const transformDailyData = (sessions: MoodSession[]) => {
  const timeSlots = ["Morning", "Afternoon", "Evening"];
  return timeSlots.map((time) => ({
    type: time,
    value: calculateAverage(
      sessions?.filter((session) => session.timeOfDay === time)
    ),
  }));
};

const transformWeeklyData = (sessions: MoodSession[]) => {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  return days.map((day, i) => ({
    type: day,
    value: calculateAverage(
      sessions?.filter((s) => {
        const dayOfWeek = s.createdAt.toDate().getDay();
        return (dayOfWeek === 0 && i === 6) || dayOfWeek === i + 1;
      })
    ),
  }));
};

const transformMonthlyData = (sessions: MoodSession[]) => {
  return Array.from({ length: 4 }, (_, i) => ({
    type: `Week${i + 1}`,
    value: calculateAverage(
      sessions?.filter((s) => {
        const weekOfMonth = Math.floor(s.createdAt.toDate().getDate() / 7);
        return weekOfMonth === i;
      })
    ),
  }));
};

const transformMoodDistribution = (sessions: MoodSession[]) => {
  const moodCounts: Record<string, number> = {
    Happy: 0,
    Neutral: 0,
    Sad: 0,
    Anxious: 0,
  };

  sessions?.forEach((session) => {
    moodCounts[session.moodLabel]++;
  });

  return Object.entries(moodCounts).map(([type, count]) => ({
    type,
    value: count,
  }));
};

export const transformToChartData = (sessions: MoodSession[] = []) => {
  const dailySessions = getSessionsByPeriod(sessions, "daily");
  const weeklySessions = getSessionsByPeriod(sessions, "weekly");
  const monthlySessions = getSessionsByPeriod(sessions, "monthly");

  return {
    daily: transformDailyData(dailySessions),
    weekly: transformWeeklyData(weeklySessions),
    monthly: transformMonthlyData(monthlySessions),
    moodDistribution: transformMoodDistribution(sessions),
  };
};
