"use client"
import OrderSummary from '@/src/components/OrderSummary'
import { useZustand } from '../../store/useZustand'
import { useCart } from '../../store/useCart'
import CheckoutProductCard from '@/src/components/CheckoutProductCard'
import { CartProduct } from '@/types'


export default function page() {
  const cart = useZustand(useCart, (state) => state)

  return (
    <div
    className='flex flex-col md:flex-row gap-4'
    >
      <div
      className='w-full md:w-[60%]'
      >
        <h1
        className='text-3xl font-semibold mb-2'
        >
         Saving to celebrate
        </h1>
        <p>
          Enjoy up to 60% off thousands of styles during the End of Year sale - while suppiles last. No code needed.
        </p>
        <p>
          Join us  or Sign-in
        </p>
        {/* bag */}
        <div
        className='w-full bg-white rounded-lg p-4 mt-4'
        >
          <h2
          className='text-3xl font-semibold'
          >
            Your Bag
          </h2>
          <p
          className='mb-4 mt-2'
          >
            Items in your bag not reserved- check out now to make them yours.
          </p>
          <div
          className='flex flex-col gap-4'
          >
            {cart && cart.cart.map((p: CartProduct, index: number) => (
              <CheckoutProductCard p={p} index={index} key={index} />
            ))}
            
          </div>
        </div>
      </div>

      {/* order summary */}
      <div
      className='w-full md:w-[40%] flex flex-col gap-4 flex-grow justify-end'
      > 
        <OrderSummary />
      </div>
    </div>
  )
}
