import React, { useEffect, useState } from "react";
import TableApprove from "./TableApprove/TableApprove";
import CardRequest from "@/components/custom/card-myrequest";
import { Check, CircleX, Clock8, Undo2 } from "lucide-react";

export const data = [
  {
    title: "Pending",
    amount: 20,
    sumAll: 100,
    Icon: Clock8,
    bgColor: "#E9F5FF",
    textColor: "#2697FF",
    aliasTitle: "Pending",
    titleTH: "รออนุมัติ",
  },
  {
    title: "Reject",
    amount: 1,
    sumAll: 100,
    Icon: Undo2,
    bgColor: "#FFF6E7",
    textColor: "#FF9E0E",
    aliasTitle: "Reject",
    titleTH: "แก้ไข",
  },

  {
    title: "Not Approve",
    amount: 4,
    sumAll: 100,
    Icon: CircleX,
    bgColor: "#FED0D0",
    textColor: "#A30014",
    aliasTitle: "Not Approve",
    titleTH: "ไม่อนุมัติ",
  },
  {
    title: "Success",
    amount: 20,
    sumAll: 100,
    Icon: Check,
    bgColor: "#C1EFDF",
    textColor: "#005A2B",
    aliasTitle: "Approved",
    titleTH: "อนุมัติ",
  },
];

interface CountApprove  {
  NAME_STATUS : string;
  ID_STATUS_APV:number ;
  AMOUNT : number ;


}

const Approve: React.FC = () => {

  const [countApprove,setCountApprove] = useState<CountApprove[]>([])



  useEffect(() => {
    
  },[])

  return (
    <div className="p-2">
      <div className="px-4 py-3 rounded-[18px] bg-white shadow-smooth">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-2">
          {data?.map((item) => {
            return (
              <CardRequest
                title={item.title}
                amount={item.amount}
                sumAll={item.sumAll}
                Icon={item.Icon}
                bgColor={item.bgColor}
                textColor={item.textColor}
                titleTH={item.titleTH}
              />
            );
          })}
        </div>
        <div className="flex flex-col justify-start p-2">
          <p className="text-[14px]">Approve Requests</p>
          <p className="text-[13px] text-gray-600">อนุมัติคำขอโอที</p>
        </div>

        <TableApprove />
      </div>
    </div>
  );
};

export default Approve;
