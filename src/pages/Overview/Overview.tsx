import React from "react";
import QuaterMonthBarChart from "./Charts/QuaterMonthBarChart";
import OvertimeBarChartByDept from "./Charts/OvertimeBarChartByDept";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import OvertimeScatterChartByDate from "./Charts/OvertimeScatterChartByDate";

const Overview: React.FC = () => {
  function convertFormat(number: number) {
    return number.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }

  return (
    <div className="p-[0.5rem]">
      <div
        className="w-full rounded-[16px] bg-[white]"
        style={{
          boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
        }}
      >
        <div className="flex flex-col p-[1rem] justify-center w-full items-start">
          <p className="text-[13px] text-gray-700">Summary Report OT / Year</p>
        </div>

        <QuaterMonthBarChart />
      </div>
      <div className="grid grid-cols-12 mt-1 gap-2">
        <div className="col-span-8">
          <div
            className="w-full rounded-[16px] bg-[white] p-2"
            style={{
              boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
            }}
          >
            <div className="flex flex-col p-[1rem] justify-center w-full items-start">
              <p className="text-[13px] text-gray-700">
                Summary Report OT / Year
              </p>
            </div>
            <OvertimeBarChartByDept />
            <div className="w-full flex justify-end">
              <Pagination className="text-[12px] w-full justify-end">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious href="#" />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#" size={"sm"}>
                      1
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#" isActive size={"sm"}>
                      2
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#" size={"sm"}>
                      3
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext href="#" />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
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
              <p className="text-gray-600 text-[22px] font-medium text-center">
                {convertFormat(2895400)}
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
              <p className="text-gray-600 text-[22px] font-medium text-center">
                {(2800).toLocaleString()}
              </p>
              <p className="text-gray-400 text-[14px] font-medium text-center">
                Overtime Amount
              </p>
            </div>
          </div>
        </div>
      </div>
      <div
        className="p-4 bg-white rounded-[16px] h-full flex flex-col justify-center mt-2"
        style={{
          boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
        }}
      >
        <div className="flex flex-col p-[1rem] justify-center w-full items-start">
          <p className="text-[13px] text-gray-700">Summary Report OT / Year</p>
        </div>
        <OvertimeScatterChartByDate />
      </div>
    </div>
  );
};

export default Overview;
