import { Icons } from "@/components/icons";

export type NavItem = {
  title: string;
  href: string;
  disabled?: boolean;
  icon?: keyof typeof Icons;
};

// main nav
export type NavbarConfig = {
  mainNav: NavItem[];
  dashboardNav: NavItem[];
};

type NavItemContent = {
  title: string;
  items: NavItem[];
};

// sidebar nav 
export type SideBarConfig = {
  general: NavItemContent[];
  admin: NavItemContent[];
};

export type SiteConfig = {
  name: string,
  gitHub: string,
};

export type FeatureItem = {
  title: string,
  description: string,
  icon: keyof typeof Icons
};

export type FeatureCards = FeatureItem[];

export type SidebarNavItem = {
  title: string
  disabled?: boolean
  icon?: keyof typeof Icons
} & (
  | {
      href: string
      items?: never
    }
)

export type DashboardConfig = {
  sidebarNav: SidebarNavItem[]
}

export type Transport = {
  id: number;
  name: string;
  takeBy: string;
  colorId: number;
  categoryId: number;
  plate: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
  color: Color;
  category: Category;
};

export type FilterItem = {
  id: number;
  name: string;
}

export type FilterType = "color" | "category";