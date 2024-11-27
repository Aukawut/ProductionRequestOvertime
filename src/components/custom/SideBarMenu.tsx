import * as React from "react";
import { data } from "./data/data";

import { NavMain } from "@/components/custom/nav-main";
import { NavUser } from "@/components/custom/nav-user";
import { TeamSwitcher } from "@/components/custom/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { useOTManagementSystemStore } from "../../../store";

// This is sample data.

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {

  const info = useOTManagementSystemStore((state) => state.info);

  const userInfo = {
    name : info.Fullname,
    email : info.Email,
    avatar : (info.Fullname)?.split(" ")[0]?.charAt(0)?.toUpperCase()+(info.Fullname)?.split(" ")[1]?.charAt(0)?.toUpperCase(),
  }


  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={userInfo} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
