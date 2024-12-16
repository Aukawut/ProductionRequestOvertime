import React, { useEffect, useState } from "react";

import TablePreviewOvertime from "./TablePreviewOvertime/TablePreviewOvertime";
import { format } from "date-fns";
import { Popover, PopoverTrigger } from "@radix-ui/react-popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon, Pin, PlusCircle, Search } from "lucide-react";
import { PopoverContent } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import DialogAddOvertime from "./dialog-add-actual";
import { Toaster } from "sonner";

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

interface AllActual {

}

const OvertimeActual: React.FC = () => {
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [showAdd, setShowAdd] = useState(false);
  const [allActual,setAllActual] = useState([])
  
  useEffect(() => {
    setStartDate(new Date())
    setEndDate(new Date())


  },[])
  return (
    <div>
      <div className="my-2 flex items-center gap-x-2">
        <Pin size={16} color="red" />
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

      <div className="my-2">
        <Button
          size={"sm"}
          className="bg-[#107EDB] text-white hover:bg-[#1c77c2]"
          onClick={() => setShowAdd(true)}
        >
          <PlusCircle /> Add
        </Button>
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
        >
          ค้นหา <Search />
        </Button>
      </div>
      <hr />

      <DialogAddOvertime setIsOpen={setShowAdd} isOpen={showAdd} />

      <div className="p-2 my-2">
        <p className="text-[14px] font-medium text-gray-800">
          ตารางแสดงข้อมูลการทำโอที | Table showing Overtime Data
        </p>
        <TablePreviewOvertime data={allActual} />
      </div>
    </div>
  );
};

export default OvertimeActual;
