import Link from 'next/link';
import React from 'react'
import { Resend } from 'resend';

export default async function page() {
    const resend = new Resend(process.env.RESEND);

    const list = await resend.audiences.list();

    console.log();
  return (
    <div>
        <h1
        className='text-2xl font-bold mb-2'
        >
            Newletter audience groups
        </h1>
        
        <div
            className='flex gap-2'
        >
            {list.data?.data && list.data?.data.map((audience, index) => (
                <Link
                key={"Audience link " + index}
                className='p-2 aspect-square grid place-content-center bg-brand-blue text-white rounded h-32 cursor-pointer'
                href={`/admin/dashboard/newsletter/${audience.id}`}
                >
                    {audience.name}
                </Link>
            ))}
        </div>
    </div>
  )
}
