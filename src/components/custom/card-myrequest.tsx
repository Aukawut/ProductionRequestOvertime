import { EllipsisVertical, LucideProps } from "lucide-react";
import React from "react";

interface CardRequestProps {
  title: string;
  amount: number;
  sumAll: number;
  Icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
  bgColor: string;
  textColor: string;
}
const CardRequest: React.FC<CardRequestProps> = ({
  Icon,
  title,
  bgColor,
  textColor,
  sumAll,
  amount,
}) => {
    const MAX_WIDTH = 180;
  return (
    <div
      className="w-full bg-white rounded-[10px] p-3 relative"
      style={{
        boxShadow: "rgba(0, 0, 0, 0.05) 0px 2px 4px",
      }}
    >
        {/* more Icon */}
      <div className="absolute top-4 right-3">
        <EllipsisVertical size={18} className="text-gray-400" />
      </div>
    
      <div className="flex items-center justify-between">
        <div
          className={`w-[50px] h-[50px] rounded-[5px] p-3 flex justify-center items-center`}
          style={{
            background: bgColor,
          }}
        >
          <Icon size={22} strokeWidth={3} color={textColor} />
        </div>
        <p className="mr-[2rem] text-gray-700 text-[35px]">{amount}</p>
      </div>

      <div className="text-start my-3">
        <p className="text-gray-700 text-[20px] font-semibold"> {title}</p>
      </div>
      <div
        className="h-[5px] rounded-[2px] relative"
        style={{ background: bgColor, width: MAX_WIDTH }}
      >
        <div
          className="h-[5px] rounded-[2px] absolute"
          style={{ background: textColor, width: `${(amount * 100) / sumAll}%` }}
        ></div>
      </div>
    </div>
  );
};

export default CardRequest;
