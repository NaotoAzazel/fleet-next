import { navbarConfig } from "@/config/nav"
import NavItem from "@/components/nav-item";

export default function NavItems() {
  return (
    <div className="flex gap-4 h-full">
      {navbarConfig.mainNav.map((category, i) => 
        <NavItem category={category} key={i} variant="ghost" />
      )}
    </div>
  )
}