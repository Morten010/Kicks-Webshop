"use server"

import { db } from "../../db"

type ProductProps = {
    name?: string
    desc?: string
    price?: number
    brandId?: number
    gender?: string
    categoryId?: number
}

export const updateProduct = async (product: ProductProps, id: number) => {

    //update product
    const res = await db.product.update({
        where: {
            id: id
        },
        data: {
            ...product
        }
    })
    
    if(!res){
        return null
    }
    return res
}