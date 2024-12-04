import React from "react";
import TableApprove from "./TableApprove/TableApprove";

const Approve: React.FC = () => {
  return (
    <div className="p-2">
      <div className="px-4 rounded-[22px] bg-white shadow-smooth">
        <div className="flex flex-col justify-start p-2">
          <p className="text-[14px]">Approve Requests</p>
          <p className="text-[13px] text-gray-600">อนุมัติคำขอโอที</p>
        </div>

        <TableApprove />
      </div>
    </div>
  );
};

export default Approve;
