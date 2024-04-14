import DashboardShell from "../_components/shell";
import { PostItem } from "./_components/post-item";

import { Header } from "@/components/header";

import { Button } from "@/components/ui/button";

export default function ColorPageLoading() {
  return (
    <DashboardShell>
      <Header.Skeleton 
        heading="Доступный транспорт"
        text="Удалось найти 0 ед. транспорта"
      >
        <Button>Добавить</Button>
      </Header.Skeleton>
      <div className="divide-border-200 divide-y rounded-md border">
        <PostItem.Skeleton />
        <PostItem.Skeleton />
        <PostItem.Skeleton />
        <PostItem.Skeleton />
        <PostItem.Skeleton />
      </div>
    </DashboardShell>
  )
}