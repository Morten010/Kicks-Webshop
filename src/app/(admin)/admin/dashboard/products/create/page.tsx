import { CreateProductForm } from '@/src/components'
import React from 'react'

export default function CreateProduct() {
  return (
    <div>
        <h1
        className='text-xl font-semibold'
        >
            Create Product
        </h1>
        <CreateProductForm />
    </div>
  )
}
