import { CreateProductForm } from "@/src/components";
import { db } from "@/src/lib/db";
import Link from "next/link";

export const revalidate = 2

export default async function ChangeProductPage({params}: {params: {slug: string}}) {
  const slug = params.slug
  console.log(slug);
  console.log(params);

  const product = await db.product.findFirst({
    where: {
      slug: slug
    },
    include: {
      productImage: true,
      size: true,
    }
  })
  console.log(product);
  

  return (
    <div
    className="h-full"
    >
      {/* product form */}
      <h1
      className='text-xl font-semibold'
      >
          Edit Products
      </h1>
      {product && <CreateProductForm edit={true} product={product} />}
      {/* end of product form */}
        
      {/* product dont exist */}
      {!product && <div
      className="h-full grid place-content-center text-center"
      >
        <h2
        className="text-3xl font-semibold"
        >
          Product not found :(
        </h2>
        <p>
          Go Back To <Link
          href="/admin/dashboard/products"
          className="underline"
          >
            Products
          </Link>
        </p>
      </div>}
      {/* end of product dont exist */}
      
    </div>
  )
}
