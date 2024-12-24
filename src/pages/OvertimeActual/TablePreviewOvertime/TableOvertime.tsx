import { useEffect } from "react";
import { columnsOvertime } from "./columns-overtime";
import { useOTManagementSystemStore } from "../../../../store";
import { AllActual } from "../OvertimeActual";
import { DataTableOvertime } from "./data-overtime-table";

interface TableOvertimeProps {
  data: AllActual[];
  GetActualOvertimeByDateDuration: (token: string, start: string, end: string) => Promise<any>;
  start:string;
  end:string;
  setAllActual: React.Dispatch<React.SetStateAction<AllActual[]>>
}

const TableOvertime: React.FC<TableOvertimeProps> = ({
  data,
  GetActualOvertimeByDateDuration,
  start,
  end,
  setAllActual
}) => {
  const token = useOTManagementSystemStore((state) => state.token);

  useEffect(() => {
    
  }, [data]);
  return (
    <div>
      <div className="container mx-auto py-1">
        <DataTableOvertime columns={columnsOvertime(token,GetActualOvertimeByDateDuration,start,end,setAllActual)} data={data} />
      </div>
    </div>
  );
};

export default TableOvertime;
