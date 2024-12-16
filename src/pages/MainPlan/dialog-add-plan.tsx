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
import {  UserGroup, WorkcellAll } from "./MainPlan";
import { GetMenuyear, InsertMainPlan } from "@/function/main";
import { useOTManagementSystemStore } from "../../../store";
import { toast } from "sonner";
import { useState } from "react";
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

interface DialogAddPlan {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  fetchData: (load:boolean) => Promise<void>;
  workcell: WorkcellAll[];
  userGroup: UserGroup[];
}

const DialogAddPlan: React.FC<DialogAddPlan> = ({
  isOpen,
  setIsOpen,
  fetchData,
  workcell,
  userGroup,
}) => {
  const yearMenu = GetMenuyear();
  const token = useOTManagementSystemStore((state) => state.token);
  const code = useOTManagementSystemStore((state) => state.info?.EmployeeCode);
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredWorkcells = workcell.filter((work) =>
    work.NAME_WORKCELL.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="w-[90%] lg:w-[50%] max-w-none h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-[14.5px] text-gray-700 font-medium">
            Add Main Plan | เพิ่มแผนการทำโอที
          </DialogTitle>
          <DialogDescription className="text-[13px] flex items-center gap-x-2">
            <Info size={15} color={"red"} /> กรุณาตรวจสอบข้อมูลก่อนบันทึกข้อมูล
          </DialogDescription>
        </DialogHeader>
        <div className="h-[80vh] overflow-auto">
          <div>
            <Formik
              initialValues={{
                month: new Date().getMonth() + 1,
                year: new Date().getFullYear(),
                hours: 200,
                workcell: 1,
                ugroup: 1,
              }}
              onSubmit={async (values, { setSubmitting, resetForm }) => {

                const payload = {
                  workcell: Number(values.workcell),
                  month: Number(values.month),
                  year: Number(values.year),
                  hours: Number(values.hours),
                  action: code,
                  userGroup:Number(values.ugroup)
                };
                setTimeout(async () => {
                  const response = await InsertMainPlan(token, payload);
                  console.log("response", response);
                  if (!response.err) {
                    toast.success("บันทึกข้อมูลสำเร็จ !");

                    setTimeout(() => {
                      resetForm();
                      setIsOpen(false);
                      fetchData(false);
                    },500)
                 
                  } else {
                    toast.error(response.msg);
                  }
                  setSubmitting(false);
                }, 400);
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
                  <div className="grid grid-cols-12 gap-x-2">
                    <div className="col-span-12 lg:col-span-6">
                      <div className="flex flex-col justify-center">
                        <div>
                          <label htmlFor="month" className="text-[13px]">
                            <span className="text-[red]">*</span> Workcell
                          </label>
                        </div>
             
                        <Popover open={open} onOpenChange={setOpen} >
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              role="combobox"
                              aria-expanded={open}
                              className="justify-between"
                            >
                              {values.workcell
                                ? workcell.find(
                                    (work) =>
                                      work.ID_WORK_CELL?.toString() === values.workcell?.toString()
                                  )?.NAME_WORKCELL
                                : "Select Workcell..."}
                              <ChevronsUpDown className="opacity-50" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="p-0 z-[20] h-[200px] overflow-auto">
                            <Command className="border-[1.2px]">
                              <CommandInput
                                placeholder="Search Workcell..."
                                className="h-9"
                                onValueChange={(inputValue) =>
                                  setSearchTerm(inputValue)
                                }
                              />
                              <CommandList>
                                {filteredWorkcells.length === 0 ? (
                                  <CommandEmpty>
                                    No framework found.
                                  </CommandEmpty>
                                ) : (
                                  <CommandGroup>
                                    {filteredWorkcells?.map((work) => (
                                      <CommandItem
                                        className="text-[13px]"
                                        onSelect={() => {
                                      
                                          setFieldValue(
                                            "workcell",
                                            work.ID_WORK_CELL
                                          );

                                          setOpen(false);
                                        }}
                                      >
                                        {work.NAME_WORKCELL} - (
                                        {work.FACTORY_NAME})
                                        <Check
                                          className={cn(
                                            "ml-auto",
                                            Number(values.workcell) ==
                                              Number(work.ID_WORK_CELL)
                                              ? "opacity-100"
                                              : "opacity-0"
                                          )}
                                        />
                                      </CommandItem>
                                    ))}
                                  </CommandGroup>
                                )}
                              </CommandList>
                            </Command>
                          </PopoverContent>
                        </Popover>
                      </div>
                      <p className="text-[red] text-[12px]">
                        {errors.workcell && touched.workcell && errors.workcell}
                      </p>
                    </div>

                    <div className="mb-2 col-span-12 lg:col-span-6">
                      <label htmlFor="month" className="text-[13px]">
                        <span className="text-[red]">*</span> Group
                      </label>
                      <Select
                        required
                        name="ugroup"
                        value={values.ugroup?.toString()}
                        onValueChange={(value) => {
                          setFieldValue("ugroup", value);
                        }}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Group" />
                        </SelectTrigger>
                        <SelectContent className="max-h-[300px]">
                          {userGroup?.map((item, index) => (
                            <SelectItem
                              className="text-[12px]"
                              value={item.ID_UGROUP?.toString()}
                              key={index}
                            >
                              {item.NAME_UGROUP}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <p className="text-[red] text-[12px]">
                        {errors.ugroup && touched.ugroup && errors.ugroup}
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-12 gap-x-2">
                    <div className="mb-2 col-span-12 lg:col-span-4">
                      <label htmlFor="year" className="text-[13px]">
                        <span className="text-[red]">*</span> ปี / Year
                      </label>
                      <Select
                        required
                        name="year"
                        value={values.year.toString()}
                        onValueChange={(value) => {
                          setFieldValue("year", value);
                        }}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="year" />
                        </SelectTrigger>
                        <SelectContent className="max-h-[300px]">
                          {yearMenu?.map((item) => (
                            <SelectItem
                              value={item.toString()}
                              key={item}
                              className="text-[13px]"
                            >
                              {item}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <p className="text-[red] text-[12px]">
                        {errors.year && touched.year && errors.year}
                      </p>
                    </div>
                    <div className="mb-2 col-span-12 lg:col-span-4">
                      <label htmlFor="month" className="text-[13px]">
                        <span className="text-[red]">*</span> เดือน / Month
                      </label>
                      <Select
                        required
                        name="month"
                        value={values.month.toString()}
                        onValueChange={(value) => {
                          setFieldValue("month", value);
                        }}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Month" />
                        </SelectTrigger>
                        <SelectContent className="max-h-[300px]">
                          {allMonth?.map((item) => (
                            <SelectItem
                              value={item.no.toString()}
                              key={item.no}
                              className="text-[13px]"
                            >
                              {item.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <p className="text-[red] text-[12px]">
                        {errors.month && touched.month && errors.month}
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-12">
                    <div className="col-span-4">
                      <div className="mb-2">
                        <label htmlFor="month" className="text-[13px]">
                          <span className="text-[red]">*</span> จำนวน (ชั่วโมง)
                        </label>

                        <Input
                          required
                          type="text"
                          name="hours"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.hours}
                        />
                        <p className="text-[red] text-[12px]">
                          {errors.hours && touched.hours && errors.hours}
                        </p>
                      </div>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    size={"sm"}
                    className="bg-[#107EDB] text-white hover:bg-[#1c77c2]"
                  >
                    <CheckCircle /> Save Plan
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
export default DialogAddPlan;
