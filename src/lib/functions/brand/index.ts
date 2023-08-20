"use server"
import { db } from "../../db"

type BrandProps = {
    name: string,
    desc: string
}

export async function createBrand(brand: BrandProps){

    const result = await db.brand.create({
        data: {
            ...brand
        }
    })
    
    if(result){
        return {
            "msg": "Successfully added.",
            "status": true
        }
    } else {
        return {
            "msg": "Something went wrong trying to add the category.",
            "status": false
        }
    }
}

export async function deleteCategory(id: number){
    const result = await db.brand.delete({
        where: { id: id }
    })
}

export async function getAllBrands(){
    const result = await db.brand.findMany()

    return result    
}