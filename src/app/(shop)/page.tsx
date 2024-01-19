import { Categories, HeroProduct, Products } from "@/src/components";
import { db } from "@/src/lib/db";
import Image from "next/image";

export const revalidate = 3600;

export default async function Home() {

  const products = await db.product.findMany({
    orderBy: {
      createdAt: "desc"
    },
    select: {
      id: true,
      name: true,
      slug: true,
      price: true,
      productImage: true,
      createdAt: true,
    },
    take: 4,
  })

  const cateogories = await db.category.findMany({})
      
  return (
    <main
    className="w-full flex flex-col gap-6"
    >
      {/* hero title */}
      <Image
      src="/hero-title.svg"
      priority
      width={300}
      height={20}
      className="w-full"
      alt="do it right"
      />
      {/* hero title end */}
      <HeroProduct />
      {/* hero product */}
      {products && <Products products={products}/>}
      {/* hero product end */}

      {/* start of categories */}
      <Categories categories={cateogories} />
      {/* end of categories */}

    </main>
  )
}
