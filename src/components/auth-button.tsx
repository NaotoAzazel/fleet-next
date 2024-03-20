import { buttonVariants } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import ProfileMenu from "@/components/profile-menu";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

import Link from "next/link";

export default async function AuthButton() {
  const session = await getServerSession(authOptions);

  return (
    <>
      {session ? (
        <ProfileMenu user={session.user} />
      ) : (
        <Link 
          href="/login"
          className={buttonVariants({ variant: "ghost" })}
        >
          <Icons.logIn className="h-5 w-5 mr-2" />
          <span>Войти</span>
        </Link>
      )}
    </>
  )
}