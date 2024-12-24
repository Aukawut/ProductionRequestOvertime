import {
  Dialog,
  DialogContent,

  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {

  LucideProps,
 
} from "lucide-react";

import {


  RequestList,
 
} from "./Approve";

import { useEffect } from "react";
import TableRequestList from "./TableRequestList/TableRequestList";

interface DialogRequestListProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;

  data: RequestList[];
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
  requestList: RequestList[];
  status:number;
  showAction: boolean;
  setShowAction: React.Dispatch<React.SetStateAction<boolean>>;
  
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
  SUN_HOURS: number;
}

const DialogRequestList: React.FC<DialogRequestListProps> = ({
  isOpen,
  setIsOpen,
  data,
  FetchDetailRequest,
  setRequestNo,
  setRev,
  status,
  GetPlanByWorkcell,
  showAction,
  setShowAction
}) => {


  useEffect(() => {}, []);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="w-[90%] max-w-none h-[95vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-[14.5px] text-gray-700 font-medium">
            Overtime Request List {status}
          </DialogTitle>
        </DialogHeader>
        <div className="h-[95vh] overflow-auto">
          <TableRequestList
            data={data}
            FetchDetailRequest={FetchDetailRequest}
            setRequestNo={setRequestNo}
            setRev={setRev}
            GetPlanByWorkcell={GetPlanByWorkcell}
            showAction={showAction}
            setShowAction={setShowAction}
            status={status}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default DialogRequestList;
