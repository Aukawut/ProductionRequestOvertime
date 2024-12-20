import React, { useEffect, useState } from "react";
import QuaterMonthBarChart from "./Charts/QuaterMonthBarChart";
import OvertimeBarChartByDept from "./Charts/OvertimeBarChartByDept";

import OvertimeScatterChartByDate from "./Charts/OvertimeScatterChartByDate";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  GetCountActualByUserGroup,
  GetMenuyearOverview,
  GetSummaryActualByDate,
  GetSummaryActualByFactory,
  GetSummaryActualComparePlan,
  GetUserGroup,
} from "@/function/main";
import { useOTManagementSystemStore } from "../../../store";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";

import { Search } from "lucide-react";
import LoadingCircle from "@/components/custom/loading-circle";
import CountUp from "react-countup";
import moment from "moment";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import Polygon from "@/components/custom/Polygon/Polygon";
import CircleShape from "@/components/custom/CircleShape/CircleShape";

export interface UserGroup {
  ID_UGROUP: number;
  NAME_UGROUP: string;
}

export interface SummaryActualComparePlan {
  MONTH_NO: number;
  MONTH_NAME: string;
  MONTH: number;
  SUM_OT_ACTUAL: number;
  SUM_OT_PLANWC: number;
  SUM_OT_PLANOB: number;
}
export interface SummaryActualComparePlanByFac {
  ID_FACTORY: number;
  FACTORY_NAME: string;
  SUM_ACTUAL: number;
  SUM_PLAN: number;
  SUM_PLAN_OB: number;
}

export interface CountAmountActual {
  COUNT_OT: number;
}

export interface SummaryActualByDate {
  DATE_OT: string;
  SUM_TOTAL: number;
  DAY_OT: number;
  COUNT_OT: number;
}

