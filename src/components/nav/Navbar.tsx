"use client"
import Image from 'next/image'
import React, {useState, useEffect} from 'react'

//styling
import {BiSolidUser, BiSearch} from "react-icons/bi"
import NavDropDown from './NavDropDown'
import Link from 'next/link'
import DropDownItem from './DropDownItem'
import Cart from './Cart'
import { usePathname } from 'next/navigation'


export default function Navbar() {
    const [showCart, setShowCart] = useState(false)
    const [showMen, setShowMen] = useState(false)
    const [showWomen, setShowWomen] = useState(false)
    const [showMobileMenu, setShowMobileMenu] = useState(false)
    const pathname = usePathname()

    useEffect(() => {
        if(showMen){
            setShowMen(false)
        }
        if(showWomen){
            setShowWomen(false)
        }
        if(showCart){
            setShowCart(false)
        }
        if(showMobileMenu){
            setShowMobileMenu(false)
        }
    }, [pathname])
    

    const handleWomen = () => {
        if(showMen){
            setShowMen(false)
        }
        if(showCart){
            setShowCart(false)
        }
        if(showMobileMenu){
            setShowMobileMenu(false)
        }
        setShowWomen(!showWomen)
    }

    const handleMen = () => {
        if(showWomen){
            setShowWomen(false)
        }
        if(showCart){
            setShowCart(false)
        }
        if(showMobileMenu){
            setShowMobileMenu(false)
        }
        setShowMen(!showMen)
    }

    const handleCart = () => {
        if(showMen){
            setShowMen(false)
        }
        if(showWomen){
            setShowWomen(false)
        }
        if(showMobileMenu){
            setShowMobileMenu(false)
        }
        setShowCart(!showCart)
    }

    const handleMobileMenu = () => {
        if(showMen){
            setShowMen(false)
        }
        if(showWomen){
            setShowWomen(false)
        }
        if(showCart){
            setShowCart(false)
        }
        setShowMobileMenu(!showMobileMenu)
    }

  return (
    <nav
    className='bg-white px-4 py-6 rounded-xl relative flex items-center justify-between z-50'
    >
        {/* phone menu */}
        <NavDropDown handleClick={handleMobileMenu} showMenu={showMobileMenu}/>
        {/* phone menu */}

        {/* menu list */}
        <ul className='font-semibold hidden md:gap-6 md:flex'>
            <li
            className='nav-hover'
            >
                New Drops🔥
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

            {/* <DropDownItem 
            title='Men' 
            show={showMen} 
            setShow={handleMen}
            >
                <ul>
                    <li>Runners</li>
                    <li>Sneakers</li>
                </ul>
            </DropDownItem>
            <DropDownItem 
            title='Women'
            show={showWomen} 
            setShow={handleWomen}
            >
                <ul>
                    <li>Runners</li>
                    <li>Sneakers</li>
                </ul>
            </DropDownItem> */}
        </ul>
        {/* menu list end */}

        {/* logo */}
        <Link href="/">
            <Image 
            src="/logo.svg"
            priority
            width={128}
            height={32}
            alt='Kicks logo'
            className='absolute left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%]'
            />
        </Link>
        {/* logo end */}

        {/* user section */}
        <ul
        className='flex gap-3 sm:gap-6 text-2xl items-center'
        >
            <li>
                <Link href="search">
                    <BiSearch 
                    className='nav-hover'
                    />
                </Link>
            </li>
            <li
            className='hidden sm:block'
            >
                <Link href="/profile">
                    <BiSolidUser 
                    className='nav-hover'
                    />
                </Link>
            </li>
            <Cart showCart={showCart} setShowCart={ handleCart}/>
        </ul>
        {/* user section end */}
    </nav>
  )
}
