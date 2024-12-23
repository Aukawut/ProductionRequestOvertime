// src/layouts/MainLayout.tsx
import React from "react";
import { AppSidebar } from "../components/custom/SideBarMenu";
import { Outlet, useLocation } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import BreadcrumbMenu from "@/components/custom/BreadcrumbMenu/BreadcrumbMenu";
import { Bell } from "lucide-react";

const MainLayout: React.FC = () => {
  const location = useLocation();

  return (
    <SidebarProvider>
      <AppSidebar />

      <SidebarTrigger />
      <main className="w-full max-h-screen overflow-hidden">
        <div className="h-[40px] w-full flex items-center justify-between px-[2rem]">
          {/* Breadcrumb Menu */}
          <BreadcrumbMenu path={location.pathname} />
          
          <div className="relative">
          <Bell size={20}  />
          {/* <div className="p-3 flex justify-center text-[12px] text-red-100 absolute 
          top-2 rounded-full bg-red-500 w-[20px] h-[20px] items-center right-3">9+</div> */}
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
