"use server"

import { db } from "../../db"




export default async function getAllCategories(){
    const result = await db.brand.findMany()

    return result    
}