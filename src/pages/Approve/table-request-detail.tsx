import React, { useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SummaryRequestLastRev } from "./Approve";
import moment from "moment";

interface DetailRequestProps {
  requestDetail: SummaryRequestLastRev[];
}

const TableRequestDetail: React.FC<DetailRequestProps> = ({
  requestDetail,
}) => {
  useEffect(() => {}, [requestDetail]);
  return (
    <>
      <div className="rounded-md border relative w-full">
        <div className="overflow-auto">
          <Table className="text-[12px] w-full">
            <TableHeader>
              <TableRow className="bg-blue-200">
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
              <TableCell className="text-center">
                เริ่ม (วัน/เดือน/ปี ชั่วโมง:นาที)
              </TableCell>
              <TableCell className="text-center">
                {moment(requestDetail[0]?.START_DATE).format(
                  "DD/MM/YYYY HH:mm"
                )}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-center">
                ถึง (วัน/เดือน/ปี ชั่วโมง:นาที)
              </TableCell>
              <TableCell className="text-center">
                {moment(requestDetail[0]?.END_DATE).format("DD/MM/YYYY HH:mm")}
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
              <TableCell className="text-center">ประเภทโอที</TableCell>
              <TableCell className="text-center">
                {requestDetail[0]?.OT_TYPE}
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
              <TableCell className="text-center bg-blue-100">
                <div className="flex justify-center items-center">
                  {(Number(requestDetail[0]?.SUM_MINUTE) / 60)?.toFixed(2)}
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
