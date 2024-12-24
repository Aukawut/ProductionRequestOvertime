import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { data } from "../data/data";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ChevronDownIcon, Slash } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../../assets/images/Prospira_logos.png";
import { useOTManagementSystemStore } from "../../../../store";
import { IsHavePermission } from "@/function/main";

interface BreadcrumbMenuProps {
  path: string;
}

const BreadcrumbMenu: React.FC<BreadcrumbMenuProps> = ({ path }) => {
  const info = useOTManagementSystemStore((state) => state.info);
  const overview = [
    "ADMIN",
    "MANAGER",
    "ASSISTANT MANAGER",
    "GENERAL MANAGER",
    "SENIOR SUPERVISOR",
    "SUPERVISOR",
    "STAFF",
    "OPERATOR",
    "PLANNING",
    "LEADER",
  ];
  const addRequest = ["ADMIN", "STAFF", "LEADER", "SUPERVISOR"];
  const navigate = useNavigate();
  const permission = info?.Role?.map((x) => x.NAME_ROLE);

  return (
    <div className="flex items-center gap-x-2">
      <img src={Logo} className="h-[1.4rem]" />

      <Breadcrumb>
        <BreadcrumbList className="text-[13px]">
          <BreadcrumbItem>
            {IsHavePermission(
              overview,
              permission
            ) ? (
              <Link to="/">
                <BreadcrumbLink
                  style={{ color: "" }}
                  className={`${path == "/" ? "text-sky-700" : ""}`}
                >
                  Overview
                </BreadcrumbLink>
              </Link>
            ) : (
              <></>
            )}
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <Slash />
          </BreadcrumbSeparator>

          {IsHavePermission(
            addRequest,
            permission
          ) ? (
            <BreadcrumbItem>
              <Link to="/request">
                <BreadcrumbLink
                  style={{ color: "" }}
                  className={`${path == "/request" ? "text-sky-700" : ""}`}
                >
                  Request
                </BreadcrumbLink>
              </Link>
            </BreadcrumbItem>
          ) : (
            <></>
          )}

          <BreadcrumbSeparator>
            <Slash />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            {data?.navMain?.map((navItem, index) => {
              const allowed = navItem.allowed;
              allowed !== undefined && IsHavePermission(allowed, navItem.allowed);

              return (
                <DropdownMenu key={index}>
                  <DropdownMenuTrigger className="flex items-center gap-1">
                    {navItem?.title}
                    <ChevronDownIcon size={16} />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start">
                    {navItem?.items?.map((item) => (
                      <DropdownMenuItem
                        key={item.url}
                        className="text-[13px]"
                        onClick={() => navigate(item.url)}
                      >
                        {item.title}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              );
            })}
          </BreadcrumbItem>

          <BreadcrumbSeparator>
            <Slash />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbLink href="/components">
              {data?.navMain[1]?.title}
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};

export default BreadcrumbMenu;
