import React, { useEffect } from "react";
import TableRequest from "./TableRequest/TableRequest";
import CardRequest from "@/components/custom/card-myrequest";

import { cardMenu } from "./data";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import DonutRequest from "./chart/DonutRequest";

import { motion } from "framer-motion";


const MyRequest: React.FC = () => {

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

      <div className="grid grid-cols-12 gap-x-3">
        {cardMenu?.map((item, index) => (
          <div className="col-span-3" key={index}>
            <CardRequest
              Icon={item.Icon}
              title={item.title}
              amount={item.amount}
              sumAll={item.sumAll}
              bgColor={item.bgColor}
              textColor={item.textColor}
            />
          </div>
        ))}
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
            >
              <Plus />
              New
            </Button>
            <div className="h-[300px] overflow-auto">
              <TableRequest />
            </div>
          </div>
        </div>

        {/* Chart */}
        <div className="col-span-12 lg:col-span-6">
          <DonutRequest />
        </div>
      </div>
    </motion.div>
  );
};

export default MyRequest;
