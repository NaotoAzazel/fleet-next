"use client"

import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuLabel, 
  DropdownMenuTrigger,
  DropdownMenuGroup, 
  DropdownMenuItem, 
  DropdownMenuSeparator 
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";

import { adminIds } from "@/lib/constants";
import { navbarConfig } from "@/config/nav";

import { useState } from "react";

import Link from "next/link";

import { signOut } from "next-auth/react";

import type { Session } from "next-auth";
type User = NonNullable<Session["user"]>;

export default function ProfileMenu({ 
  user 
}: { 
  user : User | null 
}) {
  const [openMenu, setOpenMenu] = useState<boolean>(false);

  return (
    <DropdownMenu open={openMenu} onOpenChange={setOpenMenu}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">
          <Icons.user className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel>
          <div className="flex flex-col space-y-1">
            <p className="font-heading text-sm font-bold">{user?.name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {adminIds.has(user?.id as string) ? "Администратор" : "Пользователь"}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {adminIds.has(user?.id as string) && (
            <>
              {navbarConfig.dashboardNav.map((item, i) => (
                <Link key={i} href={item.href}>
                  <DropdownMenuItem 
                    key={i} 
                    onClick={() => setOpenMenu(false)}
                  >
                    {item.title}
                  </DropdownMenuItem>
                </Link>
              ))}
              <DropdownMenuSeparator />
            </>
          )}
          <DropdownMenuItem onClick={() => signOut()}>
            Выйти
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}