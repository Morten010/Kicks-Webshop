import { ProductView } from '@/src/components'
import { db } from '@/src/lib/db'
import { ProductDetailsProps } from '@/types'
import React from 'react'

export async function generateMetadata({ params }: ProductDetailsProps) {
  const slug = params.slug
    
  try{
    const product = await db.product.findFirst({
      where: {
        slug: slug
      },
      include: {
        productImage: true,
        size: true
      }
    })

    if(!product){
      return {
        title: "Not Found",
        description: "The page you are looking for does not exist.",
      }
    }
    
    return {
      title: product?.name,
      description: product?.desc.slice(50),
      alternates: {
        canonical: `/products/${product.slug}`
      }
    }
  }catch(err){
    return{
      title: "Not Found",
      description: "The page you are looking for does not exist."
    }
  }
}


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
