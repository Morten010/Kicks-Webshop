"use client"
import { DropDownItemProps } from '@/types'
import React, { useState } from 'react'

// styling
import {BiSolidChevronDown, BiSolidChevronUp} from "react-icons/bi"

export default function DropDownItem({title, children, show, setShow}: DropDownItemProps & {
  show: boolean
  setShow: () => void
}) {

  return (
    <li
    className='relative'
    >
        <span
        className='nav-hover flex items-center gap-1 select-none'
        onClick={setShow}
        >
            {title}
            {!show && <BiSolidChevronDown />}
            {show && <BiSolidChevronUp />}
        </span>
       {show && <div className='absolute bg-white p-4 -left-4 -bottom-8 translate-y-[100%] z-10 rounded-xl' >
            {children}
        </div>}
    </li>
  )
}
