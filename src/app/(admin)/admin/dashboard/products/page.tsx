import { ProductAdminCard } from '@/src/components'
import { db } from '@/src/lib/db'
import { products } from '@/src/lib/db/schema'
import Link from 'next/link'
import React from 'react'
import { AiOutlinePlusCircle } from 'react-icons/ai'

export default async function Products() {

  // get all products
  const result = await db.product.findMany({
    include: {
      productImage: true,
    },
  });

  return (
    <div>
        <div
        className='flex justify-between items-center'
        >
            <h1
            className='text-xl font-semibold'
            >
                All Products
            </h1>
            <Link
            href="/admin/dashboard/products/create"
            className='secondary-btn flex gap-2 items-center'
            >
                <AiOutlinePlusCircle className='text-xl'/> Add New Product 
            </Link>
        </div>

        <div
        className='category-grid py-4'
        >
          {result && result.map((product, index) => (
            <ProductAdminCard key={index} product={product}/>
          ))}
        </div>

    </div>
  )
}
