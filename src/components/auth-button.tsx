"use client"

import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { supabaseBrowser } from "@/lib/supabase/browser";
import useUser from "@/hook/useUser";
import ProfileMenu from "@/components/profile-menu";

export default function AuthButton() {
  const supabase = supabaseBrowser();
  const { isFetching, data: user } = useUser();

  const handleLoginWithDiscord = () => {
    supabase.auth.signInWithOAuth({
			provider: "discord",
			options: {
				redirectTo: location.origin + "/auth/callback",
			},
		});
	};

  return (
    <>
      {user && !isFetching ? (
        <ProfileMenu user={user}/>
      ) : (
        <Button variant="ghost" onClick={handleLoginWithDiscord} >
          <Icons.logIn className="h-5 w-5 mr-2" />
          <span>Войти</span>
        </Button>
      )}
    </>
  )
}