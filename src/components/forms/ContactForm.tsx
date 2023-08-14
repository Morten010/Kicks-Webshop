import { useCart } from '@/src/app/store/useCart'
import { useZustand } from '@/src/app/store/useZustand'
import getStripe from '@/src/lib/getStripe'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

export default async function ContactForm() {
    const router = useRouter()
    const [deliverOption, setDeliverOption] = useState("standard")
    const cart = await useZustand(useCart, (state) => state)

    const handleCheckout = async () => {
        const stripe = await getStripe()
        

        if(!cart.cart){
            console.log("wait");
            return
        }

        const response = await fetch("/api/stripe", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(cart.cart)
        })

        console.log((response as any).statusCode);
        
        if((response as any).statusCode === 500){
            return null;
        }

        console.log(response);
        const data = await response.json()

        if(!data.url){
            return null
        }

        router.push(data.url)

    }

  return (
    <form
    className='w-full'
    onSubmit={(e) => e.preventDefault()}
    >
        <h1
        className='text-3xl font-semibold'
        >
            Contact Details
        </h1>
        <p>
            We will use these details to keep you inform about your delivery.
        </p>
        <label>
            <span className='hidden'>Email</span>
            <input 
            type="text" 
            placeholder='Email'
            className={`bg-transparent border border-brand-black rounded-md p-2 w-full my-4 sm:w-[50%]`}
            />
        </label>

        <h2
        className='text-3xl font-semibold'
        >
            Shipping Address
        </h2>
        <div
        className='grid grid-cols-2 gap-4'
        >
            <label>
                <span className='hidden'>First name</span>
                <input 
                type="text" 
                placeholder='First Name'
                className={`bg-transparent border border-brand-black rounded-md p-2 w-full mb-2 mt-4`}
                />
            </label>
            <label>
                <span className='hidden'>Last name</span>
                <input 
                type="text" 
                placeholder='Last Name'
                className={`bg-transparent border border-brand-black rounded-md p-2 w-full mb- mt-4`}
                />
            </label>
        </div>
        <label>
            <span className='hidden'>Address</span>
            <input 
            type="text" 
            placeholder='Find Delivery Address'
            className={`bg-transparent border border-brand-black rounded-md p-2 w-full mt-2`}
            />
            <p
            className='mb-2'
            >
                Start typing your street address or zip code for suggestion
            </p>
        </label>
        <label>
            <span className='hidden'>Phone Number</span>
            <input 
            type="text" 
            placeholder='Phone Number'
            className={`bg-transparent border border-brand-black rounded-md p-2 my-2 w-[50%]`}

            />
        </label>


        <h2
        className='text-3xl font-semibold my-4'
        >
            Delivery Options
        </h2>
        <div
        className='flex flex-col w-full gap-4'
        >
            <div
            className={`rounded-lg p-4 transition-colors cursor-pointer select-none ${deliverOption === "standard" ? "bg-white border-2 border-transparent" : "border-2 border-brand-black"}`}
            onClick={() => setDeliverOption("standard")}
            >
                <div
                className='flex justify-between mb-2'
                >
                    <h3
                    className='text-xl font-semibold'
                    >
                        Standard Delivery
                    </h3>
                    <p
                    className='font-semibold text-brand-blue'
                    >
                        $6.00
                    </p>
                </div>
                <p>
                    Enter your address to see when you’ll get your order
                </p>
            </div>
            <div
            className={`rounded-lg p-4 transition-colors cursor-pointer select-none ${deliverOption === "collect" ? "bg-white border-2 border-transparent" : "border-2 border-brand-black"}`}
            onClick={() => setDeliverOption("collect")}
            >
                <div
                className="flex justify-between mb-2"
                >
                    <h3
                    className='text-xl font-semibold'
                    >
                        Collect in store
                    </h3>
                    <p
                    className='font-semibold text-brand-black'
                    >
                        Free
                    </p>
                </div>
                <p>
                    Enter your address to see when you’ll get your order
                </p>
            </div>
            <button
            onClick={handleCheckout}
            className='secondary-btn w-full md:w-[50%] text-center'
            >
                Review And Pay
            </button>
        </div>
    </form>
  )
}
