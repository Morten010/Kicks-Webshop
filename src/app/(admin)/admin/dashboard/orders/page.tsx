import { authOptions } from '@/src/app/api/auth/[...nextauth]/route';
import { db } from '@/src/lib/db'
import { getServerSession } from 'next-auth';
import React from 'react'
export const revalidate = 0

export default async function Orders() {
  const orders = await db.order.findMany({
    orderBy: {
      createdAt: "asc"
    },
    take: 30,
  })
  console.log(orders);
  const user = await getServerSession(authOptions)
  console.log(user);
  
  
  return (
    <div>
      <h1>orders</h1>
      <div
      className='flex flex-col gap-2 bg-white'
      >
        {orders && orders.map(order => (
          <p key={order.id}>{order.orderStatus}</p>
        ))}
      </div>
    </div>
  )
}
