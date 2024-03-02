import { navbarConfig } from "@/config/nav"
import { cn } from "@/lib/utils";
import { ButtonProps, buttonVariants } from "@/components/ui/button";
import Link from "next/link";

type Category = typeof navbarConfig.mainNav[number];

interface NavItemProps extends ButtonProps {
  category: Category
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