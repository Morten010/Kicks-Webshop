import { Categories, HeroProduct, Products } from "@/src/components";
import { db } from "@/src/lib/db";
import Image from "next/image";
import { Suspense } from "react";

export const revalidate = 3600;

export default function Home() {

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
      <Suspense
      fallback={<p>Is Loading...</p>}
      >
        <HomepageProducts />
      </Suspense>
      {/* hero product end */}

      {/* start of categories */}
      <Suspense
      fallback={<p>Is Loading...</p>}
      >
        <HomepageCategories />
      </Suspense>
      {/* end of categories */}

    </main>
  )
}


const HomepageProducts = async () => {
  
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

  return (
    <Products products={products}/>
  )
}

const HomepageCategories = async () => {

  const cateogories = await db.category.findMany({})

  return (
    <Categories categories={cateogories} />
  )
} 