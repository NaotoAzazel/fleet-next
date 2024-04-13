import { ButtonProps, buttonVariants } from "@/components/ui/button";

import { NavItem as NavItemType } from "@/types";
import { cn } from "@/lib/utils";

import Link from "next/link";

interface NavItemProps extends ButtonProps {
  category: NavItemType;
};

export default function NavItem({
  category,
  className,
  variant
}: NavItemProps) {
  return (
    <div className="flex">
      <div className="relative flex items-center">
        <Link 
          href={category.href} 
          className={cn(
            "gap-1.5",
            className,
            variant && buttonVariants({ variant })
          )}
        >
          {category.title}
        </Link>
      </div>
    </div>
  )
}