"use server"
import { db } from '@/src/lib/db'

type BrandProps = {
    name: string,
    desc: string
}

export default async function createCategory(brand: BrandProps){

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