import { Header } from "@/components/header";
import DashboardShell from "../_components//shell";

import { FilterItem } from "../_components/filter-item";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Дашборд • Категории"
};

export default async function CategoryPageLoading() {
  return (
    <DashboardShell>
      <Header.Skeleton 
        heading="Категории" 
        text="Ниже отображаються все категории"
      >
        <Button>Добавить</Button>
      </Header.Skeleton>
      <div className="divide-border-200 divide-y rounded-md border">
        <FilterItem.Skeleton />
        <FilterItem.Skeleton />
        <FilterItem.Skeleton />
        <FilterItem.Skeleton />
        <FilterItem.Skeleton />
      </div>
    </DashboardShell>
  )
}