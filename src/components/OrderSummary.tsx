"use client"
import React, {useState} from 'react'
import { useCart } from '../app/store/useCart'
import { formatPrice } from '../app/utils/formatPrice'
import { CartProduct } from '@/types'
import { useZustand } from '../app/store/useZustand'
import Link from 'next/link'
import getStripe from '../lib/getStripe'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'

type SummaryProps = {
  whiteBg?: boolean
}

export default function OrderSummary({whiteBg = false}: SummaryProps) {
  const cart = useZustand(useCart, (state) => state)
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const user = useSession()

  const handleCheckout = async () => {
    setLoading(true)

    if(!cart.cart){
      setLoading(false)
      console.log("wait");
      return
    }

    const response = await fetch("/api/stripe", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cart: cart.cart,
          userId: user.data?.user.id
        })
    })

    if((response as any).statusCode === 500){
      setLoading(false)
      return null;
    }

    console.log(response);
    const data = await response.json()

    if(!data.url){
      setLoading(false)
      return null
    }

    router.push(data.url)

  }

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
        {cart && cart.cart.map((p: CartProduct) => (
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
          <p>{formatPrice(cart ? cart.totalPrice : 0)}</p>
        </div>

        {!loading && (
          <button
          onClick={handleCheckout}
          className='secondary-btn w-full text-center'
          >
              Review And Pay
          </button>
        )}
        {loading && (
          <button
          disabled
          className='secondary-btn w-full text-center opacity-80'
          >
              Redirecting...
          </button>
        )}
        
        </div>
    </div>
  )
}
