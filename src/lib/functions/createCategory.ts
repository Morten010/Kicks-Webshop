"use server"

import { utapi } from "uploadthing/server"
import { db } from "../db"

type ImagesProps = {
    fileKey: string
    fileUrl: string
}[]

export default async function createCategory(image:  ImagesProps, name: string) {
    const img = image[0]
    console.log(image, name)
    const cats = await db.category.findMany({})
    console.log(cats);
    
    const newCat = await db.category.create({
        data: {
            fileKey: img.fileKey,
            fileUrl: img.fileUrl,
            name: name,
        }
    }) 
    
    console.log(image);
    
    console.log(newCat);
    
    if(!newCat){
        await utapi.deleteFiles(img.fileUrl)
        return null
    }

    return "Successfull"
}
