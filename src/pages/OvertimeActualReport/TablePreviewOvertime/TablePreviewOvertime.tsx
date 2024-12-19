import { useEffect } from "react";
import { columns } from "./columns";
import { DataTable } from "./data-preview-table";
import { useOTManagementSystemStore } from "../../../../store";
import { CsvData } from "../OvertimeActualReport";

interface TablePreviewOvertimeProps {
  data: CsvData[];
}
const TablePreviewOvertime: React.FC<TablePreviewOvertimeProps> = ({
  data,
}) => {
  const token = useOTManagementSystemStore((state) => state.token);

  useEffect(() => {}, []);
  return (
    <div>
      <div className="container mx-auto py-1">
        <DataTable columns={columns()} data={data} />
      </div>
    </div>
  );
};

export default TablePreviewOvertime;
