import CategoryCard from '@/src/components/CategoryCard'
import { db } from '@/src/lib/db'
import Link from 'next/link'
import React from 'react'
import { AiOutlinePlusCircle } from 'react-icons/ai'

export default async function page() {
  const data = await db.category.findMany({})
  return (
    <div
    className='flex flex-col'
    >
        {/* top header */}
        <div
        className='flex justify-between items-center'
        >
            <h1
            className='text-xl font-semibold'
            >
                All Categories
            </h1>
            <Link
            href="/admin/dashboard/categories/create"
            className='secondary-btn flex gap-2 items-center'
            >
                <AiOutlinePlusCircle className='text-xl'/> Add New Category
            </Link>
        </div>
        {/* end of top header */}
        <div
        className='category-grid'
        >
          {data.map((item, index) => (
            <CategoryCard key={index} title={item.name} image={item.fileUrl} />
          ))}
        </div>
    </div>
  )
}
