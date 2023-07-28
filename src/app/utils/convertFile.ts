export async function convertFile(images: string[]) {
    //format image blob into image file
    const newFiles = [] as File[]
    images.filter((image) => {
        let file = fetch(image)
            .then(r => r.blob())
            .then(blobFile => {
                const filetype = blobFile.type.split("/")
                
                return new File([blobFile], `product_image_${new Date().toJSON().slice(0,10)}-${new Date().getMilliseconds()}.${filetype[1]}` , { type: blobFile.type })
            })
        //push new file to array
        // @ts-ignore
        newFiles.push(file)
    })

    //wait for data and return it
    const data = await Promise.all(newFiles)
    return data
}