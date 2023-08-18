import { ProductCard } from '@/src/components';
import SearchFormContainer from '@/src/components/forms/SearchFormContainer';
import { db } from '@/src/lib/db'
import React from 'react'

export const revalidate = 0

type SearchProps = {
  searchParams: {
      name?: string
      gender?: string
      sizes?: string[]
      orderby?: any
      category?: string
  }
}

export default async function Search({searchParams}: SearchProps) {
  // format search sizes for get request
  let searchSizes: number[] | undefined = undefined
  if(typeof searchParams.sizes === "string"){
    searchSizes = [parseInt(searchParams.sizes)]
  } else if(typeof searchParams.sizes === "object"){
    searchSizes = searchParams.sizes.map(s => {return parseInt(s)})
  }


  const count = await db.product.count({
    where: {
      name: {
        contains: searchParams.name
      },
      size: {
        every: {
          size: {
            in: searchSizes
          }
        }
      }, 
      categoryId: {
        equals: searchParams.category ? parseInt(searchParams.category): undefined
      },
      gender: searchParams.gender,
    },
  }) 

  const products = await db.product.findMany({
    orderBy: {
      createdAt: searchParams.orderby ? searchParams.orderby : "desc"
    },
    where: { 
      name: {
        contains: searchParams.name
      },
      gender: searchParams.gender,
      size: {
        some: {
          size: {
            in: searchSizes
          }
        }
      }, 
      categoryId: {
        equals: searchParams.category ? parseInt(searchParams.category): undefined
      },
    },
    include: {
      productImage: true,
      size: true,
    },
  })
  

  const sizes = await db.size.groupBy({
    by: ['size'],
  })
  
  const sortedSizes = sizes.map(item => {return item.size})

  return (
    <div
    className='flex flex-col lg:flex-row gap-4'
    >
      <div
      className='w-full lg:w-[30%] lg:inline-block'
      >
        <SearchFormContainer count={count} sizes={sortedSizes} />
      </div>
      {/* product grid */}
      <div
      className='w-full lg:w-[70%] h-full'
      >
        <div
        className='product-grid h-full'
        >
          {products.length !== 0 && products.map(p => (
            <ProductCard product={p} key={p.id}/>
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
