"use client"
import Link from 'next/link'
import React, { useState } from 'react'

// styling
import {AiOutlineMenu, AiOutlineClose} from "react-icons/ai"
import { BiSolidUser } from 'react-icons/bi'

export default function NavDropDown({showMenu, handleClick}:{
    showMenu: boolean
    handleClick: () => void
}) {

  return (
    <>
        {/* open and close menu */}
        {!showMenu &&  <AiOutlineMenu 
        className='text-2xl md:hidden nav-hover'
        onClick={handleClick}
        />}
        {showMenu && <AiOutlineClose 
            className='text-2xl md:hidden nav-hover'
            onClick={handleClick}
        />}
        {/* end of open and close menu */}

        {/* menu */}
        {showMenu && <ul 
        className='font-semibold md:hidden absolute -bottom-4 left-0 translate-y-[100%] z-[200] bg-white p-4 rounded-xl w-full text-center gap-2 flex flex-col'
        >
            <li
            className='nav-hover'
            >
                <Link href="/search?orderby=desc">
                New Drops🔥
                </Link>
            </li>
            <li
            className='nav-hover'
            >
                <Link href="/search?gender=male">
                    Men
                </Link>
            </li>
            <li
            className='nav-hover'
            >
                <Link href="/search?gender=female">
                    Women
                </Link>
            </li>
            <li
            className='flex justify-center'
            >
                <Link href="/profile">
                    <BiSolidUser 
                    className='nav-hover text-xl'
                    />
                </Link>
            </li>
        </ul>}
        {/* end of menu */}

    </>
  )
}
