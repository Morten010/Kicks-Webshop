"use client"
import React from 'react'
import CartCard from './CartCard'
import { useCart } from '@/src/app/store/useCart'
import { formatPrice } from '@/src/app/utils/formatPrice';
import Image from 'next/image';
import emptyCartImage from "@/src/assets/empty-cart.svg"
import Link from 'next/link';
import { CartProduct } from '@/types';
import { useZustand } from '@/src/app/store/useZustand';


export default function Cart({showCart, setShowCart}: {
    showCart: boolean, setShowCart: () => void}
    ) {
    const prop = useZustand(useCart, (state) => state)

  return (
    <>
        <div
        className='text-sm bg-brand-yellow aspect-square w-6 h-6 grid place-content-center rounded-full font-semibold hover:cursor-pointer select-none'
        onClick={() => setShowCart()}
        >
            {prop ? prop.totalItems : 0}
        </div>
        {showCart && (
            <div 
            className='absolute bg-white  -bottom-2 translate-y-[100%] rounded-lg right-0 p-4 gap-4'
            >
                <div
                className='flex flex-col gap-2 max-h-[60vh] overflow-auto pr-2'
                >
                    {prop.cart.length !== 0 && prop.cart.map((cartItem: CartProduct, index: number) => (
                        
                        <CartCard key={cartItem.slug + index} product={cartItem} number={index} />
                    ))}
                    {prop.cart.length === 0 && (
                        <div
                        className='w-full grid place-content-center py-10 text-center'
                        >
                            <Image 
                            src={emptyCartImage}
                            width={100}
                            height={100}
                            alt='Empty box'
                            className=''
                            />
                            <p
                            className='text-base font-semibold text-brand-yellow'
                            >
                                Cart is empty
                            </p>
                        </div>
                    )}
                </div>
                <div
                className='text-base flex justify-between items-center pt-4 min-w-[300px]'
                >
                    <p>total: {prop ? formatPrice(prop.totalPrice) : 0}</p>
                    <Link
                    href="/cart"
                    className='primary-btn'
                    >
                        Go To Cart
                    </Link>
                </div>
            </div>
        )}
    </>
  )
}
