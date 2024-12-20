import React from "react";

interface Polygon {
    color : string ;
}
const Polygon: React.FC<Polygon> = ({color}) => {
  return (
   
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="666"
        height="768"
        fill="none"
        viewBox="0 0 666 768"
      >
        <path
          stroke={color}
          strokeWidth="68"
          d="M34 211.764v346.042L333.157 728 632 555.293V211.45L333.157 40z"
        ></path>
      </svg>
  
  );
};

export default Polygon;