const Overview: React.FC = () => {
  const token = useOTManagementSystemStore((state) => state.token);
  const [userGroup, setUserGroup] = useState<UserGroup[]>([]);
  const [group, setGroup] = useState(1);
  const [actual, setActual] = useState<SummaryActualComparePlan[]>([]);
  const [countActual, setCountActual] = useState<CountAmountActual[]>([]);
  const [countActualByDate, setCountActualByDate] = useState<
    SummaryActualByDate[]
  >([]);
  const [actualByFactory, setActualByFactory] = useState<
    SummaryActualComparePlanByFac[]
  >([]);
  const [ugroup, setUgroup] = useState(1);
  const [ugroupScatter, setUgroupScatter] = useState(1);

  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();

  const [startDateScatter, setStartDateScatter] = useState<Date>();
  const [endDateScatter, setEndDateScatter] = useState<Date>();

  const [menuYear, setMenuYear] = useState<number[]>([]);

  const [year, setYear] = useState(new Date().getFullYear());

  const [load, setLoad] = useState(false);
  const [reRender, setReRender] = useState(false);
  const [reRenderBarFac, setReRenderBarFac] = useState(false);
  const [reRenderScatter, setReRenderScatter] = useState(false);

  const sumHoursOverByFac = actualByFactory?.reduce(
    (acc, obj) => acc + obj.SUM_ACTUAL,
    0
  );

  const fetchData = async (load: boolean) => {
    setLoad(load);
    await Promise.all([
      await GetUserGroup(token),
      await GetSummaryActualComparePlan(token, year),
      await GetSummaryActualByFactory(
        token,
        moment(startDate).format("YYYY-MM-DD"),
        moment(endDate).format("YYYY-MM-DD"),
        ugroup
      ),
      await GetCountActualByUserGroup(
        token,
        moment(startDate).format("YYYY-MM-DD"),
        moment(endDate).format("YYYY-MM-DD"),
        ugroup
      ),
      await GetSummaryActualByDate(
        token,
        moment(startDate).format("YYYY-MM-DD"),
        moment(endDate).format("YYYY-MM-DD"),
        ugroup
      ),
    ]).then((res) => {
      setUserGroup(res[0]);
      if (res[1]?.length > 0) {
        setActual(res[1]);
      } else {
        setActual([]);
      }

      if (res[2]?.length > 0) {
        setActualByFactory(res[2]);
      } else {
        setActualByFactory([]);
      }

      if (res[3]?.length > 0) {
        setCountActual(res[3]);
      } else {
        setCountActual([]);
      }

      if (res[4]?.length > 0) {
        setCountActualByDate(res[4]);
      } else {
        setCountActualByDate([]);
      }
      setLoad(false);
    });
  };

  useEffect(() => {
    setStartDate(new Date());
    setEndDate(moment(new Date()).add(5, "days").toDate());

    setStartDateScatter(new Date());
    setEndDateScatter(moment(new Date()).add(5, "days").toDate());

    setMenuYear(GetMenuyearOverview());
    fetchData(true);
  }, []);

  return load ? (
    <div className="flex h-[90vh] items-center justify-center">
      <LoadingCircle />
    </div>
  ) : (
    <div className="p-[0.5rem]">
      {/* <-------- [START] Section 1 ------->*/}

      <div
        className="w-full rounded-[16px] bg-gradient relative overflow-hidden"
        style={{
          boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
        }}
      >
        <div className="absolute -left-[8rem] -top-[10rem] -z-1">
          <div className="flex w-[12rem]">
            <Polygon color="#EBF6FE" />
          </div>
        </div>

        <div className="flex flex-col p-[1rem] justify-center w-full items-start">
          <p className="text-[13px] text-gray-700">Summary Report OT / Year</p>
          <div className="mt-2 flex gap-x-2 items-center">
            <div>
              <p className="mb-1 text-gray-900 text-[13px] font-medium">
                Year / ปี :
              </p>
              <Select
                value={year?.toString()}
                onValueChange={(e) => setYear(Number(e))}
              >
                <SelectTrigger className="w-[180px] bg-white">
                  <SelectValue placeholder="Select Year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel className="text-[14px]">Years</SelectLabel>
                    {menuYear?.map((item) => (
                      <SelectItem
                        value={item?.toString()}
                        className="text-[12px]"
                        key={item}
                      >
                        {item}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div>
              <p className="mb-1 text-gray-900 text-[13px] font-medium">
                User Group :
              </p>
              <div className="flex items-center gap-x-2">
                <Select
                  value={ugroup?.toString()}
                  onValueChange={(e) => setUgroup(Number(e))}
                >
                  <SelectTrigger className="w-[180px] bg-white">
                    <SelectValue placeholder="Select Year" />
                  </SelectTrigger>
                  <SelectContent className="">
                    <SelectGroup>
                      <SelectLabel className="text-[14px]">
                        User Group
                      </SelectLabel>
                      {userGroup?.map((item) => (
                        <SelectItem
                          value={item.ID_UGROUP?.toString()}
                          className="text-[12px]"
                          key={item.ID_UGROUP}
                        >
                          {item.NAME_UGROUP}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <Button
                  size={"sm"}
                  className="bg-[#107EDB] text-white hover:bg-[#1c77c2]"
                  type="button"
                  onClick={async () => {
                    setReRender(true);
                    const response = await GetSummaryActualComparePlan(
                      token,
                      year
                    );
                    if (response?.length > 0) {
                      setActual(response);
                    } else {
                      setActual([]);
                    }
                    setReRender(false);
                  }}
                >
                  ค้นหา <Search />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Bar Chart */}
        {reRender ? (
          <div className="h-[300px] flex justify-center items-center">
            <LoadingCircle />
          </div>
        ) : (
          <QuaterMonthBarChart data={actual} year={year} />
        )}
      </div>
      {/* <-------- [END] Section 1 ------->*/}

      {/* <-------- [START] Section 2 ------->*/}
      <div
        className="w-full rounded-[16px] p-2 my-2 bg-gradient relative overflow-hidden"
        style={{
          boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
        }}
      >
        <div className="absolute -left-[6.5rem] top-[7rem] ">
          <div className="flex w-[1rem] h-auto">
            <div className="w-full">
              <CircleShape color="#EBF6FE" />
            </div>
          </div>
        </div>
        <div className="flex flex-col p-[0.5rem] justify-center w-full items-start mb-2">
          <p className="text-[13px] text-gray-700 font-medium">
            Summary Report OT By Factory
          </p>
        </div>
        <div className="flex gap-x-2 items-center px-3">
          <div>
            <div className="flex items-center gap-x-2">
              <div>
                <p className="mb-1 text-gray-900 text-[13px] font-medium">
                  User Group :
                </p>
                <Select
                  value={group?.toString()}
                  onValueChange={(e) => setGroup(Number(e))}
                >
                  <SelectTrigger className="w-[180px] bg-white " style={{zIndex:20}}>
                    <SelectValue placeholder="Select Year" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel className="text-[14px]">
                        User Group
                      </SelectLabel>
                      {userGroup?.map((item) => (
                        <SelectItem
                          value={item.ID_UGROUP?.toString()}
                          className="text-[12px]"
                          key={item.ID_UGROUP}
                        >
                          {item.NAME_UGROUP}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <p className="mb-1 text-gray-900 text-[13px] font-medium">
                  ช่วงเวลา :
                </p>
                <div className="flex items-center gap-x-2">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[200px] justify-start text-left font-normal text-[13px]",
                          !startDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {startDate ? (
                          format(startDate, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={startDate}
                        onSelect={(date) => {
                          setStartDate(date);
                        }}
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
                          "w-[200px] justify-start text-left font-normal text-[13px]",
                          !endDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {endDate ? (
                          format(endDate, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={endDate}
                        disabled={(date) => {
                          return (
                            moment(date).utc().toDate() <
                            moment(startDate).utc().toDate()
                          );
                        }}
                        onSelect={(date) => {
                          setEndDate(date);
                        }}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <Button
                size={"sm"}
                className="bg-[#107EDB] text-white hover:bg-[#1c77c2] mt-5"
                type="button"
                onClick={async () => {
                  setReRenderBarFac(true);
                  const response = await GetSummaryActualByFactory(
                    token,
                    moment(startDate).format("YYYY-MM-DD"),
                    moment(endDate).format("YYYY-MM-DD"),
                    ugroup
                  );
                  const count = await GetCountActualByUserGroup(
                    token,
                    moment(startDate).format("YYYY-MM-DD"),
                    moment(endDate).format("YYYY-MM-DD"),
                    ugroup
                  );
                  if (response?.length > 0) {
                    setActualByFactory(response);
                  } else {
                    setActualByFactory([]);
                  }

                  if (count?.length > 0) {
                    setCountActual(count);
                  } else {
                    setCountActual([]);
                  }
                  setReRenderBarFac(false);
                }}
              >
                ค้นหา <Search />
              </Button>
            </div>
          </div>
        </div>
        <hr className="my-2" />
        <div className="grid grid-cols-12 mt-1 gap-2">
          <div className="col-span-8">
            <div>
              {reRenderBarFac ? (
                <div className="h-[200px] flex justify-center items-center">
                  <LoadingCircle />
                </div>
              ) : (
                <OvertimeBarChartByDept data={actualByFactory} />
              )}
            </div>
          </div>
          <div className="col-span-4">
            <div className="flex w-full flex-col gap-2 h-5/6">
              <div
                className="p-4 bg-white rounded-[16px] h-full flex flex-col justify-center"
                style={{
                  boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
                }}
              >
                <p className="text-[#1DA2AF] text-[22px] font-semibold text-center">
                  <CountUp
                    start={0}
                    end={
                      isNaN(Number(sumHoursOverByFac))
                        ? 0
                        : Number(sumHoursOverByFac)
                    }
                    separator=","
                    duration={1}
                    decimals={2}
                  />
                </p>
                <p className="text-gray-400 text-[14px] font-medium text-center">
                  Overtime Hours
                </p>
              </div>
              <div
                className="p-4 bg-white rounded-[16px] h-full flex flex-col justify-center"
                style={{
                  boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
                }}
              >
                <p className="text-[22px] font-medium text-center text-[#FB8601]">
                  <CountUp
                    start={0}
                    end={
                      Number(countActual[0]?.COUNT_OT) > 0
                        ? Number(countActual[0]?.COUNT_OT)
                        : 0
                    }
                    duration={1}
                  />
                </p>
                <p className="text-gray-400 text-[14px] font-medium text-center">
                  Overtime Amount
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <-------- [END] Section 2 ------->*/}

      <div
        className="p-4 rounded-[16px] h-full flex flex-col justify-center mt-2 bg-gradient relative overflow-hidden"
        style={{
          boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
        }}
      >
        <div className="absolute -left-[4rem] -top-[5rem] -z-1">
          <div className="flex w-[12rem]">
            <Polygon color="#EBF6FE" />
          </div>
        </div>
        <div className="absolute -right-[2rem] -top-[4rem]">
          <div className="flex w-[10rem]">
            <Polygon color="#F8FCFF" />
          </div>
        </div>
        <div className="absolute -right-[2rem] -top-[12rem]">
          <div className="flex w-[5rem]">
            <Polygon color="#FBFDFF" />
          </div>
        </div>

        <div className="flex flex-col p-[1rem] justify-center w-full items-start">
          <p className="text-[13px] text-gray-700">Summary Report OT By Date</p>
          <p className="text-[12px] text-gray-500">Scatter Chart</p>
        </div>
        <div className="flex gap-x-2 items-center px-3">
          <div>
            <div className="flex items-center gap-x-2">
              <div>
                <p className="mb-1 text-gray-900 text-[13px] font-medium">
                  User Group :
                </p>
                <Select
                  value={ugroupScatter?.toString()}
                  onValueChange={(e) => setUgroupScatter(Number(e))}
                >
                  <SelectTrigger className="w-[180px] bg-white">
                    <SelectValue placeholder="Select Year" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel className="text-[14px]">
                        User Group
                      </SelectLabel>
                      {userGroup?.map((item) => (
                        <SelectItem
                          value={item.ID_UGROUP?.toString()}
                          className="text-[12px]"
                          key={item.ID_UGROUP}
                        >
                          {item.NAME_UGROUP}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <p className="mb-1 text-gray-900 text-[13px] font-medium">
                  ช่วงเวลา :
                </p>
                <div className="flex items-center gap-x-2">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[200px] justify-start text-left font-normal text-[13px]",
                          !startDateScatter && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {startDateScatter ? (
                          format(startDateScatter, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={startDateScatter}
                        onSelect={(date) => {
                          setStartDateScatter(date);
                        }}
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
                          "w-[200px] justify-start text-left font-normal text-[13px]",
                          !endDateScatter && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {endDateScatter ? (
                          format(endDateScatter, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={endDateScatter}
                        disabled={(date) => {
                          return (
                            moment(date).utc().toDate() <
                            moment(startDateScatter).utc().toDate()
                          );
                        }}
                        onSelect={(date) => {
                          setEndDateScatter(date);
                        }}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <Button
                size={"sm"}
                className="bg-[#107EDB] text-white hover:bg-[#1c77c2] mt-5"
                type="button"
                onClick={async () => {
                  setReRenderScatter(true);
                  const response = await GetSummaryActualByDate(
                    token,
                    moment(startDateScatter).format("YYYY-MM-DD"),
                    moment(endDateScatter).format("YYYY-MM-DD"),
                    ugroupScatter
                  );

                  if (response?.length > 0) {
                    setCountActualByDate(response);
                  } else {
                    setCountActualByDate([]);
                  }

                  setReRenderScatter(false);
                }}
              >
                ค้นหา <Search />
              </Button>
            </div>
          </div>
        </div>
        <hr className="my-2" />

        {reRenderScatter ? (
          <div className="h-[250px] flex justify-center items-center">
            <LoadingCircle />
          </div>
        ) : countActualByDate?.length > 0 ? (
          <OvertimeScatterChartByDate data={countActualByDate} />
        ) : (
          <div className="w-full h-[300px] flex justify-center items-center">
            -
          </div>
        )}
      </div>
    </div>
  );
};

export default Overview;
