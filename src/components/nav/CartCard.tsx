import { useCart } from '@/src/app/store/useCart'
import { formatPrice } from '@/src/app/utils/formatPrice'
import { CartProduct } from '@/types'
import { Product, ProductImage, Size } from '@prisma/client'
import Image from 'next/image'
import React from 'react'
import { BsCaretDownFill, BsCaretUpFill } from 'react-icons/bs'

type CartCardProps = {
    product: CartProduct
    number: number
}

export default function CartCard({product, number}: CartCardProps) {
    const {increaseProduct, decreaseProduct} = useCart()
    
  return (
    <div
    className='flex text-base gap-2 select-none'
    >
        <div
        className='bg-gray-100 grid place-content-center h-20 aspect-square rounded-lg relative overflow-hidden'
        >
            {product.productImage[0] ? (
                <Image 
                src={product.productImage[0].fileUrl}
                fill
                alt={product.name + number}
                className='object-cover'
                />
            ) : "no Image"}
        </div>
        <div
        className='flex flex-col justify-between flex-grow'
        >
            <div>
                <h3
                className='font-semibold'
                >
                    {product.name.length > 24 ? product.name.slice(0, 24) + "...": product.name}
                </h3>
                <p
                className='text-brand-blue font-semibold'
                >
                    {formatPrice(product.price)}
                </p>
            </div>
            <div
            className='flex justify-between'
            >
                <p>Size: {product.size}</p>
                <div
                className='flex items-center'
                >
                    <BsCaretUpFill 
                    className='text-sm hover:opacity-60'
                    onClick={() => increaseProduct(product)}
                    />
                    <BsCaretDownFill 
                    className='text-sm hover:opacity-60'
                    onClick={() => decreaseProduct(product)}
                    />
                    <p>x{product.amount}</p>
                </div>
            </div>
        </div>
    </div>
  )
}
