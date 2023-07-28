"use client"
import React, { useState, useEffect } from 'react'
import { BsTrash } from 'react-icons/bs'

type sizeCardProps = {
    size: {
        id: number,
        size: string,
        quantity: string,
    },
    handleSizeDelete: (id: number) => void,
    handleSizeUpdate: (
        id: number,
        size: string,
        quantity: string,
    ) => void
}

export default function SizeCard({size, handleSizeDelete, handleSizeUpdate}:sizeCardProps) {
    const [shoeSize, setShoeSize] = useState(size.size)
    const [quantity, setQuantity] = useState(size.quantity)

    useEffect(() => {
        handleSizeUpdate(size.id, shoeSize, quantity )
        console.log("ran");
        
    }, [shoeSize, quantity])
    
  return (
    <div
    className='bg-gray-100 p-4 rounded-lg flex flex-col gap-4 max-w-[256px]'
    >
        <label>
            <span
            className='font-medium'
            >
                Size
            </span>
            <input
            value={shoeSize}
            onChange={(e) => setShoeSize(e.target.value)}
            type='number'
            placeholder='size 42'
            className={`bg-transparent border border-brand-black rounded-md p-2 w-full resize-y`}
            />
        </label>
        <label>
            <span
            className='font-medium'
            >
                Quantity
            </span>
            <input
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            type='number'
            placeholder='2 pairs'
            className={`bg-transparent border border-brand-black rounded-md p-2 w-full resize-y`}
            />
        </label>
        <div
        className='flex w-full gap-4 text-center'
        >
            <p
            className='danger-btn grid place-content-center text-xl w-full'
            onClick={() => handleSizeDelete(size.id)}
            >
                <BsTrash />
            </p>
        </div>
    </div>
  )
}
