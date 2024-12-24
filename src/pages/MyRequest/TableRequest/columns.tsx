import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";

import { RequestNoByUser } from "../MyRequest";
import React from "react";
import moment from "moment";
import { ConvertTimeFormat } from "@/function/main";

export const columns = (
  FetchDetailRequest: (
    token: string,
    requestNo: string,
    rev: number
  ) => Promise<void>,
  setRequestNo: React.Dispatch<React.SetStateAction<string>>,
  setRev: React.Dispatch<React.SetStateAction<number>>,
  token: string,
  requests: RequestNoByUser[]
): ColumnDef<RequestNoByUser>[] => [
  {
    accessorKey: "none",
    header: () => <p className="text-[13px]">Action</p>,
    cell: ({ row }) => (
      <Button
        size={"icon"}
        className="bg-[#E9F5FF] text-[#2697FF] hover:bg-[#D5E0E9] w-6 h-6"
        onClick={async () => {
          setRev(row.getValue("REV"));
          setRequestNo(row.getValue("REQUEST_NO"));
          await FetchDetailRequest(
            token,
            row.getValue("REQUEST_NO"),
            row.getValue("REV")
          );
        }}
      >
        <Eye size={13}></Eye>
      </Button>
    ),
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
          Request No
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <p className="text-[12px]">{row.getValue("REQUEST_NO")}</p>;
    },
  },
  {
    accessorKey: "REV",
    header: () => "Rev.",
    cell: ({ row }) => {
      return <p className="text-[12px]">{row.getValue("REV")}</p>;
    },
  },
  {
    accessorKey: "START_DATE",
    header: () => {
      return (
        <Button size={"sm"} variant="ghost">
          วันที่
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="w-[80px]">
          <p className="text-[12px]">
            {moment(row.getValue("START_DATE")).format("YYYY-MM-DD")}
          </p>
        </div>
      );
    },
  },
  {
    accessorKey: "None",
    header: () => {
      return "เวลา";
    },
    cell: ({ row }) => {
      return (
        <div className="w-[100px]">
          <p className="text-[12px]">
            {ConvertTimeFormat(
              moment(requests[row.index]?.START_DATE).toDate()
            )}{" "}
            -{" "}
            {ConvertTimeFormat(moment(requests[row.index]?.END_DATE).toDate())}
          </p>
        </div>
      );
    },
  },

  {
    accessorKey: "NAME_STATUS",
    header: "Status",
    cell: ({ row }) => {
      return (
        <div className="text-center">
          <Badge
            variant={"secondary"}
            className={`${
              row.getValue("NAME_STATUS") == "Pending"
                ? "bg-[#E9F5FF] text-[#42A5FF]"
                : row.getValue("NAME_STATUS") == "Approved"
                ? "bg-[#C1EFDF] text-[#005A2B]"
                : row.getValue("NAME_STATUS") == "Cancel" ||
                  row.getValue("NAME_STATUS") == "Not Approve"
                ? "bg-[#FED0D0] text-[#A30014]"
                : ""
            } text-[11px]`}
          >
            {row.getValue("NAME_STATUS")}
          </Badge>
        </div>
      );
    },
  },
  {
    accessorKey: "FACTORY_NAME",
    header: () => {
      return "Factory";
    },
    cell: ({ row }) => {
      return <p className="text-[12px]">{row.getValue("FACTORY_NAME")}</p>;
    },
  },
  {
    accessorKey: "NAME_WORKCELL",
    header: () => {
      return "Workcell";
    },
    cell: ({ row }) => {
      return <p className="text-[12px]">{row.getValue("NAME_WORKCELL")}</p>;
    },
  },
];
