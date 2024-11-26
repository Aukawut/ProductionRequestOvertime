// src/layouts/MainLayout.tsx
import React from "react";
import { AppSidebar } from "../components/custom/SideBarMenu";
import { Outlet, useLocation } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import BreadcrumbMenu from "@/components/custom/BreadcrumbMenu/BreadcrumbMenu";

const MainLayout: React.FC = () => {
  const location = useLocation();

  return (
    <SidebarProvider>
      <AppSidebar />

      <SidebarTrigger />
      <main className="w-full max-h-screen overflow-hidden">
        <div className="h-[40px] w-full flex items-center">
          {/* Breadcrumb Menu */}
          <BreadcrumbMenu path={location.pathname} />
        </div>
        <div className="h-[95%] overflow-auto">
          <Outlet />
        </div>
      </main>
    </SidebarProvider>
  );
};

export default MainLayout;
