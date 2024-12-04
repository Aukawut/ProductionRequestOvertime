import { useEffect, useState } from "react";
import { Payment, columns } from "./columns";
import { DataTable } from "./data-approve-table";

async function getData(): Promise<Payment[]> {
  return [
    { id: "728ed52f", amount: 100, status: "pending", email: "m@example.com" },
  { id: "83ad7f1e", amount: 120, status: "success", email: "j@example.com" },
  { id: "92bf6e3d", amount: 150, status: "pending", email: "k@example.com" },
  { id: "4c8fa124", amount: 200, status: "success", email: "a@example.com" },
  { id: "7e9b6c2d", amount: 80, status: "pending", email: "b@example.com" },
  { id: "5d2f9a38", amount: 300, status: "success", email: "c@example.com" },
  { id: "9f1d6a2e", amount: 90, status: "pending", email: "d@example.com" },
  { id: "6f2b5c1a", amount: 250, status: "success", email: "e@example.com" },
  { id: "8e3c7d5f", amount: 180, status: "pending", email: "f@example.com" },
  { id: "1a7d9e5c", amount: 220, status: "success", email: "g@example.com" },
  { id: "3c6e2f8d", amount: 170, status: "pending", email: "h@example.com" },
  { id: "7b4e8d9a", amount: 130, status: "success", email: "i@example.com" },
  { id: "2d5e9c3f", amount: 140, status: "pending", email: "l@example.com" },
  { id: "6a9e4c7d", amount: 230, status: "success", email: "n@example.com" },
  { id: "9b7e1d3c", amount: 110, status: "pending", email: "o@example.com" },
  { id: "8f3c2e6d", amount: 200, status: "success", email: "p@example.com" },
  { id: "5a4e7b9d", amount: 120, status: "pending", email: "q@example.com" },
  { id: "6f9e1c7a", amount: 260, status: "success", email: "r@example.com" },
  { id: "3d7b2f8a", amount: 190, status: "pending", email: "s@example.com" },
  { id: "4e9c1f6a", amount: 300, status: "success", email: "t@example.com" },
  ];
}
const TableApprove:React.FC =  () => {

  const [data,setData] = useState<Payment[]>([])

  const GetData = async () => {
    const response = await getData();
    console.log(response);
    
    setData(response)
  }
  useEffect(() => {
    GetData()

  },[])
  return (
    <div>

      <div className="container mx-auto py-1">
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
};

export default TableApprove;
