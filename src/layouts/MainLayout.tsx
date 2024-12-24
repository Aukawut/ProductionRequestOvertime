// src/layouts/MainLayout.tsx
import React, { useEffect, useState } from "react";
import { AppSidebar } from "../components/custom/SideBarMenu";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import BreadcrumbMenu from "@/components/custom/BreadcrumbMenu/BreadcrumbMenu";
import { Bell } from "lucide-react";
import { useOTManagementSystemStore } from "../../store";
import {
  CountRequestApproverByEmployee,
  IsHavePermission,
  CountRequestByEmployee,
} from "@/function/main";

interface CountRequest {
  STATUS_PENDING: number;
}

const MainLayout: React.FC = () => {
  const location = useLocation();
  const token = useOTManagementSystemStore((state) => state.token);
  const info = useOTManagementSystemStore((state) => state.info);
  const permission = info?.Role?.map((x) => x.NAME_ROLE);

  const render = useOTManagementSystemStore((state) => state.render);
  const [notification, setNotification] = useState(0);
  const isApprover = IsHavePermission(["APPROVER"], permission) ;

  const fetchData = async () => {
    const response: CountRequest[] = isApprover
      ? await CountRequestApproverByEmployee(token, info?.EmployeeCode, 1)
      : await CountRequestByEmployee(token, info?.EmployeeCode, 1);

    if (response?.length > 0) {
      setNotification(response[0]?.STATUS_PENDING);
    } else {
      setNotification(0);
    }
  };

  const navigate = useNavigate()

  useEffect(() => {

    fetchData();
  }, [render]);

  return (
    <SidebarProvider>
      <AppSidebar />

      <SidebarTrigger />
      <main className="w-full max-h-screen overflow-hidden">
        <div className="h-[40px] w-full flex items-center justify-between px-[2rem]">
          {/* Breadcrumb Menu */}
          <BreadcrumbMenu path={location.pathname} />

          <div className="relative" onClick={() => {
            isApprover ? navigate("/approve") : navigate("/request/me") 
          }}>
            <Bell size={20} />
            {notification > 0 ? (
              <div className="p-3 flex justify-center text-[12px] text-red-100 absolute top-2 rounded-full bg-red-500 w-[20px] h-[20px] items-center right-3">
                {notification > 9 ? "9+" : notification}
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
        <div className="h-[95%] overflow-auto">
          <div className="mb-[2rem]">
            <Outlet />
          </div>
        </div>
      </main>
    </SidebarProvider>
  );
};

export default MainLayout;
