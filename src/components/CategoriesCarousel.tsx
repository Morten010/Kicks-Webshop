"use client"
import { Category } from '@prisma/client'
import React, { useEffect, useRef } from 'react'
import CategoryCard from './CategoryCard'

export default function CategoriesCarousel({categories} : {
    categories: Category[]
}) {
    
  return (
    <div
    className='flex w-full bg-white text-brand-black rounded-tl-2xl overflow-hidden'
    >
        {categories.map(item => (
          <div
          className='w-[50%] min-w-[50%]'
          >
            <CategoryCard image={item.fileUrl} title={item.name} />
          </div>
        ))}
        {categories.map(item => (
          <div
          className='w-[50%] min-w-[50%]'
          >
            <CategoryCard image={item.fileUrl} title={item.name} />
            
          </div>
        ))}
      </div>
  )
}
