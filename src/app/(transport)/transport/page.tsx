import MaxWidthWrapper from "@/components/max-width-wrapper";
import { Header } from "@/components/header";
import Filter from "@/components/filter";
import { EmptyPlaceholder } from "@/components/empty-placeholder";
import { Pagination } from "@/components/pagination";

import { ProductCard } from "./_components/product-card";

import { getPostsByParams } from "@/lib/posts";
import { TransportPageSchema, transportPageSchema } from "@/lib/validation/pages";

export default async function TransportPage({ 
  searchParams 
}: { 
  searchParams: TransportPageSchema
}) {
  const { search, sort, status, page } = transportPageSchema.parse({
    search: searchParams.search,
    status: searchParams.status,
    sort: searchParams.sort,
    page: searchParams.page
  });

  const { data: posts, metadata } = await getPostsByParams({ name: search, sort, status, page });

  return (
    <MaxWidthWrapper>
      <div className="grid flex-1 my-7">
        <Header heading="Список доступного транспорта" text="Резервируйте транспорт в один клик" />
        <Filter />

        {!posts.length ? (
          <EmptyPlaceholder className="my-7">
            <EmptyPlaceholder.Icon name="car" />
            <EmptyPlaceholder.Title>Транспорт не найдено</EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              Попробуйте изменить фильтры, или проверьте позже
            </EmptyPlaceholder.Description>
          </EmptyPlaceholder>
        ) : (
            <>
              <div className="my-7 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {posts.map((post, i) => (
                    <ProductCard post={post} key={i} />
                  ))}
              </div>
              <Pagination page={page} {...metadata} />
            </>
        )}
      </div>
    </MaxWidthWrapper>
  )
}