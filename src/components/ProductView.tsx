"use client"
import { Product, ProductImage, Size } from '@prisma/client'
import Image from 'next/image'
import React, { useState } from 'react'

// styling
import {AiOutlineHeart} from "react-icons/ai"
import { formatPrice } from '../app/utils/formatPrice'
import { useCart } from '../app/store/useCart'
import ProductCarousel from './productCarousel'
import { useZustand } from '../app/store/useZustand'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

type CartItem = Product & {
    productImage?: ProductImage[]
    size?: Size[]
}

type ProductProps = {
    product?: Product & {
        productImage?: ProductImage[]
        size?: Size[]
    }
}

export default function ProductView({product}: ProductProps) {
    const cart = useZustand(useCart, (state) => state)
    const user = useSession()
    const router = useRouter()
    
    const [size, setSize] = useState<Number>()
    const [msg, setMsg] = useState("")
    const {addProduct} = useCart()

    const handleSize = (size: number) => {
        setSize(size)
    }

    const handleCart = () => {
        setMsg("")
        if(!size){
            setMsg("Pick a size")
            return
        }

        const cartProduct = {...product, size: size}

        addProduct(cartProduct)
    }
    if(cart){
        console.log(cart.cart);
    }
    
    const handleBuy = async () => {
        if(!size){
            return 
        }

        const response = await fetch("/api/stripe", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
              cart: [{
                amount: 1,
                brandId: product?.brandId,
                id: product?.id,
                name: product?.name,
                slug: product?.slug,
                desc: product?.desc,
                price: product?.price,
                gender: product?.gender,
                createdAt: product?.createdAt,
                productImage: product?.productImage,
                size: size
              }],
              userId: user.data?.user.id
            })
        })

        if((response as any).statusCode === 500){
            return null;
        }
    
        console.log(response);
        const data = await response.json()
    
        if(!data.url){
            return null
        }
    
        router.push(data.url)
    }
    
  return (
    <section 
    className='flex flex-col md:flex-row gap-4'
    >
        {/* images */}
        <div
        className='md:grid-cols-2 w-full md:w-[70%] gap-2 mb-auto hidden md:grid'
        >
            {product?.productImage?.map(item => (
                <div
                key={item.id}
                className='relative aspect-square'
                >
                    <Image
                    fill
                    src={item.fileUrl}
                    alt={product.name + " image"}
                    className="z-0 object-cover rounded-lg bg-white"
                    />
                </div>
            ))}
        </div>
        {/* small devices image carousel */}
        <div className='md:hidden'>
            {product?.productImage && <ProductCarousel images={product?.productImage} name={product.name}/>}
        </div>
        {/* end of images */}

        {/* product details */}
        <div
        className='w-full md:w-[30%]'
        >
            <h1
            className='text-4xl font-semibold'
            >
                {product?.name}
            </h1>
            <p
            className='text-brand-blue font-semibold text-xl mt-1'
            >
                {formatPrice(product?.price!)}
            </p>


            <div
            className='flex flex-col gap-1 mt-1'
            >
                <h2
                className='text-lg font-semibold'
                >
                    size
                </h2>

                <div
                className='flex gap-2 flex-wrap max-w-[300px] md:max-w-full'
                >
                    {product?.size?.map(item => (
                        <button
                        key={item.id}
                        className={`w-10 h-10 grid place-content-center rounded ${item.quantity === 0 ? "bg-gray-300 text-gray-400": size === item.size ? "bg-brand-black text-white" : "bg-white"}`}
                        onClick={() => item.quantity === 0 ? "" : handleSize(item?.size!)}
                        aria-label={`size ${item.size}`}
                        >
                            {item.size}
                        </button>
                    ))}
                </div>
            </div>


            <div
            className='flex flex-col gap-1'
            >
                <div
                className='flex gap-1 mt-4'
                >
                    {product && <button 
                    className="secondary-btn w-full"
                    onClick={() => handleCart()}
                    >
                        ADD TO CART
                    </button>}
                    <button 
                    className='secondary-btn text-xl'
                    aria-label='Add to liked'
                    >
                        <AiOutlineHeart />
                    </button>
                </div>
                <button 
                className="primary-btn w-full"
                onClick={handleBuy}
                >
                        BUY IT NOW
                </button>
            </div>
            {msg && (
                <p
                className='text-red-600 mt-2 font-semibold'
                >
                    {msg}
                </p>
            )}

            <div
            className='mt-4'
            >
                <h2
                className='font-semibold text-lg'
                >
                    About the Product
                </h2>
                <p>
                    {product?.desc}
                </p>
            </div>

        </div>
        {/* product details */}
    </section>
  )
}
