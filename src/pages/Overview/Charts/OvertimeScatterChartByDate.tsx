import React from "react";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
  ResponsiveContainer,
} from "recharts";

const data = [
  { x: 100, y: 200, z: 200 },
  { x: 120, y: 100, z: 260 },
  { x: 170, y: 300, z: 400 },
  { x: 140, y: 250, z: 280 },
  { x: 150, y: 400, z: 500 },
  { x: 110, y: 280, z: 200 },
];
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "red", "pink"];

const OvertimeScatterChartByDate: React.FC = () => {
  
  

  return (
    <div className="h-[300px] bg-white">
      <ResponsiveContainer width="100%" height="100%">
        <ScatterChart
          margin={{
            top: 20,
            right: 20,
            bottom: 20,
            left: 20,
          }}
        >
          <CartesianGrid />
          <XAxis
            type="number"
            dataKey="x"
            name="stature"
    
            className="text-[11.50px]"
          />
          <YAxis
            type="number"
            dataKey="y"
            name="weight"
     
            className="text-[11.50px]"
            domain={[0, "dataMax + 300"]}
          />
          <Tooltip cursor={{ strokeDasharray: "3 3" }} />
          <Scatter
            name="A school"
            data={data}
            fill="#8884d8"
     
            
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
  );
};

export default OvertimeScatterChartByDate;
