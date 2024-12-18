import React from "react";
import {
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
  ResponsiveContainer,
  ScatterChart,
  TooltipProps,
  Label,
} from "recharts";
import { SummaryActualByDate } from "../Overview";
import moment from "moment";

const COLORS = [
  "#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#FF4444", "#8A2BE2", "#00BFFF", "#FFD700", "#ADFF2F", "#FF6347",
  "#32CD32", "#FFD700", "#B0E0E6", "#FF1493", "#7B68EE", "#FF4500", "#2E8B57", "#FF6347", "#9400D3", "#32CD32",
  "#FF7F50", "#98FB98", "#D2691E", "#FF8C00", "#6A5ACD", "#B22222", "#6495ED", "#FF69B4", "#00FA9A", "#F0E68C",
  "#FF00FF", "#1E90FF", "#8B4513", "#D3D3D3", "#00CED1", "#FFB6C1"
];

const calculateRadius = (y: number, maxY: number) => {
  const minRadius = 5;
  const maxRadius = 15;
  const range = maxY - 1;
  return minRadius + ((y - 1) / range) * (maxRadius - minRadius);
};

interface OvertimeScatterChartByDateProp {
  data: SummaryActualByDate[];
}

// Define the types for the Tooltip props
interface CustomTooltipProps extends TooltipProps<number, string> {
  active?: boolean;
  payload?: Array<any>;
  label?: string | number;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({
  active,
  payload,
}) => {
  if (active && payload && payload.length) {
    const { DATE_OT, COUNT_OT, SUM_TOTAL } = payload[0].payload;

    return (
      <div className="custom-tooltip bg-[white] shadow-smooth p-2 rounded-sm">
        <p className="text-[13px] font-medium">{`Date: ${moment(DATE_OT).format(
          "YYYY-MM-DD"
        )}`}</p>
        <p className="text-[12px]">{`Overtime : ${SUM_TOTAL} Hours`}</p>
        <p className="text-[12px]">{`Amount: ${COUNT_OT}`} Person</p>
      </div>
    );
  }

  return null;
};

const OvertimeScatterChartByDate: React.FC<OvertimeScatterChartByDateProp> = ({
  data,
}) => {
  const maxY = Math.max(...data.map((item) => item.SUM_TOTAL)); // Get the maximum value of y

  return (
    <>
      <div className="h-[300px] bg-white py-2">
        <ResponsiveContainer width="100%">
          <ScatterChart
            margin={{
              top: 20,
              right: 20,
              bottom: 20,
              left: 20,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              type="number"
              dataKey="COUNT_OT"
              name="Amount"
              className="text-[11.50px]"
            >
              <Label
                value="Number of people working overtime (People)"
                offset={-10}
                dx={-20}
                dy={20}
        
                position="middle"
                fontSize={11}
              />
            </XAxis>
            <YAxis
              type="number"
              dataKey="SUM_TOTAL"
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
            <Tooltip
              content={<CustomTooltip />}
              formatter={(value, name) => [value, name]}
              contentStyle={{ fontSize: 12, borderRadius: 5 }}
            />

            <Scatter
              name="Overtime Data"
              data={data}
              shape={(props: any) => {
                const radius = calculateRadius(props.payload.SUM_TOTAL, maxY);

                return (
                  <rect
                    {...props}
                    x={props.cx - radius / 2}
                    y={props.cy - radius / 2}
                    width={radius}
                    height={radius}
                    transform={`rotate(45 ${props.cx} ${props.cy})`} // Rotate the rectangle
                  />
                );
              }}
            >
              {data.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
      </div>

      <div className="p-2 w-full overflow-hidden">
        <div className="w-full overflow-auto h-[100%]">
          <div className="flex gap-x-[1rem]">
            <ul className="flex gap-x-[1rem]">
              {data?.map((item, index) => (
                <li key={index} className="text-[12px]">
                  <div className="w-[90px] flex items-center gap-x-2">
                    <div
                      className="w-[12px] h-[12px] rounded-sm"
                      style={{ background: COLORS[index % COLORS.length] }}
                    />
                    <span className="text-[11px]">
                      {moment(item.DATE_OT).format("YYYY-MM-DD")}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default OvertimeScatterChartByDate;
