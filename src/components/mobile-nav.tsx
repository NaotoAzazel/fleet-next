import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger 
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { navbarConfig } from "@/config/nav";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import NavItem from "./nav-item";

export default function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" className="items-center">
          <Icons.logo className="h-5 w-5"/>
          <span 
            className="ml-2 font-bold font-heading text-xl text-left"
          >
            Меню
          </span>
        </Button>
      </SheetTrigger>

      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle className="text-xl font-bold font-heading text-left">
            <Link href="/">
              {siteConfig.name}
            </Link>
          </SheetTitle>
        </SheetHeader>

        <div className="grid gap-2 w-200px flex-col items-center mt-4">
          {navbarConfig.mainNav.map((category, i) =>
            <NavItem 
              category={category} 
              key={i} 
              className="text-left" 
            />
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}