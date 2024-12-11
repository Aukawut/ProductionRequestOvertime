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

import { CheckCircle, Info } from "lucide-react";
import { allMonth } from "../MyRequest/data";
import { Factory, MainPlan } from "./MainPlan";
import { GetMenuyear, UpdateMainPlan } from "@/function/main";
import { useOTManagementSystemStore } from "../../../store";
import { toast } from "sonner";
import { useEffect, useState } from "react";

interface DialogUpdatePlan {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  factory: Factory[];
  fetchData: () => Promise<void>;
  oldPlan: MainPlan | undefined;
}

interface InitialForm {
  month: number;
  year: number;
  hours: number;
  factory: number;
}

const DialogUpdatePlan: React.FC<DialogUpdatePlan> = ({
  isOpen,
  setIsOpen,
  factory,
  fetchData,
  oldPlan,
}) => {
  const yearMenu = GetMenuyear();
  const token = useOTManagementSystemStore((state) => state.token);
  const code = useOTManagementSystemStore((state) => state.info?.EmployeeCode);

  const [initialForm, setInitialForm] = useState<InitialForm>({
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
    hours: 200,
    factory: 1,
  });

  useEffect(() => {
  
    if (oldPlan !== undefined) {
      const oldData:InitialForm = {
        month: Number(oldPlan.MONTH),
        year: Number(oldPlan.YEAR),
        hours: Number(oldPlan.HOURS),
        factory:Number(oldPlan.ID_FACTORY),
      }

      setTimeout(() => {
        setInitialForm(oldData);

      },500)

    }
  }, [oldPlan]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="w-[90%] lg:w-[50%] max-w-none h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-[14.5px] text-gray-700 font-medium">
            Update Main Plan | แก้ไขแผนการทำโอที
          </DialogTitle>
          <DialogDescription className="text-[13px] flex items-center gap-x-2">
            <Info size={15} color={"red"} /> กรุณาตรวจสอบข้อมูลก่อนบันทึกข้อมูล
          </DialogDescription>
        </DialogHeader>
        <div className="h-[95vh] overflow-auto">
          <div>
            <Formik
              enableReinitialize
              initialValues={{...initialForm}}
              onSubmit={async (values, { setSubmitting, resetForm }) => {
                const payload = {
                  factory: Number(values.factory),
                  month: Number(values.month),
                  year: Number(values.year),
                  hours: Number(values.hours),
                  action: code,
                };
                setTimeout(async () => {
                  const response = await UpdateMainPlan(token, payload,Number(oldPlan?.ID_PLAN));
                  console.log("response", response);
                  if (!response.err) {
                    toast.success("แก้ไขข้อมูลสำเร็จ !");
                    resetForm();
                    setIsOpen(false);
                    fetchData();
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
                    <div className="mb-2 col-span-12 lg:col-span-4">
                      <label htmlFor="month" className="text-[13px]">
                        <span className="text-[red]">*</span> ปี / Year
                      </label>
                      <Select
                        required
                        name="factory"
                        value={values.factory.toString()}
                        onValueChange={(value) => {
                          setFieldValue("factory", value);
                        }}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Factory" />
                        </SelectTrigger>
                        <SelectContent className="max-h-[300px]">
                          {factory?.map((item, index) => (
                            <SelectItem
                              className="text-[12px]"
                              value={item.ID_FACTORY.toString()}
                              key={index}
                            >
                              {item.FACTORY_NAME}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <p className="text-[red] text-[12px]">
                        {errors.factory && touched.factory && errors.factory}
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

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    size={"sm"}
                    className="mt-[1rem]"
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
export default DialogUpdatePlan;
