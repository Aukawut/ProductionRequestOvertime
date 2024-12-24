import React, { useState, forwardRef, useImperativeHandle } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,

} from "@/components/ui/dialog";

import { CheckCircle, CircleAlert, X } from "lucide-react";

interface DialogAddPlanProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface DialogConfirmProps {
  title?: string;
  description?: string;
}

const DialogConfirmAction = forwardRef((props: DialogAddPlanProps, ref) => {
  const { isOpen, setIsOpen } = props;
  const [resolvePromise, setResolvePromise] =
    useState<(value: boolean) => void>();

  // Expose the `confirm` method via ref
  useImperativeHandle(ref, () => ({
    confirm: (_: DialogConfirmProps): Promise<boolean> => {
      return new Promise<boolean>((resolve) => {
        setResolvePromise(() => resolve);
        setIsOpen(true);
      });
    },
  }));

  const handleConfirm = () => {
    if (resolvePromise) resolvePromise(true);
    setIsOpen(false);
  };

  const handleCancel = () => {
    if (resolvePromise) resolvePromise(false);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="w-[90%] lg:w-[40%] max-w-none h-[60vh] flex justify-start items-center flex-col">
        <div>
        <CircleAlert size={84} color="#FFBE4F"/>
        </div>
        <p className="text-[24px] text-gray-800">Opps....</p>
        <p className="text-[16px] text-gray-800">
          ท่านกำลังจะอนุมัติคำขอที่ Actual จะเกินกว่าแผน
        </p>
        <div className="mt-[2rem] flex justify-center gap-x-5">
        <Button className="bg-sky-600 py-[1.5rem] hover:bg-sky-800" onClick={handleConfirm}>
            <CheckCircle />    Confirm
        </Button>
        <Button className="bg-red-600 py-[1.5rem] hover:bg-red-800" onClick={handleCancel}>
            <X />   Cancel
        </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
});

export default DialogConfirmAction;
