"use client"
import React, { useEffect, useRef } from 'react'
import { BsFillArrowLeftSquareFill, BsFillArrowRightSquareFill } from 'react-icons/bs'
import { Category } from '@prisma/client'
import CategoryCard from './CategoryCard'

export default function Categories({categories} : {
  categories: Category[]
}) {
  const width = useRef<any>()
    
    let containerWidth = null;
    let containerDimension = null;

    const handleClickLeft = () => {
        if(width){
          containerDimension = width.current.getBoundingClientRect();
          containerWidth = containerDimension.width;
          width.current.scrollLeft -= containerWidth;
        }
    }

    const handleClickRight = () => {
      if(width){
        containerDimension = width.current.getBoundingClientRect();
        containerWidth = containerDimension.width;
        width.current.scrollLeft += containerWidth;
      }
    }
  
    useEffect(() => {
      if(width.current){
        containerDimension = width.current.getBoundingClientRect();
        containerWidth = containerDimension.width;
      }
    }, [width])
  return (
    <section className='bg-brand-black sm:pt-8 pl-4 pt-4 sm:pl-8 text-white rounded-2xl overflow-hidden'>
      {/* top */}
      <div
      className='flex justify-between items-end mb-4 mr-4 sm:mr-8'
      >
        <h2
        className='font-bold heading max-w-[50%] sm:max-w-[60%] md:max-w-[70%]'
        >
          Categories
        </h2>
        <div
        className='text-3xl flex gap-2'
        >
          <BsFillArrowLeftSquareFill
          onClick={handleClickLeft}
          />
          <BsFillArrowRightSquareFill
          onClick={handleClickRight}
          />
        </div>
      </div>
      {/* end of top */}
      
      <div
      className='flex w-full bg-white text-brand-black rounded-tl-2xl overflow-auto no-scrollbar scroll-smooth'
      ref={width}
      >
        {categories.map(item => (
          <div
          key={item.id}
          className='w-[100%] min-w-[100%] sm:w-[50%] sm:min-w-[50%]'
          >
            <CategoryCard image={item.fileUrl} title={item.name} id={item.id} />
          </div>
        ))}
      </div>

    </section>
  )
}
