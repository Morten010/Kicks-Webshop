"use client"
import React, { useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export default function SearchForm({count}: {
    count: number
}) {
    const [name, setName] = useState("")
    const pathname = usePathname();
    const searchParams = useSearchParams()
    const router = useRouter()

    const handleSearch = (e: any) => {
        e.preventDefault()
        const current = new URLSearchParams(searchParams.toString());

        //set or reset the name
        if(!name){
            current.delete("name")
        }else{
            current.set("name", name) 
        }

        // cast to string
        const search = current.toString();
        const query = search ? `?${search}` : "";
            
        router.push(`${pathname}${query}`);
    }

  return (
    <form
    onSubmit={(e) => handleSearch(e)}
    >
        <h1
        className='text-3xl font-semibold'
        >
        Search
        </h1>
        <input 
        type="text" 
        placeholder='Hey' 
        className='input-field my-2'
        value={name}
        onChange={(e) => setName(e.target.value)}
        />
        <p>{count} Items</p>
        <h2
        className='text-xl font-semibold mt-4'
        >
        Filters
        </h2>
        <h3
        className='text-lg font-medium'
        >
            Gender
        </h3>
        <h3
        className='text-lg font-medium'
        >
            Sizes
        </h3>
    </form>
  )
}
