import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";

import { ArrowUpDown } from "lucide-react";
import { Actual } from "../OvertimeActualReport";
import { ConvertDateFormat } from "@/function/main";
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
    accessorKey: "SCAN_IN",
    header: ({ column }) => {
      return (
        <Button
          size={"sm"}
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Scan IN
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="w-[120px]">
        {ConvertDateFormat(moment(row.getValue("SCAN_IN")).toDate())}
      </div>
    ),
  },
  {
    accessorKey: "SCAN_OUT",
    header: ({ column }) => {
      return (
        <Button
          size={"sm"}
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Scan OUT
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) =>
      ConvertDateFormat(moment(row.getValue("SCAN_OUT")).toDate()),
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
    cell: ({ row }) => row.getValue("FACTORY_NAME"),
  },
  {
    accessorKey: "NAME_UGROUP",
    header: ({ column }) => {
      return (
        <Button
          size={"sm"}
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Ugroup
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => row.getValue("NAME_UGROUP"),
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
  {
    accessorKey: "NAME_UTYPE",
    header: ({ column }) => {
      return (
        <Button
          size={"sm"}
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          UType
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => row.getValue("NAME_UTYPE"),
  },
];
