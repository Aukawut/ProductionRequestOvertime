import React, { useEffect, useState } from "react";
import { Toaster } from "sonner";
import { DatatableEmployee } from "./TableEmployee/data-table-employee";
import { columns } from "./TableEmployee/columns";
import { useOTManagementSystemStore } from "../../../store";
import {
  GetAllEmployee,
  GetAllFactoryByGroup,
  GetGroupDepartmentActive,
  GetUserGroup,
  GetUserType,
} from "@/function/main";

import LoadingCircle from "@/components/custom/loading-circle";
import { motion } from "framer-motion";
import { User } from "lucide-react";
import DialogAddEmployee from "./dialog-app-employee";

export interface Employee {
  EMPLOYEE_CODE: string;
  ID_FACTORY: number;
  GROUP_ID: number;
  PREFIX: string;
  FNAME_TH: string;
  LNAME_TH: string;
  FNAME_EN: string;
  LNAME_EN: string;
  ID_ROLE: number;
  TYPE_ID: number;
  ID_UGROUP: number;
  FACTORY_NAME: string;
  NAME_ROLE: string;
  NAME_GROUP: string;
  NAME_UGROUP: string;
  NAME_UTYPE: string;
  CREATED_AT: string;
  UPDATED_AT: string;
  UPDATED_BY: string;
  CREATED_BY: string;
}

export interface Factory {
  ID_FACTORY: number;
  FACTORY_NAME: string;
}

export interface GroupDept {
  ID_GROUP_DEPT: number;
  NAME_GROUP: string;
}

export interface UGroup {
  ID_UGROUP: number;
  NAME_UGROUP: string;
}
export interface UType {
  ID_UTYPE: number;
  NAME_UTYPE: string;
  CREATED_AT: string;
  UPDATED_AT: string;
}
const EmployeeManagement: React.FC = () => {
  const token = useOTManagementSystemStore((state) => state.token);

  const [employee, setEmployee] = useState<Employee[]>([]);
  const [allFactory, setAllFactory] = useState<Factory[]>([]);
  const [allDeptGroup, setAllDeptGroup] = useState<GroupDept[]>([]);
  const [ugroup, setUgroup] = useState<UGroup[]>([]);
  const [uType, setUType] = useState<UType[]>([]);
  const [factory, setFactory] = useState(1);
  const [group, setGroup] = useState(6);
  const [showUpdate, setShowUpdate] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [reload, setReload] = useState(false);
  const baseImageUrl = import.meta.env.VITE_BASE_USERIMG_URL;
  const role = useOTManagementSystemStore((state) => state.info?.Role);

  const getFactoryByGroupId = async (group: number) => {
    const allFac = await GetAllFactoryByGroup(token, group);
    if (allFac?.length > 0) {
      setAllFactory(allFac);
    } else {
      setAllFactory([]);
    }
  };

  const fetchData = async () => {
    setLoading(true);
    await Promise.all([
      setEmployee(await GetAllEmployee(token)),
      await GetGroupDepartmentActive(token),
      await GetUserGroup(token),
      await GetUserType(token),
    ]).then(async (res) => {
      const groupDep: GroupDept[] = res[1];

      if (res[1]?.length > 0) {
        setAllDeptGroup(res[1]);
        const fac = await GetAllFactoryByGroup(
          token,
          groupDep[0].ID_GROUP_DEPT
        );
        if (fac?.length > 0) {
          setAllFactory(fac);
        }
      }

      if (res[2]?.length > 0) {
        setUgroup(res[2])
      }else{
        setUgroup([])
      }
      if (res[3]?.length > 0) {
        setUType(res[3])
      }else{
        setUType([])
      }
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
        <User size={18} />

        <p className="text-[15px] text-gray-800 my-1">Employees Management</p>
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
            {/* Dialog Add  */}
            <DialogAddEmployee
              setIsOpen={setShowAdd}
              isOpen={showAdd}
              fetchData={fetchData}
              factory={allFactory}
              allDeptGroup={allDeptGroup}
              getFactoryByGroupId={getFactoryByGroupId}
              ugroup={ugroup}
              uType={uType}
            />

            {/* Table */}
            {reload ? (
              <div className="flex justify-center items-center h-[60vh]">
                <LoadingCircle />
              </div>
            ) : (
              <DatatableEmployee
                columns={columns(token, fetchData, baseImageUrl, employee)}
                data={employee}
                setShowDialogAdd={setShowAdd}
              />
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default EmployeeManagement;
