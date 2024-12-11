export interface MainPlan {
  ID_PLAN: number;
  ID_FACTORY: number;
  FACTORY_NAME: string;
  CREATED_AT: string;
  MONTH: number;
  YEAR: number;
  HOURS: number;
  UPDATED_AT: string;
  FNAME: string;
}

import React, { useEffect, useState } from "react";
import { DataTableMainPlan } from "./TableMainPlan/data-table";
import { GetAllFactory, GetMainPlan } from "@/function/main";

import { useOTManagementSystemStore } from "../../../store";
import { columns } from "./TableMainPlan/columns";
import DialogAddPlan from "./dialog-add-plan";
import { Toaster } from "sonner";
import DialogUpdatePlan from "./dialog-update-plan";
import LoadingCircle from "@/components/custom/loading-circle";
import {motion} from "framer-motion" ;

export interface Factory {
  ID_FACTORY: number;
  FACTORY_NAME: string;
}

const MainPlan: React.FC = () => {
  const [plan, setPlan] = useState<MainPlan[]>([]);
  const [oldPlan, setOldPlan] = useState<MainPlan>();
  const token = useOTManagementSystemStore((state) => state.token);
  const [showDialogAdd, setShowDialogAdd] = useState(false);
  const [showDialogUpdate, setShowDialogUpdate] = useState(false);
  const [factory, setFactory] = useState<Factory[]>([]);
  const [load, setLoad] = useState(false);

  const fetchData = async () => {
    setLoad(true);
    await Promise.all([GetMainPlan(token), GetAllFactory(token)])
      .then((response) => {
        if (response[0]?.length > 0) {
          setPlan(response[0]);
        }
        if (response[1]?.length > 0) {
          setFactory(response[1]);
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
    fetchData();
  }, []);

  return load ? (
    <div className="flex w-full h-[90vh] justify-center items-center">
      <LoadingCircle />
    </div>
  ) : (
    <motion.div className="py-4"
      initial={{opacity:0,y:20}}
      animate={{opacity:1,y:0}}
      transition={{type:"tween",duration:0.3}}

    >
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

      {/* Dialog */}
      <DialogAddPlan
        isOpen={showDialogAdd}
        setIsOpen={setShowDialogAdd}
        factory={factory}
        fetchData={fetchData}
      />

      {/* Dialog */}
      <DialogUpdatePlan
        isOpen={showDialogUpdate}
        setIsOpen={setShowDialogUpdate}
        factory={factory}
        fetchData={fetchData}
        oldPlan={oldPlan}
      />

      {/* Table Plan */}
      <DataTableMainPlan
        columns={columns(FindOldPlan)}
        data={plan}
        setShowDialogAdd={setShowDialogAdd}
      />
    </motion.div>
  );
};

export default MainPlan;
