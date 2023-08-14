import { db } from '@/src/lib/db'
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
  
  return (
    <div>
      <h1>orders</h1>
      <div
      className='flex flex-col gap-2 bg-white'
      >
        {orders && orders.map(order => (
          <p>{order.orderStatus}</p>
        ))}
      </div>
    </div>
  )
}
