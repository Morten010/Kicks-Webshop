import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Product, ProductImage, } from '@prisma/client'
import { formatPrice } from '../app/utils/formatPrice'

type ProductProps = {
    product: {
        id: number
        name: string
        slug: string
        price: number
        productImage: ProductImage[]
        createdAt: Date
      }
}

export default function ProductCard({product}: ProductProps) {
    const today = new Date().getTime();
    const createdAt = new Date(product.createdAt).getTime();
    const compare = today - createdAt
    

  return (
    <div
    className='flex flex-col gap-2'
    >
        {/* image container */}
        <div
        className='p-1.5 bg-white rounded-xl'
        >
            <div 
            className='aspect-square w-full relative rounded-lg overflow-hidden' 
            >
                {compare < 1000 * 60 * 60 * 24 * 7 && (
                    <p
                    className='absolute z-10 top-0 left-0 py-1.5 px-3 font-semibold text-white bg-brand-blue rounded-br-xl text-sm'
                    >
                        New
                    </p>
                )}
                {product.productImage && <Image
                fill
                src={product.productImage[0].fileUrl}
                alt="Shoe"
                className="z-0 object-cover rounded-lg bg-gray-200 "
                />}
            </div>
        </div>
        {/* image container */}
        
        <h3
        className='font-bold text-2xl'
        >
            {product.name.slice(0, 20)}...
        </h3>
        <Link href={`/products/${product.slug}`} className='secondary-btn text-base md:text-base text-center mt-auto'>
            view product - 
            <span className='text-brand-yellow'> {formatPrice(product.price)}</span>
        </Link>
    </div>
  )
}
