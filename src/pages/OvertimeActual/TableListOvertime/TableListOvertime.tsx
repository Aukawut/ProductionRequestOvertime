import { useEffect } from "react";
import { columns } from "./columns";
import { DataTable } from "./data-actual-table";
import { CsvData } from "../OvertimeActual";

interface TablePreviewOvertimeProps {
  data: CsvData[];
}

const TablePreviewOvertime: React.FC<TablePreviewOvertimeProps> = ({
  data,
}) => {

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
