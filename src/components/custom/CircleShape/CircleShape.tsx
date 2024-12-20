import React from "react";

interface CircleShape {
  color: string;
}

const CircleShape: React.FC<CircleShape> = ({ color }) => {
  return (
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="146"
        height="146"
        fill="none"
        viewBox="0 0 146 146"
      >
        <circle cx="73" cy="73" r="62" stroke={color} strokeWidth="22"></circle>
      </svg>
    </div>
  );
};

export default CircleShape;
