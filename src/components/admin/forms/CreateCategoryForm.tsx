"use client"
import createBrand from '@/src/lib/functions/brand/createBrand'
import React, { useRef, useState } from 'react'

export default function CreateCategoryForm() {
    const name = useRef<HTMLInputElement>(null)
    const desc = useRef<HTMLTextAreaElement>(null)
    const [loading, setLoading] = useState(false)
    const [msg, setMsg] = useState({
        msg: "",
        status: false,
    })
    
    const handleSubmit = async (e: any) => {
        setLoading(true)
        e.preventDefault()
        const category = {
            name: name.current!.value.trim(),
            desc: desc.current!.value.trim(),
        }

        if(category.name || category.desc){
            setMsg({
                msg: "",
                status: false,
            })
            
            const res = await createBrand(category)
            setMsg(res)
            name.current!.value = ""
            desc.current!.value = ""
            setLoading(false)
        } else {
            setMsg({
                msg: "Fill out all fields",
                status: false,
            })
            setLoading(false)
        }
    }
  return (
    <form
    className='mt-4 flex flex-col gap-2'
    onSubmit={handleSubmit}
    >
        <label>
            <span
            className='font-medium'
            >
                Category name
            </span>
            <input
            type="text"
            ref={name}
            placeholder='Nike'
            className={`bg-transparent border border-brand-black rounded-md p-2 w-full`}
            />
        </label>
        <label>
            <span
            className='font-medium'
            >
                Category description
            </span>
            <textarea
            ref={desc}
            rows={10}
            placeholder='Nike is a global leader in athletic footwear, apparel, and equipment. Founded in 1964, the brand is renowned for its innovative designs...'
            className={`bg-transparent border border-brand-black rounded-md p-2 w-full`}
            />
        </label>

        {/* buttons */}
        {!loading && <button
        className='primary-btn'
        >
            Add Category
        </button>}
        {loading && <button
        className='primary-btn opacity-60 hover:opacity-60'
        disabled
        >
            Add Category
        </button>}
        {/* end of buttons */}

        {msg.msg && (
            <p
            className={msg.status ? "text-green-500" : "text-red-600"}
            >
                {msg.msg}
            </p>
        )}
    </form>
  )
}
