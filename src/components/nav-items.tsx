import NavItem from "@/components/nav-item";
import { NavItem as NavItemType } from "@/types";

interface NavItemsProps {
  items: NavItemType[];
};

export default function NavItems({ items }: NavItemsProps) {
  return (
    <div className="flex gap-4 h-full">
      {items.map((category, i) => 
        <NavItem category={category} key={i} variant="ghost" />
      )}
    </div>
  )
}