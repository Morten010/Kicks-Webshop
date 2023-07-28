import { HeroProduct, Products } from "@/src/components";
import { db } from "@/src/lib/db";
import Image from "next/image";

export default async function Home() {

  const products = await db.product.findMany({
    include: {
      productImage: true,
    },
    take: 4,

  })
      
  return (
    <main
    className="relative w-full flex flex-col gap-6"
    >
      {/* hero title */}
      <Image
      src="/hero-title.svg"
      priority
      height={300}
      width={300}
      layout="responsive"
      alt="do it right"
      />
      {/* hero title end */}
      <HeroProduct />
      {/* hero product */}
      <Products products={products}/>
      {/* hero product end */}

    </main>
  )
}
