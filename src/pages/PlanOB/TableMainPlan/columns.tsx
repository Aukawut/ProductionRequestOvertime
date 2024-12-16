import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, Pencil, Trash2 } from "lucide-react";
import { PlanOB } from "../PlanOB";
import moment from "moment";
import { ConvertNumberToMonth } from "@/function/main";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Swal from "sweetalert2";
import { toast } from "sonner";

export const columns = (
  FindOldPlan: (idPlan: number) => void,
  DeletePlan : (token: string, id: number) => Promise<any>,
  token:string ,
  fetchData: (load:boolean) => Promise<void>
  
): ColumnDef<PlanOB>[] => [
  {
    accessorKey: "ID_OB_PLAN",
    header: () => {
      return "Action";
    },
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-x-2 w-full justify-center">
          <Button
            className="flex w-[20px] h-[30px] shadow-none bg-[#FEFBEA] hover:bg-[#FEFBEA]"
            onClick={() => FindOldPlan(Number(row.getValue("ID_OB_PLAN")))}
          >
            <Pencil size={15} className="text-[#E4A60F]" />
          </Button>
          <Button className="flex w-[20px] h-[30px] shadow-none bg-[#FBEAEE] hover:bg-[#efd7dd]" onClick={() => {
            Swal.fire({
              title: "คุณต้องการลบข้อมูลแผน ?",
              text: "ระบบจะไม่สามารถกู้ข้อมูลของท่านได้!",
              icon: "warning",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "ยืนยัน",
              cancelButtonText:"ยกเลิก"
            }).then(async (result) => {
              if (result.isConfirmed) {
                const response = await DeletePlan(token,Number(row.getValue("ID_OB_PLAN")))
                console.log(response);
                
                if(response) {
                  if(!response.err) {
                    toast.success("ลบข้อมูลสำเร็จ !")
                    fetchData(false)
                  }else{
                    toast.error(response.msg)
                  }
                }
              }
            });
          }}>
            <Trash2 size={15} className="text-[#c93246]" />
          </Button>
        </div>
      );
    },
  },

  {
    accessorKey: "ID_FACTORY",
    header: () => null,
    cell: () => null,
    enableHiding: true,
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
  },
  {
    accessorKey: "NAME_UGROUP",
    header: () => (
      <Button type="button" variant="ghost" className="text-[13px]">
        User Type
      </Button>
    ),
    cell: ({ row }) => row.getValue("NAME_UGROUP"),
  },
  {
    accessorKey: "MONTH",
    header: () => "Month",
    cell: ({ row }) => ConvertNumberToMonth(Number(row.getValue("MONTH"))),
  },
  { accessorKey: "YEAR", header: () => "Year" },
  {
    accessorKey: "HOURS",
    header: () => "Hours",

    cell: ({ row }) => {
      const formattedHours = new Intl.NumberFormat("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(Number(row.getValue("HOURS")));

      return formattedHours;
    },
  },
  {
    accessorKey: "CREATED_AT",
    header: () => "Created At",
    cell: ({ row }) => (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="w-[90px] ">
              <p className="truncate">
                {moment(row.getValue("CREATED_AT")).format("DD/MM/YYYY HH:mm")}
              </p>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p className="flex text-[12px]">
              {moment(row.getValue("CREATED_AT")).format("DD/MM/YYYY HH:mm")}
            </p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    ),
  },
  {
    accessorKey: "UPDATED_AT",
    header: () => "Updated At",
    cell: ({ row }) => (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="w-[90px] ">
              <p className="truncate">
                {row.getValue("UPDATED_AT") !== null
                  ? moment(row.getValue("UPDATED_AT"))
                      .utc()
                      .local()
                      .format("DD/MM/YYYY HH:mm")
                  : "-"}
              </p>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p className="flex text-[12px]">
              {row.getValue("UPDATED_AT") !== null
                ? moment(row.getValue("UPDATED_AT"))
                    .utc()
                    .local()
                    .format("DD/MM/YYYY HH:mm")
                : "-"}
            </p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    ),
  },
  {
    accessorKey: "FNAME",
    header: () => "Updated By",
    cell: ({ row }) => row.getValue("FNAME"),
  },
];
