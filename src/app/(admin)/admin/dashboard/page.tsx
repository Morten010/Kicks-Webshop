import { authOptions } from '@/src/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import { useRouter } from 'next/router';
import React from 'react'


export default async function DashBoard() {

  return (
    <div>DashBoard</div>
  )
}
