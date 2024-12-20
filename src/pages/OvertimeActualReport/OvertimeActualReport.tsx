import React, { useEffect, useState } from "react";

import { format } from "date-fns";
import { Popover, PopoverTrigger } from "@radix-ui/react-popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon, ClockArrowUp, Search } from "lucide-react";
import { PopoverContent } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";

import TableOvertime from "./TableOvertime/TableOvertime";
import { useOTManagementSystemStore } from "../../../store";
import {
  GetActualOvertimeByDate,
  GetAllFactory,
  GetUserGroup,
} from "@/function/main";
import LoadingCircle from "@/components/custom/loading-circle";
import { motion } from "framer-motion";
import moment from "moment";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import BarStackChart from "./BarStackChart/BarStackChart";
import PieChartActual from "./PieChartActual/PieChartActual";

export interface CsvData {
  date: string;
  employeeCode: string;
  end: string;
  overtime1: number;
  overtime2: number;
  overtime3: number;
  overtime15: number;
  total: number;
  shift: string;
  start: string;
}

export interface AllActual {
  Id: number;
  EMPLOYEE_CODE: string;
  SCAN_IN: string;
  SCAN_OUT: string;
  OT_DATE: string;
  SHIFT: string;
  OT1_HOURS: number;
  OT15_HOURS: number;
  OT2_HOURS: number;
  OT3_HOURS: number;
  TOTAL_HOURS: number;
  UPDATED_AT: string;
  CREATED_BY: string;
  UPDATED_BY: string;
  FACTORY_NAME: string;
  NAME_UGROUP: string;
  NAME_UTYPE: string;
}

export interface Actual {
  EMPLOYEE_CODE: string;
  OT_DATE: string;
  SCAN_IN: string;
  SCAN_OUT: string;
  HOURS: number;
  FACTORY_NAME: string;
  NAME_UGROUP: string;
  UHR_Department: string;
  HOURS_AMOUNT: string;
  NAME_UTYPE: string;
  ID_FACTORY: number;
  ID_UTYPE: number;
  ID_UGROUP: number;
  ID_TYPE_OT: number;
}

interface UGroup {
  ID_UGROUP: number;
  NAME_UGROUP: string;
}
interface Factory {
  ID_FACTORY: number;
  FACTORY_NAME: string;
}

const OvertimeActualReport: React.FC = () => {
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [allActual, setAllActual] = useState<Actual[]>([]);
  const [ugroupList, setUgroupList] = useState<UGroup[]>([]);
  const [allFactory, setAllFactory] = useState<Factory[]>([]);
  const token = useOTManagementSystemStore((state) => state.token);
  const [load, setLoad] = useState(false);
  const [uGroup, setUGroup] = useState("0");
  const [factory, setFactory] = useState("0");

  const fetchData = async () => {
    setLoad(true);
    await Promise.all([
      await GetActualOvertimeByDate(
        token,
        moment(moment(new Date())).format("YYYY-MM-DD"),
        moment(moment(new Date()).add(5, "days")).format("YYYY-MM-DD"),
        uGroup,
        factory
      ),
      await GetUserGroup(token),
      await GetAllFactory(token),
    ]).then((res) => {
      if (res[0]?.length > 0) {
        setAllActual(res[0]);
      } else {
        setAllActual([]);
      }
      if (res[1]?.length > 0) {
        // Concat Ugroup List
        const gList: UGroup[] = [
          ...res[1],
          { ID_UGROUP: 0, NAME_UGROUP: "ทั้งหมด" },
        ];

        setUgroupList(gList);
      } else {
        setUgroupList([]);
      }
      if (res[2]?.length > 0) {
        const allFac: Factory[] = [
          ...res[2],
          { ID_FACTORY: 0, FACTORY_NAME: "ทั้งหมด" },
        ];

        setAllFactory(allFac);
      } else {
        setAllFactory([]);
      }

      setLoad(false);
    });
  };

  useEffect(() => {
    setStartDate(new Date());
    setEndDate(moment(moment(new Date()).add(5, "days")).toDate());
    fetchData();
  }, []);
  return (
    <div>
      <div className="my-2 flex items-center gap-x-2">
        <ClockArrowUp size={16} color="red" />
        <p className="text-[14.5px] text-gray-800">
          ข้อมูลการทำโอที | Overtime Actual
        </p>
      </div>

      <div className="flex gap-x-2 items-center">
        <div className="mb-1 px-4">
          <div className="flex mt-1 gap-x-2">
            <div className="mb-2">
              <label htmlFor="code" className="text-[12px]">
                Factory :
              </label>
              <div className="flex gap-x-1">
                <Select
                  onValueChange={(e) => {
                    setFactory(e);
                  }}
                  value={factory}
                >
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent className="h-[200px]">
                    <SelectGroup>
                      {allFactory?.map((item) => (
                        <SelectItem
                          value={item.ID_FACTORY?.toString()}
                          className="text-[13px]"
                        >
                          {item.FACTORY_NAME}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="mb-2 w-full">
              <label htmlFor="code" className="text-[12px]">
                User Group :
              </label>
              <Select
                onValueChange={(e) => {
                  setUGroup(e);
                }}
                value={uGroup}
              >
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent className="h-[200px]">
                  <SelectGroup>
                    {ugroupList?.map((item) => (
                      <SelectItem
                        value={item.ID_UGROUP?.toString()}
                        className="text-[13px]"
                      >
                        {item.NAME_UGROUP}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <div>
          <div className="text-[12px]">เลือกช่วงเวลา :</div>
          <div className="my-1 flex items-center gap-x-1">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "justify-start text-left font-normal",
                    !startDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon />
                  <p className="text-[13px]">
                    {startDate ? format(startDate, "PPP") : "Pick a date"}
                  </p>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={startDate}
                  onSelect={setStartDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            -
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "justify-start text-left font-normal",
                    !endDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon />
                  <p className="text-[13px]">
                    {endDate ? format(endDate, "PPP") : "Pick a date"}
                  </p>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={endDate}
                  onSelect={setEndDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            <Button
              type="button"
              className="bg-[#107EDB] text-white hover:bg-[#1c77c2]"
              size={"sm"}
              onClick={async () => {
                setLoad(true);
                const response = await GetActualOvertimeByDate(
                  token,
                  moment(moment(startDate)).format("YYYY-MM-DD"),
                  moment(moment(endDate)).format("YYYY-MM-DD"),
                  uGroup,
                  factory
                );
                if (response?.length > 0) {
                  setAllActual(response);
                } else {
                  setAllActual([]);
                }
                setLoad(false);
              }}
            >
              ค้นหา <Search />
            </Button>
          </div>
        </div>
      </div>

      <hr />
      <div className="grid grid-cols-12">
        <div className="col-span-4">
          <div className="w-full">
            <PieChartActual />
          </div>
        </div>
      </div>
      <div className="my-2 p-2">
        <BarStackChart />
      </div>

      <div className="p-2 my-2">
        <p className="text-[13.5px] font-medium text-gray-800">
          ตารางแสดงข้อมูลการทำโอที | Table showing Overtime Data
        </p>
        {!load ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "tween", duration: 0.3 }}
          >
            <TableOvertime data={allActual} />
          </motion.div>
        ) : (
          <div className="flex justify-center items-center h-[50vh]">
            <div>
              <LoadingCircle />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OvertimeActualReport;
