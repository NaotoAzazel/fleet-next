import MaxWidthWrapper from "@/components/max-width-wrapper";
import Header from "@/components/header";
import { prisma } from "@/lib/prisma";
import Filter from "@/components/filter";
import ProductCard from "@/components/product-card";

async function getPosts() {
  const posts = await prisma.transport.findMany();
  return posts;
}

export default function TransportPage() {
  const array = Array.from({ length: 10 });

  return (
    <MaxWidthWrapper>
      <div className="grid flex-1 my-7">
        <Header heading="Список доступного транспорта" text="Резервируйте транспорт в один клик" />
        <Filter />

        <div className="my-7 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {array.map((_, i) => (
            <ProductCard key={i} />
          ))}
        </div>
      </div>
    </MaxWidthWrapper>
  )
}