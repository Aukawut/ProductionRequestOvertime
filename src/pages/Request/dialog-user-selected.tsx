import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Users } from "./columns";
import { columnsUsersSelected } from "./columns-user-selected";

import { DataTableSelected } from "./data-table-selected";
import { Info } from "lucide-react";

interface ShowUsersSelected {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
  closeDialog: () => void;
  users: Users[];
}

const DialogUserSelected: React.FC<ShowUsersSelected> = ({
  isOpen,
  setIsOpen,
  users,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="w-[90%] max-w-none h-[95vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="text-[15px] text-gray-700 font-medium">
            Users selected | ข้อมูลพนักงานที่ท่านเลือก ({users?.length} ท่าน)
          </DialogTitle>
          <DialogDescription className="text-[13px] flex items-center gap-x-2">
          <Info size={15} color={"red"}/>  กรุณาตรวจสอบรายชื่อให้ถูกต้อง
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-center h-[100%] p-2 overflow-auto">
          <div className="w-full">
            <DataTableSelected data={users} columns={columnsUsersSelected()} />
          </div>
        </div>
    
      </DialogContent>
    </Dialog>
  );
};
export default DialogUserSelected;
