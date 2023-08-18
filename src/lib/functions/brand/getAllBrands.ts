"use server"

import { db } from "../../db"




export default async function getAllBrands(){
    const result = await db.brand.findMany()

    return result    
}