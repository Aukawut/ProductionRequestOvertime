import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, Pencil, Trash2 } from "lucide-react";
import { Approvers } from "../ApproverManagement";
import Swal from "sweetalert2";

export const columns = (
  token:string ,
  fetchData: (load:boolean) => Promise<void>,
  baseImageUrl:string ,
  
  
): ColumnDef<Approvers>[] => [
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
    accessorKey: "CODE_APPROVER",
    header: () => (
      <Button
        type="button"
        variant="ghost"
        className="text-[13px]"
      
      >
        Picture
   
      </Button>
    ),
    cell:({row}) => <div className="flex justify-center"><img src={`${baseImageUrl}/${row.getValue("CODE_APPROVER")}`} className="w-[50px] h-auto"/></div>
  },

 
  {
    accessorKey: "NAME_APPROVER",
    header: ({ column }) => (
      <Button
        type="button"
        variant="ghost"
        className="text-[13px]"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Name
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "UHR_Position",
    header: () => (
      <Button type="button" variant="ghost" className="text-[13px]">
        Position
      </Button>
    ),
    cell: ({ row }) => row.getValue("UHR_Position"),
  },
  {
    accessorKey: "MAIL",
    header: () => (
      <Button type="button" variant="ghost" className="text-[13px]">
        E-Mail
      </Button>
    ),
    cell: ({ row }) => row.getValue("MAIL"),
  },
  
  {
    accessorKey: "STEP",
    header: () => "ลำดับการอนุมัติ",
    cell: ({ row }) => row.getValue("STEP"),
  },
];
