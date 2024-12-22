import { useEffect } from "react";
import { columns } from "./columns";
import { DataTable } from "./data-approve-table";
import { DetailApprove } from "../Approve";
import { useOTManagementSystemStore } from "../../../../store";



interface TablePendingApproveProps {
  data:DetailApprove[];
  FetchDetailRequest: (token:string,requestNo:string,rev:number) => Promise<void>;
  setRequestNo: React.Dispatch<React.SetStateAction<string>>;
  GetPlanByWorkcell: (token: string, idWorkcell: number, year: number, month: number) => Promise<any>;
  setRev:React.Dispatch<React.SetStateAction<number>>;
}
const TableApprove:React.FC<TablePendingApproveProps> =  ({data,FetchDetailRequest,setRequestNo,setRev}) => {
  const token = useOTManagementSystemStore((state) => state.token )

  useEffect(() => {
   
  },[])
  return (
    <div>

      <div className="container mx-auto py-1">
        <DataTable columns={columns(FetchDetailRequest,setRequestNo,token,setRev)} data={data} />
      </div>
    </div>
  );
};

export default TableApprove;
