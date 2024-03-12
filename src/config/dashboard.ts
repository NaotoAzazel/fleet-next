import { DashboardConfig } from "@/types";

export const dashboardConfig: DashboardConfig = {
  sidebarNav: [
    {
      title: "Общее",
      href: "/dashboard",
      icon: "notepad"
    },
    {
      title: "Транспорт",
      href: "/dashboard/transport",
      icon: "car"
    },
    {
      title: "Цвета",
      href: "/dashboard/color",
      icon: "color"
    },
    {
      title: "Категории",
      href: "/dashboard/category",
      icon: "category"
    }
  ]
}