import React from 'react'
import NavSignOut from './NavSignOut'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/src/app/api/auth/[...nextauth]/route'

export default async function TopAdminNav() {
    const sessionData = await getServerSession(authOptions)
    const user = sessionData?.user
  return (
    <div
    className='bg-white py-4 px-5 flex justify-end gap-4 border-b border-b-[#232321]/20'
    >
        <h2
        className='font-medium capitalize'
        >
            {user?.firstName + " " + user?.lastName}
        </h2>
        <NavSignOut />
    </div>
  )
}
