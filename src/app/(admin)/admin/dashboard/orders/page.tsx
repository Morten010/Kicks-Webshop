import { db } from '@/src/lib/db'
import React from 'react'
import { DataTable } from './data-table';
import { columns } from './columns';
import { formatPrice } from '@/src/app/utils/formatPrice';
import { TableOrder } from './columns';

export const revalidate = 0

export default async function Orders() {
  const orders = await db.order.findMany({
    orderBy: {
      createdAt: "asc"
    },
    select: {
      id: true,
      total: true,
      orderStatus: true,
      email: true,
      createdAt: true,
    },
    take: 30,
  })
  
  const sortedOrders: TableOrder[] = orders.map(item => {
    
    return {
      id: "#" + item.id,
      total: formatPrice(item.total),
      status: item.orderStatus,
      email: item.email,
      date: new Date(item.createdAt).toDateString(),
    }
  })

  
  return (
    <div>
      <h1
      className='text-xl font-semibold'
      >
          Orders
      </h1>
      <div
      className='flex flex-col mt-5'
      >
        <DataTable data={sortedOrders} columns={columns} />
      </div>
    </div>
  )
}
