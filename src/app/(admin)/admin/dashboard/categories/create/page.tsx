import { CreateCategoryForm } from '@/src/components'
import React from 'react'

export default function page() {
  return (
    <div>
        <h1
        className='text-xl font-semibold'
        >
            Create Category
        </h1>
        <CreateCategoryForm />
    </div>
  )
}
