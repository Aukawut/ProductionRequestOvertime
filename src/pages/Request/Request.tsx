import React, { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Formik, Form, FormikHelpers } from "formik";
import Swal from "sweetalert2";
import { Button } from "@/components/ui/button";
import { Check, UserCheck } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Loader2 } from "lucide-react";
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

import {
  GetAllFactoryByGroup,
  GetAllOvertimeList,
  GetGroupDepartmentActive,
  GetWorkcellByGroup,
  GetWorkcellGroup,
} from "@/function/main";
import { useOTManagementSystemStore } from "../../../store";
import { useNavigate } from "react-router-dom";
import { DataTable } from "./data-table";
import { columns, Users } from "./columns";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import moment from "moment";
import { TimePicker } from "./time-picker";
import DialogUserSelected from "./dialog-user-selected";
import LoadingCircle from "@/components/custom/loading-circle";

interface Values {
  overtimeDate: Date;
  overtimeType: number;
  group: number;
  factory: number;
  remark: string;
  actionBy: string;
  workcell: number;
  groupworkcell: number;
 
}

interface GroupDeptAll {
  ID_GROUP_DEPT: number;
  NAME_GROUP: string;
}

interface Overtime {
  ID_TYPE_OT: number;
  HOURS_AMOUNT: number;
  CREATED_AT: string;
  CREATED_BY: string;
}

export interface SelectedUser {
  empCode: string;
}

export interface Factory {
  ID_FACTORY: number;
  FACTORY_NAME: string;
}

export interface WorkcellGroup {
  ID_WORKGRP: number;
  NAME_WORKGRP: string;
}

export interface AllWorkcell {
  ID_WORKGRP: number;
  NAME_WORKGRP: string;
}

