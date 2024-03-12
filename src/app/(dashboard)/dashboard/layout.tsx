import DashboardNav from "@/components/dashboard-nav";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import { dashboardConfig } from "@/config/dashboard";

export default function DashBoardLayout({ children }: { children?: React.ReactNode }) {
  return (
    <div className="flex flex-col">
      <MaxWidthWrapper>
        <div className="grid flex-1 gap-12 md:grid-cols-[200px_1fr] my-7">
          <aside className="hidden w-200px flex-col md:flex">
            <DashboardNav items={dashboardConfig.sidebarNav} />
          </aside>
          <main className="flex w-full flex-1 flex-col overflow-hidden">
            {children}
          </main>
        </div>
      </MaxWidthWrapper>
    </div>
  )
}