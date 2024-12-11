import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, Pencil, Trash2 } from "lucide-react";
import { MainPlan } from "../MainPlan";
import moment from "moment";
import { ConvertNumberToMonth } from "@/function/main";




export const columns = (FindOldPlan: (idPlan: number) => void): ColumnDef<MainPlan>[] => [
  {
    accessorKey: "ID_PLAN",
    header: () => {
      return "Action";
    },
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-x-2 w-full justify-center">
          <Button className="flex w-[20px] h-[30px] shadow-none bg-[#FEFBEA] hover:bg-[#FEFBEA]" onClick={() => FindOldPlan(Number(row.getValue("ID_PLAN")))}>
            <Pencil size={15} className="text-[#E4A60F]" />
          </Button>
          <Button className="flex w-[20px] h-[30px] shadow-none bg-[#FBEAEE] hover:bg-[#efd7dd]">
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
  { accessorKey: "MONTH", header: () => "Month",cell:({row}) => ConvertNumberToMonth(Number(row.getValue("MONTH")))},
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
    cell: ({ row }) =>
      moment(row.getValue("CREATED_AT")).format("DD/MM/YYYY HH:mm"),
  },
  {
    accessorKey: "UPDATED_AT",
    header: () => "Updated At",
    cell: ({ row }) =>
      row.getValue("UPDATED_AT") !== null
        ? moment(row.getValue("UPDATED_AT"))
            .utc()
            .local()
            .format("DD/MM/YYYY HH:mm")
        : "-",
  },
  {
    accessorKey: "FNAME",
    header: () => "Updated At",
    cell: ({ row }) => row.getValue("FNAME"),
  },
];
