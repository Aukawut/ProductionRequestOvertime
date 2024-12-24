
import { columnsOvertimeWorkCell } from "./columns-overtime-workcell";
import { ActualByWorkcell } from "../OvertimeActualReport";
import { DataTableOvertime } from "./data-overtime-table";
import ButtonExcelExport from "@/components/custom/ButtonExcelExport/ButtonExcelExport";

interface TableOvertimeWorkcellProps {
  data: ActualByWorkcell[];
}

const TableOvertimeWorkcell: React.FC<TableOvertimeWorkcellProps> = ({
  data,
}) => {
 
  return (
    <div>
      <ButtonExcelExport data={data} fileName="Overtime Actual SumByWorkcell"/>
      <div className="container mx-auto py-1">
        <DataTableOvertime columns={columnsOvertimeWorkCell()} data={data} />
      </div>
    </div>
  );
};

export default TableOvertimeWorkcell;
