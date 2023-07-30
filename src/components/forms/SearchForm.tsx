"use client"
import React, { useState, useEffect } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { CgSearch } from 'react-icons/cg'
import {MdOutlineCheckBox, MdOutlineCheckBoxOutlineBlank} from "react-icons/md"

export default function SearchForm({count, sizes}: {
    count: number
    sizes?: (null | number)[]
}) {
    const [name, setName] = useState("")
    const [gender, setGender] = useState("")
    const [size, setSize] = useState<string[]>([])
    const pathname = usePathname();
    const searchParams = useSearchParams()
    const router = useRouter()

    const handleSearch = (e: any) => {
        e.preventDefault()
        const current = new URLSearchParams(searchParams.toString());

        //set or reset name from query
        if(!name){
            current.delete("name")
        }else{
            current.set("name", name) 
        }

        //set or reset gender from query
        if(!gender){
            current.delete("gender")
        }else{
            current.set("gender", gender)
        }

        //set or reset sizes from query
        if(size.length === 0){
            current.delete("sizes")
        }else{
            current.delete("sizes")
            size.map(s => current.append("sizes", s))
        }

        // cast to string
        const search = current.toString();
        const query = search ? `?${search}` : "";
            
        router.push(`${pathname}${query}`);
    }

    const handleGender = (e:any) => { 
        console.log(gender, e.target.value);
          
       if(gender === e.target.value){
        setGender("")
       }else{
        setGender(e.target.value)
       }
    }

    const handleSize = (newSize: number) => {
        if(size.includes(newSize.toString())){
            setSize(size.filter(s => s !== newSize.toString()))
        }else{
            setSize([...size, newSize.toString()])
        }
    }

    useEffect(() => {
        const searchSize = searchParams.getAll("sizes")
        const searchGender = searchParams.get("gender")

        if(searchSize.length !== 0){
            setSize(searchSize)
        }

        if(searchGender){
            setGender(searchGender)
        }
    }, [])
    

  return (
    <form
    onSubmit={(e) => handleSearch(e)}
    >
        <h1
        className='text-3xl font-semibold'
        >
        Search
        </h1>
        <div
        className='flex my-2  gap-2'
        >
            <input 
            type="text" 
            placeholder='Hey' 
            className='input-field flex-grow'
            value={name}
            onChange={(e) => setName(e.target.value)}
            />
            <button
            className='bg-brand-blue text-white rounded-lg p-3 text-xl'
            >
                <CgSearch/>
            </button>
        </div>
        <p>{count} Items</p>
        <h2
        className='text-2xl font-semibold mt-4 mb-2'
        >
        Filters
        </h2>

        {/* genders */}
        <h3
        className='text-lg font-medium'
        >
            Gender
        </h3>
        <div
        className='flex flex-col gap-1'
        >
            <label
            className='flex items-center gap-1'
            >
                <input 
                type="radio" 
                name="gender" 
                id="male" 
                value="male" 
                className='hidden'
                onClick={handleGender}
                />
                {gender === "male" ? (
                    <MdOutlineCheckBox 
                    className='text-xl'
                    />
                ) : (
                    <MdOutlineCheckBoxOutlineBlank 
                    className='text-xl'
                    />
                )}
                <span>Male</span>
            </label>
            <label
            className='flex items-center gap-1'
            >
                <input 
                type="radio" 
                name="gender" 
                id="female" 
                value="female" 
                className='hidden'
                onClick={handleGender}
                />
                {gender === "female" ? (
                    <MdOutlineCheckBox 
                    className='text-xl'
                    />
                ) : (
                    <MdOutlineCheckBoxOutlineBlank 
                    className='text-xl'
                    />
                )}
                <span>Female</span>
            </label>
        </div>
        {/* end of genders */}

        {/* sizes */}
        <h3
        className='text-lg font-medium mt-4 mb-2'
        >
            Sizes
        </h3>
        <div
        className='flex flex-wrap gap-2'
        >
            {sizes && sizes.length !== 0 && sizes.map(s => (
                <div
                key={s}
                className={`w-10 h-10 grid place-content-center rounded hover:opacity-60 select-none ${size.includes(s!.toString()) ? "bg-black text-white" : "bg-white"}`}
                onClick={() => handleSize(s!)}
                >
                    {s}
                </div>
            ))}
        </div>
        {/* end of sizes */}

    </form>
  )
}
