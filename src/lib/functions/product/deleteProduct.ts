"use server"

import { utapi } from "uploadthing/server"
import { db } from "../../db"

export default async function deleteProduct(id: number){
    const product = await db.product.findFirst({
        where: {
          id: id
        },
        include: {
          productImage: true,
          size: true,
        }
    })

    if(!product){
        return null
    }

    const urlArray = product.productImage.map(item => {
        return item.fileKey
    })

    if(!urlArray){
        return null
    }

    const result = utapi.deleteFiles(urlArray)

    if(!result){
        return null
    }
    const deletedProduct = await db.product.delete({
        where: {
            id: id
        }
    })
    
    if(!deletedProduct){
        return null
    }
    return deletedProduct
}