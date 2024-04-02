import AddFilter from "@/components/add-filter-dialog";
import { FilterItem } from "@/components/filter-item";

import { Header } from "@/components/header";
import DashboardPagination from "@/components/pagination";
import DashboardShell from "@/components/shell";

import { getColorsByParams } from "@/lib/posts";

export const metadata = {
  title: "Дашборд • Цвета"
};

export default async function ColorPage({ 
  searchParams
}: { searchParams: { page?: number }}
) {
  const pageNumber = Number(searchParams.page) || 1;

  const take = 8;
  const skip = (pageNumber - 1) * take;

  const { data: colors, metadata } = await getColorsByParams(take, skip);

  return (
    <DashboardShell>
      <Header heading="Цвета" text="Ниже отображаються все цвета">
        <AddFilter filterType="colors" />
      </Header>
      <div className="divide-y divide-border rounded-md border">
        {colors.map((color, i) => (
          <FilterItem key={i} data={color} filterType="colors" />
        ))}
      </div>
      <DashboardPagination page={pageNumber} {...metadata} />
    </DashboardShell>
  )
}