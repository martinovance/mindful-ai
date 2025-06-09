import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  LabelList,
} from "recharts";

import { Card, CardContent } from "./ui/card";

interface MoodData {
  type: string;
  value: number;
}

interface MoodChartProps {
  data: MoodData[];
  distData: MoodData[];
  averageScore?: number;
  totalSessions?: number;
  happyPercentage: number;
}

const MoodChart = ({
  data,
  distData,
  averageScore = 0,
  totalSessions = 0,
  happyPercentage,
}: MoodChartProps) => {
  const percentageChange = totalSessions > 0 ? 0.5 : 0;
  const distributionChange = totalSessions > 0 ? 10 : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
      <Card>
        <CardContent>
          <div className="flex flex-col items-start">
            <p className="font-semibold text-lg">Mood Score</p>
            <p className="font-bold text-2xl">{averageScore.toFixed(1)}</p>
            <div className="flex flex-row gap-2 mb-4">
              <p className="font-small text-sm">
                Last {data?.length} {data?.length > 1 ? "days" : "day"}
              </p>
              <p
                className={`font-small text-sm ${
                  percentageChange >= 0 ? "text-[#08873B]" : "text-[#E53E3E]"
                }`}
              >
                {percentageChange >= 0 ? "+" : ""}
                {percentageChange}%
              </p>
            </div>

            <ResponsiveContainer width="100%" height={150}>
              <LineChart data={data}>
                <XAxis
                  dataKey="type"
                  axisLine={false}
                  tickLine={false}
                  interval={0}
                  padding={{ left: 15, right: 15 }}
                />
                <YAxis hide />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#637387"
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
            <p className="font-bold text-2xl">{totalSessions}</p>
            <div className="flex flex-row gap-4">
              <div className="flex flex-row gap-2 mb-5">
                <p className="font-small text-sm">Total sessions</p>
                <p
                  className={`font-small text-sm ${
                    distributionChange > 0 ? "text-[#08873B]" : "text-[#E53E3E]"
                  }`}
                >
                  {distributionChange >= 0 ? "+" : ""}
                  {distributionChange}%
                </p>
              </div>
              <div className="flex flex-row gap-2 mb-5">
                <p className="font-small text-sm">Happy sessions</p>
                <p
                  className={`font-small text-sm ${
                    happyPercentage > 0 ? "text-[#08873B]" : "text-[#E53E3E]"
                  }`}
                >
                  {happyPercentage}%
                </p>
              </div>
            </div>

            <ResponsiveContainer width="70%" height={150}>
              <BarChart data={distData} barCategoryGap="20%">
                <XAxis dataKey="type" axisLine={false} tickLine={false} />
                <YAxis hide />
                <Tooltip />
                <Bar
                  dataKey="value"
                  fill="#F0F2F5"
                  barSize={40}
                  radius={[0, 0, 0, 0]}
                >
                  <LabelList
                    dataKey="value"
                    position="top"
                    content={(props) => {
                      const { x, y, width } = props;

                      if (
                        typeof x === "number" &&
                        typeof y === "number" &&
                        typeof width === "number"
                      ) {
                        return (
                          <line
                            x1={x}
                            x2={x + width}
                            y1={y - 4}
                            y2={y - 4}
                            stroke="#000"
                            strokeWidth={3}
                          />
                        );
                      }

                      return null;
                    }}
                  />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MoodChart;
