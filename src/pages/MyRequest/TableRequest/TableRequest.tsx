import { useEffect } from "react";
import {columns } from "./columns";
import { DataTable } from "./data-table";
import { RequestNoByUser } from "../MyRequest";

interface TableRequest {
  users: RequestNoByUser[]
}
const TableRequest: React.FC<TableRequest> = ({users}) => {
  


  useEffect(() => {
  
  }, [users]);
  return (
    <div>
      <div className="container mx-auto py-1">
        <DataTable columns={columns} data={users} />
      </div>
    </div>
  );
};

export default TableRequest;
