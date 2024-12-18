import { GetApproverByGroupId } from "@/function/main";
import { AlertCircle, User } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useOTManagementSystemStore } from "../../../store";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import LoadingCircle from "./loading-circle";

interface StepApprovalProps {
  groupId: number;
  factory: number;
  overtimeType: number;
}

interface Approver {
  CODE_APPROVER: string;
  NAME_APPROVER: string;
  ID_GROUP_DEPT: number;
  ROLE: string;
  UHR_Position: string;
  STEP: number;
}

const StepApproval: React.FC<StepApprovalProps> = ({
  groupId,
  factory,
  overtimeType,
}) => {
  const [approver, setApprover] = useState<Approver[]>([]);
  const token = useOTManagementSystemStore((state) => state.token);
  const [load, setLoad] = useState(false);

  const fetchData = async () => {
    setLoad(true);
    const approver = await GetApproverByGroupId(token, groupId, factory);
    if (overtimeType == 1) {
      setApprover(approver?.slice(-1));
    } else {
      setApprover(approver);
    }
    setLoad(false);
  };

  useEffect(() => {
    fetchData();
  }, [groupId, factory, overtimeType]);

  return (
    <div>
      {load ? (
        <div
          role="status"
          className="flex h-[200px] items-center justify-center"
        >
          <LoadingCircle />
        </div>
      ) : (
        <>
          {approver?.length > 0 ? (
            <div className="flex items-center justify-start bg-white px-2">
              <div className="space-y-6 border-l-2 border-dashed">
                {approver?.map((item,index) => (
                  <div className="relative w-full" key={index}>
                    <div className="absolute left-[2%] z-10 -ml-[0.8rem] h-4 w-4 rounded-full bg-sky-600 border-2 border-[#DEE2E6]"></div>

                    <div className="ml-6">
                      <h3 className="font-bold text-sky-600 text-[13px]">
                        {item.NAME_APPROVER}
                      </h3>
                      <p className="font-normal text-gray-400 text-[12px]">
                        {item.UHR_Position}
                      </p>
                      <div className="flex items-center gap-x-2">
                        <User size={12} />
                        <p className="font-normal text-gray-400 text-[12px]">
                          ผู้อนุมัติ คนที่ {item.STEP}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <Alert variant="destructive" className="w-full">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle className="text-[14px]">ขออภัย, </AlertTitle>
              <AlertDescription className="text-[13px]">
                ไม่พบข้อมูลผู้อนุมัติ
              </AlertDescription>
            </Alert>
          )}
        </>
      )}
    </div>
  );
};

export default StepApproval;
