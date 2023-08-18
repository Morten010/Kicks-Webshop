"use server"
import {db} from "@/src/lib/db"

export async function getAllCategories() {
    const categories = await db.category.findMany({})

    if(!categories){
        return null
    }
    return categories
}
