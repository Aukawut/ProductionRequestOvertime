import React, { useEffect, useState } from "react";
import { Label, Pie, PieChart, Sector } from "recharts";
import { PieSectorDataItem } from "recharts/types/polar/Pie";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {

  ChartContainer,
  ChartStyle,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MonthMenu, RequestByYear, YearMenu } from "../MyRequest";
import { ChageKeyChartDonut, ChangeKeyMonthNoToName } from "@/function/main";

interface DountRequestProps {
  yearMenu: YearMenu[];
  requestByYear: RequestByYear[];
  monthMenu: MonthMenu[];
}

import {chartConfig} from "../data"



const DonutRequest: React.FC<DountRequestProps> = ({ yearMenu,requestByYear ,monthMenu}) => {
  const id = "pie-interactive";
  const [monthData,setMonthData] = useState<{monthNo: number; monthName: string | undefined;color: string | undefined;}[]>([]) ;
  const [requestData,setRequestData] = useState<{ amount: number; monthNo: number; monthName: string | undefined; }[]>([]) ;
  
  const [activeMonth, setActiveMonth] = React.useState(requestData[0]?.monthNo);


  const activeIndex = React.useMemo(
    () => requestData.findIndex((item) => item.monthNo === activeMonth),
    [activeMonth]
  )
   
  const [year, setYear] = useState(new Date().getFullYear());
 


  useEffect(() => {

    const newKey = ChangeKeyMonthNoToName(requestByYear);
    const chartNewKey = ChageKeyChartDonut(monthMenu)

    if(newKey != undefined) {
      console.log("newKey",newKey);
      
      setRequestData(newKey)
      setActiveMonth(newKey[0]?.monthNo)
    }
    if(monthData != undefined) {
        setMonthData(chartNewKey)
    }
    
  },[requestByYear])



  return (
    <div>
      <Card data-chart={id} className="flex flex-col">
        <ChartStyle id={id} config={chartConfig} />
        <CardHeader className="flex-row items-start space-y-0 pb-0 gap-x-2">
          <div className="grid gap-1">
            <CardTitle className="text-[13px]">
              Summary Overtime (OT)
            </CardTitle>
            <CardDescription>January - June 2024</CardDescription>
          </div>
  
          <Select
            value={(year).toString()}
            onValueChange={(e) => {
              setYear(Number(e));
            }}
          >
            <SelectTrigger
              className="ml-auto h-7 w-[130px] rounded-lg pl-2.5"
              aria-label="Select a value"
            >
              <SelectValue placeholder="Select Year" />
            </SelectTrigger>
            <SelectContent align="end" className="rounded-xl">
              {yearMenu.map((key, index) => {
                return (
                  <SelectItem
                    key={index}
                    value={key.YEAR_RQ.toString()}
                    className="rounded-lg [&_span]:flex"
                  >
                    {key.YEAR_RQ}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
           
          <Select value={(activeMonth)?.toString()} onValueChange={(e) => {
           
            setActiveMonth(Number(e))
          }}> 
            <SelectTrigger
              className="ml-auto h-7 w-[130px] rounded-lg pl-2.5"
              aria-label="Select a value"
            >
              <SelectValue placeholder="Select month" />
            </SelectTrigger>
            <SelectContent align="end" className="rounded-xl">

              {monthData.map((item,index) => {
              
                return (
                  <SelectItem
                    key={index}
                    value={(item.monthNo)?.toString()}
                    className="rounded-lg [&_span]:flex"
                  >
                    <div className="flex items-center gap-2 text-xs">
                      <div
                        className="flex h-3 w-3 shrink-0 rounded-sm"
                        style={{
                          backgroundColor: `${item.color}`,
                        }}
                      />
                      {item.monthName}
                    </div>
                  </SelectItem>
                );
              })}

            </SelectContent>
          </Select>
    
        </CardHeader>
        <CardContent className="flex flex-1 justify-center pb-0">
          <ChartContainer
            id={id}
            config={chartConfig}
            className="mx-auto aspect-square w-full max-w-[270px]"
          >
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
         
              <Pie
                data={requestData}
                dataKey="amount"
                nameKey="monthName"
                innerRadius={85}
                strokeWidth={2}
                activeIndex={activeIndex}
                activeShape={({
                  outerRadius = 0,
                  ...props
                }: PieSectorDataItem) => 
                 {
          
                  return  <g>
                  <Sector {...props} outerRadius={outerRadius + 10} />
                  <Sector
                    {...props}
                    outerRadius={outerRadius + 18}
                    innerRadius={outerRadius + 12}
                  />
                </g>
                 }
                }
              >
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                      return (
                        <text
                          x={viewBox.cx}
                          y={viewBox.cy}
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          <tspan
                            x={viewBox.cx}
                            y={viewBox.cy}
                            className="fill-foreground text-3xl font-bold"
                          >
                            {requestData[activeIndex]?.amount.toLocaleString()}
                       
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 24}
                            className="fill-muted-foreground"
                          >
                            Users
                          </tspan>
                        </text>
                      );
                    }
                  }}
                />
              </Pie>
            </PieChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default DonutRequest;
