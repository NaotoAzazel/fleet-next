import AddTransport from "@/components/add-post-dialog";
import { EmptyPlaceholder } from "@/components/empty-placeholder";
import Header from "@/components/header";
import DashboardPagination from "@/components/pagination";
import PostItem from "@/components/post-item";
import { getPostsByParams } from "@/lib/posts";

/** TODOL Fix when remove the last post from the page, pageQuery 
 *  remains the same value and there are posts, but since 
 * were trying to load a page that doesnt exist, its loading ?page=pageNumber 
 * */

export default async function TranportPage({
  searchParams
}: { searchParams: { page?: number }}) {
  const pageNumber = Number(searchParams.page) || 1;

  const take = 8;
  const skip = (pageNumber - 1) * take;

  const { data: posts, metadata } = await getPostsByParams(undefined, "asc", "all", take, skip);

  return (
    <div className="grid items-start gap-4">
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
    </div>
  )
}