import Image from 'next/image'
import React from 'react'


export default function HeroProduct() {
  return (
    <div 
    className="w-full sm:aspect-[6/4] md:aspect-video relative rounded-3xl overflow-hidden aspect-[5/6]"
    >
        {/* product tag */}
        <h3
        className='z-10 absolute -rotate-90 top-0 left-1 -translate-x-[40%] sm:translate-y-[230%] translate-y-[200%] bg-brand-black text-white p-3 rounded-b-lg text-sm sm:text-md lg:text-lg'
        >
            Nike product of the year 
        </h3>
        {/* product tag end */}

        {/* background image */}
        <div 
        className='relative h-full w-full'
        >
            <Image
            fill
            src="/test-product.jpg"
            alt="Shoe"
            className="z-0 object-cover"
            />
        </div>
        {/* background image end */}

        {/* title and subtitle */}
        <div
        className='absolute bottom-0 left-0 p-3 text-white'
        >
            <h2
            className='sm:text-5xl lg:text-9xl font-bold sm:mb-2 text-3xl mb-1'
            >
                NIKE AIR MAX
            </h2>
            <p
            className='sm:text-xl md:text-3xl sm:max-w-[490px] md max-w-[75%]'
            >
                Nike introducing the new air max for everyone's comfort
            </p>
            <button
            className='primary-btn mt-2'
            >
                Shop Now
            </button>
        </div>
        {/* title and subtitle end */}

        {/* other images */}
        <div
        className='flex flex-col absolute right-0 bottom-0 -translate-x-2 -translate-y-2 p-1 gap-4'
        >
            <div
            className='relative aspect-square h-16 w-16 lg:w-24 lg:h-24 md:w-20 md:h-20'
            >
                <Image
                fill
                src="/test-product.jpg"
                alt="Shoe"
                className="z-0 object-cover border border-white rounded"
                />
            </div>
            <div
            className='relative aspect-square h-16 w-16 lg:w-24 lg:h-24 md:w-20 md:h-20'
            >
                <Image
                fill
                src="/test-product.jpg"
                alt="Shoe"
                className="z-0 object-cover border border-white rounded"
                />
            </div>
        </div>
        {/* other images end */}

    </div>
  )
}
