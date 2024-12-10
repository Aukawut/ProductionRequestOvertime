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
  Legend,
} from "recharts";

const data = [
  { x: 100, y: 200, z: 200 },
  { x: 120, y: 100, z: 260 },
  { x: 170, y: 300, z: 400 },
  { x: 140, y: 250, z: 280 },
  { x: 150, y: 400, z: 500 },
  { x: 110, y: 280, z: 200 },
  { x: 130, y: 220, z: 240 },
  { x: 160, y: 180, z: 320 },
  { x: 180, y: 310, z: 450 },
  { x: 190, y: 230, z: 370 },
  { x: 200, y: 260, z: 390 },
  { x: 210, y: 340, z: 480 },
  { x: 220, y: 290, z: 410 },
  { x: 230, y: 310, z: 420 },
  { x: 240, y: 360, z: 500 },
  { x: 250, y: 400, z: 520 },
  { x: 260, y: 420, z: 540 },
  { x: 270, y: 380, z: 510 },
  { x: 280, y: 370, z: 500 },
  { x: 290, y: 410, z: 530 },
  { x: 300, y: 430, z: 550 },
  { x: 310, y: 450, z: 570 },
  { x: 320, y: 470, z: 590 },
  { x: 330, y: 490, z: 610 },
  { x: 340, y: 510, z: 630 },
  { x: 350, y: 530, z: 650 },
  { x: 360, y: 550, z: 670 },
  { x: 370, y: 570, z: 690 },
  { x: 380, y: 590, z: 710 },
  { x: 390, y: 610, z: 730 },
  { x: 400, y: 630, z: 750 },
  { x: 410, y: 650, z: 770 },
  { x: 420, y: 670, z: 790 },
  { x: 430, y: 690, z: 810 },
  { x: 440, y: 710, z: 830 },
  { x: 450, y: 730, z: 850 },
  { x: 460, y: 750, z: 870 },
  { x: 470, y: 770, z: 890 },
  { x: 480, y: 790, z: 910 },
  { x: 490, y: 810, z: 930 },
  { x: 500, y: 830, z: 950 },
  { x: 510, y: 850, z: 970 },
  { x: 520, y: 870, z: 990 },
  { x: 530, y: 890, z: 1010 },
  { x: 540, y: 910, z: 1030 },
  { x: 550, y: 930, z: 1050 },
  { x: 560, y: 950, z: 1070 },
  { x: 570, y: 970, z: 1090 },
  { x: 580, y: 990, z: 1110 },
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
          <Tooltip
            cursor={{ strokeDasharray: "3 3" }}
            formatter={(e) => e}
            contentStyle={{ fontSize: 12, borderRadius: 5 }}
          />
         
           <Legend />
          <Scatter name="A school" data={data} fill="#8884d8" shape="diamond">
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
