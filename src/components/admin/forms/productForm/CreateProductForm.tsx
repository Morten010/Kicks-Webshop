"use client"

import {useEffect, useRef, useState} from 'react'
import React from 'react'
import Select from 'react-select'
import { useUploadThing } from '@/src/app/utils/uploadthing'
import { toast } from 'react-toastify'
import { Product, ProductImage, Size } from '@prisma/client'

// functions
import { productValidation } from '@/src/lib/functions/productValidation'
import createProduct from '@/src/lib/functions/product/createProduct'

// components
import SizeCard from '../SizeCard'
import ImageUpload from './ImageUpload'
import Loader from '@/src/components/Loader'

// styling
import 'react-toastify/dist/ReactToastify.css';
import { convertFile } from '@/src/app/utils/convertFile'
import createImages from '@/src/lib/functions/image/createImages'
import deleteSizes from '@/src/lib/functions/size/deleteSizes'
import { updateSize } from '@/src/lib/functions/updateSizes'
import getSizesFromId from '@/src/lib/functions/size/getSizesFromId'
import { useRouter } from 'next/navigation'
import { getFullProduct } from '@/src/lib/functions/product/getFullProduct'
import deleteImages from '@/src/lib/functions/image/deleteImages'
import createSizes from '@/src/lib/functions/size/createSizes'
import { updateProduct } from '@/src/lib/functions/product/updateProduct'
import deleteProduct from '@/src/lib/functions/product/deleteProduct'
import getAllCategories from '@/src/lib/functions/brand/getAllCategories'
import Modal from '@/src/components/Modal'

// gender options
const genderOptions = [
    {value: "male", label: "Male"},
    {value: "female", label: "Female"},
]

type ProductProps = Product & {
    productImage?: ProductImage[]
    size?: Size[]
}


