import { File, LucideProps } from "lucide-react";

export interface CardRequestProps {
  title: string;
  amount: number;
  sumAll: number;
  Icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
  bgColor: string;
  textColor: string;
}

export const cardMenu: CardRequestProps[] = [
  {
    title: "Request",
    amount: 20,
    sumAll: 100,
    Icon: File,
    bgColor: "#E9F5FF",
    textColor: "#2697FF",
  },
  {
    title: "Pending",
    amount: 1,
    sumAll: 100,
    Icon: File,
    bgColor: "#FFF6E7",
    textColor: "#FF9E0E",
  },
  {
    title: "Reject",
    amount: 4,
    sumAll: 100,
    Icon: File,
    bgColor: "#FED0D0",
    textColor: "#A30014",
  },
  {
    title: "Success",
    amount: 20,
    sumAll: 100,
    Icon: File,
    bgColor: "#C1EFDF",
    textColor: "#005A2B",
  },
];
