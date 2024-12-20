import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";

import { ArrowUpDown } from "lucide-react";
import { CsvData } from "../OvertimeActualReport";

export const columns = (): ColumnDef<CsvData>[] => [
  {
    accessorKey: "no",
    header: "No.",
    cell: ({ row }) => row.index + 1,
  },
  {
    accessorKey: "employeeCode",
    header: ({ column }) => {
      return (
        <Button
          size={"sm"}
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          รหัสพนักงาน
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => row.getValue("employeeCode"),
  },
  {
    accessorKey: "date",
    header: ({ column }) => {
      return (
        <Button
          size={"sm"}
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          วันที่
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => row.getValue("date"),
  },
  {
    accessorKey: "start",
    header: () => {
      return "Scan - IN"
    },
    cell: ({ row }) => row.getValue("start"),
  },
  {
    accessorKey: "end",
    header: () => {
      return "Scan - OUT"
    },
    cell: ({ row }) => row.getValue("end"),
  },
  {
    accessorKey: "shift",
    header: () => {
      return ("กะการทำงาน");
    },
    cell: ({ row }) => row.getValue("shift"),
  },
  {
    accessorKey: "overtime1",
    header: () => {
      return  "OT1";
    },
    cell: ({ row }) => row.getValue("overtime1"),
  },
  {
    accessorKey: "overtime15",
    header: () => {
      return  "OT1.5";
    },
    cell: ({ row }) => row.getValue("overtime15"),
  },
  {
    accessorKey: "overtime2",
    header: () => {
      return  "OT2";
    },
    cell: ({ row }) => row.getValue("overtime2"),
  },
  {
    accessorKey: "overtime3",
    header: () => {
      return  "OT3";
    },
    cell: ({ row }) => row.getValue("overtime3"),
  },
  {
    accessorKey: "total",
    header: () => {
      return  "Total";
    },
    cell: ({ row }) => row.getValue("total"),
  },
];
