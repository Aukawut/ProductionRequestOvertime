import {
 
  ChevronRight,
  type LucideIcon,
} from "lucide-react";

import { singleMenuItem } from "./data/data";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { Link, useLocation } from "react-router-dom";
import { useOTManagementSystemStore } from "../../../store";
import { IsHavePermission } from "@/function/main";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: LucideIcon;
    isActive?: boolean;
    items?: {
      title: string;
      url: string;
    }[];
  }[];
}) {
  const location = useLocation();
 
  const info = useOTManagementSystemStore((state) => state.info)
  const userPermission = info?.Role?.map((x) => x.NAME_ROLE)  ;



  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu>
        {singleMenuItem?.map((menu,index) => {
          return IsHavePermission(menu.allowed,userPermission) ? <Link to={menu.path} key={index}>
          <SidebarMenuButton
          
         
            className={`py-5 ${
              location.pathname == menu.path ? "bg-sky-600 text-sky-200" : ""
            } hover:bg-sky-100 hover:text-sky-800 duration-300 `}
            
          >
            <menu.icon />
            <span className="text-[13px]">{menu.title}</span>
          </SidebarMenuButton>
        </Link> : <></>
        })}
       
        {items.map((item) => (
          <Collapsible
            key={item.title}
            asChild
            defaultOpen={item.isActive}
            className="group/collapsible"
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton tooltip={item.title}>
                  {item.icon && <item.icon />}
                  <span className="text-[13px]">{item.title}</span>
                  <ChevronRight className="ml-auto transition-transform duration-300 group-data-[state=open]/collapsible:rotate-90" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {item.items?.map((subItem) => (
                    <SidebarMenuSubItem key={subItem.title}>
                      <SidebarMenuSubButton asChild className="py-4">
                        <Link to={subItem.url}>
                          <span className={subItem.url == location.pathname ? 'text-sky-600 text-[13px]' : 'text-[13px]'}>{subItem.title}</span>
                        </Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
