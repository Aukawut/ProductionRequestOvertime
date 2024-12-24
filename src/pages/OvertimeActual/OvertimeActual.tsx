import React, { useEffect, useState } from "react";

import { format } from "date-fns";
import { Popover, PopoverTrigger } from "@radix-ui/react-popover";
import { Button } from "@/components/ui/button";
import {
  CalendarIcon,
  FolderUp,
  LoaderCircle,
  PlusCircle,
  Search,
} from "lucide-react";
import { PopoverContent } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import DialogAddOvertime from "./dialog-add-actual";
import { Toaster } from "sonner";
import TableOvertime from "./TablePreviewOvertime/TableOvertime";
import { useOTManagementSystemStore } from "../../../store";
import { GetActualOvertimeByDateDuration } from "@/function/main";
import LoadingCircle from "@/components/custom/loading-circle";
import moment from "moment";
import ButtonExcelExport from "@/components/custom/ButtonExcelExport/ButtonExcelExport";

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

const OvertimeActual: React.FC = () => {
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [showAdd, setShowAdd] = useState(false);
  const [allActual, setAllActual] = useState<AllActual[]>([]);
  const token = useOTManagementSystemStore((state) => state.token);
  const [load, setLoad] = useState(false);

  const fetchData = async () => {
    setLoad(true);
    await Promise.all([
      await GetActualOvertimeByDateDuration(
        token,
        moment(startDate).subtract(6,"days").format("YYYY-MM-DD"),
        moment(endDate).format("YYYY-MM-DD")
      ),
    ]).then((res) => {
      if (res[0]?.length > 0) {
        setAllActual(res[0]);
      } else {
        setAllActual([]);
      }
      setLoad(false);
    });
  };

  useEffect(() => {
    setStartDate(moment(new Date()).subtract(6,"days").toDate());
    setEndDate(new Date());
    fetchData();
  }, []);
  return (
    <div>
      <div className="my-2 flex items-center gap-x-2">
        <div>
          <FolderUp size={17} color="#0890D3" />
        </div>

        <p className="text-[14.5px] text-gray-800">Overtime Actual</p>
      </div>

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

      <div className="my-2 flex gap-x-2">
        <Button
          size={"sm"}
          className="bg-[#107EDB] text-white hover:bg-[#1c77c2]"
          onClick={() => setShowAdd(true)}
        >
          <PlusCircle /> Add
        </Button>
        <ButtonExcelExport data={allActual} fileName="Actual" />
      </div>
      <div className="text-[12px]">เลือกช่วงเวลา</div>
      <div className="my-1 flex items-center gap-x-1">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-[200px] justify-start text-left font-normal",
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
                "w-[200px] justify-start text-left font-normal",
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
            await Promise.all([
              await GetActualOvertimeByDateDuration(
                token,
                moment(startDate).format("YYYY-MM-DD"),
                moment(endDate).format("YYYY-MM-DD")
              ),
            ]).then((res) => {
              if (res[0]?.length > 0) {
                setAllActual(res[0]);
              } else {
                setAllActual([]);
              }
              setLoad(false);
            });
          }}
        >
          ค้นหา {load ? <LoaderCircle className="animate-spin" /> : <Search />}
        </Button>
      </div>
      <hr />

      <DialogAddOvertime setIsOpen={setShowAdd} isOpen={showAdd} />

      <div className="p-2 my-2">
        <p className="text-[14px] font-medium text-gray-800">
          ตารางแสดงข้อมูลการทำโอที | Table showing Overtime Data  {Number(allActual?.length)?.toLocaleString()} รายการ
        </p>
        {!load ? (
          <TableOvertime
            data={allActual}
            GetActualOvertimeByDateDuration={GetActualOvertimeByDateDuration}
            setAllActual={setAllActual}
            start={moment(startDate).format("YYYY-MM-DD")}
            end={moment(endDate).format("YYYY-MM-DD")}
          />
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

export default OvertimeActual;
