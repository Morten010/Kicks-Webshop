"use client"
import Image from 'next/image'
import React from 'react'
import { useParams, usePathname } from 'next/navigation';
import Link from 'next/link'

// styling
import {BsBoxSeam} from "react-icons/bs"
import {CiCircleList} from "react-icons/ci"
import {LiaShoppingBasketSolid} from "react-icons/lia"
import { BiCategoryAlt, BiHomeAlt2 } from 'react-icons/bi';

export default function AdminNavbar() {
    const pathname = usePathname()
    const params = useParams()
  
    //check if right path for navlink active styling
    const isPathName = (path: string) => {
      if(pathname.includes(path)){
        return true
      }else{
        return false
      }
    }  

    //check if it is dashboard which is selected
    const isDashboard = (path: string) => {
      if(pathname.includes(path)){

        if(pathname.includes("categories")){
          return false
        }

        if(pathname.includes("products")){
          return false
        }

        if(pathname.includes("orders")){
          return false
        }

        return true
      }else{
        return false
      }
    }

  return (
    <nav
    className='p-4 bg-white h-screen flex flex-col gap-8 items-center border-r border-r-[#232321]/20 min-w-[220px]'
    >
        {/* kicks logo */}
        <Image 
        src="/admin-assets/black-logo.svg"
        width={128} 
        height={32}
        alt='Kicks logo black'
        />
        {/* end of kicks logo  */}

        <ul
        className='uppercase flex flex-col gap-2'
        >
            <li>
                <Link
                href="/admin/dashboard"
                className={`flex justify-between gap-4 items-center py-2 px-4 rounded-md ${pathname === "/admin/dashboard"? "bg-brand-blue text-white": ""}`}
                >
                    <BiHomeAlt2
                    className='text-xl'
                    /> dashboard
                </Link>
            </li>
            <li>
                <Link
                href="/admin/dashboard/products"
                className={`flex justify-between gap-4 items-center py-2 px-4 rounded-md ${isPathName("/admin/dashboard/products")? "bg-brand-blue text-white": ""}`}
                >
                    <BsBoxSeam 
                    className='text-xl'
                    /> all products
                </Link>
            </li>
            <li>
                <Link
                href="/admin/dashboard/brands"
                className={`flex justify-between gap-4 items-center py-2 px-4 rounded-md ${isPathName("/admin/dashboard/brands")? "bg-brand-blue text-white": ""}`}
                >
                    <LiaShoppingBasketSolid 
                    className='text-xl'
                    /> Brands
                </Link>
            </li>
            <li>
                <Link
                href="/admin/dashboard/categories"
                className={`flex justify-between gap-4 items-center py-2 px-4 rounded-md ${isPathName("/admin/dashboard/categories")? "bg-brand-blue text-white": ""}`}
                >
                    <BiCategoryAlt 
                    className='text-xl'
                    /> Categories
                </Link>
            </li>
            <li>
                <Link
                href="/admin/dashboard/orders"
                className={`flex justify-between gap-4 items-center py-2 px-4 rounded-md ${isPathName("/admin/dashboard/orders")? "bg-brand-blue text-white": ""}`}
                >
                    <CiCircleList 
                    className='text-xl'
                    /> order list
                </Link>
            </li>
        </ul>
    </nav>
  )
}
