import { ChartConfig } from "@/components/ui/chart";
import { Check, CircleX, Clock8, LucideProps, Undo2 } from "lucide-react";

export interface CardRequestProps {
  title: string;
  amount: number;
  sumAll: number;
  Icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
  bgColor: string;
  textColor: string;
  aliasTitle: string;
  titleTH: string;
  status:number;
}

export const cardMenu: CardRequestProps[] = [
  {
    title: "Pending",
    amount: 20,
    sumAll: 100,
    Icon: Clock8,
    bgColor: "#E9F5FF",
    textColor: "#2697FF",
    aliasTitle: "Pending",
    titleTH: "รออนุมัติ",
    status:1,
  },
  {
    title: "Reject",
    amount: 5,
    sumAll: 100,
    Icon: Undo2,
    bgColor: "#FFF6E7",
    textColor: "#FF9E0E",
    aliasTitle: "Reject",
    titleTH: "รอแก้ไข",
    status:5,
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
    status:2,
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
    status:3,
  },
  {
    title: "Cancel",
    amount: 4,
    sumAll: 100,
    Icon: CircleX,
    bgColor: "#FED0D0",
    textColor: "#A30014",
    aliasTitle: "Cancel",
    titleTH: "ยกเลิก",
    status:4,
  },
];

export const allMonth:{no:number ; name:string}[] = [
  {
    no: 1,
    name: "January",
  },
  {
    no: 2,
    name: "February",
  },
  {
    no: 3,
    name: "March",
  },
  {
    no: 4,
    name: "April",
  },
  {
    no: 5,
    name: "May",
  },
  {
    no: 6,
    name: "June",
  },
  {
    no: 7,
    name: "July",
  },
  {
    no: 8,
    name: "August",
  },
  {
    no: 9,
    name: "September",
  },
  {
    no: 10,
    name: "October",
  },
  {
    no: 11,
    name: "November",
  },
  {
    no: 12,
    name: "December",
  },

];


export const colorOfMonth = [
  { month: 1, fill: "var(--color-january)",donutColor:"hsl(var(--chart-1))" },
  { month: 2,  fill: "var(--color-february)",donutColor:"hsl(var(--chart-2))" },
  { month: 3, fill: "var(--color-march)",donutColor:"hsl(var(--chart-3))" },
  { month: 4, fill: "var(--color-april)",donutColor:"hsl(var(--chart-4))" },
  { month: 5, fill: "var(--color-may)",donutColor:"hsl(var(--chart-5))" },
  { month: 6, fill: "var(--color-june)",donutColor:"hsl(var(--chart-6))" },
  { month: 7, fill: "var(--color-july)",donutColor:"hsl(var(--chart-7))" },
  { month: 8, fill: "var(--color-august)",donutColor:"hsl(var(--chart-8))" },
  { month: 9, fill: "var(--color-september)",donutColor:"hsl(var(--chart-9))"},
  { month: 10, fill: "var(--color-october)",donutColor:"hsl(var(--chart-10))" },
  { month: 11, fill: "var(--color-november)" ,donutColor:"hsl(var(--chart-11))"},
  { month: 12, fill: "var(--color-december)",donutColor:"hsl(var(--chart-12))" },
];


export const chartConfig = {
 
  january: {
    label: "January",
    color: "hsl(var(--chart-1))",
  },
  february: {
    label: "February",
    color: "hsl(var(--chart-2))",
  },
  march: {
    label: "March",
    color: "hsl(var(--chart-3))",
  },
  april: {
    label: "April",
    color: "hsl(var(--chart-4))",
  },
  may: {
    label: "May",
    color: "hsl(var(--chart-5))",
  },
  june: {
    label: "June",
    color: "hsl(var(--chart-6))",
  },
  july: {
    label: "July",
    color: "hsl(var(--chart-7))",
  },
  august: {
    label: "August",
    color: "hsl(var(--chart-8))",
  },
  september: {
    label: "September",
    color: "hsl(var(--chart-9))",
  },
  october: {
    label: "October",
    color: "hsl(var(--chart-10))",
  },
  november: {
    label: "November",
    color: "hsl(var(--chart-11))",
  },
  december: {
    label: "December",
    color: "hsl(var(--chart-12))",
  },
} satisfies ChartConfig;

