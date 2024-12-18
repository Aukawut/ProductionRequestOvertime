import React, { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Formik, Form, FormikHelpers } from "formik";
import Swal from "sweetalert2";
import { Button } from "@/components/ui/button";
import { Check, CheckCircle, Clock8, Info, UserCheck } from "lucide-react";
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
  GetPlanByFactory,
  GetPlanByWorkcell,
  GetWorkcellByFactory,
  GetWorkcellGroup,
} from "@/function/main";
import { useOTManagementSystemStore } from "../../../store";
import { useNavigate } from "react-router-dom";
import { DataTable } from "./data-table";
import { columns, Users } from "./columns";
import axios from "axios";
import { toast, Toaster } from "sonner";

import moment from "moment";
import { TimePicker } from "./time-picker";
import DialogUserSelected from "./dialog-user-selected";
import LoadingCircle from "@/components/custom/loading-circle";

interface Values {
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
  DESC: string;
}

export interface AllWorkcell {
  ID_WORK_CELL: number;
  NAME_WORKCELL: string;
}

interface PlanByFactory {
  YEAR: number;
  MONTH: number;
  ID_FACTORY: number;
  SUM_HOURS: number;
}

interface PlanByWorkcell {
  YEAR: number;
  MONTH: number;
  ID_WORK_CELL: number;
  SUM_HOURS: number;
}

interface InitialData {
  overtimeType: number;
  group: number;
  factory: number;
  remark: string;
  actionBy: string;
  workcell: number;
  groupworkcell: number;
}

