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