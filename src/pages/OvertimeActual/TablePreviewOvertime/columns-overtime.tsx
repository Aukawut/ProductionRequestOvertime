import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";

import { ArrowUpDown, Pencil, Trash2 } from "lucide-react";
import { AllActual } from "../OvertimeActual";
import { ConvertDateFormat } from "@/function/main";
import moment from "moment";
import { toast } from "sonner";
import Swal from "sweetalert2";

export const columnsOvertime = (): ColumnDef<AllActual>[] => [
  {
    accessorKey: "no",
    header: "No.",
    cell: ({ row }) => row.index + 1,
  },
  {
    accessorKey: "Id",
    header: () => {
      return (
        <Button size={"sm"} variant="ghost">
          Action
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="flex items-center gap-x-2 w-full justify-center">
        
        <Button
          className="flex w-[20px] h-[30px] shadow-none bg-[#FBEAEE] hover:bg-[#efd7dd]"
          onClick={() => {
            Swal.fire({
              title: "คุณต้องการลบข้อมูลแผน ?",
              text: "ระบบจะไม่สามารถกู้ข้อมูลของท่านได้!",
              icon: "warning",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "ยืนยัน",
              cancelButtonText: "ยกเลิก",
            }).then(async (result) => {
              if (result.isConfirmed) {
              }
            });
          }}
        >
          <Trash2 size={15} className="text-[#c93246]" />
        </Button>
      </div>
    ),
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
    header: () => {
      return "OT Date";
    },
    cell: ({ row }) => (
      <div className="flex justify-center items-center w-[100px]">
        {moment(row.getValue("OT_DATE")).format("YYYY-MM-DD")}
      </div>
    ),
  },
  {
    accessorKey: "SCAN_IN",
    header: () => {
      return "Scan - IN";
    },
    cell: ({ row }) => (
      <div className="flex justify-center items-center w-[120px]">
        {ConvertDateFormat(moment(row.getValue("SCAN_IN")).toDate())}
      </div>
    ),
  },
  {
    accessorKey: "SCAN_OUT",
    header: () => {
      return "Scan - OUT";
    },
    cell: ({ row }) => (
      <div className="flex justify-center items-center w-[120px]">
        {ConvertDateFormat(moment(row.getValue("SCAN_OUT")).toDate())}
      </div>
    ),
  },
  {
    accessorKey: "SHIFT",
    header: () => {
      return "กะการทำงาน";
    },
    cell: ({ row }) => (
      <div className="flex justify-center items-center w-[80px]">
        {row.getValue("SHIFT")}
      </div>
    ),
  },
  {
    accessorKey: "OT1_HOURS",
    header: () => {
      return "OT1";
    },
    cell: ({ row }) => row.getValue("OT1_HOURS"),
  },
  {
    accessorKey: "OT15_HOURS",
    header: () => {
      return "OT1.5";
    },
    cell: ({ row }) => row.getValue("OT15_HOURS"),
  },
  {
    accessorKey: "OT2_HOURS",
    header: () => {
      return "OT2";
    },
    cell: ({ row }) => row.getValue("OT2_HOURS"),
  },
  {
    accessorKey: "OT3_HOURS",
    header: () => {
      return "OT3";
    },
    cell: ({ row }) => row.getValue("OT3_HOURS"),
  },
  {
    accessorKey: "TOTAL_HOURS",
    header: () => {
      return "Total";
    },
    cell: ({ row }) => row.getValue("TOTAL_HOURS"),
  },
  {
    accessorKey: "CREATED_BY",
    header: () => {
      return "Created By";
    },
    cell: ({ row }) => (
      <div className="flex justify-center items-center w-[80px]">
        {row.getValue("CREATED_BY")}
      </div>
    ),
  },
  {
    accessorKey: "FACTORY_NAME",
    header: () => {
      return "Factory";
    },
    cell: ({ row }) => row.getValue("FACTORY_NAME"),
  },
  {
    accessorKey: "NAME_UGROUP",
    header: () => {
      return "UGroup";
    },
    cell: ({ row }) => row.getValue("NAME_UGROUP"),
  },
  {
    accessorKey: "NAME_UTYPE",
    header: () => {
      return "UType";
    },
    cell: ({ row }) => row.getValue("NAME_UTYPE"),
  },
];
