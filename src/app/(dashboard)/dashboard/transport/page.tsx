import { PostItem } from "./_components/post-item";
import { AddTransport } from "./_components/add-transport-dialog";
import DashboardShell from "../_components/shell";

import { Pagination } from "@/components/pagination";
import { EmptyPlaceholder } from "@/components/empty-placeholder";
import { Header } from "@/components/header";

import { getPostsByParams } from "@/lib/posts";

export const metadata = {
  title: "Дашборд • Транспорт"
};

export default async function TranportPage({
  searchParams
}: { searchParams: { page?: number }}) {
  const pageNumber = Number(searchParams.page) || 1;

  const take = 8;
  const skip = (pageNumber - 1) * take;

  const { data: posts, metadata } = await getPostsByParams({ take, skip });

  return (
    <DashboardShell>
      <Header 
        heading="Доступный транспорт"
        text={metadata.totalRecords > 0
          ? `Удалось найти ${metadata.totalRecords} ед. транспорта`
          : "Не удалось найти транспорт"
        }
      > 
        <AddTransport />
      </Header>

      {posts.length ? (
        <>
          <div className="divide-y divide-border rounded-md border">
            {posts.map((post, i) => (
              <PostItem key={i} post={post} />
            ))}
          </div>
          <Pagination page={pageNumber} {...metadata} />
        </>
      ) : (
        <EmptyPlaceholder>
          <EmptyPlaceholder.Icon name="car" />
          <EmptyPlaceholder.Title>Не удалось найти транспорт</EmptyPlaceholder.Title>
          <EmptyPlaceholder.Description>
            На данный момент не добавлено ни одного транспорта
          </EmptyPlaceholder.Description>
          <AddTransport variant="outline" />
        </EmptyPlaceholder>
      )}  
    </DashboardShell>
  )
}