import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  CircleCheck,
  CircleX,
  Info,
  InfoIcon,
  LucideProps,
  MessageCircleMore,
  MessageSquareQuote,
  RotateCcw,
} from "lucide-react";
import TableRequestDetail from "./table-request-detail";
import { DataTable } from "./TableUsersRequest/data-table";
import { columns } from "./TableUsersRequest/columns";
import {
  CommentApprover,
  PlanWorkcell,
  SummaryRequestLastRev,
  UserDetail,
} from "./Approve";
import TimelineApprove from "./timeline-approve";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import moment from "moment";
import {
  ApproveRequest,
  CalActualyFac,
  CalActualyWorkcell,
  ConvertDateFormat,
  PayLoadApprove,
} from "@/function/main";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { useOTManagementSystemStore } from "../../../store";

interface ShowUsersSelected {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
  closeDialog: () => void;
  requestNo: string;
  requestDetail: SummaryRequestLastRev[];
  users: UserDetail[];
  commentApprover: CommentApprover[];
  planWorkcell: PlanWorkcell[];
  rev: number;
  showAction: boolean;
}

export interface TimelineDataApproval {
  date: string;
  icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
  lastUpdate: string;
  name: string;
  position: string;
  status: string;
  comment: string;
  empCode: string;
}

export interface Actual {
  SUM_HOURS: number;
}

export interface ActualWorkcell {
  SUM_HOURS: number;
  WORKCELL_ID: number;
}

