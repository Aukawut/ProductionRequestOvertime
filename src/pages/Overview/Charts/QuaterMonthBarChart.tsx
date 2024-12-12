import React from "react";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LabelList,
  Line,
  ComposedChart,
  Bar,
} from "recharts";
import moment from "moment";

const data = [
  { date: "2024-01", uv: 4000, pv: 2400, amt: 2400 },
  { date: "2024-02", uv: 3000, pv: 1398, amt: 2210 },
  { date: "2024-03", uv: 2000, pv: 9800, amt: 2290 },
  { date: "2024-04", uv: 2780, pv: 3908, amt: 2000 },
  { date: "2024-05", uv: 1890, pv: 4800, amt: 2181 },
  { date: "2024-06", uv: 2390, pv: 3800, amt: 2500 },
  { date: "2024-07", uv: 3490, pv: 4300, amt: 2100 },
  { date: "2024-08", uv: 4000, pv: 2400, amt: 2400 },
  { date: "2024-09", uv: 3000, pv: 1398, amt: 2210 },
  { date: "2024-10", uv: 2000, pv: 9800, amt: 2290 },
  { date: "2024-11", uv: 2780, pv: 3908, amt: 2000 },
  { date: "2024-12", uv: 1890, pv: 4800, amt: 2181 },
];

const renderQuarterTick = (tickProps: any): React.ReactElement => {
  const { x, y, payload } = tickProps;
  const { value, offset } = payload;
  const date = new Date(value);
  const month = date.getMonth();
  const quarterNo = Math.floor(month / 3) + 1;

  if (month % 3 === 1) {
    return (
      <text x={x} y={y - 4} fontSize={10.5} textAnchor="middle">
        {`Q${quarterNo}`}
      </text>
    );
  }

  const isLast = month === 11;

  if (month % 3 === 0 || isLast) {
    const pathX = Math.floor(isLast ? x + offset + 0.07 * x : x - offset) + 0.5;

    return <path d={`M${pathX},${y - 4}v${-35}`} stroke="#737171" />;
  }
  return <></>;
};

const QuaterMonthBarChart: React.FC = () => {
  const convertToK = (number: number) => {
    if (number >= 1000) {
      return (number / 1000).toFixed(1) + "k";
    }
    return number.toString();
  };

  return (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart
          data={data}
          margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="date"
            style={{ fontSize: 12 }}
            tickFormatter={(tick) => moment(tick, "YYYY-MM").format("MMM")}
          />
          <XAxis
            dataKey="date"
            axisLine={false}
            tickLine={false}
            interval={0}
            tick={renderQuarterTick}
            height={1}
            scale="band"
            xAxisId="quarter"
          />
          <YAxis
            style={{ fontSize: 12 }}
            domain={[0, "dataMax + 500"]}
            tickFormatter={(e) => convertToK(Number(e))}
          />
          <Tooltip />
          <Legend
            formatter={(value: string) =>
              value === "uv"
                ? "(OT) Planned"
                : value === "pv"
                ? "(OT) Actual"
                : value
            }
            wrapperStyle={{ fontSize: "12px" }}
          />

          {/* First Bar */}
          <Bar dataKey="uv" fill="#3BDCF9" barSize={15}>
            <LabelList
              dataKey="uv"
              position="top"
              style={{ fontSize: 11 }}
              formatter={(e: any) => `${(e / 1000).toFixed(1)}k`}

            />
          </Bar>

          {/* Second Bar */}
          <Bar dataKey="pv" fill="#82ca9d" barSize={15}>
            <LabelList
              dataKey="pv"
              position="top"
              style={{ fontSize: 11 }}
              formatter={(e: any) => `${(e / 1000).toFixed(1)}k`}

            />
          </Bar>

          {/* Third Bar */}
          <Bar dataKey="amt" fill="#FF9532" barSize={15}>
            <LabelList
              dataKey="amt"
              position="top"
              style={{ fontSize: 11 }}
              formatter={(e: any) => `${(e / 1000).toFixed(1)}k`}

            />
          </Bar>

          {/* Line overlay on first Bar */}
          <Line
            type="monotone"
            dataKey="uv"
            stroke="#ff7300"
            strokeWidth={1}
            dot={{ r: 4 }}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default QuaterMonthBarChart;
