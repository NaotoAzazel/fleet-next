import DashboardNav from "@/components/dashboard-nav";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import { navbarConfig } from "@/config/nav";

export default function DashBoardLayout({ children }: { children?: React.ReactNode }) {
  return (
    <div className="flex flex-col">
      <MaxWidthWrapper>
        <div className="grid flex-1 gap-12 md:grid-cols-[170px_1fr] my-7">
          <aside className="hidden w-170px flex-col md:flex">
            <DashboardNav items={navbarConfig.dashboardNav} />
          </aside>
          <main className="flex w-full flex-1 flex-col overflow-hidden">
            {children}
          </main>
        </div>
      </MaxWidthWrapper>
    </div>
  )
}