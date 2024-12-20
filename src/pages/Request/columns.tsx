import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowUpDown } from "lucide-react";

export type Users = {
  EMPLOYEE_CODE: string;
  FULLNAME: string;
  FACTORY_NAME: string;
  NAME_ROLE: string;
  NAME_GROUP: string;
  POSITION: string;
  CHECKED: boolean;
};

export const columns = (
  selectedRows: (checked: boolean, index: number) => void,
  handleCheckedAll: (checked: boolean) => void,
  usersData: Users[]
): ColumnDef<Users>[] => [
 
  {
    id: "No",
    header: ({ table }) => {
      const filterChecked = usersData?.filter((x) => x.CHECKED);
      return (
        <Checkbox
          checked={filterChecked?.length === usersData?.length}
          onCheckedChange={(value) => {
            table.toggleAllPageRowsSelected(!!value);

            handleCheckedAll(Boolean(value));
          }}
          className="border-red-50"
          aria-label="Select all"
        >
          {table.getRowCount()}
        </Checkbox>
      );
    },
    cell: ({ row }) => (
      <Checkbox
        // checked={row.getValue("CHECKED")}
        checked={usersData[row.index].CHECKED}
        onCheckedChange={(value) => {
          row.toggleSelected(!!value);
          // Callback ส่งค่ากลับไป Parent
          selectedRows(Boolean(value), row.index);
        }}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
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
          <ArrowUpDown className="ml-2 h-4 w-4 text-[#09447F]" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="text-center font-medium">
          {row.getValue("EMPLOYEE_CODE")}
        </div>
      );
    },
  },
  {
    accessorKey: "1",
    header: () => {
      return (
        <Button className="text-[13px]" type="button" variant="ghost">
          Picture
        </Button>
      );
    },
    cell: ({ row }) => {
      const imageUrl =
        import.meta.env.VITE_BASE_USERIMG_URL +
        "/" +
        row.getValue("EMPLOYEE_CODE")
      return (
        <div className="w-full object-cover overflow-hidden flex justify-center items-center">
          {imageUrl && row.getValue("EMPLOYEE_CODE") ? (
            <img
              src={imageUrl}
              alt="User"
              className="h-[4rem] w-auto"
              
            />
          ) : (
            <p className="text-white">Image not available</p>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "FULLNAME",
    header: ({ column }) => {
      return (
        <Button
          className="text-[13px]"
          type="button"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          ชื่อ - สกุล
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="text-end font-medium">{row.getValue("FULLNAME")}</div>
      );
    },
  },
  {
    accessorKey: "NAME_GROUP",
    header: ({ column }) => {
      return (
        <Button
          type="button"
          className="text-[13px]"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Group
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "POSITION",
    header: ({ column }) => {
      return (
        <Button
          type="button"
          className="text-[13px]"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Position
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "FACTORY_NAME",
    header: ({ column }) => {
      return (
        <Button
          type="button"
          className="text-[13px]"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Factory
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="text-end font-medium">
          {row.getValue("FACTORY_NAME")}
        </div>
      );
    },
  },
];
