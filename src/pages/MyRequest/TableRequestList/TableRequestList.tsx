import { useEffect } from "react";
import { columns } from "./columns";
import { DataTable } from "./data-request-table";
import { RequestList } from "../MyRequest";
import { useOTManagementSystemStore } from "../../../../store";



interface TableRequestListProps {
  data: RequestList[]
  FetchDetailRequest: (token:string,requestNo:string,rev:number) => Promise<void>;
  setRequestNo: React.Dispatch<React.SetStateAction<string>>;
  GetPlanByWorkcell: (token: string, idWorkcell: number, year: number, month: number) => Promise<any>;
  setRev:React.Dispatch<React.SetStateAction<number>>;
  showAction:boolean;
  setShowAction: React.Dispatch<React.SetStateAction<boolean>>;
  status:number ;
}
const TableRequestList:React.FC<TableRequestListProps> =  ({data,FetchDetailRequest,setRequestNo,setRev,showAction,setShowAction,status}) => {
  const token = useOTManagementSystemStore((state) => state.token )

  useEffect(() => {
   
  },[])
  return (
    <div>

      <div className="container mx-auto py-1">
        <p className="text-[13px] text-gray-900">
          ตารางแสดงข้อมูลคำขอ ({data?.length} รายการ)
        </p>
        <DataTable columns={columns(FetchDetailRequest,setRequestNo,token,setRev,showAction,setShowAction,status)} data={data} />
      </div>
    </div>
  );
};

export default TableRequestList;
