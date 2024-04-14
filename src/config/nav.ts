import { NavbarConfig, SideBarConfig } from "@/types";

export const navbarConfig: NavbarConfig = {
  mainNav: [
    {
      title: "Технологии",
      href: "/#features",
    },
    {
      title: "Список транспорта",
      href: "/transport",
    }
  ],
  dashboardNav: [
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
};

export const sideBarNav: SideBarConfig = {
  general: [
    {
      title: "Общее",
      items: [
        {
          title: "Технологии",
          href: "/#features",
        },
        {
          title: "Список транспорта",
          href: "/transport",
        }
      ]
    },
  ],
  admin: [
    {
      title: "Дашборд",
      items: [
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
        },
        {
          title: "Категории",
          href: "/dashboard/category",
        }
      ]
    }
  ]
};