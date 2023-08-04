"use client"
import { useCart } from '@/src/app/store/useCart'
import { useZustand } from '@/src/app/store/useZustand'
import Link from 'next/link'
import React from 'react'
import {GiConfirmed} from "react-icons/gi"

export default async function SuccessPage() {
    const cart = await useZustand(useCart, (s) => s)
    if(cart){
        cart.clearCart()
    }

  return (
    <div
    className='h-[65vh] text-center grid place-content-center'
    >
        <GiConfirmed className='mx-auto text-8xl text-brand-yellow' />
        <h1 className='text-2xl mt-6 mb-2'>
            Thank you for your purchase!
        </h1>
        <p>
            You should recieve and order confirmation email shortly.
        </p>
        <p>
            Go back To the <Link 
            href="/"
            className='underline text-brand-blue'
            >
                Homepage.
            </Link>
        </p>
    </div>
  )
}
