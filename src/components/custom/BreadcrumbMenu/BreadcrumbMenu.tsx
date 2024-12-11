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
import { Link } from "react-router-dom";

interface BreadcrumbMenuProps {
  path: string;
}

const BreadcrumbMenu: React.FC<BreadcrumbMenuProps> = ({ path }) => {
  return (
    <>
      <Breadcrumb>
        <BreadcrumbList className="text-[13px]">
          <BreadcrumbItem>
            <Link to="/">
              <BreadcrumbLink style={{color:""}} className={`${path == "/" ? 'text-sky-700' : ''}`}>Overview</BreadcrumbLink>
            </Link>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <Slash />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <Link to="/request">
              <BreadcrumbLink style={{color:""}} className={`${path == "/request" ? 'text-sky-700' : ''}`}>Request</BreadcrumbLink>
            </Link>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <Slash />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1">
                {data?.navMain[0]?.title}
                <ChevronDownIcon size={16} />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                {data?.navMain[0].items?.map((item) => (
                  <DropdownMenuItem key={item.url}>
                    {item.title}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
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
    </>
  );
};

export default BreadcrumbMenu;
