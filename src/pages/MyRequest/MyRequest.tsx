import React, { useEffect, useRef, useState } from "react";
import TableRequest from "./TableRequest/TableRequest";
import CardRequest from "@/components/custom/card-myrequest";

import { cardMenu } from "./data";
import { Button } from "@/components/ui/button";
import { AlertCircle, ChevronDown, ChevronUp, Plus } from "lucide-react";
import DonutRequest from "./chart/DonutRequest";
import {
  CountRequestByEmpCode,
  CountRequestByYear,
  GetYearMenuOption,
  GetMonthMenuOption,
  GetRequestNoAndStatusByUser,
} from "../../function/main";
import { motion } from "framer-motion";
import { useOTManagementSystemStore } from "../../../store";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useNavigate } from "react-router-dom";

export interface CountRequest {
  AMOUNT: number;
  NAME_STATUS: string;
}

export interface YearMenu {
  AMOUNT_REQ: number;
  YEAR_RQ: number;
}

export interface MonthMenu {
  AMOUNT_REQ: number;
  MONTH_RQ: number;
}

export interface RequestByYear {
  AMOUNT_REQ: number;
  YEAR_RQ: number;
  MONTH_RQ: number;
}

export interface RequestNoByUser {
  REQUEST_NO: string;
  REQ_STATUS: number;
  REV: number;
  NAME_STATUS: string;
}

const MyRequest: React.FC = () => {
  const [countRequest, setCountRequest] = useState<CountRequest[]>([]);
  const token = useOTManagementSystemStore((state) => state.token);
  const sum = countRequest?.reduce((acc, obj) => acc + obj.AMOUNT, 0);
  const containerTop = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(true);
  const [yearMenu, setYearMenu] = useState<YearMenu[]>([]);
  const [monthMenu, setMonthMenu] = useState<MonthMenu[]>([]);
  const [requestByYear, setRequestByYear] = useState<RequestByYear[]>([]);
  const [requests, setRequests] = useState<RequestNoByUser[]>([]);

  const empCode = useOTManagementSystemStore(
    (state) => state.info?.EmployeeCode
  );

  const findAmount: (alisTitle: string) => number = (alisTitle: string) => {
    const obj = countRequest.find((x) => x.NAME_STATUS == alisTitle);

    if (obj) {
      return obj.AMOUNT;
    } else {
      return 0;
    }
  };

  const [scrollInfo, setScrollInfo] = useState({
    scrollLeft: 0,
    scrollTop: 0,
  });

  const fetchData = async () => {
    const year = new Date().getFullYear();
    Promise.all([
      setCountRequest(await CountRequestByEmpCode(token, empCode)),
      setYearMenu(await GetYearMenuOption(token)),
      setMonthMenu(await GetMonthMenuOption(token,year)),
      setRequestByYear(await CountRequestByYear(token, year)),
      setRequests(await GetRequestNoAndStatusByUser(token, empCode)),
    ]).then(() => {
      setProgress(false);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleScroll = () => {
    if (containerTop.current) {
      setScrollInfo({
        scrollLeft: containerTop.current.scrollLeft,
        scrollTop: containerTop.current.scrollTop,
      });
    }
  };

  const navigate = useNavigate();
  
  useEffect(() => {
    const container = containerTop.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);
  

  useEffect(() => {}, [scrollInfo]);

  return (
    <motion.div
      className="px-2"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "tween", duration: 0.3 }}
    >
      <p className="text-[14px] text-gray-700 mt-2 font-medium mb-2">
        My Request / คำขอของฉัน
      </p>
      <div className="relative">
        <div
          className="h-[180px] flex justify-center items-start w-full overflow-auto p-2 scrollbar-hide px-[1rem]"
          ref={containerTop}
        >
          {scrollInfo?.scrollTop > 60 ? (
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, type: "tween" }}
              className="absolute top-0 -right-1 z-[5] w-4 h-4 flex justify-center items-center bg-blue-50 rounded-sm"
              type="button"
              onClick={() => {
                containerTop.current?.scrollTo(0, 0);
              }}
            >
              <ChevronUp size={16} />
            </motion.button>
          ) : (
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, type: "tween" }}
              className="absolute bottom-0 -right-1 z-[5] w-4 h-4 flex justify-center items-center bg-blue-50 rounded-sm"
              type="button"
              onClick={() => {
                containerTop.current?.scrollTo(0, 180);
              }}
            >
              <ChevronDown size={16} />
            </motion.button>
          )}

          <div className="grid grid-cols-12 gap-x-2 gap-y-2 w-full">
            {cardMenu?.map((item, index) => (
              <div className="col-span-12 lg:col-span-3" key={index}>
                <CardRequest
                  Icon={item.Icon}
                  title={item.title}
                  amount={findAmount(item.aliasTitle)}
                  sumAll={sum}
                  bgColor={item.bgColor}
                  textColor={item.textColor}
                  titleTH={item.titleTH}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-12 mt-2 gap-x-2">
        <div className="col-span-12 lg:col-span-6">
          <div
            className="bg-white rounded-[16px] w-full p-4"
            style={{
              boxShadow: "rgba(0, 0, 0, 0.05) 0px 2px 4px",
            }}
          >
            <Button
              type="button"
              size={"sm"}
              className="rounded-[8px] text-[12px] mt-2"
              onClick={() => {
                navigate("/request")
              }}
            >
              <Plus />
              New
            </Button>
            <div className="py-1 mt-2">
              <p className="text-[14px] font-medium">
                The table displays the status of your requests
              </p>
              <p className="text-[12px] font-medium text-gray-600">
                ตารางแสดงข้อมูลสถานะคำขอของคุณ
              </p>
              <TableRequest users={requests} />
            </div>
          </div>
        </div>

        {/* Chart */}
        <div className="col-span-12 lg:col-span-6">
          {progress ? (
            <div className="h-[300px] flex justify-center items-center w-full">
              <svg
                aria-hidden="true"
                className="w-7 h-7 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
            </div>
          ) : requestByYear?.length > 0 ? (
            <DonutRequest
              yearMenu={yearMenu}
              requestByYear={requestByYear}
              monthMenu={monthMenu}
              setMonthMenu={setMonthMenu}
              setRequestByYear={setRequestByYear}
            />
          ) : (
            <Alert variant="destructive">
              <AlertCircle className="h-5 w-5" />
              <AlertTitle>Sorry, </AlertTitle>
              <AlertDescription className="text-[13px]">
                your information was not found.
              </AlertDescription>
            </Alert>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default MyRequest;