const Request: React.FC = () => {
  const token = useOTManagementSystemStore((state) => state.token);
  const [isSubmit, setIsSubmit] = useState(false);
  const [dateRequest, setDateRequest] = useState<Date>(new Date());
  const [group, setGroup] = useState("");

  const [allGroupDept, setAllGroupDept] = useState<GroupDeptAll[]>([]);
  const [allOvertime, setAllOvertime] = useState<Overtime[]>([]);
  const [usersData, setUsersData] = useState<Users[]>([]);
  const [allFactory, setAllFactory] = useState<Factory[]>([]);
  const [allGroupWorkcell, setAllGroupWorkcell] = useState<WorkcellGroup[]>([]);
  const [allWorkcell, setAllWorkcell] = useState<AllWorkcell[]>([]);
  const [isLoadWorkcell, setIsLoadWorkcell] = useState(false);

  const [factory, setFactory] = useState(1); // AVP1
  const [overtimeType, setOvertimeType] = useState(1); // 1.5

  const [dateStart, setDateStart] = useState<Date>(new Date());
  const [dateEnd, setDateEnd] = useState<Date>(new Date());

  const [showDialogUser, setShowDialogUser] = useState(false);

  const closeDialogUser = () => {
    setShowDialogUser(false); // ปิด Dialog
  };

  const employeeCode = useOTManagementSystemStore(
    (state) => state.info.EmployeeCode
  );

  const role = useOTManagementSystemStore((state) => state.info?.Role);

  const navigate = useNavigate();
  const baseURL = import.meta.env.VITE_BASE_URL;

  const getUserDataByFactory = useCallback(
    async (fac: number) => {
      try {
        const response = await axios.get(`${baseURL}/users/factory/${fac}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.data.err && response.data.status == "Ok") {
          const newKey = response.data.results?.map((item: any) => ({
            EMPLOYEE_CODE: item.EMPLOYEE_CODE,
            FULLNAME: item.FULLNAME,
            FACTORY_NAME: item.FACTORY_NAME,
            NAME_ROLE: item.NAME_ROLE,
            NAME_GROUP: item.NAME_GROUP,
            POSITION: item.POSITION,
            CHECKED: false,
          }));

          setUsersData(newKey);
        } else {
          setUsersData([]);
        }
      } catch (err) {
        console.log(err);
      }
    },
    [baseURL, usersData]
  );

  const HandleSelectChange = (checked: boolean, index: number) => {
    setUsersData((prev) => {
      const prevent = [...prev];
      prev[index].CHECKED = checked;
      console.log(prevent);

      return prevent;
    });
  };

  const handleCheckedAll = (checked: boolean) => {
    if (checked) {
      if (usersData?.length > 0) {
        // Mark all rows as selected
        const updatedUsers = usersData.map((item) => ({
          ...item,
          CHECKED: true, // Update the CHECKED property
        }));

        setUsersData(updatedUsers);
      } else {
        toast.error("ไม่พบข้อมูลพนักงานกรุณาเลือก Department อีกครั้ง");
      }
    } else {
      // Uncheck all rows
      const updatedUsers = usersData.map((item) => ({
        ...item,
        CHECKED: false, // Uncheck all
      }));

      setUsersData(updatedUsers);
    }
  };

  const fetchData = async () => {
    if (!token || token == "") {
      navigate("/login");
    }

    setAllGroupDept(await GetGroupDepartmentActive(token)); // Promise
    setAllOvertime(await GetAllOvertimeList(token)); // Promise
    getUserDataByFactory(Number(role[0]?.ID_FACTORY));
    setAllFactory(await GetAllFactoryByGroup(token, role[0]?.ID_GROUP_DEPT)); // Promise
    const groupWork = await GetWorkcellGroup(token);
    if (groupWork?.length > 0) {
      setAllGroupWorkcell(groupWork);
      setAllWorkcell(
        await GetWorkcellByGroup(token, Number(groupWork[0]?.ID_WORKGRP))
      );
    }
  };

  const clearState = () => {
    setFactory(role[0]?.ID_FACTORY);
    handleCheckedAll(false);
    setOvertimeType(1);
    setGroup((role[0]?.ID_GROUP_DEPT)?.toString());

    handleCheckedAll(false);
  };


  useEffect(() => {
    fetchData();
    setDateEnd(moment(new Date()).add(1, "hours").toDate());
    setFactory(role[0]?.ID_FACTORY);
    setGroup((role[0]?.ID_GROUP_DEPT)?.toString());
  }, []);

  return (
    <div className="p-4">
      {/* Toast Alert */}
      <Toaster
        position="bottom-center"
        reverseOrder={false}
        gutter={8}
        toastOptions={{
          duration: 3000,
          style: {
            paddingRight: 20,
            paddingLeft: 20,
            paddingTop: 30,
            paddingBottom: 30,
          },
        }}
      />

      {/* Dialog User*/}
      <DialogUserSelected
        isOpen={showDialogUser}
        setIsOpen={setShowDialogUser}
        closeDialog={closeDialogUser}
        users={usersData?.filter((x) => x.CHECKED)}
      />

      <motion.div
        className="bg-white rounded-[16px] w-full p-4 shadow-smooth"
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
                  overtimeDate: dateRequest,
                  overtimeType: 1,
                  group: role[0]?.ID_GROUP_DEPT,
                  factory: role[0]?.ID_FACTORY,
                  remark: "",
                  actionBy: employeeCode,
                  workcell: 1,
                  groupworkcell: 1,
                }}
                
                onSubmit={async (
                  values: Values,
                  { setSubmitting, resetForm }: FormikHelpers<Values>
                ) => {

            
                  console.log(values);
                  
                  Swal.fire({
                    title: "คุณต้องการส่งคำขอใช่ หรือไม่ ?",
                    text: "กรุณาตรวจสอบข้อมูลก่อนส่งคำขอทุกครั้ง",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "ยืนยัน",
                    cancelButtonText: "ยกเลิก",
                  }).then(async (result) => {
                    if (result.isConfirmed) {
                      setIsSubmit(true);
                      const selected = usersData?.filter((x) => x.CHECKED);
                      const selectedUser = selected?.map((item) => ({
                        empCode: item.EMPLOYEE_CODE,
                      }));

                      if (selectedUser?.length > 0) {
                        const payload = {
                          overtimeDate: moment(values.overtimeDate).format("YYYY-MM-DD"),
                          overtimeType: Number(values.overtimeType),
                          group: Number(values.group),
                          factory: Number(values.factory),
                          remark: values.remark,
                          actionBy: values.actionBy,
                          users: selectedUser,
                          start:moment(dateStart).format("YYYY-MM-DD HH:mm"),
                          end:moment(dateEnd).format("YYYY-MM-DD HH:mm"),
                          groupworkcell:Number(values.groupworkcell),
                          workcell:Number(values.workcell),
                        };
                      
                        const response = await axios.post(
                          `${baseURL}/request`,
                          payload
                        );

                        if (
                          !response.data.err &&
                          response.data.status == "Ok"
                        ) {
                          setSubmitting(false);
                          setIsSubmit(false);
                          clearState();
                          resetForm();

                          toast.success(
                            <div className="flex flex-start">
                              <p className="text-[13px]">ส่งคำขอสำเร็จ !</p>
                            </div>
                          );
                        } else {
                          setSubmitting(false);
                          setIsSubmit(false);
                          toast.error(
                            <div className="flex flex-start">
                              <p className="text-[13px]">{response.data.msg}</p>
                            </div>
                          );
                        }
                      } else {
                        setSubmitting(false);
                        setIsSubmit(false);
                        toast.error(
                          <div className="flex flex-start">
                            <p className="text-[13px]">
                              กรุณาเลือกพนักงานที่ต้องการทำงานนอกเวลา
                            </p>
                          </div>
                        );
                      }
                    }
                  });
                }}
              >
                {({ values, handleChange, setFieldValue }) => (
                  <Form>
                    <Button
                      size={"sm"}
                      disabled={
                        isSubmit ||
                        usersData?.filter((x) => x.CHECKED)?.length == 0
                      }
                      className="m-2"
                    >
                      {isSubmit ? (
                        <Loader2 className="animate-spin" />
                      ) : (
                        <Check />
                      )}
                      Send Request
                    </Button>
                    <div className="grid grid-cols-12 gap-x-1">
                      <div className="mb-2 col-span-12 lg:col-span-5">
                        <div className="w-full">
                          <label
                            htmlFor="overtimeDate"
                            className="text-[13px] text-gray-700 mb-2"
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
                                disabled={(date) => {
                                  return (
                                    moment(date).utc().toDate() <
                                    moment(new Date()).utc().toDate()
                                  );
                                }}
                                onSelect={(date) => {
                                  setDateRequest(date as Date);
                                  setFieldValue("overtimeDate", date);
                                }}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                        </div>
                      </div>
                      <div className="mb-2 col-span-12 lg:col-span-6">
                        <div className="mb-2">
                          <label
                            htmlFor="shift"
                            className="text-[13px] text-gray-700"
                          >
                            <span className="text-[red]">*</span> ช่วงเวลา /
                            Period
                          </label>
                          
                          <div className="flex items-center gap-x-5">
                            <TimePicker
                              date={dateStart}
                              setDate={setDateStart}
                            />
                            -
                            <TimePicker date={dateEnd} setDate={setDateEnd} />
                          </div>
                        </div>
                      </div>
                      <div className="mb-2 col-span-12 lg:col-span-5">
                        <div className="mb-2">
                          <label
                            htmlFor="overtimeType"
                            className="text-[13px] text-gray-700"
                          >
                            <span className="text-[red]">*</span> ประเภทโอที
                          </label>
                          <Select
                            value={overtimeType?.toString()}
                            onValueChange={(e) => {
                              setFieldValue("overtimeType", Number(e));
                              setOvertimeType(Number(e));
                            }}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent>
                              {allOvertime?.map((item, index) => (
                                <SelectItem
                                  key={index}
                                  value={String(item.ID_TYPE_OT)}
                                  className="text-[13px]"
                                >
                                  {item.HOURS_AMOUNT}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="mb-2 col-span-12 lg:col-span-6 hidden">
                        <label
                          htmlFor="Department"
                          className="text-[13px] text-gray-700"
                        >
                          <span className="text-[red]">*</span> หน่วยงาน /
                          Department
                        </label>
                        <Select
                          disabled
                          value={values.group?.toString()}
                          onValueChange={(e) => {
                            setGroup(e);
                            setFieldValue("group", e);
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
                              return (
                                <SelectItem
                                  value={item.ID_GROUP_DEPT?.toString()}
                                  className="text-[13px]"
                                  key={index}
                                >
                                  {item.NAME_GROUP}
                                </SelectItem>
                              );
                            })}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="mb-2 col-span-12 lg:col-span-7">
                        <label
                          htmlFor="Factory"
                          className="text-[13px] text-gray-700"
                        >
                          <span className="text-[red]">*</span> โรงงาน / Factory
                        </label>
                        <Select
                          value={values.factory?.toString()}
                          onValueChange={(e) => {
                            getUserDataByFactory(Number(e));
                            setFactory(Number(e));
                            setFieldValue("factory", e);
                          }}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue
                              placeholder="Group Department"
                              className="text-[13px]"
                            />
                          </SelectTrigger>
                          <SelectContent className="h-[180px]">
                            {allFactory?.map((item, index) => {
                              return (
                                <SelectItem
                                  value={item.ID_FACTORY?.toString()}
                                  className="text-[13px]"
                                  key={index}
                                >
                                  {item.FACTORY_NAME}
                                </SelectItem>
                              );
                            })}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="mb-2 col-span-12 lg:col-span-6">
                        <label
                          htmlFor="Factory"
                          className="text-[13px] text-gray-700"
                        >
                          <span className="text-[red]">*</span> Work Group /
                          กลุ่มงาน
                        </label>

                        <Select
                          value={values.groupworkcell?.toString()}
                          onValueChange={async (e) => {
                            setFieldValue("workgroup", e);
                            setIsLoadWorkcell(true);

                            // Promise Repert Array Workcell
                            const responseWorkcell = await GetWorkcellByGroup(
                              token,
                              Number(e)
                            );

                            // If array > 0
                            if (responseWorkcell?.length > 0) {
                              setAllWorkcell(responseWorkcell); // Set Workcell list
                              setIsLoadWorkcell(false);
                              setTimeout(() => {
                                setFieldValue(
                                  "workcell",
                                  (responseWorkcell[0]?.ID_WORKGRP)?.toString()
                                );
                              }, 300);
                            } else {
                              setAllWorkcell([]);
                              setIsLoadWorkcell(false);
                            }
                          }}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue
                              placeholder="Group Department"
                              className="text-[13px]"
                            />
                          </SelectTrigger>
                          <SelectContent>
                            {allGroupWorkcell?.map((item, index) => {
                              return (
                                <SelectItem
                                  value={item.ID_WORKGRP.toString()}
                                  className="text-[13px]"
                                  key={index}
                                >
                                  {item.NAME_WORKGRP}
                                </SelectItem>
                              );
                            })}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="mb-2 col-span-12 lg:col-span-6">
                        <label
                          htmlFor="Factory"
                          className="text-[13px] text-gray-700"
                        >
                          <span className="text-[red]">*</span> Workcell
                        </label>
                        {isLoadWorkcell ? (
                          <LoadingCircle />
                        ) : !isLoadWorkcell && allWorkcell?.length == 0 ? (
                          <p className="text-[red] text-[12px] ml-4">
                            ไม่พบข้อมูล Workcell
                          </p>
                        ) : (
                          <Select
                            value={values.workcell.toString()}
                            onValueChange={(e) => {
                              setFieldValue("workcell", e);
                            }}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue
                                placeholder="Group Department"
                                className="text-[13px]"
                              />
                            </SelectTrigger>
                            <SelectContent className="h-[180px]">
                              {allWorkcell?.map((item, index) => {
                                return (
                                  <SelectItem
                                    value={item.ID_WORKGRP.toString()}
                                    className="text-[13px]"
                                    key={index}
                                  >
                                    {item.NAME_WORKGRP}
                                  </SelectItem>
                                );
                              })}
                            </SelectContent>
                          </Select>
                        )}
                      </div>
                    </div>
                    <div className="mb-2">
                      <label
                        htmlFor="Factory"
                        className="text-[13px] text-gray-700"
                      >
                        หมายเหตุ / Remark
                      </label>
                      <Textarea
                        placeholder="หมายเหตุ (ถ้ามี)"
                        onChange={handleChange}
                        rows={3}
                        name="remark"
                        value={values.remark}
                        id="remark"
                        className="resize-none"
                      />
                    </div>
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
                      <UserCheck size={16} />
                      ลำดับการอนุมัติ
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="p-2">
                      <StepApproval
                        groupId={Number(group)}
                        factory={Number(factory)}
                        overtimeType={Number(overtimeType)}
                      />
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
          <div className=" grid grid-cols-12">
            <div className="grid col-span-12">
              <div className="mb-2 mt-2">
                <div className="flex items-center gap-x-2">
                  <label htmlFor="email" className="text-[13px] text-gray-700">
                    <span className="text-[red]">*</span> เลือกพนักงาน Users (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <u
                            className="cursor-pointer"
                            onClick={() => {
                              if (
                                usersData?.filter((x) => x.CHECKED).length > 0
                              ) {
                                setShowDialogUser(true);
                              } else {
                                toast.error(
                                  <p className="text-[14px]">
                                    {"ท่านยังไม่ได้เลือกพนักงาน"}
                                  </p>
                                );
                              }
                            }}
                          >
                            {usersData?.filter((x) => x.CHECKED).length}
                          </u>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>ดูรายละเอียด</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>{" "}
                    / {usersData?.length} คน)
                  </label>
                </div>
                <div className="w-full">
                  <DataTable
                    data={usersData}
                    columns={columns(
                      HandleSelectChange,
                      handleCheckedAll,
                      usersData
                    )}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Request;
