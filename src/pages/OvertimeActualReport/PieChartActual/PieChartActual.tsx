import React, { useEffect, useState } from "react";
import { TrendingUp } from "lucide-react";
import { Pie, PieChart, ResponsiveContainer } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import LoadingCircle from "@/components/custom/loading-circle";
import CircleShape from "@/components/custom/CircleShape/CircleShape";
import { ActualByOvertimeType } from "../OvertimeActualReport";

const chartDataColor = [
  { name: "OT1",type: "OT1.00",  fill: "hsl(var(--chart-1))" },
  { name: "OT1.5",type: "OT1.50",  fill: "hsl(var(--chart-2))" },
  { name: "OT2",type: "OT2.00",  fill: "hsl(var(--chart-3))" },
  { name: "OT3",type: "OT3.00", fill: "hsl(var(--chart-4))" },
];

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  chrome: {
    label: "Chrome",
    color: "hsl(var(--chart-1))",
  },
  safari: {
    label: "Safari",
    color: "hsl(var(--chart-2))",
  },
  firefox: {
    label: "Firefox",
    color: "hsl(var(--chart-3))",
  },
  edge: {
    label: "Edge",
    color: "hsl(var(--chart-4))",
  },
  other: {
    label: "Other",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig;

interface PieChartActualProps {
  summaryByType: ActualByOvertimeType[]
}

interface ChartData {
  id:    number;
  type : string;
  sum: number;
  fill: string;

}



const PieChartActual: React.FC<PieChartActualProps> = ({summaryByType}) => {
  const [load, setLoad] = useState(true);

  const FindColorFill = (type:string) => {
      const obj = chartDataColor?.find((x) => x.type == type)
      if(obj) {
        return obj.fill
      }else{
        return "hsl(var(--chart-5))"
      }
  }
  const chartData:ChartData[] = summaryByType?.map((item) => ({
    id:item.ID_TYPE_OT,
    type:item.HOURS_AMOUNT,
    sum:item.SUM_HOURS,
    fill:FindColorFill(item.HOURS_AMOUNT),
  }))

  useEffect(() => {
    console.log("summaryByType",summaryByType);
    
    new Promise((resolve) => {
      setTimeout(() => {
        resolve(setLoad(false));
      }, 500);
    });
  }, []);

  return load ? (
    <div className="w-[300px] h-[350px] flex justify-center items-center">
      <LoadingCircle />
    </div>
  ) : (
    <ResponsiveContainer width="100%" height="100%">
      <Card className="flex flex-col bg-gradient p-1 relative overflow-hidden">
      <CardHeader>
        <CardTitle className="text-[13px] text-gray-800 font-medium">Pie Chart - Overtime By Overtime Type</CardTitle>
       
      </CardHeader>
      <div className="absolute -left-[5rem] top-[4rem] ">
          <div className="flex w-[1rem] h-auto">
            <div className="w-full">
              <CircleShape color="#EBF6FE" />
            </div>
          </div>
        </div>
        <CardContent className="flex pb-0 justify-center">
          <ChartContainer
            config={chartConfig}
            className="[&_.recharts-pie-label-text]:fill-foreground flex justify-center"
            style={{ width: 400, height: 250 }}
          >
            <PieChart>
              <ChartTooltip content={<ChartTooltipContent hideLabel />} />
              <Pie
                data={chartData}
                dataKey="sum"
                label
                nameKey="type"
              />
            </PieChart>
          </ChartContainer>
        </CardContent>

        <div className="flex items-center gap-2 font-medium leading-none text-gray-700 text-[12.5px] justify-center">
          Overtime Actual By OT Type <TrendingUp className="h-4 w-4" />
        </div>
        <div className="flex items-center gap-x-2 justify-center mb-2">
          {chartDataColor.map((item, index) => (
            <div className="flex gap-x-2 items-center mt-3">
              <div
                key={index}
                className="flex w-4 h-4 rounded-sm items-center gap-x-3"
                style={{ background: `${item.fill}` }} // Correct usage of CSS variable
              >
                &nbsp; {/* Add content if needed */}
              </div>
              <p className="text-[11px] text-gray-800">{item.name}</p>
            </div>
          ))}
        </div>
      </Card>
    </ResponsiveContainer>
  );
};

export default PieChartActual;
