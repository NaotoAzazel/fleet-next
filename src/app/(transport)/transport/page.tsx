import MaxWidthWrapper from "@/components/max-width-wrapper";
import Header from "@/components/header";
import Filter from "@/components/filter";
import ProductCard from "@/components/product-card";
import { Transport } from "@/types";
import { getPostsByParams } from "@/lib/posts";

export default async function TransportPage({ 
  searchParams 
}: { 
  searchParams: { search?: string, sort?: string, s?: string }
}) {
  let posts: Transport[] = [];
  const searchQuery = searchParams.search ?? "";
  const statusQuery = searchParams.s as "avai" | "unavai" | "all" ?? "all";
  const sortQuery = searchParams.sort as "asc" | "desc" ?? "asc";

  const initialPosts = await getPostsByParams();
  const filteredPosts = await getPostsByParams(searchQuery, sortQuery, statusQuery);

  if (searchQuery.length || statusQuery.length > 3 || sortQuery.length > 3) {
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
        <Suspense>
          <Filter />
        </Suspense>

        <div className="my-7 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {posts.map((post, i) => (
            <ProductCard post={post} key={i} />
          ))}
        </div>
      </div>
    </MaxWidthWrapper>
  )
}