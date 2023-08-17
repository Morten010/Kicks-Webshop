"use server"

import { db } from "../db"

type ImagesProps = {
    fileKey: string
    fileUrl: string
}[]

export default async function createCategory(image:  ImagesProps, name: string) {
    const newCat = await db.category.create({
        data: {
            fileKey: image[0].fileKey,
            fileUrl: image[0].fileUrl,
            name: name,
        }
    })

    if(!newCat){
        return null
    }

    return "Successfull"
}
