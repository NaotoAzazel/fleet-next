import AddFilter from "../_components/add-filter-dialog";
import { FilterItem } from "../_components/filter-item";

import DashboardPagination from "../_components/pagination";
import DashboardShell from "../_components/shell";

import { EmptyPlaceholder } from "@/components/empty-placeholder";
import { Header } from "@/components/header";

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
      {!colors.length ? (
        <EmptyPlaceholder>
          <EmptyPlaceholder.Icon name="color" />
          <EmptyPlaceholder.Title>Не удалось найти цвета</EmptyPlaceholder.Title>
          <EmptyPlaceholder.Description>
            Не удалось найти ни одного цвета
          </EmptyPlaceholder.Description>
        </EmptyPlaceholder>
      ): (
        <>
          <div className="divide-y divide-border rounded-md border">
            {colors.map((color, i) => (
              <FilterItem key={i} data={color} filterType="colors" />
            ))}
          </div>
          <DashboardPagination page={pageNumber} {...metadata} />
        </>
      )}
    </DashboardShell>
  )
}