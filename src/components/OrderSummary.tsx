"use client"
import React from 'react'
import { useCart } from '../app/store/useCart'
import { formatPrice } from '../app/utils/formatPrice'
import { CartProduct } from '@/types'
import { useZustand } from '../app/store/useZustand'
import Link from 'next/link'

type SummaryProps = {
  whiteBg?: boolean
}

export default function OrderSummary({whiteBg = false}: SummaryProps) {
  const prop = useZustand(useCart, (state) => state)

  return (
    <div
    className={`${whiteBg ? "bg-white" : ""} p-4 rounded-lg w-full flex flex-col gap-2`}
    >
        <h2
        className='text-2xl font-semibold'
        >
        Order Summary
        </h2>
        {/* order summary products list */}
        <div>
        {prop && prop.cart.map((p: CartProduct) => (
            <div
            key={p.id + "_" + p.size}
            className='flex w-full justify-between gap-2'
            >
              <p>
                  {p.amount}x {p.name}
              </p>
              <p>{formatPrice(p.price * p.amount)}</p>
            </div>
        ))}

        <div
        className='flex justify-between text-xl font-semibold my-2'
        >
          <h3>Total</h3>
          <p>{formatPrice(prop ? prop.totalPrice : 0)}</p>
        </div>

        {!whiteBg && (
          <Link
          href="/checkout"
          className='secondary-btn w-full text-center inline-block'
          >
            CHECKOUT
          </Link>
        )}
        
        </div>
    </div>
  )
}
