import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";

import { ArrowUpDown } from "lucide-react";
import { Actual } from "../OvertimeActualReport";
import moment from "moment";

export const columnsOvertime = (): ColumnDef<Actual>[] => [
  {
    accessorKey: "no",
    header: "No.",
    cell: ({ row }) => row.index + 1,
  },

  {
    accessorKey: "EMPLOYEE_CODE",
    header: ({ column }) => {
      return (
        <Button
          size={"sm"}
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Employee ID
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => row.getValue("EMPLOYEE_CODE"),
  },

  {
    accessorKey: "OT_DATE",
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
    cell: ({ row }) => moment(row.getValue("OT_DATE")).format("YYYY-MM-DD"),
  },
  {
    accessorKey: "NAME_WORKGRP",
    header: ({ column }) => {
      return (
        <Button
          size={"sm"}
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Workgroup
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => row.getValue("NAME_WORKGRP"),
  },
  {
    accessorKey: "NAME_WORKCELL",
    header: ({ column }) => {
      return (
        <Button
          size={"sm"}
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Workcell
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => row.getValue("NAME_WORKCELL"),
  },
 
  {
    accessorKey: "HOURS",
    header: ({ column }) => {
      return (
        <Button
          size={"sm"}
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Hrs.
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => row.getValue("HOURS"),
  },
  
  
  {
    accessorKey: "HOURS_AMOUNT",
    header: ({ column }) => {
      return (
        <Button
          size={"sm"}
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          OT Type
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => row.getValue("HOURS_AMOUNT"),
  },
  
];
