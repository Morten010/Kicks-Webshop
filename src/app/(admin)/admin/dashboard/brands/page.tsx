import { CategoryCard } from '@/src/components'
import { db } from '@/src/lib/db'
import Link from 'next/link'
import React from 'react'
import { AiOutlinePlusCircle } from 'react-icons/ai'

export default async function page() {

    // get all categories
    const result = await db.brand.findMany()
    
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
            href="/admin/dashboard/brands/create"
            className='secondary-btn flex gap-2 items-center'
            >
                <AiOutlinePlusCircle className='text-xl'/> Add New Category
            </Link>
        </div>
        {/* end of top header */}

        {/* categories */}
        <div
        className='category-grid py-4'
        >
            {result && result.map(item => (
                <CategoryCard key={item.id} item={item} />
            ))}
        </div>
        {/* end of categories */}
    </div>
  )
}
