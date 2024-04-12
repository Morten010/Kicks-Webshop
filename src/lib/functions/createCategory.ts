"use server"

import { utapi } from "uploadthing/server"
import {db} from "@/src/lib/db"

type ImagesProps = {
    fileKey: string
    fileUrl: string
}[]

export default async function createCategory(image:  ImagesProps, name: string) {
    const img = image[0]
    
    const newCat = await db.category.create({
        data: {
            fileKey: img.fileKey,
            fileUrl: img.fileUrl,
            name: name,
        },
        
    }) 
        
    if(!newCat){
        await utapi.deleteFiles(img.fileUrl)
        return null
    }

    return "Successfull"
}
