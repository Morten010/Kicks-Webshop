"use server"

import { utapi } from "uploadthing/server"
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

// create product
export async function createProduct(product: ProductProps, images:ImagesProps, sizes: SizesProps ){
    
    //create product
    const result = await db.product.create({
        data: {
            name: product.name,
            slug: product.name.replace(/\s+/g, '-').replaceAll("/", "_").replaceAll('"', "").replaceAll("'", "")?.toLowerCase(),
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

    
    //create sizes
    const uploadedSizes = await db.size.createMany({
        data: sizesWithId
    })

    
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


// delete product
export async function deleteProduct(id: number){
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

// get full product by id
export const getFullProductByID = async (productId: number) => {
    //get product with everything
    const product = await db.product.findFirst({
        where: {
          id: productId
        },
        include: {
          productImage: true,
          size: true,
        }
    })

    //if product dosent exist return null
    if(!product){
        return null
    }

    //if product exist return product
    return product

}

// get full product
export const getFullProduct = async (productId: number) => {
    //get product with everything
    const product = await db.product.findMany()

    //if product dosent exist return null
    if(!product){
        return null
    }

    //if product exist return product
    return product

}

// update product

export const updateProduct = async (product: ProductProps, id: number) => {

    //update product
    const res = await db.product.update({
        where: {
            id: id
        },
        data: {
            ...product
        }
    })
    
    if(!res){
        return null
    }
    return res
}