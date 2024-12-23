import { EllipsisVertical, LucideProps } from "lucide-react";
import React from "react";
import CountUp from "react-countup"
import { useOTManagementSystemStore } from "../../../store";

interface CardRequestProps {
  title: string;
  amount: number;
  sumAll: number;
  Icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
  bgColor: string;
  textColor: string;
  titleTH : string ;
  GetRequestList: (status: number, code: string) => Promise<void>;
  status:number;

}
const CardRequestList: React.FC<CardRequestProps> = ({
  Icon,
  title,
  bgColor,
  textColor,
  sumAll,
  amount,
  titleTH,
  GetRequestList,
  status
}) => {
    const MAX_WIDTH = 180;
    const info = useOTManagementSystemStore((state)=> state.info)
  

  return (
    <button
      className="w-full bg-white rounded-[10px] px-3 relative py-6 shadow-smooth h-[170px] cursor-pointer"
      type="button"
      onClick={async () => {
        await GetRequestList(status,info?.EmployeeCode)
      }}
    >
        {/* more Icon */}
      <div className="absolute top-4 right-3">
        <EllipsisVertical size={18} className="text-gray-400" />
      </div>
    
      <div className="flex items-center justify-between">
        <div
          className={`w-[40px] h-[40px] rounded-[5px] p-[0.7rem] flex justify-center items-center`}
          style={{
            background: bgColor,
          }}
        >
          <Icon size={30} strokeWidth={3} color={textColor} />
        </div>
        <p className="mr-[2rem] text-gray-700 text-[30px]"><CountUp start={0} end={amount} duration={1}/></p>
      </div>

      <div className="text-start my-3">
        <p className="text-gray-700 text-[18px] font-semibold"> {title}</p>
        <p className="text-gray-500 text-[12px]"> {titleTH}</p>
      </div>
      <div
        className="h-[5px] rounded-[2px] relative"
        style={{ background: bgColor, width: MAX_WIDTH }}
      >
   
        <div
          className="h-[5px] rounded-[2px] absolute duration-300"
          style={{ background: textColor, width: `${amount > 0 ? (amount * 100) / sumAll : 0}%` }}
        >
          <p className="text-gray-800 text-[11px] mt-2">
            {amount > 0 ?  `${((amount * 100) / sumAll).toFixed(2)}%` : '0.00%' }
         
          </p>
         
        </div>
      </div>
    </button>
  );
};

export default CardRequestList;
