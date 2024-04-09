import AddFilter from "../_components/add-filter-dialog";
import { FilterItem } from "../_components/filter-item";
import DashboardShell from "../_components/shell";

import { Pagination } from "@/components/pagination";
import { EmptyPlaceholder } from "@/components/empty-placeholder";
import { Header } from "@/components/header";

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
      {!categories.length ? (
        <EmptyPlaceholder>
          <EmptyPlaceholder.Icon name="category" />
          <EmptyPlaceholder.Title>Не удалось найти категории</EmptyPlaceholder.Title>
          <EmptyPlaceholder.Description>
            Не удалось найти ни одной категории
          </EmptyPlaceholder.Description>
        </EmptyPlaceholder>
      ): (
        <>
          <div className="divide-y divide-border rounded-md border">
            {categories.map((category, i) => (
              <FilterItem key={i} data={category} filterType="categories" />
            ))}
          </div>
          {metadata.totalPages > pageNumber ? (
            <Pagination page={metadata.totalPages} {...metadata} />
          ) : (
            <Pagination page={pageNumber} {...metadata} />
          )}
        </>
      )}
    </DashboardShell>
  )
}