import { formatPrice } from '@/src/app/utils/formatPrice';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

type ProductImageProps = {
    id: number
    fileUrl: string
    fileKey: string
    productId: number
}[]

type ProductProps = {
    product: {
        id: number;
        name: string | null;
        desc: string | null;
        price: number | null;
        slug: string | null;
        productImage: ProductImageProps
    }
}

export default function ProductAdminCard({product}:ProductProps) {
  return (
    <Link
    href={`/admin/dashboard/products/edit/${product.slug}`}
    className='bg-white p-4 rounded-lg max-w-sm'
    >
        <div
        className='flex gap-2'>
            <div
            className='aspect-square w-[30%] bg-gray-100 rounded-lg relative'
            >
                {product.productImage.length !== 0 && (
                    <Image 
                    src={product.productImage[0].fileUrl}
                    fill
                    alt={product.name? product.name : "image"}
                    className='object-cover rounded-md'
                    />
                )}
                {product.productImage.length === 0 && (
                    <div
                    className='h-full w-full grid place-content-center'
                    >
                        <p>No Image</p>
                    </div>
                )}
            </div>
            <div
            className='flex-grow flex flex-col justify-between'
            >
                <h3
                className='font-medium'
                >
                    {product.name}
                </h3>
                <p 
                className='font-bold'
                >
                    {formatPrice(product.price!)}
                </p>
            </div>
        </div>
        <h4
        className='font-medium mt-4'
        >
            Summary
        </h4>
        <p>{product.desc?.slice(0, 50)}</p>
    </Link>
  )
}
