import MaxWidthWrapper from "@/components/max-width-wrapper";
import NavItems from "@/components/nav-items";
import Link from "next/link";
import { Icons } from "@/components/icons";
import { siteConfig } from "@/config/site";
import MobileNav from "./mobile-nav";
import AuthButton from "./auth-button";
import { ModeToggle } from "./mode-toggle";

export default function Navbar() {
  return (
    <>
      <div className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky z-50 top-0 inset-x-0 h-16">
        <header className="relative border-b">
          <MaxWidthWrapper>
            <div className="flex h-16 items-center">
              <Link href="/" className="items-center space-x-2 hidden md:flex">
                <Icons.logo />
                <span className="font-heading font-bold text-xl">{siteConfig.name}</span>
              </Link>

              <div className="block md:hidden">
                <MobileNav />
              </div>

              <div className="hidden z-50 lg:ml-8 md:ml-4 md:block lg:self-stretch">
                <NavItems />
              </div>

              <div className="ml-auto items-center">
                <div className="flex lg:flex-1 lg:items-center lg:justify-end space-x-2">
                  <ModeToggle />
                  <AuthButton />
                </div>
              </div>

            </div>
          </MaxWidthWrapper>
        </header>
      </div>
    </>
  )
}