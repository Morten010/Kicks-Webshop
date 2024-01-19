import { authOptions } from '@/src/lib/db/authOptions'
import { AdminNavbar } from '@/src/components'
import { getServerSession } from 'next-auth'
import React from 'react'
import { redirect } from 'next/navigation';
import { ToastContainer } from 'react-toastify';
import TopAdminNav from '@/src/components/admin/navbar/TopAdminNav';

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
      className='flex-grow item max-h-screen overflow-x-hidden'
      >
       <div
       className='flex flex-col'
       >
          <TopAdminNav />
          <div
          className='p-4'
          >
            {children}
            <ToastContainer />
          </div>
       </div>
      </div>
    </main>
  )
}
