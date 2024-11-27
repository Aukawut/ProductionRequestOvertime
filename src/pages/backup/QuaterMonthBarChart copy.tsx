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
  ReferenceLine
} from "recharts";

const QuaterMonthBarChart: React.FC = () => {
  function convertToK(number: number) {
    if (number >= 1000) {
      return (number / 1000).toFixed(1) + "k";
    }
    return number.toString();
  }

  

  const data = [
    {
      name: "Jan",
      uv: 4000,

      amt: 2400,
    },
    {
      name: "Feb",
      uv: 3000,

      amt: 2210,
    },
    {
      name: "Mar",
      uv: 2000,

      amt: 2290,
    },
    {
      name: "Apr",
      uv: 2780,

      amt: 2000,
    },
    {
      name: "May",
      uv: 1890,

      amt: 2181,
    },
    {
      name: "Jun",
      uv: 2390,
      amt: 2500,
    },
    {
      name: "Jul",
      uv: 3490,

      amt: 2100,
    },
    {
      name: "Aug",
      uv: 3490,

      amt: 2100,
    },
    {
      name: "Sep",
      uv: 3490,

      amt: 2100,
    },
    {
      name: "Oct",
      uv: 3490,

      amt: 2100,
    },
    {
      name: "Nov",
      uv: 3490,

      amt: 2100,
    },
    {
      name: "Dec",
      uv: 3490,

      amt: 2100,
    },
  ];

  const truncateText = (text: string, maxLength: number = 10) => {
    return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
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
          <XAxis dataKey="name" style={{ fontSize: 12 }} type="category" tickFormatter={(tick) => truncateText(tick as string)}>
         
          </XAxis>
          <YAxis
            style={{ fontSize: 12 }}
            format={""}
            type="number"
            scale="auto"
            domain={[0, "dataMax + 500"]}
            tickFormatter={(e) => {
              return convertToK(Number(e));
            }}
          />
          <Tooltip
            formatter={(e) => e}
            contentStyle={{ fontSize: 12, borderRadius: 5 }}
          />
          <Legend />

          <ReferenceLine
            x="Mar"
            stroke="red"
            strokeWidth={0.3}
            label={{
              value: "Q1",
              position: "center",
              offset: 5,
              fill: "red",
              fontSize: 12,
              textAnchor: "middle",
            }}
            position="end"
          />
          <ReferenceLine
            x="Jun"
            stroke="blue"
            strokeWidth={0.3}
            label={{
              value: "Q2",
              position: "center",
              offset: 5,
              fill: "blue",
              fontSize: 12,
            }}
            position="end"
          />
          <ReferenceLine
            x="Sep"
            stroke="green"
            strokeWidth={0.3}
            label={{
              value: "Q3",
              position: "center",
              offset: 5,
              fill: "green",
              fontSize: 12,
            }}
            position="end"
          />
          <ReferenceLine
            x="Dec"
            stroke="purple"
            strokeWidth={0.3}
            label={{
              value: "Q4",
              position: "center",
              offset: 5,
              fill: "purple",
              fontSize: 12,
            }}
            position="end"
          />
          <Bar
            dataKey="uv"
            fill="#37CEEA"
            activeBar={<Rectangle />}
            barSize={25}
            layout="vertical"
          >
            <LabelList
              dataKey="uv"
              position="top"
              style={{ fontSize: 11 }}
              formatter={(e: any) => {
                return e.toLocaleString();
              }}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default QuaterMonthBarChart;
