import { useEffect } from "react";
import { columns } from "./columns";
import { DataTable } from "./data-approve-table";
import { DetailApprove } from "../Approve";
import { useOTManagementSystemStore } from "../../../../store";



interface TablePendingApproveProps {
  data:DetailApprove[];
  FetchDetailRequest: (token:string,requestNo:string,rev:number) => Promise<void>;
  setRequestNo: React.Dispatch<React.SetStateAction<string>>;
}
const TableApprove:React.FC<TablePendingApproveProps> =  ({data,FetchDetailRequest,setRequestNo}) => {
  const token = useOTManagementSystemStore((state) => state.token )

  useEffect(() => {
   
  },[])
  return (
    <div>

      <div className="container mx-auto py-1">
        <DataTable columns={columns(FetchDetailRequest,setRequestNo,token)} data={data} />
      </div>
    </div>
  );
};

export default TableApprove;
