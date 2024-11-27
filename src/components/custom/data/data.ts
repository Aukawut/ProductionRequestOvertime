import { BookOpen, ChartPie, FileUser, GalleryVerticalEnd, Settings2 } from "lucide-react";


export const singleMenuItem = [
  {
    title: "Overview",
    path: "/",
    icon: ChartPie
  },
  {
    title: "Request (OT)",
    path: "/request",
    icon: FileUser
  },
  {
    title: "My Request",
    path: "/request/me",
    icon: FileUser
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
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
    {
      title: "Documentation",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Introduction",
          url: "#",
        },
        {
          title: "Get Started",
          url: "#",
        },
        {
          title: "Tutorials",
          url: "#",
        },
        {
          title: "Changelog",
          url: "#",
        },
      ],
    },
  ],
};
