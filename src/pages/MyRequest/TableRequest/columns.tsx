import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";

import { RequestNoByUser } from "../MyRequest";
import React from "react";

export const columns = (
  FetchDetailRequest: (
    token: string,
    requestNo: string,
    rev: number
  ) => Promise<void>,
  setRequestNo: React.Dispatch<React.SetStateAction<string>>,
  setRev: React.Dispatch<React.SetStateAction<number>>,
  token: string
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
    header: ({ column }) => {
      return (
        <Button
          size={"sm"}
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Rev. (Lasted)
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <p className="text-[12px]">{row.getValue("REV")}</p>;
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
            }`}
          >
            {row.getValue("NAME_STATUS")}
          </Badge>
        </div>
      );
    },
  },
];
