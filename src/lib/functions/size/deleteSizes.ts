"use server"

import { db } from "../../db";

export default async function deleteSizes(sizes: number[]){

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