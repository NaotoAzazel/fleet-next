import { Button, buttonVariants } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import Link from "next/link";
import { cn } from "@/lib/utils";

type User = Object | null;

interface AuthButtonProps {
  user: User
};

export default function AuthButton({ user }: AuthButtonProps) {
  return (
    <>
      {user ? (
        <Button variant="ghost">
          <Icons.user className="h-5 w-5" />
        </Button>
      ) : (
        <Link href="/auth" className={cn(buttonVariants({ variant: "ghost" }), "flex flex-row items-center")}>
          <Icons.logIn className="h-5 w-5 mr-2" />
          <span>Войти</span>
        </Link>
      )}
    </>
  )
}