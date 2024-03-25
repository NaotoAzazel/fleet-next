import AddFilter from "@/components/add-filter-dialog";
import { FilterItem } from "@/components/filter-item";

import { Header } from "@/components/header";
import DashboardPagination from "@/components/pagination";
import DashboardShell from "@/components/shell";

import { getCategoriesByParams } from "@/lib/posts";

export const metadata = {
  title: "Дашборд • Категории"
};

export default async function CategoryPage({ 
  searchParams
}: { searchParams: { page?: number }}
) {
  const pageNumber = Number(searchParams.page) || 1;

  const take = 8;
  const skip = (pageNumber - 1) * take;

  const { data: categories, metadata } = await getCategoriesByParams(take, skip);

  return (
    <DashboardShell>
      <Header heading="Категории" text="Ниже отображаються все категории">
        <AddFilter filterType="categories" />
      </Header>
      <div className="divide-y divide-border rounded-md border">
        {categories.map((category, i) => (
          <FilterItem key={i} data={category} filterType="categories" />
        ))}
      </div>
      {metadata.totalPages > pageNumber ? (
        <DashboardPagination page={metadata.totalPages} {...metadata} />
      ) : (
        <DashboardPagination page={pageNumber} {...metadata} />
      )}
    </DashboardShell>
  )
}