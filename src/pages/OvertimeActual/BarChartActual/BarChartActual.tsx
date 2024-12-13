import React from "react";

import {
  BarChart,
  Bar,
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

interface BarChartActual {
  ot1: number;
  ot15: number;
  ot2: number;
  ot3: number;
}
const BarChartActual: React.FC<BarChartActual> = ({ ot1, ot15, ot2, ot3 }) => {
  const data = [
    {
      bar1: ot1,
      bar2: ot15,
      bar3: ot2,
      bar4: ot3,
    },
  ];

  return (
    <div className="h-[180px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={600}
          height={300}
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
          barGap={50}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis fontSize={12} />
          <Tooltip
            formatter={(value, name) => [
              value,
              name == "bar1"
                ? "OT1"
                : name == "bar2"
                ? "OT1.5"
                : name == "bar3"
                ? "OT2"
                : name == "bar4"
                ? "OT3"
                : name,
            ]}
            contentStyle={{ fontSize: 13 }}
          />

          <Bar dataKey="bar1" fill="#8884d8" barSize={20} />
          <Bar dataKey="bar2" fill="#82ca9d" barSize={20} />
          <Bar dataKey="bar3" fill="#ffc658" barSize={20} />
          <Bar dataKey="bar4" fill="#d08484" barSize={20} />
        </BarChart>
      </ResponsiveContainer>
      <div className="text-center">
        <p className="text-[13px] text-gray-800 mb-2">
          กราฟแสดงข้อมูล จำนวนชั่วโมง / ประเภทโอที
        </p>
      </div>
      <div className="flex w-full items-center justify-center">
        <div className="flex items-center gap-x-5">
          <div className="flex gap-x-1 items-center">
            <div className="w-[12px] h-[12px] bg-[#8884d8] rounded-sm"></div>
            <p className="text-[12px] text-gray-700">OT1</p>
          </div>
          <div className="flex gap-x-1 items-center">
            <div className="w-[12px] h-[12px] bg-[#82ca9d] rounded-sm"></div>
            <p className="text-[12px] text-gray-700">OT1.5</p>
          </div>
          <div className="flex gap-x-1 items-center">
            <div className="w-[12px] h-[12px] bg-[#ffc658] rounded-sm"></div>
            <p className="text-[12px] text-gray-700">OT2</p>
          </div>
          <div className="flex gap-x-1 items-center">
            <div className="w-[12px] h-[12px] bg-[#d08484] rounded-sm"></div>
            <p className="text-[12px] text-gray-700">OT3</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BarChartActual;
