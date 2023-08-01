import Link from 'next/link'
import { Product, ProductImage} from '@prisma/client'
import React from 'react'

// components
import ProductCard from './ProductCard'

type ProductProps = {
    products: {
      id: number
      name: string
      slug: string
      desc: string
      price: number
      brandId: number
      gender: string
      createdAt: Date
      productImage: ProductImage[]
    }[]
}


export default function Products({products}: ProductProps) {

  
  return (
    <section>
        {/* top */}
        <div
        className='flex justify-between items-center py-4'
        >
            <h2
            className='font-bold heading max-w-[50%] sm:max-w-[60%] md:max-w-[70%]'
            >
                Don’t miss out new drops
            </h2>
            <Link href="/search/?orderby=desc" className='primary-btn'>
            SHOP NEW DROPS
            </Link>
        </div>
        {/* end of top */}

        {/* products */}
        <div className='product-grid'>
           {products?.length !== 0 && products?.map(product => (
               <ProductCard product={product}/>
           ))}
        </div>
        {/* end of products */}
    </section>
  )
}
