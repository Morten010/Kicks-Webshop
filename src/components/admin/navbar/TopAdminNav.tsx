"use client"
import { signOut, useSession } from 'next-auth/react'
import React from 'react'
import {HiOutlineLogout} from "react-icons/hi"

export default function TopAdminNav() {
    const sessionData = useSession()
    const user = sessionData.data?.user

  return (
    <div
    className='bg-white py-4 px-5 flex justify-end gap-4 border-b border-b-[#232321]/20'
    >
        <h2
        className='font-medium capitalize'
        >
            {user ? user?.firstName + " " + user?.lastName : "..."}
        </h2>
        <HiOutlineLogout 
        className='text-2xl hover:text-brand-yellow transition-colors cursor-pointer' 
        onClick={() => signOut()}
        />
    </div>
  )
}
