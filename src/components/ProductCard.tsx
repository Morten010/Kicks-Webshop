import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Product, ProductImage, } from '@prisma/client'
import { formatPrice } from '../app/utils/formatPrice'

type ProductProps = {
    product: Product & {
        productImage?: ProductImage[]
    }
}

export default function ProductCard({product}: ProductProps) {

  return (
    <div
    className='flex flex-col gap-2'
    >
        {/* image container */}
        <div
        className='p-1.5 bg-white rounded-xl'
        >
            <div 
            className='aspect-square w-full relative' 
            >
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
        className='font-bold text-lg sm:text-xl lg:text-2xl'
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
