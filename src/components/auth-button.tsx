"use client"

import { buttonVariants } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import ProfileMenu from "@/components/profile-menu";

import useUser from "@/hook/useUser";

import Link from "next/link";

export default function AuthButton() {
  const { isFetching, data: user } = useUser();

  return (
    <>
      {user && !isFetching ? (
        <ProfileMenu user={user}/>
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