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
  GetRequestDetailByRequest,
  GetUserByRequestAndRev,
  GetCommentApproverByRequestNo,
  GetPlanByWorkcell,
  GetRequestListByUserCodeAndStatus,
} from "../../function/main";
import { motion } from "framer-motion";
import { useOTManagementSystemStore } from "../../../store";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useNavigate } from "react-router-dom";
import DialogRequestList from "./dialog-request-list";
import moment from "moment";
import { toast } from "sonner";
import DialogDetailRequest from "../Approve/dialog-detail-request";
import LoadingCircle from "@/components/custom/loading-circle";

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
  DURATION: number;
  END_DATE: string;
  FACTORY_NAME: string;
  NAME_STATUS: string;
  NAME_WORKCELL: string;
  PERSON: number;
  REQUEST_NO: string;
  REV: number;
  START_DATE: string;
}

export interface CountApprove {
  NAME_STATUS: string;
  ID_STATUS_APV: number;
  AMOUNT: number;
}

export interface DetailApprove {
  REQUEST_NO: string;
  CODE_APPROVER: string;
  REV: number;
  FACTORY_NAME: string;
  NAME_GROUP: string;
  ID_FACTORY: number;
  ID_GROUP_DEPT: number;
  COUNT_USER: number;
  DURATION: number;
  HOURS_AMOUNT: number;
  SUM_MINUTE: number;
  MINUTE_TOTAL: number;
}

export interface SummaryRequestLastRev {
  REQUEST_NO: string;
  REV: number;
  NAME_STATUS: string;
  FULLNAME: string;
  OT_TYPE: number;
  FACTORY_NAME: string;
  NAME_WORKGRP: string;
  NAME_WORKCELL: string;
  USERS_AMOUNT: number;
  SUM_MINUTE: number;
  START_DATE: string;
  END_DATE: string;
  ID_FACTORY: number;
  SUM_PLAN: number;
  SUM_PLAN_OB: number;
  ID_WORK_CELL: number;
  REMARK: string;
}

export interface UserDetail {
  EMPLOYEE_CODE: string;
  FULLNAME: string;
  UHR_Position: string;
}

export interface CommentApprover {
  REQUEST_NO: string;
  ID_STATUS_APV: number;
  CODE_APPROVER: string;
  CREATED_AT: string;
  UPDATED_AT: string;
  NAME_STATUS: string;
  REMARK: string;
  DEPARTMENT: string;
  POSITION: string;
  FULLNAME: string;
}
export interface RequestList {
  DURATION: number;
  FACTORY_NAME: string;
  HOURS_AMOUNT: string;
  HOURS_TOTAL: number;
  ID_TYPE_OT: number;
  PERSON: number;
  REQUEST_NO: string;
  REV: number;
}

export interface PlanWorkcell {
  ID_FACTORY: number;
  MONTH: number;
  SUM_HOURS: number;
  YEAR: number;
}