const Request: React.FC = () => {
  const token = useOTManagementSystemStore((state) => state.token);
  const [isSubmit, setIsSubmit] = useState(false);
  const [dateRequestStart, setDateRequestStart] = useState<Date>(new Date());
  const [dateRequestEnd, setDateRequestEnd] = useState<Date>(new Date());
  const [dateStart, setDateStart] = useState<Date>(new Date());
  const [dateEnd, setDateEnd] = useState<Date>(new Date());

  const [group, setGroup] = useState("");
  const [factory, setFactory] = useState(1); // AVP1
  const [overtimeType, setOvertimeType] = useState(1); // 1.5

  const [allGroupDept, setAllGroupDept] = useState<GroupDeptAll[]>([]);
  const [allOvertime, setAllOvertime] = useState<Overtime[]>([]);
  const [usersData, setUsersData] = useState<Users[]>([]);
  const [allFactory, setAllFactory] = useState<Factory[]>([]);
  const [allGroupWorkcell, setAllGroupWorkcell] = useState<WorkcellGroup[]>([]);
  const [allWorkcell, setAllWorkcell] = useState<AllWorkcell[]>([]);
  const [isLoadWorkcell, setIsLoadWorkcell] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showDialogUser, setShowDialogUser] = useState(false);
  const [descGroup, setDescGroup] = useState("");
  const [planByFactory, setPlanByFactory] = useState<PlanByFactory[]>([]);
  const [planByWorkcell, setPlanByWorkcell] = useState<PlanByWorkcell[]>([]);
  const [actualWorkcell, setActualWorkcell] = useState(0);
  const [actualFactory, setActualFactory] = useState(0);

  const employeeCode = useOTManagementSystemStore(
    (state) => state.info.EmployeeCode
  );
  const role = useOTManagementSystemStore((state) => state.info?.Role);

  const [initialData, setInitialData] = useState<InitialData>({
    overtimeType: 1,
    group: role[0]?.ID_GROUP_DEPT,
    factory: role[0]?.ID_FACTORY,
    remark: "",
    actionBy: employeeCode,
    workcell: 1,
    groupworkcell: 1,
  });

  const startFullDate = moment(
    moment(dateRequestStart).format("YYYY-MM-DD") +
      " " +
      moment(dateStart).format("HH:mm")
  ).toDate();
  const endFullDate = moment(
    moment(dateRequestEnd).format("YYYY-MM-DD") +
      " " +
      moment(dateEnd).format("HH:mm")
  ).toDate();

  const duration = moment.duration(
    moment(endFullDate).diff(moment(startFullDate))
  );

  const closeDialogUser = () => {
    setShowDialogUser(false); // ปิด Dialog
  };

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

  const FindDescriptionGroup = (id: number) => {
    const obj = allGroupWorkcell?.find((x) => x.ID_WORKGRP == id);
    if (obj) {
      setDescGroup(obj.DESC);
    } else {
      setDescGroup("");
    }
  };

  const fetchData = async () => {
    setLoading(true);

    const month = new Date().getMonth() + 1;

    if (!token || token == "") {
      navigate("/login");
    }

    await Promise.all([
      setAllGroupDept(await GetGroupDepartmentActive(token)),
      setAllOvertime(await GetAllOvertimeList(token)),
      setAllFactory(await GetAllFactoryByGroup(token, role[0]?.ID_GROUP_DEPT)),
      await getUserDataByFactory(Number(role[0]?.ID_FACTORY)),
    ])
      .then(async (response) => {
        console.log(response);

        const work = await GetWorkcellByFactory(
          token,
          Number(role[0]?.ID_FACTORY)
        );

        setPlanByFactory(
          await GetPlanByFactory(
            token,
            Number(role[0]?.ID_FACTORY),
            new Date().getFullYear(),
            month
          )
        );

        setInitialData((prev) => {
          prev.factory = role[0]?.ID_FACTORY;
          return prev;
        });

        const groupWork = await GetWorkcellGroup(token);

        if (work?.length > 0) {
          setAllWorkcell(work);

          setInitialData((prev) => {
            prev.workcell = Number(work[0]?.ID_WORK_CELL);
            return prev;
          });

          setPlanByWorkcell(
            await GetPlanByWorkcell(
              token,
              Number(work[0]?.ID_WORK_CELL),
              new Date().getFullYear(),
              month
            )
          );
        }

        if (groupWork?.length > 0) {
          setAllGroupWorkcell(groupWork);
          FindDescriptionGroup(Number(groupWork[0]?.ID_WORKGRP));
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const clearState = () => {
    setFactory(role[0]?.ID_FACTORY);
    handleCheckedAll(false);
    setOvertimeType(1);
    setGroup(role[0]?.ID_GROUP_DEPT?.toString());

    handleCheckedAll(false);
  };

  useEffect(() => {
    // setDateEnd(moment(new Date()).add(2, "hours").toDate());
    fetchData();
    setFactory(role[0]?.ID_FACTORY);
    setGroup(role[0]?.ID_GROUP_DEPT?.toString());
  }, []);

  return loading ? (
    <div className="flex h-[100vh] w-full justify-center items-center">
      <LoadingCircle />
    </div>
  ) : (
    <div className="p-4">
      {/* Toast Alert */}
      <Toaster
        position="top-center"
        richColors
        toastOptions={{
          duration: 1500,
          style: {
            paddingRight: 20,
            paddingLeft: 20,
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
            <div className="col-span-12 lg:col-span-6">
              <Formik
                initialValues={{ ...initialData }}
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
                          overtimeDateStart:
                            moment(startFullDate).format("YYYY-MM-DD HH:mm"),
                          overtimeDateEnd:
                            moment(endFullDate).format("YYYY-MM-DD HH:mm"),
                          overtimeType: Number(values.overtimeType),
                          group: Number(values.group),
                          factory: Number(values.factory),
                          remark: values.remark,
                          actionBy: values.actionBy,
                          users: selectedUser,
                          groupworkcell: Number(values.groupworkcell),
                          workcell: Number(values.workcell),
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
                            <div className="flex items-center gap-2">
                              <CheckCircle
                                className="text-green-500"
                                size={20}
                              />
                              <div>
                                <p className="text-[14px] text-gray-800">
                                  Success !
                                </p>
                                <p className="text-[12px] text-gray-600">
                                  ส่งคำขอสำเร็จ !
                                </p>
                              </div>
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
                      <div className="mb-2 col-span-12 lg:col-span-12">
                        <div className="w-full">
                          <label
                            htmlFor="overtimeDate"
                            className="text-[13px] text-gray-700 mb-2"
                          >
                            <span className="text-[red]">*</span> เริ่มทำงาน
                          </label>
                          <div className="flex gap-x-1">
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button
                                  variant={"outline"}
                                  className={cn(
                                    "w-full justify-start text-left font-normal text-[13px]",
                                    !dateRequestStart && "text-muted-foreground"
                                  )}
                                >
                                  <CalendarIcon className="mr-2 h-4 w-4" />
                                  {dateRequestStart ? (
                                    format(dateRequestStart, "PPP")
                                  ) : (
                                    <span>Pick a date</span>
                                  )}
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0">
                                <Calendar
                                  mode="single"
                                  selected={dateRequestStart}
                                  disabled={(date) => {
                                    return (
                                      moment(date).utc().toDate() <
                                      moment(new Date()).utc().toDate()
                                    );
                                  }}
                                  onSelect={(date) => {
                                    setDateRequestStart(date as Date);
                                    setDateRequestEnd(
                                      moment(date).add(3, "hours").toDate()
                                    );
                                    setFieldValue("overtimeDate", date);
                                  }}
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>
                            <TimePicker
                              date={dateStart}
                              setDate={(e) => {
                                setDateStart(e);
                                setDateEnd(moment(e).add(2, "hours").toDate());
                              }}
                            />
                          </div>
                        </div>
                      </div>  

                      <div className="mb-3 col-span-12 lg:col-span-12">
                        <div className="flex flex-col">
                          <label
                            htmlFor="overtimeDate"
                            className="text-[13px] text-gray-700 mb-2"
                          >
                            <span className="text-[red]">*</span> ถึงเวลา
                          </label>
                          <div className="flex gap-x-1">
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button
                                  variant={"outline"}
                                  className={cn(
                                    "w-full justify-start text-left font-normal text-[13px]",
                                    !dateRequestEnd && "text-muted-foreground"
                                  )}
                                >
                                  <CalendarIcon className="mr-2 h-4 w-4" />
                                  {dateRequestEnd ? (
                                    format(dateRequestEnd, "PPP")
                                  ) : (
                                    <span>Pick a date</span>
                                  )}
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0">
                                <Calendar
                                  mode="single"
                                  selected={dateRequestEnd}
                                  disabled={(date) => {
                                    const duration = moment.duration(
                                      moment(date).diff(dateRequestStart)
                                    );

                                    return (
                                      moment(date).utc().toDate() <
                                        moment(new Date()).utc().toDate() ||
                                      moment(date).toDate() <
                                        moment(dateRequestStart).toDate() ||
                                      duration.asDays() > 1
                                    );
                                  }}
                                  onSelect={(date) => {
                                    setDateRequestEnd(date as Date);
                                    setFieldValue("overtimeDate", date);
                                  }}
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>
                            <TimePicker date={dateEnd} setDate={setDateEnd} />
                          </div>
                        </div>
                      </div>
                      <div className="col-span-12 mb-3">
                        <div className="flex items-center gap-x-2">
                          <Clock8 size={14} />
                          <p className="text-[12px]">
                            {duration.hours()} ชั่วโมง {duration.minutes()} นาที
                          </p>
                        </div>
                      </div>
                      <div className="col-span-12">
                        <table className="my-2">
                          <tbody>
                            <tr className="align-middle">
                              <td className="p-1">
                                <p className="text-[13px] flex items-center gap-x-2">
                                  Factory Plan Target :
                                </p>
                              </td>
                              <td className="p-1">
                                <div className="flex gap-x-2 items-center">
                                  <span className="flex bg-blue-200 text-[13px] px-2 py-1 rounded-sm text-blue-800">
                                    {planByFactory?.length > 0
                                      ? Number(planByFactory[0]?.SUM_HOURS)
                                      : 0}
                                  </span>
                                  <p className="text-[12px]">ชั่วโมง</p>
                                </div>
                              </td>
                            </tr>
                            <tr className="align-middle">
                              <td className="p-1">
                                <p className="text-[13px] flex items-center gap-x-2">
                                  Workcell Plan Target :
                                </p>
                              </td>
                              <td className="p-1">
                                <div className="flex gap-x-2 items-center">
                                  <span className="flex bg-blue-200 text-[13px] px-2 py-1 rounded-sm text-blue-800">
                                    {planByWorkcell?.length > 0
                                      ? Number(planByWorkcell[0]?.SUM_HOURS)
                                      : 0}
                                  </span>
                                  <p className="text-[12px]">ชั่วโมง</p>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>

                      <div className="mb-2 col-span-12 lg:col-span-6">
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
                      <div className="mb-2 col-span-12 lg:col-span-6">
                        <label
                          htmlFor="Department"
                          className="text-[13px] text-gray-700"
                        >
                          <span className="text-[red]">*</span> หน่วยงาน /
                          Department
                        </label>
                        <Select
                          value={values.group?.toString()}
                          onValueChange={async (e) => {
                            setGroup(e);
                            setFieldValue("group", e);
                            const fac: Factory[] = await GetAllFactoryByGroup(
                              token,
                              Number(e)
                            );
                            if (fac?.length > 0) {
                              setAllFactory(fac);

                              setIsLoadWorkcell(true);
                              getUserDataByFactory(Number(fac[0]?.ID_FACTORY));
                              setFactory(Number(fac[0]?.ID_FACTORY));

                              setTimeout(() => {
                                setFieldValue("factory", fac[0]?.ID_FACTORY);
                              }, 300);

                              // Promise Repert Array Workcell
                              const responseWorkcell =
                                await GetWorkcellByFactory(
                                  token,
                                  Number(fac[0]?.ID_FACTORY)
                                );
                                let year = moment(dateRequestStart).year()
                                let month =  moment(dateRequestStart)?.month() + 1

                          
                              setPlanByFactory(
                                await GetPlanByFactory(
                                  token,
                                  Number(fac[0]?.ID_FACTORY),
                                  year,
                                  month
                                )
                              );
                              if (responseWorkcell?.length > 0) {
                                setAllWorkcell(responseWorkcell); // Set Workcell list
                                setIsLoadWorkcell(false);
                                setFieldValue(
                                  "workcell",
                                  responseWorkcell[0]?.ID_WORK_CELL
                                );

                                let year = moment(dateRequestStart).year()
                                let month =  moment(dateRequestStart)?.month() + 1

                                setPlanByWorkcell(
                                  await GetPlanByWorkcell(
                                    token,
                                    Number(responseWorkcell[0]?.ID_WORK_CELL),
                                    year,
                                    month
                                  )
                                );
                              } else {
                                setAllWorkcell([]);
                                setIsLoadWorkcell(false);
                                setPlanByWorkcell([]);
                              }
                            } else {
                              setAllFactory([]);
                            }
                          }}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue
                              placeholder="Group Department"
                              className="text-[13px]"
                            />
                          </SelectTrigger>
                          <SelectContent className="h-[150px]">
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
                      <div className="mb-2 col-span-12 lg:col-span-6">
                        <label
                          htmlFor="Factory"
                          className="text-[13px] text-gray-700 flex gap-x-2 items-center mb-1"
                        >
                          <span className="text-[red]">*</span> Work Group /
                          กลุ่มงาน
                          <Tooltip>
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Info
                                    size={16}
                                    className="text-gray-400 cursor-pointer"
                                  />
                                </TooltipTrigger>
                                <TooltipContent className="w-[280px] h-[80px] overflow-auto p-2 bg-blue-50">
                                  <p className="text-[13px] font-medium underline text-gray-800 mb-[0.2rem]">
                                    คำอธิบาย
                                  </p>
                                  <p className="text-gray-800">{descGroup}</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </Tooltip>
                        </label>

                        <Select
                          value={values.groupworkcell?.toString()}
                          onValueChange={async (e) => {
                            setFieldValue("groupworkcell", e);
                            FindDescriptionGroup(Number(e));
                          }}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue
                              placeholder="Group Workcell"
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
                          <span className="text-[red]">*</span> โรงงาน / Factory
                        </label>
                        <Select
                          value={values.factory?.toString()}
                          onValueChange={async (e) => {
                            setIsLoadWorkcell(true);
                            getUserDataByFactory(Number(e));
                            setFactory(Number(e));
                            setFieldValue("factory", e);
                            // Promise Repert Array Workcell
                            const responseWorkcell = await GetWorkcellByFactory(
                              token,
                              Number(e)
                            );
                            let year = moment(dateRequestStart).year()
                            let month =  moment(dateRequestStart)?.month() + 1
                            setPlanByFactory(
                              await GetPlanByFactory(
                                token,
                                Number(e),
                                year,
                                month
                              )
                            );
                            if (responseWorkcell?.length > 0) {
                              setAllWorkcell(responseWorkcell); // Set Workcell list
                              setIsLoadWorkcell(false);
                              setFieldValue(
                                "workcell",
                                responseWorkcell[0]?.ID_WORK_CELL
                              );
                              let year = moment(dateRequestStart).year()
                              let month =  moment(dateRequestStart)?.month() + 1
                              setPlanByWorkcell(
                                await GetPlanByWorkcell(
                                  token,
                                  Number(responseWorkcell[0]?.ID_WORK_CELL),
                                  year,
                                  month
                                )
                              );
                            } else {
                              setAllWorkcell([]);
                              setIsLoadWorkcell(false);
                              setPlanByWorkcell([]);
                            }
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
                            onValueChange={async (e) => {
                              setFieldValue("workcell", e);

                              setPlanByWorkcell(
                                await GetPlanByWorkcell(
                                  token,
                                  Number(e),
                                  new Date().getFullYear(),
                                  moment(dateStart).month() + 1
                                )
                              );
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
                                    value={item.ID_WORK_CELL.toString()}
                                    className="text-[13px]"
                                    key={index}
                                  >
                                    {item.NAME_WORKCELL}
                                  </SelectItem>
                                );
                              })}
                            </SelectContent>
                          </Select>
                        )}
                      </div>
                    </div>
                    <p className="text-gray-800 text-[13px] mb-1 flex items-center mt-2">
                      {actualFactory +
                        usersData?.filter((x) => x.CHECKED)?.length *
                          duration.asHours() >
                      planByFactory[0]?.SUM_HOURS ? (
                        <span className="text-[#F3424B] flex items-center gap-x-2">
                          <Info size={13} /> ท่านขอ OT เกินแผน / Factory
                          (ชั่วโมง) :
                        </span>
                      ) : (
                        ""
                      )}

                      {actualFactory +
                        usersData?.filter((x) => x.CHECKED)?.length *
                          duration.asHours() >
                      planByWorkcell[0]?.SUM_HOURS ? (
                        <span className="text-[#F3424B] flex items-center gap-x-2">
                          <Info size={13} /> ท่านขอ OT เกินแผน / Workcell
                          (ชั่วโมง) :
                        </span>
                      ) : (
                        ""
                      )}
                    </p>

                    <p className="my-2 text-[13px] text-gray-800 mt-[.5rem]">
                      รวมเวลาทั้งหมด (ชั่วโมง) :
                    </p>
                    <div className="grid grid-cols-12 mb-[1rem]">
                      <div className="col-span-4">
                        <div className="flex items-center gap-x-2">
                          <div className="border-2 boder-[#038509] p-2 rounded-[5px] flex items-center w-full">
                            <p className="text-[14px] text-gray-800 font-medium">
                              {(
                                usersData?.filter((x) => x.CHECKED)?.length *
                                duration.asHours()
                              )?.toLocaleString()}
                            </p>
                          </div>
                        </div>
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
