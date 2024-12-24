import {  ChartPie, ChartSpline, CheckCircle, ClipboardPlus, FileUser, GalleryVerticalEnd, Settings2 } from "lucide-react";


export const singleMenuItem = [
  {
    title: "Overview",
    path: "/",
    icon: ChartPie,
    allowed:["ADMIN","MANAGER","ASSISTANT MANAGER","GENERAL MANAGER","SENIOR SUPERVISOR","SUPERVISOR","STAFF","OPERATOR","PLANNING","LEADER"]
  },
  {
    title: "Add Request",
    path: "/request",
    icon: ClipboardPlus ,
    allowed:["ADMIN","STAFF","LEADER","SUPERVISOR"]
  },
  {
    title: "My Request",
    path: "/request/me",
    icon: FileUser,
    allowed:["ADMIN","STAFF","LEADER","SUPERVISOR"]
  },
  {
    title: "Approve",
    path: "/approve",
    icon: CheckCircle,
    allowed:["APPROVER"]
  },
 
];


export const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "OT Management Systen",
      logo:GalleryVerticalEnd,
      plan: "Production",
    },
  ],
  navMain: [
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      isActive: true,
      items: [
        {
          title: "Overtime Plan",
          url: "/main/plan",
          allowed:["ADMIN","PLANNING"]
        },
        {
          title: "Overtime Plan (OB)",
          url: "/plan/ob",
          allowed:["ADMIN","PLANNING"]
          
        },
        {
          title: "Approvers",
          url: "/setting/approver",
          allowed:["ADMIN"]
        },
        {
          title: "Employees",
          url: "/setting/employee",
          allowed:["ADMIN","SENIOR SUPERVISOR","SUPERVISOR","ASSISTANT MANAGER","MANAGER"]
        },
      
        {
          title: "Upload Overtime Actual",
          url: "/overtime/actual",
          allowed:["ADMIN","STAFF"]
        },
        {
          title: "Factory",
          url: "/setting/factory",
          allowed:["ADMIN"]
        },
      ],
    },
    
    {
      title: "Report",
      url: "/report",
      icon: ChartSpline,
      allowed:["ADMIN","MANAGER","ASSISTANT MANAGER","GENERAL MANAGER","SENIOR SUPERVISOR","SUPERVISOR","STAFF","OPERATOR","PLANNING","LEADER"],
      items: [
        {
          title: "Overtime Actual",
          url: "/report/actual/overtime",
          allowed:["ADMIN","MANAGER","ASSISTANT MANAGER","GENERAL MANAGER","SENIOR SUPERVISOR","SUPERVISOR","STAFF","OPERATOR","PLANNING","LEADER"]
        },
        {
          title: "Overtime Actual - Work",
          url: "/report/work/actual/overtime",
          allowed:["ADMIN","MANAGER","ASSISTANT MANAGER","GENERAL MANAGER","SENIOR SUPERVISOR","SUPERVISOR","STAFF","OPERATOR","PLANNING","LEADER"]
        },
        
      ],
    },
  ],
};
