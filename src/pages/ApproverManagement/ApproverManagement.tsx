import React, { useEffect, useState } from "react";
import { Toaster } from "sonner";
import { DataTableApprover } from "./TableApprover/data-table-approver";
import { columns } from "./TableApprover/columns";
import { useOTManagementSystemStore } from "../../../store";
import { GetAllFactory, GetAllFactoryByGroup, GetApproverByGroupId, GetGroupDepartmentActive } from "@/function/main";
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
import { Search, UserRoundCheck } from "lucide-react";

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

interface GroupDeptAll {
  ID_GROUP_DEPT: number;
  NAME_GROUP: string;
}

const ApproverManagement: React.FC = () => {
  const token = useOTManagementSystemStore((state) => state.token);
  const [approver, setApprover] = useState<Approvers[]>([]);
  const [allFactory, setAllFactory] = useState<Factory[]>([]);
  const [allGroupDept, setAllGroupDept] = useState<GroupDeptAll[]>([]);
  const [factory, setFactory] = useState(1);
  const [showAdd, setShowAdd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [reload, setReload] = useState(false);
  const baseImageUrl = import.meta.env.VITE_BASE_USERIMG_URL;
  const role = useOTManagementSystemStore((state) => state.info?.Role);
  const [department, setDepartment] = useState(0);
  

  const fetchData = async () => {
    setLoading(true);
    await Promise.all([
      await GetGroupDepartmentActive(token),
    ]).then(async (response) => {
      if(response[0]?.length > 0) {
        const dept:GroupDeptAll[] = response[0]; 
        setAllGroupDept(response[0]);

        const fac:Factory[] = await GetAllFactoryByGroup(token,dept[0]?.ID_GROUP_DEPT);
        setAllFactory(fac);
        if(fac?.length > 0) {

          const approver = await GetApproverByGroupId(token, dept[0]?.ID_GROUP_DEPT, fac[0]?.ID_FACTORY);
          setApprover(approver)
        }else{
          setApprover([])
        }


      }else{
        setAllGroupDept([])
      }
      setLoading(false);
    });
  };

  useEffect(() => {
  
    setDepartment(role[0]?.ID_GROUP_DEPT);
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
            <div className="flex items-center gap-x-2 mb-3">
              <div className="col-span-12 lg:col-span-6">
                <label
                  htmlFor="Department"
                  className="text-[13px] text-gray-700"
                  
                >
                  หน่วยงาน / Department
                </label>
                <Select value={department?.toString()}  onValueChange={async (e) => {
                  setDepartment(Number(e));
          
                  const fac:Factory[] = await GetAllFactoryByGroup(token,Number(e));
                  setAllFactory(fac);
                  if(fac?.length > 0) {
                   
                    setTimeout(() => {
                      setFactory(fac[0]?.ID_FACTORY)
                    },300)
                    
                    const approver = await GetApproverByGroupId(token, Number(e), Number(factory));
                    setApprover(approver)
                  }else{
                    setApprover([])
                  }

                }}>
                  <SelectTrigger className="w-full">
                    <SelectValue
                      placeholder="Group Department"
                      className="text-[13px]"
                    />
                  </SelectTrigger>
                  <SelectContent className="h-[150px]">
                    {allGroupDept?.map((item, index) => {
                      return (
                        <SelectItem
                          value={item.ID_GROUP_DEPT?.toString()}
                          className="text-[13px]"
                          key={index}
                        >
                          {item.NAME_GROUP}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </div>
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
                              await GetApproverByGroupId(token, department, factory)
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
