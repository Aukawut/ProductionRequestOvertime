import { Check, CircleX, Clock8, File, LucideProps, Undo2 } from "lucide-react";

export interface CardRequestProps {
  title: string;
  amount: number;
  sumAll: number;
  Icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
  bgColor: string;
  textColor: string;
  aliasTitle : string ;
  titleTH:string ;
}

export const cardMenu: CardRequestProps[] = [
  {
    title: "Pending",
    amount: 20,
    sumAll: 100,
    Icon: Clock8,
    bgColor: "#E9F5FF",
    textColor: "#2697FF",
    aliasTitle:"Pending",
    titleTH:"รออนุมัติ"
    
  },
  {
    title: "Reject",
    amount: 1,
    sumAll: 100,
    Icon: Undo2,
    bgColor: "#FFF6E7",
    textColor: "#FF9E0E",
    aliasTitle:"Reject",
    titleTH:"รอแก้ไข"
  },
 
  {
    title: "Success",
    amount: 20,
    sumAll: 100,
    Icon: Check,
    bgColor: "#C1EFDF",
    textColor: "#005A2B",
    aliasTitle:"Approved",
    titleTH:"อนุมัติ"
  },
  {
    title: "Cancel",
    amount: 4,
    sumAll: 100,
    Icon: CircleX,
    bgColor: "#FED0D0",
    textColor: "#A30014",
    aliasTitle:"Cancel",
    titleTH:"ยกเลิก"
  },
];
