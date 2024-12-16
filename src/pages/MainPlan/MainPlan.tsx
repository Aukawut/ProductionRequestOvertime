export interface MainPlan {
  ID_PLAN: number;
  ID_FACTORY: number;
  NAME_WORKCELL: string;
  FACTORY_NAME: string;
  NAME_UGROUP: string ;
  ID_UGROUP: number ;
  CREATED_AT: string;
  MONTH: number;
  YEAR: number;
  HOURS: number;
  UPDATED_AT: string;
  FNAME: string;
  ID_WORK_CELL: number;
}

import React, { useEffect, useState } from "react";
import { DataTableMainPlan } from "./TableMainPlan/data-table";
import {

  DeletePlan,
  GetAllWorkcell,
  GetMainPlan,
  GetUserGroup,
} from "@/function/main";

import { useOTManagementSystemStore } from "../../../store";
import { columns } from "./TableMainPlan/columns";
import DialogAddPlan from "./dialog-add-plan";
import { Toaster } from "sonner";
import DialogUpdatePlan from "./dialog-update-plan";
import LoadingCircle from "@/components/custom/loading-circle";
import { motion } from "framer-motion";

export interface Factory {
  ID_FACTORY: number;
  FACTORY_NAME: string;
}

export interface WorkcellAll {
  ID_WORK_CELL: number;
  NAME_WORKCELL: string;
  ID_FACTORY: number;
  FACTORY_NAME: string;
}

export interface UserGroup {
  ID_UGROUP: number;
  NAME_UGROUP: string;
}
const MainPlan: React.FC = () => {
  const [plan, setPlan] = useState<MainPlan[]>([]);
  const [oldPlan, setOldPlan] = useState<MainPlan>();
  const token = useOTManagementSystemStore((state) => state.token);
  const [showDialogAdd, setShowDialogAdd] = useState(false);
  const [showDialogUpdate, setShowDialogUpdate] = useState(false);
  const [load, setLoad] = useState(false);
  const [workcell, setWorkcell] = useState<WorkcellAll[]>([]);
  const [userGroup, setUserGroup] = useState<UserGroup[]>([]);

  const fetchData = async (load:boolean) => {
    setLoad(load);
    await Promise.all([
      GetMainPlan(token),
      GetAllWorkcell(token),
      GetUserGroup(token),
    ])
      .then((response) => {
        if (response[0]?.length > 0) {
          setPlan(response[0]);
        }else{
          setPlan([])
        }
        if (response[1]?.length > 0) {
          setWorkcell(response[1]);
        }
        if (response[2]?.length > 0) {
          setUserGroup(response[2]);
        }

        setLoad(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const FindOldPlan = (idPlan: number) => {
    const obj = plan.find((x) => x.ID_PLAN == idPlan);
    console.log("obj", obj);

    if (obj) {
      setOldPlan(obj);
      setShowDialogUpdate(true);
    }
  };

  useEffect(() => {
    fetchData(true);
  }, []);

  return (
    <>
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
      {load ? (
        <div className="flex w-full h-[90vh] justify-center items-center">
          <LoadingCircle />
        </div>
      ) : (
        <motion.div
          className="py-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "tween", duration: 0.3 }}
        >
          {/* Dialog */}
          <DialogAddPlan
            isOpen={showDialogAdd}
            setIsOpen={setShowDialogAdd}
            workcell={workcell}
            fetchData={fetchData}
            userGroup={userGroup}
          />

          {/* Dialog */}
          <DialogUpdatePlan
            isOpen={showDialogUpdate}
            setIsOpen={setShowDialogUpdate}
            fetchData={fetchData}
            oldPlan={oldPlan}
            workcell={workcell}
            userGroup={userGroup}
          />

          {/* Table Plan */}
          <DataTableMainPlan
            columns={columns(FindOldPlan,DeletePlan,token,fetchData)}
            data={plan}
            setShowDialogAdd={setShowDialogAdd}
          />
        </motion.div>
      )}
      ;
    </>
  );
};

export default MainPlan;
