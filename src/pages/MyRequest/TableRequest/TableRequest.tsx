import { useEffect } from "react";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { RequestNoByUser } from "../MyRequest";

interface TableRequest {
  requests: RequestNoByUser[];
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
  FetchDetailRequest: (
    token: string,
    requestNo: string,
    rev: number
  ) => Promise<void>;
  setRequestNo: React.Dispatch<React.SetStateAction<string>>;
  GetPlanByWorkcell: (
    token: string,
    idWorkcell: number,
    year: number,
    month: number
  ) => Promise<any>;
  setRev: React.Dispatch<React.SetStateAction<number>>;
  status: number;
  token: string;
}
const TableRequest: React.FC<TableRequest> = ({
  requests,
  setRev,
  setRequestNo,
  FetchDetailRequest,
  token,
}) => {
  useEffect(() => {}, [requests]);
  return (
    <div>
      <DataTable
        columns={columns(
          FetchDetailRequest,
          setRequestNo,
          setRev,
          token,
          requests
        )}
        data={requests}
      />
    </div>
  );
};

export default TableRequest;
