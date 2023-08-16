"use client"
import { signOut } from 'next-auth/react'
import React from 'react'
import { HiOutlineLogout } from 'react-icons/hi'

export default function NavSignOut() {
  return (
    <HiOutlineLogout 
    className='text-2xl hover:text-brand-yellow transition-colors cursor-pointer' 
    onClick={() => signOut()}
    />
  )
}
