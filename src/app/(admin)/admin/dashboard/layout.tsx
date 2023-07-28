import { authOptions } from '@/src/app/api/auth/[...nextauth]/route'
import { AdminNavbar } from '@/src/components'
import { getServerSession } from 'next-auth'
import React from 'react'
import { redirect } from 'next/navigation';
import { ToastContainer } from 'react-toastify';

export default async function DashboardLayout({children}: {children: React.ReactNode}) {
  const session = await getServerSession(authOptions)

  // if user is not an admin navigate them to homepage
  if(session?.user.role !== 'ADMIN'){
    if(session?.user.role === 'USER'){
      redirect("/")
    }
  }
  // if user not signed in redirect to sign in
  
  if(!session){
    redirect("/admin")
  }

  return (
    <main
    className='flex'
    >
      <AdminNavbar />
      <div
      className='p-4 flex-grow item max-h-screen overflow-x-hidden'
      >
        {children}
        <ToastContainer />
      </div>
    </main>
  )
}
