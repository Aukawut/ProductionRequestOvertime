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
import { SummaryActualComparePlan } from "../Overview";

const renderQuarterTick = (tickProps: any): React.ReactElement => {
  const { x, y, payload } = tickProps;
  const { value, offset } = payload;
  const date = new Date(value);
  const month = date.getMonth();
  const quarterNo = Math.floor(month / 3) + 1;

  if (month % 3 === 1) {
    return (
      <text x={x + 32} y={y - 7} fontSize={10.5} textAnchor="middle" fontWeight={600} color="#3c3c3c">
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

interface QuaterMonthBarChartProps {
  data: SummaryActualComparePlan[];
  year: number;
}

const QuaterMonthBarChart: React.FC<QuaterMonthBarChartProps> = ({ data }) => {
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
      <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey="MONTH_NAME"
            style={{ fontSize: 12 }}
            tickFormatter={(tick) => moment(tick, "YYYY-MM").format("MMM")}
          />
          <XAxis
            dataKey="MONTH_NAME"
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

          <Tooltip
            formatter={(value, name) => [
              `${value?.toLocaleString()} Hours`,
              name == "SUM_OT_ACTUAL"
                ? "OT Actual"
                : name == "SUM_OT_PLANWC"
                ? "Planed"
                : name == "SUM_OT_PLANOB"
                ? "Planed (OB)"
                : "",
            ]}
            contentStyle={{ fontSize: 12, borderRadius: 5 }}
          />

          <Legend
            formatter={(value: string) =>
              value === "SUM_OT_PLANWC"
                ? "Planned"
                : value === "SUM_OT_ACTUAL"
                ? "Actual"
                : value === "SUM_OT_PLANOB"
                ? "Planned (OB)"
                : value
            }
            wrapperStyle={{ fontSize: "12px" }}
          />

          {/* First Bar */}
          <Bar dataKey="SUM_OT_PLANOB" fill="#3BDCF9" barSize={15}></Bar>

          {/* Second Bar */}
          <Bar dataKey="SUM_OT_ACTUAL" fill="#82ca9d" barSize={15}>
            <LabelList
              dataKey="SUM_OT_ACTUAL"
              position="top"
              style={{ fontSize: 11 }}
              formatter={(e: any) => `${(e / 1000).toFixed(1)}k`}
            />
          </Bar>

          {/* Third Bar */}
          <Bar dataKey="SUM_OT_PLANWC" fill="#FF9532" barSize={15}>
            <LabelList
              dataKey="SUM_OT_PLANWC"
              position="top"
              style={{ fontSize: 11 }}
              formatter={(e: any) => `${(e / 1000).toFixed(1)}k`}
            />
          </Bar>

          {/* Line overlay on first Bar */}
          <Line
            type="monotone"
            dataKey="SUM_OT_PLANWC"
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
