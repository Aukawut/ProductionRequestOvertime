// src/layouts/MainLayout.tsx
import React from "react";
import {AppSidebar} from "../components/custom/SideBarMenu";
import { Outlet } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

const MainLayout: React.FC = () => {
  return (
    <SidebarProvider>
      <AppSidebar />

      <SidebarTrigger />
      <main>
        <Outlet />
      </main>
    </SidebarProvider>
  );
};

export default MainLayout;
