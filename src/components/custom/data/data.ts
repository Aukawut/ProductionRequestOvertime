import { BookOpen, ChartPie, ChartSpline, CheckCircle, ClipboardPlus, FileUser, GalleryVerticalEnd, Settings2 } from "lucide-react";


export const singleMenuItem = [
  {
    title: "Overview",
    path: "/",
    icon: ChartPie
  },
  {
    title: "Add Request",
    path: "/request",
    icon: ClipboardPlus 
  },
  {
    title: "My Request",
    path: "/request/me",
    icon: FileUser
  },
  {
    title: "Approve",
    path: "/approve",
    icon: CheckCircle
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
          title: "Overtime Quota",
          url: "#",
        },
        {
          title: "Approver",
          url: "/setting/approver",
        },
        {
          title: "Employee",
          url: "/employee",
        },
        {
          title: "Approvers",
          url: "#",
        },
        {
          title: "Group Department",
          url: "#",
        },
        {
          title: "Factory",
          url: "#",
        },
      ],
    },
    
    {
      title: "Report",
      url: "/report",
      icon: ChartSpline,
      items: [
        {
          title: "Introduction",
          url: "#",
        },
        {
          title: "Get Started",
          url: "#",
        },
        
      ],
    },
  ],
};
