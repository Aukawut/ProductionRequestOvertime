import React, { useEffect } from "react";
import { Area, AreaChart, CartesianGrid, Label, XAxis, YAxis } from "recharts";

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
import { ActualByOvertimeDate } from "../OvertimeActualReport";
import moment from "moment";


const chartConfig = {
  desktop: {
    label: "INLINE",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "OFFLINE",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

interface AreaChartReportProps {
  start: string;
  end: string;
  summaryByDate: ActualByOvertimeDate[]
}

const AreaChartReport: React.FC<AreaChartReportProps> = ({ start, end ,summaryByDate}) => {

    const chartData = summaryByDate?.map((item) => ({
      desktop:item.INLINE_HOURS,
      mobile:item.OFFLINE_HOURS,
      date:moment(item.DATE_OT).format("YYYY-MM-DD"),
    }))

useEffect(() => {
  console.log("summaryByDate",summaryByDate);
  
},[])
  return (
    <Card className="bg-transparent">
      <CardHeader>
        <CardTitle className="text-[13px] text-gray-800 font-medium">
          Area Chart - Overtime By User Group
        </CardTitle>
        <CardDescription className="text-[12px]">
          Showing total user for {start} - {end}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          style={{ height: 200, width: "100%" }}
        >
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
            className="bg-transparent"
          >
            <CartesianGrid vertical={false} />

            <XAxis
              dataKey="date"
             
              tickMargin={8}
              tickFormatter={(value) => value}
              tick={{fontSize:11}}
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
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <defs>
              <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-desktop)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-desktop)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-mobile)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-mobile)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <Area
              dataKey="mobile"
              type="natural"
              fill="url(#fillMobile)"
              fillOpacity={0.4}
              stroke="var(--color-mobile)"
              stackId="a"
            />
            <Area
              dataKey="desktop"
              type="natural"
              fill="url(#fillDesktop)"
              fillOpacity={0.4}
              stroke="var(--color-desktop)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <div className="flex items-center gap-x-2 justify-center mb-7">
        <div className="flex gap-x-2 items-center mt-3">
          <div
            className="flex w-4 h-4 rounded-sm items-center gap-x-3"
            style={{ background: `hsl(var(--chart-1))` }} // Correct usage of CSS variable
          >
            &nbsp; {/* Add content if needed */}
          </div>
          <p className="text-[11px] text-gray-800">INLINE</p>
        </div>
        <div className="flex gap-x-2 items-center mt-3">
          <div
            className="flex w-4 h-4 rounded-sm items-center gap-x-3"
            style={{ background: `hsl(var(--chart-2))` }} // Correct usage of CSS variable
          >
            &nbsp; {/* Add content if needed */}
          </div>
          <p className="text-[11px] text-gray-800">OFFLINE</p>
        </div>
      </div>
    </Card>
  );
};

export default AreaChartReport;
