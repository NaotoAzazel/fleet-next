import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import Link from "next/link";

import { cn } from "@/lib/utils";
import { MobileNavItem } from "@/types";

interface AccordionContentItemProps {
  items: MobileNavItem[];
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export function AccordionContentItem({ items, setOpen }: AccordionContentItemProps) {
  return (
    <>
      {items.map((item, i) => (
        <AccordionItem value={item.title} key={i}>
          <AccordionTrigger className="text-sm capitalize">
            {item.title}
          </AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col space-y-2">
              {item.items.map((subItem, i) => 
                subItem.href ? (
                  <MobileLink
                    key={i}
                    href={subItem.href}
                    setOpen={setOpen}
                    disabled={subItem.disabled}
                    className="m-1"
                  >
                    {subItem.title}
                  </MobileLink>
                ) : (
                  <div
                    key={i} 
                    className="text-foreground/70 transition-colors"
                  >
                    {item.title}
                  </div>
                )
              )}
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </>
  )
}

interface MobileLinkProps 
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    href: string;
    disabled?: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
  };

function MobileLink({
  children,
  href,
  disabled,
  setOpen,
  className,
  ...props
}: MobileLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "text-foreground/70 transition-colors hover:text-foreground",
        disabled && "pointer-events-none opacity-60",
        className
      )}
      onClick={() => setOpen(false)}
      {...props}
    >
      {children}
    </Link>
  );
}