const MyRequest: React.FC = () => {
  const [countRequest, setCountRequest] = useState<CountRequest[]>([]);

  const sum = countRequest?.reduce((acc, obj) => acc + obj.AMOUNT, 0);
  const containerTop = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(true);
  const [yearMenu, setYearMenu] = useState<YearMenu[]>([]);
  const [monthMenu, setMonthMenu] = useState<MonthMenu[]>([]);
  const [requestByYear, setRequestByYear] = useState<RequestByYear[]>([]);
  const [requests, setRequests] = useState<RequestNoByUser[]>([]);
  const [requestList, setRequestList] = useState<RequestList[]>([]);
  const [showAction, setShowAction] = useState(false);

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
      setMonthMenu(await GetMonthMenuOption(token, year)),
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

  const [requestDetail, setRequestDetail] = useState<SummaryRequestLastRev[]>(
    []
  );
  const [commentApprover, setCommentApprover] = useState<CommentApprover[]>([]);
  const [users, setUsers] = useState<UserDetail[]>([]);
  const [showDetail, setShowDetail] = useState(false);
  const [requestNo, setRequestNo] = useState("");
  const [rev, setRev] = useState(0);

  const token = useOTManagementSystemStore((state) => state.token);
  const [planWorkcell, setPlanWorkcell] = useState<PlanWorkcell[]>([]);
  const [showRequestList, setShowRequestList] = useState(false);
  const [idStatus, setIdStatus] = useState(0);

  const FetchDetailRequest = async (
    tokenStr: string,
    requestNo: string,
    rev: number
  ) => {
    await Promise.all([
      GetRequestDetailByRequest(tokenStr, requestNo, rev),
      GetUserByRequestAndRev(tokenStr, requestNo, rev),
      GetCommentApproverByRequestNo(tokenStr, requestNo, rev),
    ]).then(async (res) => {
      if (res?.length > 0) {
        if (res[0]?.length > 0 && res[1]?.length) {
          setRequestDetail(res[0]);
          console.log("res[0]", res[0]);

          setUsers(res[1]);
          setShowDetail(true);

          const month = moment(res[0][0]?.START_DATE).month() + 1;
          const year = moment(res[0][0]?.START_DATE).year();
          const work = res[0][0]?.ID_WORK_CELL;

          const planWorkcell = await GetPlanByWorkcell(
            token,
            work,
            year,
            month
          );

          setPlanWorkcell(planWorkcell);
        }
        if (res[2]?.length > 0) {
          setCommentApprover(res[2]);
        } else {
          setCommentApprover([]);
        }
      } else {
        toast.error("--- ไม่พบข้อมูล ---");
      }
    });
  };

  const GetRequestList = async (status: number, code: string) => {
    setIdStatus(status);

    await Promise.all([GetRequestListByUserCodeAndStatus(token, status, code)])
      .then((response) => {
        console.log("res", response);
        if (response[0]?.length > 0) {
          setRequestList(response[0]);
          setShowRequestList(true);
        } else {
          setRequestList([]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const CloseDialogDetail = () => setShowDetail(false);

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
                  GetRequestList={GetRequestList}
                  Icon={item.Icon}
                  title={item.title}
                  amount={findAmount(item.aliasTitle)}
                  sumAll={sum}
                  bgColor={item.bgColor}
                  textColor={item.textColor}
                  titleTH={item.titleTH}
                  status={item.status}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Dialog */}
      <DialogDetailRequest
        setIsOpen={setShowDetail}
        isOpen={showDetail}
        closeDialog={CloseDialogDetail}
        requestNo={requestNo}
        requestDetail={requestDetail}
        users={users}
        commentApprover={commentApprover}
        planWorkcell={planWorkcell}
        rev={rev}
        showAction={false}
      />

      <div className="grid grid-cols-12 mt-2 gap-x-2">
        <div className="col-span-12 lg:col-span-7">
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
                navigate("/request");
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

              <TableRequest
                requests={requests}
                FetchDetailRequest={FetchDetailRequest}
                setRequestNo={setRequestNo}
                setRev={setRev}
                GetPlanByWorkcell={GetPlanByWorkcell}
                setIsOpen={setShowRequestList}
                isOpen={showRequestList}
                status={idStatus}
                token={token}
              />
            </div>
          </div>
        </div>

        {/* Chart */}
        <div className="col-span-12 lg:col-span-5">
          {progress ? (
            <div className="h-[300px] flex justify-center items-center w-full">
              <LoadingCircle />
            </div>
          ) : requestByYear?.length > 0 ? (
              // Chart Donut
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

        {/* Dialog Request List */}
        <DialogRequestList
          data={requestList}
          FetchDetailRequest={FetchDetailRequest}
          setRequestNo={setRequestNo}
          setRev={setRev}
          GetPlanByWorkcell={GetPlanByWorkcell}
          setIsOpen={setShowRequestList}
          isOpen={showRequestList}
          requestList={requestList}
          status={idStatus}
          showAction={showAction}
          setShowAction={setShowAction}
        />
      </div>
    </motion.div>
  );
};

export default MyRequest;
