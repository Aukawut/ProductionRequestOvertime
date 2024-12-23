import React, { useEffect } from "react";
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
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { ActualByFactory } from "../OvertimeActualReport";


const chartConfig = {
  activities: {
    label: "Overtime (Hours)",
  },
  INLINE_HOURS: {
    label: "Inline",
    color: "hsl(var(--chart-1))",
  },
  OFFLINE_HOURS: {
    label: "Offline",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

interface BarStackChartProps {
  summaryByFac: ActualByFactory[]
}

const BarStackChart: React.FC<BarStackChartProps> = ({summaryByFac}) => {

  useEffect(() => {
    console.log("summaryByFac",summaryByFac);
    
  },[])
  return (
    <ResponsiveContainer width="100%" height="100%">
      <Card className="bg-gradient">
        <CardHeader>
          <CardTitle className="font-medium text-[13px]">Bar Stack - Actual Overtime By Factory</CardTitle>
         
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={chartConfig}
            style={{ height: 200, width: "100%" }}
          >
            <BarChart accessibilityLayer data={summaryByFac}>
              <XAxis
                dataKey="FACTORY_NAME"
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
                dataKey="INLINE_HOURS"
                stackId="a"
                fill="var(--color-INLINE_HOURS)"
                radius={[0, 0, 3, 3]}
                barSize={30}
              />
              <Bar
                dataKey="OFFLINE_HOURS"
                stackId="a"
                fill="var(--color-OFFLINE_HOURS)"
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
            <p className="text-[12px] text-gray-800">INLINE</p>
          </div>
          <div className="flex items-center gap-x-2">
            <div
              style={{ background: "hsl(var(--chart-2))" }}
              className="h-4 w-4 rounded-sm"
            ></div>
            <p className="text-[12px] text-gray-800">OFFLINE</p>
          </div>
        </div>
      </Card>
    </ResponsiveContainer>
  );
};

export default BarStackChart;
