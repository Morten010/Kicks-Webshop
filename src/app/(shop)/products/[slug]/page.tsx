import { ProductView } from '@/src/components'
import { db } from '@/src/lib/db'
import { ProductDetailsProps } from '@/types'
import React from 'react'

export default async function Product({params}: ProductDetailsProps) {
    const slug = params.slug
    
    const product = await db.product.findFirst({
      where: {
        slug: slug
      },
      include: {
        productImage: true,
        size: true
      }
    })
    

  return (
    <div>
       {product && <ProductView product={product}/>}
    </div>
  )
}
