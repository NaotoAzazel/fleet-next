"use client"

import { supabaseBrowser } from "@/lib/supabase/browser";
import * as z from "zod";

import MaxWidthWrapper from "@/components/max-width-wrapper";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";

const authPageSchema = z.object({
  "auth-required": z.coerce.boolean().optional()
});

type AuthPageParams = z.infer<typeof authPageSchema>;

export default function AuthPage({
  searchParams
}: {
  searchParams: AuthPageParams
}) {
  const isAuthRequired = authPageSchema.parse(searchParams);

  const supabase = supabaseBrowser();

  const handleLoginWithDiscord = () => {
    supabase.auth.signInWithOAuth({
      provider: "discord",
      options: {
        redirectTo: location.origin + "/auth/callback",
      },
    });
  };

  return (
    <MaxWidthWrapper className="flex h-screen">
      <div className="mx-auto flex flex-col items-center justify-center space-y-6 w-[350px]">
        {isAuthRequired["auth-required"] && (
          <div 
            className="grid p-4 gap-3 rounded-lg ring-1 ring-inset ring-zinc-300/50 dark:ring-zinc-300/10 bg-zinc-300/25 dark:bg-zinc-500/10 mb-6 -mt-24 max-w-xs"
          >
            <p className="grid gap-3 text-sm">
              Вы должны авторизоваться для доступа к данной странице
            </p>
          </div> 
        )}
        <div className="flex flex-col space-y-2 text-center">
          <Icons.logo className="mx-auto h-6 w-6" />
          <h1 className="text-2xl font-semibold tracking-tight">
            Добро пожаловать
          </h1>
          <p className="text-sm text-muted-foreground">
            Выберите один из способов авторизации ниже
          </p>
        </div>

        <Button
          onClick={handleLoginWithDiscord}
        >
          <Icons.logIn className="h-5 w-5 mr-2" />
          <span>Авторизация через Дискорд</span>
        </Button>
      </div>
    </MaxWidthWrapper>
  )
}