export default function CreateProductForm({edit = false, product}: {
    edit?: boolean, 
    product?: ProductProps
}) {
    const navigate = useRouter()
    const title = useRef<HTMLInputElement>(null)
    const desc = useRef<HTMLTextAreaElement>(null)
    const price = useRef<HTMLInputElement>(null)
    const [sizes, setSizes] = useState([
        { id: 1, size: "40", quantity: (Math.floor(Math.random() * 12) + 5).toString() },
        { id: 2, size: "41", quantity: (Math.floor(Math.random() * 12) + 5).toString() },
        { id: 3, size: "42", quantity: (Math.floor(Math.random() * 12) + 5).toString() },
        { id: 4, size: "43", quantity: (Math.floor(Math.random() * 12) + 5).toString() },
        { id: 5, size: "44", quantity: (Math.floor(Math.random() * 12) + 5).toString() },
        { id: 6, size: "45", quantity: (Math.floor(Math.random() * 12) + 5).toString() },
        { id: 7, size: "46", quantity: (Math.floor(Math.random() * 12) + 5).toString() }
    ])
    const [counter, setCounter] = useState(2)
    const [options, setOptions] = useState([
        {value: "", label: ""}
    ])
    const [brand, setBrand] = useState({
        value: "",
        label: ""
    })
    const [gender, setGender] = useState({
        value: "",
        label: ""
    })
    const [modal, setModal] = useState(false)
    const [selectedImages, setSelectedImages] = useState<string[]>([])
    const [errors, setErrors] = useState({
        title: "",
        desc: "",
        price: "",
        brand: "",
        gender: "",
        sizes: "",
        images: ""
    })
    const [loading, setLoading] = useState(false)
    const { startUpload } = useUploadThing("productImage");

    // adds a size
    const handleAddSize = (e: any) => {
        e.preventDefault()
        setSizes([...sizes, {
            id: counter,
            size: "0",
            quantity: "0",
        }])
        setCounter(counter + 1)
    }
 
    // updates sizes
    const handleSizeUpdate = (id: number, size: string, quantity: string) => {
        
        setSizes(sizes.map((item) => {
            if(item.id === id){
                return {
                    id,
                    size,
                    quantity
                }
            }else{
                return item
            }
        }))
    }

    // delete size from array
    const handleSizeDelete = (id: number) => {
        setSizes(sizes.filter(item => item.id !== id))
    }

    // handle form submit
    const handleSubmit = async () => {
        setLoading(true)

        //validate form
        const res = await productValidation({
            title: title.current?.value as string,
            brand: parseInt(brand.value),
            desc: desc.current?.value as string,
            gender: gender.value,
            images: selectedImages,
            price:  price.current?.value as string,
            sizes: sizes,
        })
        
        // set errors and if error is found stop the rest from runing
        setErrors(res)
        if(res.title || res.brand || res.desc || res.gender || res.images || res.price || res.sizes ){
            setLoading(false)
            return 
        }


        //format image blob into image file
        const data = await convertFile(selectedImages)
        console.log(data);

        const imagesPromises = data.map(async (item) => {
            const uploaded = await startUpload([item])
           if(uploaded){
                return uploaded[0]
           }
        })
        const images = await Promise.all(imagesPromises)

        
        // if image upload went wrong
        if(!images){
            toast.error("Something went wrong, trying to upload the images.")
            setLoading(false)
            return 

        }

        //format price
        const newPrice = parseFloat(price.current?.value as string).toFixed(2);
        
        // create product object to create the product
        const product = {
            name: title.current?.value as string,
            desc: desc.current?.value as string,
            price: parseInt(newPrice.replaceAll(".", "") as string),
            gender: gender.value,
            brandId: parseInt(brand.value),
        }

        // create product
        // @ts-ignore
        const productUpload = await createProduct(product, images, sizes)
        
        // if not successfull stop rest from running
        if(!productUpload || !productUpload?.id){
            toast.error("Something went wrong, trying to create the product.")
            setLoading(false)
            return
        }
        
        //success msg and end loading
        toast.success("The product was successfully created🥳!")
        setLoading(false)

        title.current!.value = "";
        desc.current!.value = "";
        price.current!.value = "";
        setSizes([
            { id: 1, size: "40", quantity: (Math.floor(Math.random() * 12) + 5).toString() },
            { id: 2, size: "41", quantity: (Math.floor(Math.random() * 12) + 5).toString() },
            { id: 3, size: "42", quantity: (Math.floor(Math.random() * 12) + 5).toString() },
            { id: 4, size: "43", quantity: (Math.floor(Math.random() * 12) + 5).toString() },
            { id: 5, size: "44", quantity: (Math.floor(Math.random() * 12) + 5).toString() },
            { id: 6, size: "45", quantity: (Math.floor(Math.random() * 12) + 5).toString() },
            { id: 7, size: "46", quantity: (Math.floor(Math.random() * 12) + 5).toString() }
        ]);
        setSelectedImages([])
    }

    const closeModal = () => {
        setModal(false)
    }
    
    //type for option
    type SelectOptionType = { label: string, value: string }
    //handle change on select
    const handleOptionChange = (option: SelectOptionType | null) => {
        if (option) {
          setBrand(option)
        }
    };

    // handle gender change
    const handleGenderChange = (option: SelectOptionType | null) => {
        if(option){
            setGender(option)
        }
    }

    //handle update on product
    const handleUpdate = async () => {
        setLoading(true)
        //get current product
        const CurrProduct = await getFullProduct(product?.id!)
        console.log(CurrProduct);

        //validate form
        const res = await productValidation({
            title: title.current?.value as string,
            brand: parseInt(brand.value),
            desc: desc.current?.value as string,
            gender: gender.value,
            images: selectedImages,
            price:  price.current?.value as string,
            sizes: sizes,
        })
        
        // set errors and if error is found stop the rest from runing
        setErrors(res)
        if(res.title || res.brand || res.desc || res.gender || res.images || res.price || res.sizes ){
            setLoading(false)
            return 
        }

        //check for new images and put new images in array
        const newImages = selectedImages.filter(image => image.includes("blob"))

        //if new images exist upload them
        if(newImages[0]){
            //convert blob to file for upload
            const convertedFiles = await  convertFile(newImages);
            //upload file to storage
            const UploadedImages = await startUpload(convertedFiles);
            //update selected array with new uploaded url so we can delete it without refreshing
            const uploadImagesUrl = UploadedImages?.map(item => {
                return item.fileUrl
            })
            const noblob = selectedImages.filter(item => !item.includes("blob"))
            const newSelected = [...noblob, ...uploadImagesUrl!] 
            setSelectedImages(newSelected)
            

            //if successfull update image schema
            if(UploadedImages){
                createImages(UploadedImages, product?.id!)
                console.log("Added new image: ", UploadedImages);
            }
        }

        //if image is deleted
        const x = CurrProduct?.productImage?.filter(image => !selectedImages.includes(image.fileUrl))
        console.log(x);
        
        if(x?.length !== 0){
            //get keys of the images which need to be deleted
            console.log("x");
            const result = await deleteImages(x!)
            console.log(result);
            
        }


        //Update sizes
        const sizesBefore = CurrProduct?.size?.map(item => {return item.id})
        const sizesAfter = sizes.filter(item => !sizesBefore?.includes(item.id))

        //if new size is added create it in database
        if(sizesAfter[0]){
            //add sizes
            const newSize = await createSizes(sizesAfter, product?.id!)
            console.log(newSize);
            if(!newSize){
                // throw error
                return
            }
            
        }

        //if size deleted 
        //all current sizes id
        const currSize = CurrProduct?.size.map(item => {
            return item.id
        })
        //all the sizes 
        const sizeLeft = sizes.filter(item => {
            if(currSize?.includes(item.id)){
                return item.id
            }
        })
        //make array of just item id's of all the new sizes
        const newSizeLeft = sizeLeft.map(item => {return item.id})
        const newSize = currSize?.filter(item => !newSizeLeft.includes(item))
        console.log(newSize);

        //if size deleted
        if(newSize![0]){
            const deletedSizes = await deleteSizes(newSize!)
            console.log(deletedSizes);
        }

        // !update changed sizes
        // all current sizes
        const newSizeNum = sizeLeft.filter(item => {
            if(currSize?.includes(item.id)){
                return item
            }
        }) 
        //ids of all the current sizes
        const newSizeNumIds = product?.size?.map(item => {return item.id})

        const currSizeNum = product?.size?.filter(item => newSizeNumIds?.includes(item.id))

        const comparedResult = newSizeNum.filter(item => {
            //find sibling from current sizes
            const sibling = currSizeNum?.find(size => size.id === item.id)
            //check if a change has been made
            if(sibling?.quantity !== parseInt(item.quantity) || sibling.size !== parseInt(item.size)){
                return {id: sibling?.id, size: parseInt(item.size), quantity: parseInt(item.quantity)}
            }
        })

        //if there is anything to be updated
        if(comparedResult.length !== 0){
            const res = updateSize(comparedResult)
            console.log(res);
            
        }
        
        //if any change have happend to sizes get new version and setstate
       if(comparedResult.length !== 0 || newSize![0] || sizesAfter[0]){
            const newSizeArray = await getSizesFromId(product?.id!)
            const filteredSizesArray = newSizeArray?.map(size => {
                return {
                    size: size.size?.toString(), 
                    quantity: size.quantity?.toString(), 
                    id: size.id
                }
            })
            // @ts-ignore
            setSizes(filteredSizesArray)
       }

        // if any product info has changed update product
        //format price
        const newPrice = parseFloat(price.current?.value as string).toFixed(2);
        const newPriceInt = parseInt(newPrice.replaceAll(".", "")) 
        const oldBrand = options.filter(item => parseInt(item.value) === product?.brandId)
        console.log(gender.value);
        console.log(product?.gender);

        if(
            CurrProduct?.name !== title.current?.value 
            || CurrProduct?.desc !== desc.current?.value
            || CurrProduct?.price !== newPriceInt
            || oldBrand[0].value !== brand.value
            || gender.value !== product?.gender
            ){
                //create new product
            const newProduct = {
                name: title.current?.value as string,
                desc: desc.current?.value as string,
                price: newPriceInt,
                brandId: parseInt(brand.value),
                gender: gender.value
            }
            const updatedProduct = await updateProduct(newProduct, product?.id!)
            console.log("updated Product", updatedProduct);
            
        }

        //success message and stop loading
        toast.success("Updated the product🥳!")
        setLoading(false)
    }

    const handleDelete = async () => {
        setLoading(true)
        const res = await deleteProduct(product?.id!)
        if(!res){
            toast.error("Could not delete the Product.")
        }
        toast.success("Sucessfully Deleted Product!")
        setTimeout(() => {
            navigate.push("/admin/dashboard/products")
        }, 3000);
    }

    // get all categories and set them as options
    useEffect(() => {
        const fetchData = async () => {
            const newArray = []
            const res = await getAllCategories()
            // loop through res and push formatted data to array
            for(const category of res){
                const item = {
                    value: category.id,
                    label: category.name
                }
                newArray.push(item)
            }

            const promiseArray = await Promise.all(newArray)
            // set newArray as option
            // @ts-ignore
            setOptions(promiseArray)

            // if product exist input product
            if(product){
                title.current!.value = product.name;
                desc.current!.value = product.desc;
                price.current!.value = product.price.toString().slice(0, -2) + "." + product.price.toString().slice(-2);
                const oldGender = genderOptions.filter(item => product.gender === item.value)
                if(oldGender[0]){
                    setGender(oldGender[0])
                } 

                const filteredImageArray = product.productImage?.map(image => {
                    return image.fileUrl
                })                
                setSelectedImages(filteredImageArray!)

                const filteredSizesArray = product.size?.map(size => {
                    return {
                        size: size.size?.toString(), 
                        quantity: size.quantity?.toString(), 
                        id: size.id
                    }
                })
                // @ts-ignore
                setSizes(filteredSizesArray)

                //set counter to highest number in array + 1
                const numbers = product.size?.map(item => {
                    return item.id
                })
                const highScore = Math.max(...numbers!)
                if(highScore){
                    setCounter(highScore + 1)
                }
            }

        }

        // intiate fetch function
        fetchData()

    }, [])

    //when options is set, then set current brand from product
    useEffect(() => {
        if(product && options){
            const oldBrand = options.filter(item => parseInt(item.value) === product.brandId)
            setBrand(oldBrand[0])
        }
    }, [options])
    


    

  return (
    <form
    className={`mt-4 flex flex-col md:flex-row gap-4 bg-white rounded-xl p-4 relative ${!options[0]!.value ? "overflow-hidden h-[85vh]" : ""}`}
    onSubmit={(e) => {e.preventDefault()}}
    >
        {!options[0]!.value && (
            <div
            className='absolute w-full h-screen grid place-content-center bg-white opacity-70 z-50'
            >
                <Loader />
            </div>
        )}
        <div
        className='flex flex-col gap-2 w-full md:w-1/2 lg:w-2/3'
        >
            <label>
                <span
                className='font-medium'
                >
                    Title
                </span>
                <input
                ref={title}
                type="text"
                placeholder='Jordan Oktober Red...'
                className={`bg-transparent border border-brand-black rounded-md p-2 w-full ${errors.title ? "border-red-600 focus:outline-red-600 placeholder:text-red-600 placeholder:opacity-70" : ""}`}
                />
                {errors.title && (
                    <p
                    className='text-red-600 '
                    >
                        {errors.title}
                    </p>
                )}
            </label>
            <label>
                <span
                className='font-medium'
                >
                    Description
                </span>
                <textarea
                ref={desc}
                placeholder='This product is excluded from all promotional discounts and offers.'
                rows={5}
                className={`bg-transparent border border-brand-black rounded-md p-2 w-full ${errors.desc ? "border-red-600 focus:outline-red-600 placeholder:text-red-600 placeholder:opacity-70" : ""}`}
                />
                {errors.desc && (
                    <p
                    className='text-red-600 '
                    >
                        {errors.desc}
                    </p>
                )}
            </label>
            <label>
                <span
                className='font-medium'
                >
                    Price
                </span>
                <input
                ref={price}
                type="number"
                placeholder='1000,00'
                className={`bg-transparent border border-brand-black rounded-md p-2 w-full ${errors.price ? "border-red-600 focus:outline-red-600 placeholder:text-red-600 placeholder:opacity-70" : ""}`}
                />
                {errors.price && (
                    <p
                    className='text-red-600 '
                    >
                        {errors.price}
                    </p>
                )}
                <p>Do not include usd or $.</p>
            </label>

            {/* brand and gender */}
            <div
            className='flex gap-2'
            >
                <div
                className='w-2/4'
                >
                    <h2
                    className='font-semibold'
                    >
                        Brand
                    </h2>
                    {options[0] && (
                        <Select 
                        options={options} 
                        onChange={handleOptionChange}
                        value={brand}
                        />
                    )}
                    {errors.brand && (
                    <p
                    className='text-red-600 '
                    >
                        {errors.brand}
                    </p>
                    )}
                </div>
                <div
                className='w-2/4'
                >
                    <h2
                    className='font-semibold'
                    >
                        Gender
                    </h2>
                    {options[0] && (
                        <Select 
                        options={genderOptions} 
                        onChange={handleGenderChange}
                        value={gender}
                        />
                    )}
                    {errors.gender && (
                        <p
                        className='text-red-600 '
                        >
                            {errors.gender}
                        </p>
                    )}
                </div>
            </div>
            {/* end of brand and gender */}

            {/* sizes */}
            <div
            className='flex flex-col'
            >
                <div className="top flex justify-between w-full items-center mt-4">
                    <h2
                    className='font-medium'
                    >
                        Sizes
                    </h2>
                    <p
                    className='secondary-btn'
                    onClick={handleAddSize}
                    >
                        Add Size
                    </p>
                </div>
                <div
                className='py-4 category-grid gap-4'
                >
                    {sizes.map(size => (
                        <SizeCard handleSizeUpdate={handleSizeUpdate} handleSizeDelete={handleSizeDelete} size={size} key={size.id}/>
                    ))}
                </div>
                {errors.sizes && (
                    <p
                    className='text-red-600 '
                    >
                        {errors.sizes}
                    </p>
                )}
            </div>
        {/* end of sizes */}
        </div>
    
        {/* image upload */}
        <div
        className='w-full md:w-1/2 lg:w-1/3'
        >   
            {/* image upload */}
            <ImageUpload selectedImages={selectedImages} setSelectedImages={setSelectedImages}/>

            {errors.images && (
                <p
                className='text-red-600 '
                >
                    {errors.images}
                </p>
            )}
            
            {/* submit buttons */}
            {!loading && <div
            className='flex gap-2 w-full mt-4'
            >
                {edit && <button
                className='danger-btn flex-grow'
                onClick={() =>  setModal(true)}
                >
                    Delete
                </button>}
                <button
                className='ghost-btn flex-grow '
                onClick={() => edit ? handleUpdate() :
                handleSubmit()}
                >
                    {edit ? "Update" : "Submit" }
                </button>
            </div>}
            {/* loading buttons */}
            {loading && <div
            className='flex gap-2 w-full mt-4 opacity-50'
            >
                <button
                className='danger-btn flex-grow'
                disabled
                >
                    Loading...
                </button>
                <button
                className='ghost-btn flex-grow '
                disabled
                >
                    Loading...
                </button>
            </div>}

        </div>
        {/* end of image  */}

        {/* modal and pop up message */}
        {modal && <Modal
        handleConfirm={handleDelete}
        handleClose={closeModal}
        handleCancel={closeModal}
        >
            <h2
            className='text-xl font-semibold'
            >
                Delete product
            </h2>
            <p>
                Are you sure you wanna delete this Product?
            </p>
        </Modal>}
    </form>
  )
}
