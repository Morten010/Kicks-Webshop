"use server"

import { db } from "../../db"

export async function getSizesFromId(id: number){
    const result = await db.size.findMany({
        where: {
            productId: id
        }
    })

    return result    
}


export async function deleteSizes(sizes: number[]){

        const deleteImages = await db.size.deleteMany({
            where: {
               id: {
                in: sizes
               }
            } 
        })
        if(deleteImages.count === 0){
            return null
        }
        
        return deleteImages.count
}


export async function createSizes(sizes: {
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