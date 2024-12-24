import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, Pencil, Trash2 } from "lucide-react";
import { Factory } from "../FactoryManagement";
import moment from "moment";
import { ConvertDateFormat } from "@/function/main";

import Swal from "sweetalert2";
import { toast } from "sonner";

export const columns = (
  FindOldPlan: (idPlan: number) => void,
  DeletePlan: (token: string, id: number) => Promise<any>,
  token: string,
  fetchData: (load: boolean) => Promise<void>
): ColumnDef<Factory>[] => [
  {
    accessorKey: "ID_FACTORY",
    header: () => {
      return "Action";
    },
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-x-2 w-full justify-center">
          <Button
            className="flex w-[20px] h-[30px] shadow-none bg-[#FEFBEA] hover:bg-[#FEFBEA]"
            onClick={() => FindOldPlan(Number(row.getValue("ID_PLAN")))}
          >
            <Pencil size={15} className="text-[#E4A60F]" />
          </Button>
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
                  const response = await DeletePlan(
                    token,
                    Number(row.getValue("ID_FACTORY"))
                  );
                  console.log(response);

                  if (response) {
                    if (!response.err) {
                      toast.success("ลบข้อมูลสำเร็จ !");
                      fetchData(false);
                    } else {
                      toast.error(response.msg);
                    }
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
    accessorKey: "ID_GROUP_DEPT",
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
    accessorKey: "NAME_GROUP",
    header: () => " Group Department",
    cell: ({ row }) => row.getValue("NAME_GROUP"),
  },
  {
    accessorKey: "CREATED_AT",
    header: () => "Created At",
    cell: ({ row }) =>
      ConvertDateFormat(moment(row.getValue("CREATED_AT")).toDate()),
  },
];
