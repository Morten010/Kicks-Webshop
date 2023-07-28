import { CartProduct } from '@/types'
import Image from 'next/image'
import React from 'react'
import { formatPrice } from '../app/utils/formatPrice'

type CheckoutProductCardProps = {
    p: CartProduct
    index: number
}

export default function CheckoutProductCard({p, index}: CheckoutProductCardProps) {
  return (
    <div
    className='w-full flex gap-4'
    >
        <div
        className='w-[30%] mb-auto aspect-square relative rounded-lg overflow-hidden bg-gray-100'
        >
        <Image 
        src={p.productImage[0].fileUrl}
        alt={p.name + index}
        fill
        className='object-cover'
        />
        </div>
        <div
        className='w-[70%] flex flex-col justify-between'
        >
        <div>
            <h3
            className='text-lg font-semibold'
            >
            {p.name}
            </h3>
            <p>
            {p.desc.slice(0, 100)}
            </p>
        </div>
        <div>
            <div
            className='flex justify-between my-2'
            >
                <p>
                    Size: {p.size}
                </p>
                <p>
                    Quantity: {p.amount}
                </p>
            </div>
            <p
            className='text-brand-blue font-semibold'
            >
            {formatPrice(p.price * p.amount)}
            </p>
        </div>
        </div>
    </div>
  )
}
