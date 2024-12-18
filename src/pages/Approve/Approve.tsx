import React, { useEffect, useState } from "react";
import TableApprove from "./TableApprove/TableApprove";
import CardRequest from "@/components/custom/card-myrequest";
import { Check, CheckCheckIcon, CircleX, Clock8, Undo2 } from "lucide-react";

import {
  GetCommentApproverByRequestNo,
  GetCountApproveByCode,
  GetDetailCountApproveByCode,
  GetPlanByWorkcell,
  GetRequestDetailByRequest,
  GetUserByRequestAndRev,
  findCountApproverStatus,
} from "@/function/main";
import { useOTManagementSystemStore } from "../../../store";
import DialogDetailRequest from "./dialog-detail-request";
import { toast, Toaster } from "sonner";
import { motion } from "framer-motion";
import LoadingCircle from "@/components/custom/loading-circle";
import moment from "moment";

export const data = [
  {
    title: "Pending",
    amount: 20,
    sumAll: 100,
    Icon: Clock8,
    bgColor: "#E9F5FF",
    textColor: "#2697FF",
    aliasTitle: "Pending",
    titleTH: "รออนุมัติ",
  },
  {
    title: "Reject",
    amount: 1,
    sumAll: 100,
    Icon: Undo2,
    bgColor: "#FFF6E7",
    textColor: "#FF9E0E",
    aliasTitle: "Reject",
    titleTH: "แก้ไข",
  },

  {
    title: "Not Approve",
    amount: 4,
    sumAll: 100,
    Icon: CircleX,
    bgColor: "#FED0D0",
    textColor: "#A30014",
    aliasTitle: "Not Approve",
    titleTH: "ไม่อนุมัติ",
  },
  {
    title: "Success",
    amount: 20,
    sumAll: 100,
    Icon: Check,
    bgColor: "#C1EFDF",
    textColor: "#005A2B",
    aliasTitle: "Approved",
    titleTH: "อนุมัติ",
  },
];

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

export interface PlanWorkcell {
  ID_FACTORY: number;
  MONTH: number;
  SUM_HOURS: number;
  YEAR: number;
}

const Approve: React.FC = () => {
  const [countApprove, setCountApprove] = useState<CountApprove[]>([]);
  const [detailApprove, setDetailApprove] = useState<DetailApprove[]>([]);
  const [requestDetail, setRequestDetail] = useState<SummaryRequestLastRev[]>(
    []
  );
  const [commentApprover, setCommentApprover] = useState<CommentApprover[]>([]);
  const [users, setUsers] = useState<UserDetail[]>([]);

  const [status, setStatus] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [requestNo, setRequestNo] = useState("");
  const info = useOTManagementSystemStore((state) => state.info);
  const token = useOTManagementSystemStore((state) => state.token);
  const [planWorkcell, setPlanWorkcell] = useState<PlanWorkcell[]>([]);

  const CloseDialogDetail = () => setShowDetail(false);

  const fetchData = async () => {
    setLoading(true);
    await Promise.all([
      setCountApprove(await GetCountApproveByCode(token, info.EmployeeCode)),
      setDetailApprove(
        await GetDetailCountApproveByCode(token, info.EmployeeCode, status)
      ),
    ]).then(() => {
      setTimeout(() => {
        setLoading(false);
      }, 300);
    });
  };

  const sumAll = countApprove?.reduce((acc, obj) => acc + obj.AMOUNT, 0);

  const FetchDetailRequest = async (
    tokenStr: string,
    requestNo: string,
    rev: number
  ) => {
    await Promise.all([
      GetRequestDetailByRequest(tokenStr, requestNo),
      GetUserByRequestAndRev(tokenStr, requestNo, rev),
      GetCommentApproverByRequestNo(tokenStr, requestNo, rev),
    ]).then(async (res) => {
      if (res?.length > 0) {
        if (res[0]?.length > 0 && res[1]?.length) {
          setRequestDetail(res[0]);
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

  useEffect(() => {
    fetchData();
    setStatus(1);
  }, []);

  return loading ? (
    <div className="flex min-h-screen justify-center items-center">
      <div>
        <LoadingCircle />
      </div>
    </div>
  ) : (
    <div className="p-2">
      <motion.div
        className="px-4 py-3 rounded-[18px] bg-white shadow-smooth"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "tween", duration: 0.3 }}
      >
        <Toaster richColors />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-2">
          {data?.map((item, index) => {
            return (
              <CardRequest
                key={index}
                title={item.title}
                amount={
                  findCountApproverStatus(item.aliasTitle, countApprove) !=
                  undefined
                    ? findCountApproverStatus(item.aliasTitle, countApprove)
                    : 0
                }
                sumAll={sumAll}
                Icon={item.Icon}
                bgColor={item.bgColor}
                textColor={item.textColor}
                titleTH={item.titleTH}
              />
            );
          })}
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
        />

        <div className="p-2 bg-white rounded-[13px] shadow-smooth mt-1">
          <div className="flex flex-col justify-start p-2 mt-2">
            <p className="text-[14px] flex items-center gap-x-2">
              <CheckCheckIcon size={13} color="red" /> Approve Requests (Pending)
            </p>
            <p className="text-[13px] text-gray-600">คำขอรอการอนุมัติจากท่าน</p>
          </div>
          {/* Table */}
          <TableApprove
            data={detailApprove}
            FetchDetailRequest={FetchDetailRequest}
            setRequestNo={setRequestNo}
            GetPlanByWorkcell={GetPlanByWorkcell}
          />
        </div>
        <div className="flex"></div>
      </motion.div>
    </div>
  );
};

export default Approve;
