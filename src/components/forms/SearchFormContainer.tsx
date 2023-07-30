"use client"
import React, {useState} from 'react'
import SearchForm from './SearchForm'
import { IoSettingsSharp } from 'react-icons/io5'
import { CgSearch } from 'react-icons/cg'

export default function SearchFormContainer({count, sizes}: {
    count: number
    sizes?: (number | null)[]
}) {
    const [showForm, setShowForm] = useState(false)
    const [name, setName] = useState("")

  return (
    <div>
        {/* top bar */}
        <div 
        className={`flex w-full text-2xl ${showForm ? "justify-end" : "justify-between"} lg:hidden items-center gap-2`}
        >
            {!showForm && <div
            className='flex gap-2 flex-grow'
            >
                <input 
                type="text" 
                placeholder='Hey' 
                className='input-field flex-grow text-base'
                value={name}
                onChange={(e) => setName(e.target.value)}
                />
                <button
                className='bg-brand-blue text-white rounded-lg py-2 px-3 text-lg'
                >
                    <CgSearch/>
                </button>
            </div>}
            <IoSettingsSharp 
            className='select-none'
            onClick={() => setShowForm(!showForm)}
            />
        </div>
        {/* end of top bar */}

        {/* smaller screen search */}
        <div
        className='hidden lg:inline-block'
        >
            <SearchForm count={count} sizes={sizes}/>
        </div>
        {/* end of smaller screen search */}

        {showForm && (
            <div
            className='lg:hidden'
            >
                <SearchForm count={count} sizes={sizes}/>
            </div>
        )}
    </div>
  )
}
