import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { UserDetail } from "../Approve";

export const columns: ColumnDef<UserDetail>[] = [
  {
    accessorKey: "EMPLOYEE_CODE",
    header: ({ column }) => {
      return (
        <Button
          type="button"
          variant="ghost"
          className="text-[13px]"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          รหัสพนักงาน
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return row.getValue("EMPLOYEE_CODE");
    },
  },
  {
    accessorKey: "1",
    header: () => {
      return "Picture";
    },
    cell: ({ row }) => {
      const imageUrl =
        import.meta.env.VITE_BASE_USERIMG_URL +
        "/" +
        row.getValue("EMPLOYEE_CODE");
      return imageUrl && row.getValue("EMPLOYEE_CODE") ? (
        <div className="w-ful flex justify-center">
          <img src={imageUrl} alt="User" className="h-[4rem] w-auto" />
        </div>
      ) : (
        <p className="text-white">Image not available</p>
      );
    },
  },
  {
    accessorKey: "FULLNAME",
    header: () => {
      return " ชื่อ - สกุล";
    },
    cell: ({ row }) => {
      return row.getValue("FULLNAME");
    },
  },

  {
    accessorKey: "POSITION",
    header: () => {
      return "Position";
    },
  },
];
