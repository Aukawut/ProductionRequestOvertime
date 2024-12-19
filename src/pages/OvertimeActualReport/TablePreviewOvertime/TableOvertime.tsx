import { useEffect } from "react";
import { columnsOvertime } from "./columns-overtime";
import { useOTManagementSystemStore } from "../../../../store";
import { Actual } from "../OvertimeActualReport";
import { DataTableOvertime } from "./data-overtime-table";

interface TableOvertimeProps {
  data: Actual[];
}

const TableOvertime: React.FC<TableOvertimeProps> = ({
  data,
}) => {
  const token = useOTManagementSystemStore((state) => state.token);

  useEffect(() => {}, []);
  return (
    <div>
      <div className="container mx-auto py-1">
        <DataTableOvertime columns={columnsOvertime()} data={data} />
      </div>
    </div>
  );
};

export default TableOvertime;
