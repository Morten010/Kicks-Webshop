"use server"

import { db } from "../../db"

export default async function deleteCategory(id: number){
    const result = await db.brand.delete({
        where: { id: id }
    })
}