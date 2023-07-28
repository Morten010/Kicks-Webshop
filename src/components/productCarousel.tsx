import React from 'react'

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { ProductImage } from '@prisma/client';
import Image from 'next/image';

type ProductCarouselProps = {
    images: ProductImage[]
    name: string
}

export default function ProductCarousel({images, name}: ProductCarouselProps) {

    const  renderCustomThumbs =() => {

   
        const thumbList = images.map((image, index) => 
        <div
        key={index}
        className='relative aspect-square w-full'
        >
            <Image 
            src={image.fileUrl}
            alt='product image'
            className='rounded-lg object-cover'
            fill
            />
        </div>
        )
        return thumbList
    }

  return (
    <Carousel 
        useKeyboardArrows={true}
        renderIndicator={(clickHandler, isSelected, index) => {
            return (
                <li
                  onClick={clickHandler}
                  className={`w-3 h-3 bg-[#fafafa] border border-[#ddd] rounded-full inline-block mx-2 ${isSelected ? "opacity-40" : ""}`}
                  key={index}
                  role="button"
                />
            )
        }}
        renderThumbs={renderCustomThumbs}
        showStatus={false}
        showThumbs={true}
    >
        {images[0] && images.map((slide, index) => (
            <div
            key={index}
            className='relative w-full aspect-square bg-white rounded-xl overflow-hidden'
            >
                <Image 
                src={slide.fileUrl}
                alt={name + " product image"}
                className='rounded-lg object-contain'
                fill
                />
                
            </div>
        ))}
    </Carousel>
  )
}
