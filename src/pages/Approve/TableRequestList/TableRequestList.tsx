import { useEffect } from "react";
import { columns } from "./columns";
import { DataTable } from "./data-request-table";
import { RequestList } from "../Approve";
import { useOTManagementSystemStore } from "../../../../store";



interface TableRequestListProps {
  data: RequestList[]
  FetchDetailRequest: (token:string,requestNo:string,rev:number) => Promise<void>;
  setRequestNo: React.Dispatch<React.SetStateAction<string>>;
  GetPlanByWorkcell: (token: string, idWorkcell: number, year: number, month: number) => Promise<any>;
  setRev:React.Dispatch<React.SetStateAction<number>>;
}
const TableRequestList:React.FC<TableRequestListProps> =  ({data,FetchDetailRequest,setRequestNo,setRev}) => {
  const token = useOTManagementSystemStore((state) => state.token )

  useEffect(() => {
   
  },[])
  return (
    <div>

      <div className="container mx-auto py-1">
        <p className="text-[13px] text-gray-900">
          ตารางแสดงข้อมูลคำขอ ({data?.length} รายการ)
        </p>
        <DataTable columns={columns(FetchDetailRequest,setRequestNo,token,setRev)} data={data} />
      </div>
    </div>
  );
};

export default TableRequestList;
