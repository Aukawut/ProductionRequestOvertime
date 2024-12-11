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
  LucideProps,
  RotateCcw,
  WorkflowIcon,
} from "lucide-react";
import TableRequestDetail from "./table-request-detail";
import { DataTable } from "./TableUsersRequest/data-table";
import { columns } from "./TableUsersRequest/columns";
import { SummaryRequestLastRev, UserDetail } from "./Approve";
import TimelineApprove from "./timeline-approve";
import { Button } from "@/components/ui/button";

interface ShowUsersSelected {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
  closeDialog: () => void;
  requestNo: string;
  requestDetail: SummaryRequestLastRev[];
  users: UserDetail[];
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
  empCode:string;
}

const commentApprover: TimelineDataApproval[] = [
  {
    date: "2024-12-10",
    icon: WorkflowIcon,
    lastUpdate: "2024-12-10 13:00",
    name: "Akawut Kamesuwan",
    position: "Information Technology - Engineer 1",
    status: "Reject",
    comment: "loremmmmmmmmmmmmmmmmmmmmmmmmmmmmmm",
    empCode:"P240062"
  },
  {
    date: "2024-12-10",
    icon: WorkflowIcon,
    lastUpdate: "2024-12-10 13:00",
    name: "Akawut Kamesuwan",
    position: "Information Technology - Engineer 1",
    status: "Reject",
    comment: "loremmmmmmmmmmmmmmmmmmmmmmmmmmmmmm",
    empCode:"P240062"
  },
  {
    date: "2024-12-10",
    icon: WorkflowIcon,
    lastUpdate: "2024-12-10 13:00",
    name: "Akawut Kamesuwan",
    position: "Information Technology - Engineer 1",
    status: "Reject",
    comment: "loremmmmmmmmmmmmmmmmmmmmmmmmmmmmmm",
    empCode:"P240062"
  },
];

const DialogDetailRequest: React.FC<ShowUsersSelected> = ({
  isOpen,
  setIsOpen,
  requestNo,
  requestDetail,
  users,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="w-[90%] max-w-none h-[95vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-[14.5px] text-gray-700">
            Request No : {requestNo}
          </DialogTitle>
          <DialogDescription className="text-[13px] flex items-center gap-x-2">
            <Info size={15} color={"red"} /> กรุณาตรวจสอบข้อมูลก่อนอนุมัติคำขอ
          </DialogDescription>
        </DialogHeader>
        <div className="h-[95vh] overflow-auto">
          <div className="my-2 flex gap-x-1">
            <Button
              className="bg-[#1ECD97] hover:bg-[#18a377] text-white"
              size="sm"
            >
              <CircleCheck size={13} /> Approve
            </Button>
            <Button variant="destructive" size={"sm"}>
              <CircleX size={13} /> Not Approve
            </Button>
            <Button  className="bg-[#FFB639] text-white hover:bg-[#eea933]" size={"sm"}>
              <RotateCcw size={13} /> Reject
            </Button>
          </div>
          <div className="grid grid-cols-12 gap-x-2">
            <div className="col-span-12 lg:col-span-4">
              <div className="bg-white shadow-smooth rounded-[12px] p-2">
                <p className="text-[13px] my-[0.8rem]">รายละเอียดคำขอ</p>
                <TableRequestDetail requestDetail={requestDetail} />
              </div>
            </div>
            <div className="col-span-12 lg:col-span-8">
              <div className="p-2 bg-white rounded-[12px] shadow-smooth">
                <DataTable data={users} columns={columns} />
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="w-full">
            <p className="text-gray-800">
              Timeline การอนุมัติคำขอ
            </p>
            <TimelineApprove data={commentApprover} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default DialogDetailRequest;