const DialogDetailRequest: React.FC<ShowUsersSelected> = ({
  isOpen,
  setIsOpen,
  requestNo,
  requestDetail,
  users,
  commentApprover,
  planWorkcell,
  rev,
  showAction,
}) => {
  const inputRefRemark = useRef<HTMLTextAreaElement>(null);
  const token = useOTManagementSystemStore((state) => state.token);
  const info = useOTManagementSystemStore((state) => state.info);
  const [isSubmit, setIsSubmit] = useState(false);
  const [special,setSpecial] = useState("N")

  

  const comment: TimelineDataApproval[] = commentApprover?.map((item) => ({
    date:
      item.UPDATED_AT == null || item.UPDATED_AT == ""
        ? "-"
        : moment(item.UPDATED_AT).format("YYYY-MM-DD"),
    icon: MessageCircleMore,
    lastUpdate:
      item.UPDATED_AT == null || item.UPDATED_AT == ""
        ? "-"
        : ConvertDateFormat(moment(item.UPDATED_AT).toDate()),
    name: item.FULLNAME,
    position:
      item.DEPARTMENT && item.POSITION
        ? `${item.DEPARTMENT} - ${item.POSITION}`
        : "ไม่พบข้อมูล",
    status: item.NAME_STATUS,
    comment: item.REMARK == "" || item.REMARK == null ? "-" : item.REMARK,
    empCode: item.CODE_APPROVER,
  }));

  const [remark, setRemark] = useState("");
  const [actual, setActual] = useState<Actual[]>([]);
  const [actualWorkcell, setActualWorkcell] = useState<ActualWorkcell[]>([]);

  const ApproveRequestByRequest = async (
    status: number,
    requestNo: string,
    rev: number
  ) => {
    setIsSubmit(true);
    const payload: PayLoadApprove = {
      status: status,
      remark: remark,
      actionBy: info?.EmployeeCode,
      special:status == 3 ? special : "N"
    };
    // 1	Pending
    // 2	Reject
    // 3	Done
    // 4	Not Approve

    if (status !== 3 && remark == "") {
      toast.error("กรุณาระบุ หมายเหตุ!");
      setIsSubmit(false);
      setTimeout(() => {
        if (inputRefRemark?.current) {
          inputRefRemark.current?.focus();
        }
      }, 300);
      return;
    }

    const response = await ApproveRequest(token, requestNo, rev, payload);
    console.log(response);
    if (!response?.err && response?.status === "Ok") {
      toast.success(response.msg);
      setIsSubmit(false);
      setIsOpen(false);
    } else {
      toast.error(response.msg);
      setIsSubmit(false);
    }
  };

  const fetchData = async () => {
    if (requestDetail !== undefined) {
      await Promise.all([
        CalActualyFac(
          token,
          moment(requestDetail[0]?.START_DATE).year(),
          moment(requestDetail[0]?.START_DATE).month() + 1,
          requestDetail[0]?.ID_FACTORY
        ),
        CalActualyWorkcell(
          token,
          moment(requestDetail[0]?.START_DATE).year(),
          moment(requestDetail[0]?.START_DATE).month() + 1,
          requestNo,
          rev
        ),
      ]).then((res) => {
        if (res[0]?.length > 0) {
          setActual(res[0]);
        }
        if (res[1]?.length > 0) {
          setActualWorkcell(res[0]);
        }
      });
    }
  };
  useEffect(() => {
    console.log(requestDetail);

    fetchData();
  }, []);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="w-[90%] max-w-none h-[95vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-[14.5px] text-gray-700 font-medium">
            Request No : {requestNo} ( Revise : {requestDetail[0]?.REV} )
          </DialogTitle>
          {showAction ? (
            <DialogDescription className="text-[13px] flex items-center gap-x-2">
              <Info size={15} color={"red"} /> กรุณาตรวจสอบข้อมูลก่อนอนุมัติคำขอ
            </DialogDescription>
          ) : (
            ""
          )}
        </DialogHeader>
        <div className="h-[95vh] overflow-auto">
          {/* Action Button */}
          {showAction ? (
            <div className="my-2 flex gap-x-1">
              <Button
                className="bg-[#1ECD97] hover:bg-[#18a377] text-white"
                size="sm"
                type="button"
                disabled={isSubmit}
                onClick={async () => {
                  await ApproveRequestByRequest(3, requestNo, rev);
                }}
              >
                <CircleCheck size={13} /> Approve
              </Button>
              <Button
                variant="destructive"
                size={"sm"}
                disabled={isSubmit}
                onClick={async () => {
                  await ApproveRequestByRequest(4, requestNo, rev);
                }}
              >
                <CircleX size={13} /> Not Approve
              </Button>
              <Button
                className="bg-[#FFB639] text-white hover:bg-[#eea933]"
                size={"sm"}
                disabled={isSubmit}
                onClick={async () => {
                  await ApproveRequestByRequest(2, requestNo, rev);
                }}
              >
                <RotateCcw size={13} /> Reject
              </Button>
            </div>
          ) : (
            <></>
          )}

          <div className="grid grid-cols-12 gap-x-2 px-3 mt-2">
            <div className="col-span-12 lg:col-span-5">
              <div className="bg-white shadow-smooth rounded-[12px] p-2">
                <div className="flex items-center gap-x-2">
                  <InfoIcon size={16} className="text-gray-800"/>
                  <p className="text-[13px] my-[0.8rem]">รายละเอียดคำขอ</p>
                </div>

                <TableRequestDetail
                  requestDetail={requestDetail}
                  planWorkcell={planWorkcell}
                  actual={actual}
                  actualWorkcell={actualWorkcell}
                  setSpecial={setSpecial}
                />
              </div>
            </div>
            <div className="col-span-12 lg:col-span-7">
              <div className="p-2 bg-white rounded-[12px] shadow-smooth">
                <DataTable data={users} columns={columns} />
              </div>
            </div>
            {showAction ? (
              <div className="w-full col-span-12 lg:col-span-6 my-3">
                <p className="text-[13px] text-gray-900 font-medium mb-1">
                  ระบุหมายเหตุ (สำหรับผู้อนุมัติ):
                </p>
                <Textarea
                  className="w-full"
                 
                  placeholder="ระบุหมายเหตุ....."
                  rows={3}
                  
                  ref={inputRefRemark}
                  value={remark}
                  style={{fontSize:13}}
                  onChange={(e) => setRemark(e.target.value)}
                />
              </div>
            ) : (
              ""
            )}
          </div>

          {/* Timeline */}
          <div className="w-full mt-[1rem]">
            <div className="flex items-center gap-x-2">
            <MessageSquareQuote  size={16}/>
            <p className="text-gray-800 text-[13px] my-2 font-medium">
              Timeline การอนุมัติคำขอ
            </p>
            </div>
            <TimelineApprove data={comment} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default DialogDetailRequest;
