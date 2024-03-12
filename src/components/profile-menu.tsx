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

import { User } from "@supabase/supabase-js";
import { supabaseBrowser } from "@/lib/supabase/browser";
import { useQueryClient } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { adminIds } from "@/lib/constants";
import { dashboardConfig } from "@/config/dashboard";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ProfileMenu({ 
  user 
}: { 
  user : User | undefined | null 
}) {
  const supabase = supabaseBrowser();
  const queryClient = useQueryClient();
  const router = useRouter();

  const [openMenu, setOpenMenu] = useState<boolean>(false);

  const signOut = async() => {
		await supabase.auth.signOut();
    queryClient.clear();
		router.refresh();
  }
  
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
            <p className="font-heading text-sm font-bold">{user?.user_metadata?.full_name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {adminIds.has(user?.user_metadata.sub) ? "Администратор" : "Пользователь"}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {adminIds.has(user?.user_metadata.sub) && (
            <>
              {dashboardConfig.sidebarNav.map((item, i) => (
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
          <DropdownMenuItem onClick={signOut}>
            Выйти
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}