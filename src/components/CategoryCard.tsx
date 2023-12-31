import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { BsFillArrowUpRightSquareFill } from 'react-icons/bs'

type CategoryCardProps = {
    image: string
    title: string
    id?: number
    style?: string | null
}

export default function CategoryCard({image, title, id, style = null}: CategoryCardProps) {
  return (
    <div
       className={`relative aspect-square flex flex-col justify-end p-4 sm:p-2 ${style} w-full`}
       >
            {image && <Image 
            src={image}
            alt='image'
            className='object-contain'
            fill
            />}
            <div
            className='flex justify-between z-20 items-end '
            >
                <h3
                className='text-4xl font-semibold max-w-[150px]'
                >
                    {title ? `${title} shoes` : "______ shoes"}
                </h3>
                <Link 
                href={id ? `/search?category=${id}` : "#"}
                className=''
                >
                    <BsFillArrowUpRightSquareFill className='text-4xl hover:opacity-80 transition-opacity'/>
                </Link>
            </div>
       </div>
  )
}
