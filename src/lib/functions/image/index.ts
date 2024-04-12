"use server"

import { utapi } from "uploadthing/server";
import { db } from "../../db";

// create images
export async function createImages(images: {
    fileUrl: string;
    fileKey: string;
}[], id: number){

    const imagesWithId = images.map(image => {
        return {
            fileKey: image.fileKey, 
            fileUrl: image.fileUrl,
            productId: id
        }
    })
    
    const createdImages = await db.productImage.createMany({
        data: imagesWithId
    })
    
    if(!createdImages){
        return null
    }
    return createdImages
}

// delete images
export async function deleteImages(images: {
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