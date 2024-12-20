import React from "react";
import {
  Bar,
  BarChart,
  Label,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
  { factory: "AVP1", inline: 450, offline: 300 },
  { factory: "AVP2", inline: 380, offline: 420 },
  { factory: "AVP3", inline: 520, offline: 120 },
  { factory: "AVP4", inline: 140, offline: 550 },
  { factory: "AVP5", inline: 600, offline: 350 },
  { factory: "AVP-WH", inline: 480, offline: 400 },
  { factory: "AVP-QA", inline: 480, offline: 400 },
  { factory: "AVP-MOLD", inline: 480, offline: 400 },
];

const chartConfig = {
  activities: {
    label: "Overtime (Hours)",
  },
  inline: {
    label: "Inline",
    color: "hsl(var(--chart-1))",
  },
  offline: {
    label: "Offline",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;
const BarStackChart: React.FC = () => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <Card className="bg-gradient">
        <CardHeader>
          <CardTitle className="font-medium">Tooltip - Custom label</CardTitle>
          <CardDescription>
            Tooltip with custom label from chartConfig.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={chartConfig}
            style={{ height: 200, width: "100%" }}
          >
            <BarChart accessibilityLayer data={chartData}>
              <XAxis
                dataKey="factory"
                tickLine={false}
                tickMargin={10}
                axisLine={true}
                tickFormatter={(value) => value}
              />
              <YAxis
                type="number"
                // dataKey="SUM_TOTAL"
                name="OT Hours"
                className="text-[11.50px]"
                domain={[0, "dataMax + 100"]}
              >
                <Label
                  value="OT hours (hours)"
                  offset={-10}
                  dx={-20}
                  dy={0}
                  angle={-90}
                  position="middle"
                  fontSize={11}
                />
              </YAxis>

              <Bar
                dataKey="inline"
                stackId="a"
                fill="var(--color-inline)"
                radius={[0, 0, 3, 3]}
                barSize={30}
              />
              <Bar
                dataKey="offline"
                stackId="a"
                fill="var(--color-offline)"
                radius={[3, 3, 0, 0]}
                barSize={30}
              />
              <ChartTooltip
                content={
                  <ChartTooltipContent labelKey="activities" indicator="line" />
                }
                cursor={false}
                defaultIndex={1}
              />
            </BarChart>
          </ChartContainer>
        </CardContent>
        <div className="w-full flex justify-center my-2 gap-x-[2rem]">
          <div className="flex items-center gap-x-2">
            <div
              style={{ background: "hsl(var(--chart-1))" }}
              className="h-4 w-4 rounded-sm"
            ></div>
            <p className="text-[13px] text-gray-800">Inline</p>
          </div>
          <div className="flex items-center gap-x-2">
            <div
              style={{ background: "hsl(var(--chart-2))" }}
              className="h-4 w-4 rounded-sm"
            ></div>
            <p className="text-[13px] text-gray-800">Offline</p>
          </div>
        </div>
      </Card>
    </ResponsiveContainer>
  );
};

export default BarStackChart;
