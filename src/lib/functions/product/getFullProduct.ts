"use server"

import { db } from "../../db"


export const getFullProduct = async (productId: number) => {
    //get product with everything
    const product = await db.product.findFirst({
        where: {
          id: productId
        },
        include: {
          productImage: true,
          size: true,
        }
    })

    //if product dosent exist return null
    if(!product){
        return null
    }

    //if product exist return product
    return product

}