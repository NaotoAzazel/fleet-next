import MaxWidthWrapper from "@/components/max-width-wrapper";
import Header from "@/components/header";
import Filter from "@/components/filter";
import ProductCard from "@/components/product-card";

import { Transport } from "@/types";

import { getPostsByParams } from "@/lib/posts";
import { TransportPageSchema, transportPageSchema } from "@/lib/validation/pages";

export default async function TransportPage({ 
  searchParams 
}: { 
  searchParams: TransportPageSchema
}) {
  let posts: Transport[] = [];
  const { search, sort, status } = transportPageSchema.parse({
    search: searchParams.search,
    status: searchParams.status,
    sort: searchParams.sort
  });

  const { data: initialPosts } = await getPostsByParams();
  const { data: filteredPosts } = await getPostsByParams(search, sort, status);

  if (search.length || status.length > 3 || sort.length > 3) {
    if (filteredPosts) {
      posts = filteredPosts;
    } else posts = [];
  } else {
    posts = initialPosts ?? [];
  }

  return (
    <MaxWidthWrapper>
      <div className="grid flex-1 my-7">
        <Header heading="Список доступного транспорта" text="Резервируйте транспорт в один клик" />
        <Filter />

        <div className="my-7 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {posts.map((post, i) => (
            <ProductCard post={post} key={i} />
          ))}
        </div>
      </div>
    </MaxWidthWrapper>
  )
}