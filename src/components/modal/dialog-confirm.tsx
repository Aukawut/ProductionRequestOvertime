import React from 'react';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"

interface DialogConfirmProps {
  title: string;
  description: string;
  triggerText: string;
  children?: React.ReactNode;
}

const DialogComponent: React.FC<DialogConfirmProps> = ({ title, description, triggerText, children }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="btn">{triggerText}</button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>{description}</DialogDescription>
        {children}
        <DialogClose asChild>
          <button className="btn-close">Close</button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};

export default DialogComponent;
