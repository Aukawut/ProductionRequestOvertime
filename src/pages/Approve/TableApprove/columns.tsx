import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";

import { ArrowUpDown, Info } from "lucide-react";
import { DetailApprove } from "../Approve";
import { Badge } from "@/components/ui/badge";
import { convertMinutesToHoursMinutes } from "@/function/main";

export const columns = (
  FetchDetailRequest: (
    token: string,
    requestNo: string,
    rev: number
  ) => Promise<void>,
  setRequestNo: React.Dispatch<React.SetStateAction<string>>,
  tokenStore: string
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
      <Badge className="text-[10px] bg-blue-300 shadow-none text-white hover:bg-blue-950">
        {row.getValue("FACTORY_NAME")}
      </Badge>
    ),
  },
  {
    accessorKey: "COUNT_USER",
    header: () => {
      return (
        <Button size={"sm"} variant="ghost">
          จำนวนพนักงาน (คน)
        </Button>
      );
    },
    cell: ({ row }) => row.getValue("COUNT_USER"),
  },
  {
    accessorKey: "HOURS_AMOUNT",
    header: () => {
      return "โอที";
    },
    cell: ({ row }) => row.getValue("HOURS_AMOUNT"),
  },
  {
    accessorKey: "SUM_MINUTE",
    header: () => {
      return (
        <Button size={"sm"} variant="ghost">
          เวลา / คน (ชั่วโมง)
        </Button>
      );
    },
    cell: ({ row }) => convertMinutesToHoursMinutes(row.getValue("SUM_MINUTE")),
  },
  {
    accessorKey: "MINUTE_TOTAL",
    header: () => {
      return (
        <Button size={"sm"} variant="ghost">
          ทั้งหมด (ชั่วโมง)
        </Button>
      );
    },
    cell: ({ row }) =>
      convertMinutesToHoursMinutes(row.getValue("MINUTE_TOTAL")),
  },
  {
    accessorKey: "REV",
    enableSorting: false,
    enableHiding: true,
    cell: () => null,
    header: () => null,
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
