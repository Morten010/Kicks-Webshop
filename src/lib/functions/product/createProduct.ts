"use server"

import { uploadFiles, useUploadThing } from "@/src/app/utils/uploadthing"
import { db } from "../../db"

type ImagesProps = {
    fileKey: string
    fileUrl: string
}[]


type ProductProps = {
    name: string
    desc: string
    price: number
    brandId: number
    gender: string
    categoryId: number
}

type SizesProps = {
    id: number;
    size: string;
    quantity: string;
}[]

export default async function createProduct(product: ProductProps, images:ImagesProps, sizes: SizesProps ){
    
    //create product
    const result = await db.product.create({
        data: {
            name: product.name,
            slug: product.name.replace(/\s+/g, '-').replaceAll("/", "_").replaceAll('"', "").replaceAll("'", "").toLowerCase(),
            desc: product.desc,
            price: product.price,
            brandId: product.brandId,
            gender: product.gender,
            categoryId: product.categoryId
        }
    })
    
    //if create product went wrong stop rest from running
    if(!result){
        return null
    }

    //create array with product id to insert into db
    const sizesWithId = sizes.map(size => {
        return {
            size: parseInt(size.size),
            quantity: parseInt(size.quantity),
            productId: result.id,
        }
    })

    console.log(sizesWithId);
    
    //create sizes
    const uploadedSizes = await db.size.createMany({
        data: sizesWithId
    })

    console.log(uploadedSizes);
    
    // if sizes upload went wrong delete product and throw error
    if(!uploadedSizes.count){
        await db.product.delete({
            where: {
                id: result.id
            }
        })
        return null
    }

    const imagesWithId = images.map(image => {
        return {
            fileKey: image.fileKey, 
            fileUrl: image.fileUrl,
            productId: result.id
        }
    })
    console.log(imagesWithId);
    console.log("result", imagesWithId);

    

    const uploadedImages = await db.productImage.createMany({
        data: imagesWithId
    })

    // if image upload goes wrong delete product and sizes
    if(!uploadedImages.count){
        await db.product.delete({
            where: {
                id: result.id
            }
        })
        await db.size.deleteMany({
            where: {
                productId: result.id
            }
        })
        return null
    }

    return result
}