import React, { useEffect, useState } from "react";
import { Toaster } from "sonner";
import { DataTableApprover } from "./TableApprover/data-table-approver";
import { columns } from "./TableApprover/columns";
import { useOTManagementSystemStore } from "../../../store";
import { GetAllFactoryByGroup, GetApproverByGroupId } from "@/function/main";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import LoadingCircle from "@/components/custom/loading-circle";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { BookCheck, Search, UserRoundCheck } from "lucide-react";

export interface Approvers {
  CODE_APPROVER: string;
  NAME_APPROVER: string;
  ID_GROUP_DEPT: number;
  NAME_GROUP: string;
  ROLE: number;
  UHR_Position: string;
  STEP: number;
  ID_APPROVER: number;
  MAIL: string;
}

export interface Factory {
  ID_FACTORY: number;
  FACTORY_NAME: string;
}
const ApproverManagement: React.FC = () => {
  const token = useOTManagementSystemStore((state) => state.token);
  const [approver, setApprover] = useState<Approvers[]>([]);
  const [allFactory, setAllFactory] = useState<Factory[]>([]);
  const [factory, setFactory] = useState(1);
  const [group, setGroup] = useState(6);
  const [showUpdate, setShowUpdate] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [reload, setReload] = useState(false);
  const baseImageUrl = import.meta.env.VITE_BASE_USERIMG_URL;
  const role = useOTManagementSystemStore((state) => state.info?.Role);

  const fetchData = async () => {
    setLoading(true);
    await Promise.all([
      setApprover(await GetApproverByGroupId(token, group, factory)),
      setAllFactory(await GetAllFactoryByGroup(token, role[0]?.ID_GROUP_DEPT)),
    ]).then((_) => {
      setLoading(false);
    });
  };

  useEffect(() => {
    setFactory(role[0]?.ID_FACTORY);
    fetchData();
  }, []);

  return (
    <div>
      <div className="flex items-center gap-x-2">
        <UserRoundCheck size={18} />

        <p className="text-[15px] text-gray-800 my-1">Approver setting</p>
      </div>

      <div className="px-[1rem] my-2">
        {/* Toaster */}
        <Toaster
          position="top-center"
          richColors
          toastOptions={{
            duration: 2000,
            style: {
              paddingRight: 20,
              paddingLeft: 20,
            },
          }}
        />

        {loading ? (
          <div className="h-[80vh] flex justify-center items-center">
            <LoadingCircle />
          </div>
        ) : (
          <motion.div
            className="bg-white rounded-[16px] w-full p-4 shadow-smooth"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "tween", duration: 0.2 }}
          >
            <div className="flex items-center gap-x-2">
              <div className="px-4">
                <label htmlFor="factory" className="text-[13px]">
                  Factory :{" "}
                </label>
                <div className="flex gap-x-2">
                  <Select
                    value={factory?.toString()}
                    onValueChange={(e) => setFactory(Number(e))}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Factory" />
                    </SelectTrigger>
                    <SelectContent className="h-[250px]">
                      {allFactory?.map((item, index) => {
                        return (
                          <SelectItem
                            value={item.ID_FACTORY?.toString()}
                            className="text-[13px]"
                            key={index}
                          >
                            {item.FACTORY_NAME}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                  <div>
                    <Button
                      size={"sm"}
                      className="bg-[#107EDB] text-white hover:bg-[#1c77c2]"
                      onClick={async () => {
                        setReload(true);
                        await Promise.all([
                          setApprover(
                            await GetApproverByGroupId(token, group, factory)
                          ),
                        ]).then(() => {
                          setReload(false);
                        });
                      }}
                    >
                      ค้นหา
                      <Search />
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Table */}
            {reload ? (
              <div className="flex justify-center items-center h-[60vh]">
                <LoadingCircle />
              </div>
            ) : (
              <DataTableApprover
                columns={columns(token, fetchData, baseImageUrl)}
                data={approver}
                setShowDialogAdd={setShowAdd}
              />
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ApproverManagement;
