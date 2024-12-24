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
import {  ActualByWorkcell } from "../OvertimeActualReport";
import Polygon from "@/components/custom/Polygon/Polygon";


const chartConfig = {
  activities: {
    label: "Overtime (Hours)",
  },
  SUM_HOURS: {
    label: "Hours",
    color: "hsl(var(--chart-1))",
  },
 
} satisfies ChartConfig;

interface BarStackChartProps {
  actualByWorkcell: ActualByWorkcell[]
}

const BarStackChart: React.FC<BarStackChartProps> = ({actualByWorkcell}) => {

  useEffect(() => {
    console.log("actualByWorkcell",actualByWorkcell);
    
  },[])
  return (
    <ResponsiveContainer width="100%" height="100%">
      <Card className="flex flex-col bg-gradient p-1 relative overflow-hidden">
        <CardHeader>
          <CardTitle className="font-medium text-[13px]">Bar Chart - Actual Overtime By Workcell</CardTitle>
         
        </CardHeader>
        <div className="absolute -left-[7rem] -top-[14rem] -z-1">
          <div className="flex w-[12rem]">
            <Polygon color="#EBF6FE" />
          </div>
        </div>
        <CardContent>
          <ChartContainer
            config={chartConfig}
            style={{ height: 200, width: "100%" }}
          >
            <BarChart accessibilityLayer data={actualByWorkcell}>
              <XAxis
                dataKey="NAME_WORKCELL"
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
                dataKey="SUM_HOURS"
                stackId="a"
                fill="var(--color-SUM_HOURS)"
                radius={[0, 0, 3, 3]}
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
        
      </Card>
    </ResponsiveContainer>
  );
};

export default BarStackChart;
