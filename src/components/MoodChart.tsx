import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import { Card, CardContent } from "./ui/card";
import { moodData, moodDistribution } from "@/constant/dashData";

const MoodChart = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
      <Card>
        <CardContent>
          <div className="flex flex-col items-start">
            <p className="font-semibold text-lg">Mood Score</p>
            <p className="font-bold text-2xl">7.2</p>
            <div className="flex flex-row gap-2 mb-4">
              <p className="font-small text-sm">Last 7 days</p>
              <p className="font-small text-[#08873B]">+0.5%</p>
            </div>

            <ResponsiveContainer width="100%" height={150}>
              <LineChart data={moodData}>
                <XAxis dataKey="day" />
                <YAxis hide />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="mood"
                  stroke="#4f46e5"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <div className="flex flex-col items-start">
            <p className="font-semibold text-lg">Mood Distribution</p>
            <p className="font-bold text-2xl">4</p>
            <div className="flex flex-row gap-2 mb-5">
              <p className="font-small text-sm">Last 7 days</p>
              <p className="font-small text-[#08873B]">+10%</p>
            </div>

            <ResponsiveContainer width="100%" height={150}>
              <BarChart data={moodDistribution}>
                <XAxis dataKey="type" />
                <YAxis hide />
                <Tooltip />
                <Bar
                  dataKey="value"
                  fill="#4f46e5"
                  barSize={30}
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MoodChart;
