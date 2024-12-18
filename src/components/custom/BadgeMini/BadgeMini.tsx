import React from "react";

interface BadgeStyleProps {
  text: string;
  variant: "Pending" | "Reject" | "Done" | "Not Approve" | "Unknow";
  width: number;
  height: number;
}

const BadgeMini: React.FC<BadgeStyleProps> = ({
  text,
  variant,
  width,
  height,
}) => {
  return variant == "Pending" ? (
    <div
      className="bg-[#E9F5FF] rounded-[8px] text-[#57AEFF] text-[11px] flex justify-center items-center"
      style={{ width: width, height: height }}
    >
      {text}
    </div>
  ) : variant == "Reject" ? (
    <div
      className="bg-[#FFF6E7] rounded-[8px] text-[#FFB444] text-[11px] flex justify-center items-center"
      style={{ width: width, height: height }}
    >
      {text}
    </div>
  ) : variant == "Done" ? (
    <div
      className="bg-[#C1EFDF] rounded-[8px] text-[#005A2B] text-[11px] flex justify-center items-center"
      style={{ width: width, height: height }}
    >
      {text}
    </div>
  ) : variant == "Not Approve" ? (
    <div
      className="bg-[#FED0D0] rounded-[8px] text-[#A30014] text-[11px] flex justify-center items-center"
      style={{ width: width, height: height }}
    >
      {text}
    </div>
  ) : variant == "Unknow" ? (
    <div
      className="bg-[#FED0D0] rounded-[8px] text-[#A30014] text-[11px] flex justify-center items-center"
      style={{ width: width, height: height }}
    >
      {text}
    </div>
  ) : (
    <></>
  );
};

export default BadgeMini;
