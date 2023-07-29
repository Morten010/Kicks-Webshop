import { ProductCard } from '@/src/components';
import SearchForm from '@/src/components/forms/SearchForm';
import { db } from '@/src/lib/db'
import React from 'react'

type SearchProps = {
  searchParams: {
      name: string
  }
}

export default async function Search({searchParams}: SearchProps) {
  console.log("params:", searchParams);
  const count = await db.product.count({
    where: {
      name: {
        contains: searchParams.name
      }
    },
  }) 
  const products = await db.product.findMany({
    where: {
      name: {
        contains: searchParams.name
      }
    },
    include: {
      productImage: true,
    }
  })

  return (
    <div
    className='flex gap-4'
    >
      <div
      className='w-[30%]'
      >
        <SearchForm count={count}/>
      </div>
      {/* product grid */}
      <div
      className='w-[70%] h-full'
      >
        <div
        className='product-grid h-full'
        >
          {products.length !== 0 && products.map(p => (
            <ProductCard product={p} />
          ))}
          {products.length === 0 && (
            <div
            className='h-full grid place-content-center'
            >
              <p>No Products found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
