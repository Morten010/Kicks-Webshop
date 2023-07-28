"use client"
import React from 'react'
import { useCart } from '../../store/useCart'
import { formatPrice } from '../../utils/formatPrice';
import Image from 'next/image';
import OrderSummary from '@/src/components/OrderSummary';
import { CartProduct } from '@/types';
import { useZustand } from '../../store/useZustand';
import ContactForm from '@/src/components/forms/ContactForm';
import CheckoutProductCard from '@/src/components/CheckoutProductCard';

export default function CheckOut() {
  const prop = useZustand(useCart, state => state)
  
  return (
    <div
    className='flex flex-col md:flex-row gap-4'
    >
        <div
        className='w-full md:w-[60%]'
        >
          <ContactForm />
        </div>
        <div
        className='w-full md:w-[40%] flex flex-col gap-4'
        >
          <OrderSummary whiteBg={true} />
            <div
            className='bg-white w-full p-4 rounded-lg flex flex-col gap-4'
            >
              <h2
              className='text-xl font-semibold'
              >
                Order Details
              </h2>
              {prop && prop.cart.map((p: CartProduct, index: number) => (
                <CheckoutProductCard index={index} p={p} key={index} />
              ))}
            </div>
        </div>
    </div>
  )
}
