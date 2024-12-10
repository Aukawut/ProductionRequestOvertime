import React from "react";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LabelList,
} from "recharts";

const OvertimeBarChartByDept: React.FC = () => {
  function convertToK(number: number) {
    if (number >= 1000) {
      return (number / 1000).toFixed(2) + "k";
    }
    return number.toString();
  }

  const data = [
    {
      name: "AVP 1",
      uv: 4000,

      amt: 2400,
    },
    {
      name: "AVP 2",
      uv: 3000,

      amt: 2210,
    },
    {
      name: "AVP 3",
      uv: 2000,

      amt: 2290,
    },
    {
      name: "AVP 4",
      uv: 2780,

      amt: 2000,
    },
    {
      name: "AVP 5",
      uv: 1890,

      amt: 2181,
    },
    {
      name: "AVP-WH",
      uv: 2390,
      amt: 2500,
    },
    {
      name: "AVP-QA",
      uv: 3490,
      amt: 2100,
    },
   
  ];

  const truncateText = (text: string, maxLength: number = 10) => {
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };

  return (
    <div className="h-[200px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          layout="horizontal"
          margin={{ top: 10, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey="name"
            style={{ fontSize: 10 }}
            type="category"
            tickFormatter={(tick) => truncateText(tick as string)}
          />
          <YAxis
            style={{ fontSize: 12 }}
            format={""}
            type="number"
            scale="auto"
            domain={[0, "dataMax + 1000"]}
            tickFormatter={(e) => {
              return convertToK(Number(e));
            }}
          />
          <Tooltip
            formatter={(e) => e}
            contentStyle={{ fontSize: 12, borderRadius: 5 }}
          />
          <Legend
            formatter={(value: string, _: any) => {
              if (value === "uv") return "(OT) Plan";
              if (value === "amt") return "(OT) Actual";
              return value;
            }}
            wrapperStyle={{
              fontSize: "12px",
            }}
          />

          <Bar
            dataKey="uv"
            fill="#FF9532"
            activeBar={<Rectangle />}
            barSize={25}
            layout="vertical"
          >
            <LabelList
              dataKey="uv"
              position="top"
              style={{ fontSize: 11 }}
              formatter={(e: any) => {
                return convertToK(Number(e));
              }}
            />
          </Bar>
          <Bar
            dataKey="amt"
            fill="#82ca9d"
            activeBar={<Rectangle />}
            barSize={25}
            layout="vertical"
          >
            <LabelList
              dataKey="amt"
              position="top"
              style={{ fontSize: 11 }}
              formatter={(e: any) => {
                return convertToK(Number(e));
              }}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default OvertimeBarChartByDept;
