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
import { SummaryActualComparePlanByFac } from "../Overview";

interface OvertimeBarChartByDeptProps {
  data: SummaryActualComparePlanByFac[];
}

const OvertimeBarChartByDept: React.FC<OvertimeBarChartByDeptProps> = ({
  data,
}) => {
  function convertToK(number: number) {
    if (number >= 1000) {
      return (number / 1000).toFixed(2) + "k";
    }
    return number.toString();
  }

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
            dataKey="FACTORY_NAME"
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
            formatter={(value, name) => [
              `${value?.toLocaleString()} Hours`,
              name == "SUM_PLAN"
                ? "Plan"
                : name == "SUM_PLAN_OB"
                ? "Plan (OB)"
                : name == "SUM_ACTUAL"
                ? "OT Actual"
                : "",
            ]}
            contentStyle={{ fontSize: 12, borderRadius: 5 }}
          />
          <Legend
            formatter={(value: string, _: any) => {
              if (value === "SUM_PLAN") return "Plan";
              if (value === "SUM_ACTUAL") return "(OT) Actual";
              if (value === "SUM_PLAN_OB") return "Planed (OB)";
              return value;
            }}
            wrapperStyle={{
              fontSize: "12px",
            }}
          />

          <Bar
            dataKey="SUM_PLAN"
            fill="#FF9532"
            activeBar={<Rectangle />}
            barSize={15}
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
            dataKey="SUM_ACTUAL"
            fill="#82ca9d"
            activeBar={<Rectangle />}
            barSize={15}
            layout="vertical"
          >
            <LabelList
              dataKey="SUM_ACTUAL"
              position="top"
              style={{ fontSize: 11 }}
              formatter={(e: any) => {
                return convertToK(Number(e));
              }}
            />
          </Bar>
          <Bar
            dataKey="SUM_PLAN_OB"
            fill="#3BDCF9"
            activeBar={<Rectangle />}
            barSize={15}
            layout="vertical"
          >
            <LabelList
              dataKey="SUM_PLAN_OB"
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
