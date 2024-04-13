"use client"

import { 
  Sheet, 
  SheetContent, 
  SheetTrigger 
} from "@/components/ui/sheet";
import { Accordion } from "@/components/ui/accordion";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AccordionContentItem } from "@/components/accordion-item";

import { Icons } from "@/components/icons";

import { siteConfig } from "@/config/site";
import { MobileNavConfig } from "@/types";

import { adminIds } from "@/lib/constants";

import Link from "next/link";

import * as React from "react";

interface MobileNavProps {
  items: MobileNavConfig;
  userId: string;
};

export default function MobileNav({ items, userId }: MobileNavProps) {
  const [open, setOpen] = React.useState<boolean>(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
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
        <Link
          href="/"
          className="flex items-center"
          onClick={() => setOpen(false)}
        >
          <Icons.logo className="mr-2 size-4" aria-hidden="true" />
          <span className="font-bold font-heading text-xl">{siteConfig.name}</span>
        </Link>
        
        <ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-10">
          <Accordion type="multiple" className="w-full">
            <AccordionContentItem 
              items={items.general}
              setOpen={setOpen}
            />
            {adminIds.has(userId) && (
              <AccordionContentItem 
                items={items.admin}
                setOpen={setOpen}
              />
            )}
          </Accordion>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}