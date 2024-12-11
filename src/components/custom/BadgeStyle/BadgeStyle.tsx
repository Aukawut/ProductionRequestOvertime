import React from "react";

interface BadgeStyleProps {
  text: string;
  variant: "success" | "danger" | "warning";
  width: number;
  height: number;
}

const BadgeStyle: React.FC<BadgeStyleProps> = ({
  text,
  variant,
  width,
  height,
}) => {
  return variant == "success" ? (
    <div
      className="text-[12px] bg-[#ECFDF5] text-[#19B27B] rounded-[12px] flex items-center justify-center"
      style={{ width: width, height: height }}
    >
      {text}
    </div>
  ) : (
    <></>
  );
};

export default BadgeStyle;
