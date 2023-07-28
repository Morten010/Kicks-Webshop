"use server"

import { db } from "../../db"


export default async function createSizes(sizes: {
        id: number
        size: string
        quantity: string
    }[], id: number
){
    //add productId to sizes
    const sizesWithId = sizes.map(size => {
        return {
            size: parseInt(size.size),
            quantity: parseInt(size.quantity),
            productId: id
        }
    })
    console.log(sizesWithId);
    
    
    //create sizes
    const createdSizes = await db.size.createMany({
        data: sizesWithId
    })
    
    //validate
    if(!createdSizes){
        return null
    }
    return createdSizes
}