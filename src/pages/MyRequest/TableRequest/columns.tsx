import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowUpDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export type Payment = {
  status: "pending" | "processing" | "success" | "failed";
  requestNo: string;
};

export const columns: ColumnDef<Payment>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },

  {
    accessorKey: "requestNo",
    header: ({ column }) => {
      return (
        <Button
          size={"sm"}
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Request No
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <p className="text-[12px]">{row.getValue("requestNo")}</p>;
    },
  },

  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      return (
        <div className="text-center">
          <Badge
            variant={"secondary"}
            className={`${
              row.getValue("status") == "pending"
                ? "bg-[#E9F5FF] text-[#42A5FF]"
                : row.getValue("status") == "success"
                ? "bg-[#C1EFDF] text-[#005A2B]"
                : ""
            }`}
          >
            {row.getValue("status")}
          </Badge>
        </div>
      );
    },
  },
];
