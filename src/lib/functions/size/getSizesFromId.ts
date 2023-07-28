"use server"

import { db } from "../../db"

export default async function getSizesFromId(id: number){
    const result = await db.size.findMany({
        where: {
            productId: id
        }
    })

    return result    
}