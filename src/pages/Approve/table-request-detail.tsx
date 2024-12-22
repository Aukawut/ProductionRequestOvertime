import React, { useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PlanWorkcell, SummaryRequestLastRev } from "./Approve";
import moment from "moment";
import { ConvertDateFormat } from "@/function/main";
import { Actual } from "./dialog-detail-request";

interface DetailRequestProps {
  requestDetail: SummaryRequestLastRev[];
  planWorkcell: PlanWorkcell[];
  actual: Actual[]
}

const TableRequestDetail: React.FC<DetailRequestProps> = ({
  requestDetail,
  planWorkcell,
  actual
}) => {
  const sumHoursReq = Number(requestDetail[0]?.SUM_MINUTE) / 60;
  const plan = Number(requestDetail[0]?.SUM_PLAN);
  const planOB = Number(requestDetail[0]?.SUM_PLAN_OB);
  const planWC =
    planWorkcell?.length > 0 ? Number(planWorkcell[0]?.SUM_HOURS) : 0;

  useEffect(() => {}, [requestDetail, planWorkcell]);
  return (
    <>
      <div className="rounded-md border relative w-full">
        <div className="overflow-auto">
          <Table className="text-[12px] w-full">
            <TableHeader>
              <TableRow className="bg-[#0E7FDB]">
                <TableHead className="text-center text-gray-900">
                  หัวข้อ
                </TableHead>
                <TableHead className="text-center text-gray-900">
                  ข้อมูลรายละเอียด
                </TableHead>
              </TableRow>
            </TableHeader>
          </Table>
        </div>
      </div>
      <div className="w-full overflow-auto h-[65vh]">
        <Table className="text-[12px] w-full">
          <TableBody>
            <TableRow>
              <TableCell className="text-center">ผู้ขอ</TableCell>
              <TableCell className="text-center">
                {requestDetail[0]?.FULLNAME}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-center">ประเภทโอที</TableCell>
              <TableCell className="text-center">
                OT{requestDetail[0]?.OT_TYPE}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-center">เริ่ม</TableCell>
              <TableCell className="text-center">
                {ConvertDateFormat(
                  moment(requestDetail[0]?.START_DATE).toDate()
                )}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-center">
                ถึง
              </TableCell>
              <TableCell className="text-center">
                {ConvertDateFormat(moment(requestDetail[0]?.END_DATE).toDate())}
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="text-center">ระยะเวลา (ชั่วโมง)</TableCell>
              <TableCell className="text-center">
                {(
                  moment(requestDetail[0]?.END_DATE).diff(
                    moment(requestDetail[0]?.START_DATE),
                    "minute"
                  ) / 60
                )?.toFixed(2)}
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="text-center">แผน (ชั่วโมง) - Factory</TableCell>
              <TableCell className="text-center bg-red-400 text-red-50">
                {plan}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-center">แผน (ชั่วโมง) - OB </TableCell>
              <TableCell className="text-center bg-red-400 text-red-50">
                {planOB}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-center">
                แผน (ชั่วโมง) / Workcell
              </TableCell>
              <TableCell className="text-center bg-red-400 text-red-50">
                {planWC}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-center">
                Actual OT
              </TableCell>
              <TableCell className="text-center bg-blue-400 text-red-50">
                {actual?.length >0  ? actual[0]?.SUN_HOURS : 0}
              </TableCell>
            </TableRow>
          
            <TableRow>
              <TableCell className="text-center">Factory</TableCell>
              <TableCell className="text-center">
                {requestDetail[0]?.FACTORY_NAME}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-center">Work Group</TableCell>
              <TableCell className="text-center">
                {requestDetail[0]?.NAME_WORKGRP}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-center">Workcell</TableCell>
              <TableCell className="text-center">
                {requestDetail[0]?.NAME_WORKCELL}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-center">จำนวนพนักงาน</TableCell>
              <TableCell className="text-center">
                {requestDetail[0]?.USERS_AMOUNT}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-center">รวม (คน x ชั่วโมง)</TableCell>
              <TableCell className={`text-center bg-blue-100`}>
                <div className="flex justify-center items-center">
                  {sumHoursReq?.toFixed(2)}
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default TableRequestDetail;
