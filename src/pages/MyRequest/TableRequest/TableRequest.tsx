import { useEffect, useState } from "react";
import { Payment, columns } from "./columns";
import { DataTable } from "./data-table";

async function getData(): Promise<Payment[]> {
  return [
    { status: "pending", requestNo: "RQ202412010001" },
    { status: "success", requestNo: "RQ202412010002" },
    { status: "pending", requestNo: "RQ202412010003" },
    { status: "success", requestNo: "RQ202412010004" },
    { status: "pending", requestNo: "RQ202412010004" },
    { status: "success", requestNo: "RQ202412010004"},
    { status: "pending", requestNo: "RQ202412010004" },
    { status: "success", requestNo: "RQ202412010004" },
    { status: "pending", requestNo: "RQ202412010004" },
    { status: "success", requestNo: "RQ202412010004" },
    { status: "pending", requestNo: "RQ202412010004" },
    { status: "success", requestNo: "RQ202412010004"},
    { status: "pending", requestNo: "RQ202412010004" },
    { status: "success", requestNo: "RQ202412010004" },
    { status: "pending", requestNo: "RQ202412010004"},
    { status: "success", requestNo: "RQ202412010004" },
    { status: "pending", requestNo: "RQ202412010004" },
    { status: "success", requestNo: "RQ202412010004" },
    { status: "pending", requestNo: "RQ202412010004"},
    { status: "success", requestNo: "RQ202412010004" },
  ];
}
const TableRequest: React.FC = () => {
  const [data, setData] = useState<Payment[]>([]);

  const GetData = async () => {
    const response = await getData();
    console.log(response);

    setData(response);
  };
  useEffect(() => {
    GetData();
  }, []);
  return (
    <div>
      <div className="container mx-auto py-1">
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
};

export default TableRequest;
