"use client"
import React, { useState } from 'react'

// styling
import {AiOutlineMenu, AiOutlineClose} from "react-icons/ai"

export default function NavDropDown() {
    const [showMenu, setShowMenu] = useState(false)
    
    const handleClick = () => {
        setShowMenu(!showMenu)
    }

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
                New Drops🔥
            </li>
            <li
            className='nav-hover'
            >
                Men
            </li>
            <li
            className='nav-hover'
            >
                Women
            </li>
        </ul>}
        {/* end of menu */}

    </>
  )
}
