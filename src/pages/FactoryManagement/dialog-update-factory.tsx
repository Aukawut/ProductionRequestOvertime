import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Formik } from "formik";

import { Check, CheckCircle, ChevronsUpDown, Info } from "lucide-react";
import { allMonth } from "../MyRequest/data";
import { Factory, MainPlan, UserGroup, WorkcellAll } from "./FactoryManagement";
import { GetMenuyear, UpdateMainPlan } from "@/function/main";
import { useOTManagementSystemStore } from "../../../store";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Popover } from "@/components/ui/popover";
import { PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

interface DialogUpdateFactoryProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  fetchData: (load:boolean) => Promise<void>;
  workcell: WorkcellAll[];
  userGroup: UserGroup[];
  oldFactory: Factory | undefined;
}

interface InitialData {
  factory: number;
  group: number;

}

const DialogUpdateFactory: React.FC<DialogUpdateFactoryProps> = ({
  isOpen,
  setIsOpen,
  fetchData,
  workcell,
  userGroup,
  oldFactory,
}) => {
  const yearMenu = GetMenuyear();
  const token = useOTManagementSystemStore((state) => state.token);
  const code = useOTManagementSystemStore((state) => state.info?.EmployeeCode);
  const [open, setOpen] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");

  const filteredWorkcells = workcell.filter((work) =>
    work.NAME_WORKCELL.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const [initialData, setInitialData] = useState<InitialData>({
    factory:1,
    group:6,
  });


  useEffect(() => {
    if (oldFactory !== undefined) {
      
      setTimeout(() => {
     
        setInitialData({
          factory: oldFactory.ID_FACTORY,
          group: oldFactory.ID_GROUP_DEPT,
        });
      },400)
    }
  }, [oldFactory]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="w-[90%] lg:w-[50%] max-w-none h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-[14.5px] text-gray-700 font-medium">
            Update Main Plan | แก้ไขแผนการทำโอที
          </DialogTitle>
          <DialogDescription className="text-[13px] flex items-center gap-x-2">
            <Info size={15} color={"red"} /> กรุณาตรวจสอบข้อมูลก่อนบันทึกข้อมูล
          </DialogDescription>
        </DialogHeader>
        <div className="h-[80vh] overflow-auto">
          <div>
            <Formik
              enableReinitialize
              initialValues={{...initialData}}
              onSubmit={async (values, { setSubmitting, resetForm }) => {
               
               
              }}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
                setFieldValue,
              }) => (
                <form onSubmit={handleSubmit} className="p-4">
                 

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    size={"sm"}
                    className="bg-[#107EDB] text-white hover:bg-[#1c77c2]"
                  >
                    <CheckCircle /> Update Plan
                  </Button>
                </form>
              )}
            </Formik>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default DialogUpdateFactory;
