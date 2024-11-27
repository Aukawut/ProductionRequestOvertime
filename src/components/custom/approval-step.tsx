import { User } from "lucide-react";
import React from "react";

interface StepApprovalProps {
  groupId: number;
}

const approver = [
  {
    name: "Akawut Kamesuwan",
    datetime: "2024-11-25 13:00",
    position: "Engineer 1",
    picture:
      "http://psth-hrservice/web/src/pages/images/upload/users/000124.jpg?t=1732611205",
    step: 1,
  },
  {
    name: "Surawan Janaty",
    datetime: "",
    position: "Engineer 2",
    picture:
      "http://psth-hrservice/web/src/pages/images/upload/users/000124.jpg?t=1732611205",
    step: 2,
  },
];

const StepApproval: React.FC<StepApprovalProps> = ({ groupId }) => {
  return (
    <div>
      <div className="my-1">
        <p>{groupId}</p>
      </div>
      <div className="flex items-center justify-start bg-white px-2">
        <div className="space-y-6 border-l-2 border-dashed">
          {approver?.map((item) => (
            <div className="relative w-full">
              <div className="absolute left-[2%] z-10 -ml-3.5 h-5 w-5 rounded-full bg-sky-600 border-2 border-[#DEE2E6]"></div>

              <div className="ml-6">
                <h3 className="font-bold text-sky-600">{item.name}</h3>
                <p className="font-normal text-gray-400 text-[12px]">
                  {item.position}
                </p>
                <div className="flex items-center gap-x-2">
                  <User size={12} />
                  <p className="font-normal text-gray-400 text-[12px]">
                    ผู้อนุมัติ คนที่ {item.step}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StepApproval;
