import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";

import { ArrowUpDown, Info } from "lucide-react";
import { DetailApprove } from "../Approve";
import { convertMinutesToHoursMinutes } from "@/function/main";
import BadgeStyle from "@/components/custom/BadgeStyle/BadgeStyle";

export const columns = (
  FetchDetailRequest: (
    token: string,
    requestNo: string,
    rev: number
  ) => Promise<void>,
  setRequestNo: React.Dispatch<React.SetStateAction<string>>,
  tokenStore: string,
  setRev:React.Dispatch<React.SetStateAction<number>>,
  showAction:boolean,
  setShowAction: React.Dispatch<React.SetStateAction<boolean>>
): ColumnDef<DetailApprove>[] => [
  {
    accessorKey: "no",
    header: "No.",
    cell: ({ row }) => row.index + 1,
  },
  {
    accessorKey: "REQUEST_NO",
    header: ({ column }) => {
      return (
        <Button
          size={"sm"}
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Request No.
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => row.getValue("REQUEST_NO"),
  },
  {
    accessorKey: "FACTORY_NAME",
    header: ({ column }) => {
      return (
        <Button
          size={"sm"}
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Factory
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="w-[100%] flex justify-center">
        <BadgeStyle
          text={row.getValue("FACTORY_NAME")}
          variant="success"
          width={60}
          height={24}
        />
      </div>
    ),
  },
  {
    accessorKey: "COUNT_USER",
    header: () => {
      return (
        "จำนวนพนักงาน (คน)"
      );
    },
    cell: ({ row }) => row.getValue("COUNT_USER"),
  },
  {
    accessorKey: "HOURS_AMOUNT",
    header: () => {
      return "โอที";
    },
    cell: ({ row }) => "OT"+row.getValue("HOURS_AMOUNT"),
  },
  {
    accessorKey: "SUM_MINUTE",
    header: () => {
      return (
        
         " เวลา / คน (ชั่วโมง)"
      
      );
    },
    cell: ({ row }) => Number(convertMinutesToHoursMinutes(row.getValue("SUM_MINUTE"))) / Number(row.getValue("COUNT_USER")),
  },
  {
    accessorKey: "MINUTE_TOTAL",
    header: () => {
      return ("OT (Hrs.)");
    },
    cell: ({ row }) =>
      (Number(convertMinutesToHoursMinutes(row.getValue("SUM_MINUTE"))) / Number(row.getValue("COUNT_USER"))) * Number(row.getValue("COUNT_USER")),
  },
  {
    accessorKey: "REV",

    cell: ({row}) => row.getValue("REV"),
    header: () => "Revise",
  },
  {
    accessorKey: "No",
    header: () => {
      return "Action";
    },
    cell: ({ row }) => (
      <div className="flex gap-x-2 items-center">
        <Button
          size={"sm"}
          className="bg-[#F1F4FF] shadow-smooth text-[#452AAF] hover:bg-[#bca7d3]"
          onClick={() => {
            setRequestNo(row.getValue("REQUEST_NO"));
            setRev(Number(row.getValue("REV")));
            setShowAction(true) // State Show Button
            console.log(showAction);
            
            FetchDetailRequest(
              tokenStore,
              row.getValue("REQUEST_NO"),
              Number(row.getValue("REV"))
            );
          }}
        >
          <Info /> ดูรายละเอียด
        </Button>
      </div>
    ),
  },
];
