"use server"

import { utapi } from "uploadthing/server"
import { db } from "../../db";

export default async function deleteImages(images: {
    id: number;
    fileUrl: string;
    fileKey: string;
    productId: number;
}[]){
    const deletedImagesKey = images?.map(item => {
        return item.fileKey
    })
    const result = await utapi.deleteFiles(deletedImagesKey)
    
    if(result.success){
        const deleteImages = await db.productImage.deleteMany({
            where: {
                fileKey: {
                    in: deletedImagesKey
                }
            } 
        })
        if(deleteImages.count === 0){
            return null
        }
        return result.success
    }
    return null
}