import { siteConfig } from "@/config/site";
import MaxWidthWrapper from "./max-width-wrapper";

export default function Footer() {
  return (
    <footer className="border-t">
      <MaxWidthWrapper>
        <div className="flex py-4 flex-col items-center gap-4 md:flex-row md:gap-2">
          <p className="font-sans text-center text-sm md:text-left">
            Построен при помощи UI библиотеки{" "}
            <a
              href="https://ui.shadcn.com/"
              className="font-medium underline underline-offset-4"
            >
              shadcn
            </a>
            . Хостинг на{" "} 
            <a
              href="https://vercel.com"
              className="font-medium underline underline-offset-4"
            >
              Vercel
            </a>
            . Код доступен на{" "}
            <a
              href={siteConfig.gitHub}
              className="font-medium underline underline-offset-4"
            >
              GitHub
            </a>
            .
          </p>
        </div>
      </MaxWidthWrapper>
    </footer>
  )
}