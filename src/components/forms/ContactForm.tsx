import Link from 'next/link'
import React from 'react'

export default function ContactForm() {
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
            className='bg-white rounded-lg p-4'
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
            className='border-2 border-brand-black rounded-lg p-4'
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
                    className='font-semibold text-brand-black'
                    >
                        Free
                    </p>
                </div>
                <p>
                    Enter your address to see when you’ll get your order
                </p>
            </div>
            <Link
            href="/"
            className='secondary-btn w-[50%] text-center'
            >
                Review And Pay
            </Link>
        </div>

    </form>
  )
}
