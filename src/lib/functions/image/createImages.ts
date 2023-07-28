"use server"

import { db } from "../../db";

export default async function createImages(images: {
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
    console.log(createdImages);
    
    if(!createdImages){
        return null
    }
    return createdImages
}