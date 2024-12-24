
import { columnsOvertime } from "./columns-overtime";
import { Actual } from "../OvertimeActualReport";
import { DataTableOvertime } from "./data-overtime-table";
import ButtonExcelExport from "@/components/custom/ButtonExcelExport/ButtonExcelExport";

interface TableOvertimeProps {
  data: Actual[];
}

const TableOvertime: React.FC<TableOvertimeProps> = ({
  data,
}) => {
 
  return (
    <div>
      <ButtonExcelExport data={data} fileName="Overtime Actual"/>
      <div className="container mx-auto py-1">
        <DataTableOvertime columns={columnsOvertime()} data={data} />
      </div>
    </div>
  );
};

export default TableOvertime;
