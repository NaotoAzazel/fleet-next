import AddTransport from "@/components/add-post-dialog";
import { EmptyPlaceholder } from "@/components/empty-placeholder";
import { PostItem } from "@/components/post-item";

import { Header } from "@/components/header";
import DashboardShell from "@/components/shell";
import DashboardPagination from "@/components/pagination";

import { getPostsByParams } from "@/lib/posts";
import { redirect } from 'next/navigation'

export default async function TranportPage({
  searchParams
}: { searchParams: { page?: number }}) {
  const pageNumber = Number(searchParams.page) || 1;

  const take = 8;
  const skip = (pageNumber - 1) * take;

  const { data: posts, metadata } = await getPostsByParams(undefined, "asc", "all", take, skip);
  if(pageNumber > metadata.totalPages) {
    redirect(`/dashboard/transport?page=${metadata.totalPages}`);
  }

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
          <DashboardPagination page={pageNumber} {...metadata} />
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