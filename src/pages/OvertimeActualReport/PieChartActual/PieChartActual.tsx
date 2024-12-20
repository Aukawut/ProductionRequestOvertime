import React, { useEffect, useState } from "react";
import { TrendingUp } from "lucide-react";
import { Pie, PieChart, ResponsiveContainer } from "recharts";

import {
  Card,
  CardContent,
  CardFooter,

} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
  { browser: "OT1", visitors: 275, fill: "var(--color-chrome)" },
  { browser: "OT1.5", visitors: 200, fill: "var(--color-safari)" },
  { browser: "OT2", visitors: 187, fill: "var(--color-firefox)" },
  { browser: "OT3", visitors: 173, fill: "var(--color-edge)" },
  
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
const PieChartActual: React.FC = () => {
    const [load,setLoad]  = useState(true);

    useEffect(() => {
       new Promise((resolve) => {
        setTimeout(() => {
            resolve(setLoad(false))
        },1000)
        })
    },[])

  return (
    load ? '' : 
    <ResponsiveContainer width="100%" height="100%">
    <Card className="flex flex-col bg-transparent">
      <CardContent className="flex pb-0 justify-center">
        <ChartContainer
          config={chartConfig}
          className="[&_.recharts-pie-label-text]:fill-foreground flex justify-center"
          style={{width:400,height:300}}
        >
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <Pie data={chartData} dataKey="visitors" label nameKey="browser"/>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm mt-2 items-center">
        <div className="flex items-center gap-2 font-medium leading-none text-gray-700 text-[13px]">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground text-[11px]">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
    </ResponsiveContainer>
  );
};

export default PieChartActual;
