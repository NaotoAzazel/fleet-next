import MaxWidthWrapper from "@/components/max-width-wrapper";
import { buttonVariants } from "@/components/ui/button";
import { featureCards } from "@/config/features";
import { siteConfig } from "@/config/site";
import FeatureCard from "@/components/feature-card";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <section>
        <MaxWidthWrapper>
          <div className="py-20 lg:py-36 mx-auto text-center flex flex-col items-center max-w-3xl space-y-4">
            <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-5xl font-heading">
              Fleet - ваш персональный сервис по управлению транспортом!
            </h1>

            <p className="max-w-[700px] text-lg text-muted-foreground font-sans">
              Управляйте транспортом легко с Fleet - без лишних заморочек.
            </p>

            <div className="flex gap-4">
              <Link 
                href="/login" 
                className={buttonVariants()}
              >
                Авторизация
              </Link>
              <Link 
                href={siteConfig.gitHub} 
                className={buttonVariants({ variant: "outline" })}
              >
                GitHub
              </Link>
            </div>
          </div>
        </MaxWidthWrapper>
      </section>

      <section id="features" className="py-20 lg:py-36">
        <MaxWidthWrapper className="space-y-6">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
            <h2 className="font-heading font-bold text-3xl leading-[1.1] md:text-5xl">
              Технологии проекта
            </h2>

            <p className="max-w-[700px] text-lg text-muted-foreground font-sans">
              Fleet создан с использованием современных технологий, обеспечивающих надежность и эффективность. 
            </p>
          </div>

          <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:grid-cols-3">
            {featureCards.map((cart, i) => 
              <FeatureCard cart={cart} key={i} />
            )}
          </div>
        </MaxWidthWrapper>
      </section>
    </>
  );
}
