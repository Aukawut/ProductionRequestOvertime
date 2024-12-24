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

import LoadingCircle from "@/components/custom/loading-circle";
import { motion } from "framer-motion";
import moment from "moment";
import { GetActualCompareWorkgroup, GetSummaryActualCompareWorkCell, GetSummaryActualCompareWorkGroup } from "@/function/main";
import BarStackChart from "./BarStackChart/BarStackChart";
import BarChartWorkgroup from "./BarChartWorkgroup/BarChartWorkgroup";
import TableOvertimeWorkcell from "./TableOvertime/TableOvertimeWorkcell";


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
  OT_DATE: string;
  EMPLOYEE_CODE: string;
  NAME_WORKGRP: string;
  NAME_UGROUP: string;
  NAME_WORKCELL: string;
  HOURS: number;
  HOURS_AMOUNT :string ;
}



export interface ActualByFactory {
  FACTORY_NAME: string;
  ID_FACTORY: number;
  INLINE_HOURS: number;
  OFFLINE_HOURS: number;
}
export interface ActualByOvertimeType {
  ID_TYPE_OT: number;
  HOURS_AMOUNT: string;
  SUM_HOURS: number;
}
export interface ActualByOvertimeDate {
  INLINE_HOURS: number;
  OFFLINE_HOURS: number;
  DATE_OT: string;
}

export interface ActualByWorkcell {
  SUM_HOURS: number;
  NAME_WORKCELL: string;

}
export interface ActualByWorkgroup {
  SUM_HOURS: number;
  NAME_WORKGRP: string;

}


const OvertimeActualWorkCellReport: React.FC = () => {
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [allActual, setAllActual] = useState<Actual[]>([]);
  const [actualByWorkcell, setActualByWorkcell] = useState<ActualByWorkcell[]>([]);
  const [actualByWorkgroup, setActualByWorkgroup] = useState<ActualByWorkgroup[]>([]);

  const token = useOTManagementSystemStore((state) => state.token);
  const [load, setLoad] = useState(false);

  const fetchData = async () => {
    setLoad(true);
    await Promise.all([
      await GetActualCompareWorkgroup(
        token,
        moment(moment(new Date())).format("YYYY-MM-DD"),
        moment(moment(new Date()).add(5, "days")).format("YYYY-MM-DD")
      ),
      await GetSummaryActualCompareWorkCell(
        token,
        moment(moment(new Date())).format("YYYY-MM-DD"),
        moment(moment(new Date()).add(5, "days")).format("YYYY-MM-DD")
      ),
      await GetSummaryActualCompareWorkGroup(
        token,
        moment(moment(new Date())).format("YYYY-MM-DD"),
        moment(moment(new Date()).add(5, "days")).format("YYYY-MM-DD")
      ),
      ,
    ]).then((res) => {
      if (res[0]?.length > 0) {
        setAllActual(res[0]);
      } else {
        setAllActual([]);
      }

      if (res[1]?.length > 0) {
        setActualByWorkcell(res[1]);
      } else {
        setActualByWorkcell([]);
      }
      
      if (res[2]?.length > 0) {
        setActualByWorkgroup(res[2]);
      } else {
        setActualByWorkgroup([]);
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
          ข้อมูลการทำโอที | Overtime Actual (Compare Workgroup)
        </p>
      </div>

      <div className="flex gap-x-2 items-center">
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
                const response = await GetActualCompareWorkgroup(
                  token,
                  moment(moment(startDate)).format("YYYY-MM-DD"),
                  moment(moment(endDate)).format("YYYY-MM-DD")
                );

                const responseSummaryWorkcell = await GetSummaryActualCompareWorkCell(
                  token,
                  moment(moment(startDate)).format("YYYY-MM-DD"),
                  moment(moment(endDate)).format("YYYY-MM-DD")
                );
                
                const responseSummaryWorkgroup = await GetSummaryActualCompareWorkGroup(
                  token,
                  moment(moment(startDate)).format("YYYY-MM-DD"),
                  moment(moment(endDate)).format("YYYY-MM-DD")
                );

                if (response?.length > 0) {
                  setAllActual(response);
                } else {
                  setAllActual([]);
                }

                if (responseSummaryWorkcell?.length > 0) {
                  setActualByWorkcell(responseSummaryWorkcell);
                } else {
                  setActualByWorkcell([]);
                }
                
                if (responseSummaryWorkgroup?.length > 0) {
                  setActualByWorkgroup(responseSummaryWorkgroup);
                } else {
                  setActualByWorkgroup([]);
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
      {load ? (
        <div className="flex justify-center items-center h-[50vh]">
          <div>
            <LoadingCircle />
          </div>
        </div>
      ) : (
        <>
          <div>

            <div className="my-2 p-2">
              <BarStackChart actualByWorkcell={actualByWorkcell} />
            </div>

            <div className="my-2 p-2">
              <BarChartWorkgroup actualByWorkgroup={actualByWorkgroup} />
            </div>
          </div>

          <div className="p-2 my-2">
            <p className="text-[13.5px] font-medium text-gray-800">
              ตารางแสดงข้อมูลการทำโอที | Table showing Overtime Data
            </p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "tween", duration: 0.3 }}
            >
              <TableOvertime data={allActual} />
            </motion.div>
          </div>

          <hr />
          <div className="p-2 my-2">
            <p className="text-[13.5px] font-medium text-gray-800">
              ตารางแสดงข้อมูลการทำโอทีแยกแต่ละ Workcell
            </p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "tween", duration: 0.3 }}
            >
              <TableOvertimeWorkcell data={actualByWorkcell} />
            </motion.div>
          </div>
        </>
      )}
    </div>
  );
};

export default OvertimeActualWorkCellReport;
