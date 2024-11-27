import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Formik, Form, FormikHelpers } from "formik";
import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";
import { AlertCircle, Check } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import { Loader2, User } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

import "react-datepicker/dist/react-datepicker.css";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import StepApproval from "@/components/custom/approval-step";

import { GetGroupDepartmentActive, GetShiftActive } from "@/function/main";
import { useOTManagementSystemStore } from "../../../store";
import { useNavigate } from "react-router-dom";
import moment from "moment-timezone";

interface Values {
  firstName: string;
  lastName: string;
  email: string;
  remark: string;
  reqDate: Date;
  shift: string;
  group: string;
}

interface ShiftAll {
  SHIFT_CODE: string;
  START: string;
  END: string;
  STATUS_ACTIVE: string;
}

interface GroupDeptAll {
  ID_GROUP_DEPT: number;
  NAME_GROUP: string;
}

const Request: React.FC = () => {
  const token = useOTManagementSystemStore((state) => state.token);
  const [isSubmit, setIsSubmit] = useState(false);
  const [dateRequest, setDateRequest] = useState<Date>(new Date());
  const [group, setGroup] = useState("");
  const [allShift, setAllShift] = useState<ShiftAll[]>([]);
  const [allGroupDept, setAllGroupDept] = useState<GroupDeptAll[]>([]);

  const [selectedUser, setSelectedUser] = useState([]);
  const navigate = useNavigate();

  const fetchData = async () => {
    if (!token || token == "") {
      navigate("/login");
    }

    setAllShift(await GetShiftActive(token)); // Promise
    setAllGroupDept(await GetGroupDepartmentActive(token)); // Promise
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="p-4">
      <motion.div
        className="bg-white rounded-[16px] w-full p-4"
        style={{
          boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "tween", duration: 0.2 }}
      >
        <p className="text-[14px] text-gray-600 font-medium">
          Request Overtime (OT)
        </p>
        <p className="text-[12.5px] text-gray-500 font-normal">
          สร้างคำขอทำงานนอกเวลา (โอที)
        </p>
        <div className="p-2">
          <div className="grid grid-cols-12 gap-x-2">
            <div className="col-span-12 lg:col-span-7">
              <Formik
                initialValues={{
                  firstName: "",
                  lastName: "",
                  email: "",
                  remark: "",
                  reqDate: dateRequest,
                  shift: "",
                  group: "",
                }}
                onSubmit={(
                  values: Values,
                  { setSubmitting }: FormikHelpers<Values>
                ) => {
                  setIsSubmit(true);
                  setTimeout(() => {
                    alert(JSON.stringify(values, null, 2));
                    setSubmitting(false);
                    setIsSubmit(false);
                  }, 500);
                }}
              >
                {({ values, handleChange, handleBlur, setFieldValue }) => (
                  <Form>
                    <div className="grid grid-cols-12 gap-x-2">
                      <div className="mb-2  col-span-12 lg:col-span-5">
                        <div className="w-full">
                          <label
                            htmlFor="firstName"
                            className="text-[13px] text-gray-700"
                          >
                            <span className="text-[red]">*</span>{" "}
                            วันที่เข้าทำงาน (OT)
                          </label>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-full justify-start text-left font-normal text-[13px]",
                                  !dateRequest && "text-muted-foreground"
                                )}
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {dateRequest ? (
                                  format(dateRequest, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                              <Calendar
                                mode="single"
                                selected={dateRequest}
                                onSelect={(date) => {
                                  setDateRequest(date as Date);
                                  setFieldValue("reqDate", date);
                                }}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                        </div>
                      </div>
                      <div className="mb-2 col-span-12 lg:col-span-7">
                        <div className="mb-2">
                          <label
                            htmlFor="firstName"
                            className="text-[13px] text-gray-700"
                          >
                            <span className="text-[red]">*</span> Shift / กะ
                          </label>
                          <Select>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent>
                              {allShift?.map((item, index) => (
                                <SelectItem
                                  value={item.SHIFT_CODE}
                                  className="text-[13px]"
                                  key={index}
                                >
                                  {item.SHIFT_CODE} (
                                  {moment(item.START).utc().format("HH:mm")} - {moment(item.END).utc().format("HH:mm")}) 
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>

                    <label
                      htmlFor="firstName"
                      className="text-[13px] text-gray-700"
                    >
                      <span className="text-[red]">*</span> หน่วยงาน /
                      Department
                    </label>
                    <Select
                      onValueChange={(e) => {
                        setGroup(e);
                        setFieldValue("group", e);
                        console.log(e);
                      }}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue
                          placeholder="Group Department"
                          className="text-[13px]"
                        />
                      </SelectTrigger>
                      <SelectContent className="h-[240px]">
                        {allGroupDept?.map((item, index) => {
                          console.log(item.NAME_GROUP);
                          return (
                            <SelectItem
                              value={item.ID_GROUP_DEPT.toString()}
                              className="text-[13px]"
                              key={index}
                            >
                              {item.NAME_GROUP}
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                    
                    <div className="mb-2">
                      <label
                        htmlFor="email"
                        className="text-[13px] text-gray-700"
                      >
                        Email
                      </label>
                      <Input
                        id="email"
                        name="email"
                        placeholder="john@acme.com"
                        type="email"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </div>
                    <Textarea placeholder="หมายเหตุ (ถ้ามี)" />

                    <Button size={"sm"} disabled={isSubmit} className="mt-2">
                      {isSubmit ? <Loader2 className="animate-spin" /> : ""}
                      Send Request
                    </Button>
                  </Form>
                )}
              </Formik>
            </div>

            <div className="col-span-5">
              <Accordion
                type="single"
                collapsible
                className="w-full"
                defaultValue="item-1"
              >
                <AccordionItem value="item-1">
                  <AccordionTrigger>
                    <div className="flex items-center gap-x-2 text-[13px]">
                      <User size={16} />
                      รายชื่อผู้เข้าทำงาน
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    {selectedUser?.length == 0 ? (
                      <Alert variant="destructive" className="bg-red-50">
                        <AlertCircle className="h-4 w-4" color="red" />
                        <AlertTitle style={{ fontSize: 13 }}>
                          Warning !
                        </AlertTitle>
                        <AlertDescription style={{ fontSize: 12 }}>
                          คุณยังไม่ได้เลือกพนักงาน
                        </AlertDescription>
                      </Alert>
                    ) : (
                      <div className=""></div>
                    )}
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>
                    <div className="flex items-center gap-x-2 text-[13px]">
                      <Check size={16} />
                      ลำดับการอนุมัติ
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="p-2">
                      <StepApproval groupId={Number(group)} />
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Request;
