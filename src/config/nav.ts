import { NavbarConfig, MobileNavConfig } from "@/types";

export const navbarConfig: NavbarConfig = {
  mainNav: [
    {
      title: "Технологии",
      href: "/#features"
    },
    {
      title: "Список транспорта",
      href: "/transport"
    }
  ]
};

export const mobileNav: MobileNavConfig = {
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
          href: "/dashboard"
        },
        {
          title: "Транспорт",
          href: "/dashboard/transport",
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