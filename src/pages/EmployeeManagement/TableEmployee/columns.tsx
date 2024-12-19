import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, Pencil, Trash2 } from "lucide-react";
import { Employee } from "../EmployeeManagement";
import moment from "moment";
import { ConvertDateFormat, DeleteEmployee } from "@/function/main";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Swal from "sweetalert2";
import { toast } from "sonner";

export const columns = (
  token: string,
  fetchData: (load: boolean) => Promise<void>,
  baseImageUrl: string,
  data: Employee[]
): ColumnDef<Employee>[] => [
  {
    accessorKey: "none",
    header: () => {
      return "Action";
    },
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-x-2 justify-center w-[100px]">
          <Button className="flex w-[20px] h-[30px] shadow-none bg-[#FEFBEA] hover:bg-[#FEFBEA]">
            <Pencil size={15} className="text-[#E4A60F]" />
          </Button>
          <Button
            className="flex w-[20px] h-[30px] shadow-none bg-[#FBEAEE] hover:bg-[#efd7dd]"
            onClick={() => {
              Swal.fire({
                title: "คุณต้องการลบข้อมูล ?",
                text: "ระบบจะไม่สามารถกู้ข้อมูลของท่านได้!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "ยืนยัน",
                cancelButtonText: "ยกเลิก",
              }).then(async (result) => {
                if (result.isConfirmed) {
                  const deleteUser = await DeleteEmployee(token,row.getValue("EMPLOYEE_CODE"));
                  fetchData(false)
                  
                  if(!deleteUser.err) {
                    toast.success(deleteUser?.msg);
                  }else{
                    toast.error(deleteUser?.msg);
                  }
                }
              });
            }}
          >
            <Trash2 size={15} className="text-[#c93246]" />
          </Button>
        </div>
      );
    },
  },
  {
    accessorKey: "EMPLOYEE_CODE",
    header: ({ column }) => (
      <Button
        type="button"
        variant="ghost"
        className="text-[13px]"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        รหัสพนักงาน
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => row.getValue("EMPLOYEE_CODE"),
  },
  {
    accessorKey: "FAC",
    header: () => "ชื่อ - สกุล",
    cell: ({ row }) =>
      `${data[row.index]?.PREFIX}${data[row.index]?.FNAME_TH} ${
        data[row.index]?.LNAME_TH
      }`,
  },
  {
    accessorKey: "EMPLOYEE_CODE",
    header: () => (
      <Button type="button" variant="ghost" className="text-[13px]">
        Picture
      </Button>
    ),
    cell: ({ row }) => (
      <div className="flex justify-center">
        <img
          src={`${baseImageUrl}/${row.getValue("EMPLOYEE_CODE")}`}
          className="w-[50px] h-auto"
        />
      </div>
    ),
  },

  {
    accessorKey: "FACTORY_NAME",
    header: ({ column }) => (
      <Button
        type="button"
        variant="ghost"
        className="text-[13px]"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Factory
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => row.getValue("FACTORY_NAME"),
  },
  {
    accessorKey: "NAME_UGROUP",
    header: () => "Factory",
    cell: ({ row }) => row.getValue("NAME_UGROUP"),
  },
  {
    accessorKey: "NAME_UTYPE",
    header: () => "Factory",
    cell: ({ row }) => row.getValue("NAME_UTYPE"),
  },
  {
    accessorKey: "CREATED_AT",
    header: () => "Created aat",
    cell: ({ row }) => (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <div className="flex w-[90px]">
              <p className="truncate">
                {ConvertDateFormat(moment(row.getValue("CREATED_AT")).toDate())}
              </p>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>{ConvertDateFormat(moment(row.getValue("CREATED_AT")).toDate())}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    ),
  },
];
