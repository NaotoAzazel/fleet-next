import { Icons } from "@/components/icons";

export type NavItem = {
  title: string,
  href: string,
  disabled?: boolean
};

export type MainNavItem = NavItem;

export type NavbarConfig = {
  mainNav: MainNavItem[]
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