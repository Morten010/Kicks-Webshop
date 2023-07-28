import Image from 'next/image'
import React from 'react'
import { BsTrash } from 'react-icons/bs'
import {BiImageAdd} from "react-icons/bi"
import { LuImageOff } from 'react-icons/lu'

type ImageUploadProps = {
    setSelectedImages: ([]: string[]) => void
    selectedImages: string[]
}

export default function ImageUpload({setSelectedImages, selectedImages}: ImageUploadProps) {

    // when files are selected
    const onSelectFile = (e:any) => {
        const selectedFiles = e.target.files;
        const selectedFilesArray = Array.from(selectedFiles)
        console.log(selectedFiles);
        
        // make array of new images
        const imageArray = selectedFilesArray.map((file) =>{
            return URL.createObjectURL(file as Blob | MediaSource)
        })
        console.log([...selectedImages, ...imageArray]);
        
        const sortedSelectImages = selectedImages.filter(image => {
            if(image){
                return image
            }
        })
        
        setSelectedImages([...sortedSelectImages, ...imageArray])
        console.log([...sortedSelectImages, ...imageArray]);
        
    }

  return (
    <div
    className=''
    >
        {/* top image */}
        {selectedImages[0] !== undefined && <div
        className='relative aspect-square w-full'
        >
            <Image 
            src={selectedImages[0]}
            alt='Image'
            fill
            className='object-cover'
            />    
        </div>}
        {selectedImages[0] === undefined && <div
        className='relative aspect-square w-full bg-gray-300 grid place-content-center text-center'
        >
                <LuImageOff
                className='text-8xl text-white'
                />
                <p
                className='text-white font-semibold text-lg'
                >
                    No image
                </p>
        </div>}
        {/* end of top image */}


        <h2
        className='font-medium mb-2 mt-4'
        >
            images
        </h2>
        <div
        className='py-2 px-2 rounded-lg w-full border-gray-500 border-dashed border-2 mb-4'
        >
            <label
            className='w-full h-full grid place-content-center text-center text-gray-500 p-4'
            >
                <BiImageAdd 
                className='text-5xl mx-auto text-brand-blue'
                />
                <span
                className='text-xl font-semibold'
                >
                    Click to add Images
                </span>
                add up to 4 images
                <input 
                type="file" 
                name="upload image" 
                multiple
                accept='images/png, images/jpeg, images/webp'
                onChange={onSelectFile}
                className='hidden'
                />
            </label>
        </div>
        {selectedImages[0] && (
            <div
            className='category-grid py-4'
            >
                {selectedImages.map((image, index) => (
                    <div
                    key={index}
                    className='flex justify-between items-center bg-gray-100 rounded-lg p-4'
                    >
                        <div
                        key={image}
                        className='aspect-square w-16 max-w-xs relative rounded-lg overflow-hidden'
                        >
                            <Image 
                            src={image}
                            alt='Image'
                            fill
                            className='object-cover'
                            />
                            
                            {/* <p
                            className='absolute left-2 top-2 text-brand-blue'
                            >
                                {index + 1}/{selectedImages.length}
                            </p> */}
                        </div>
                        <button
                        className='text-xl font-semibold text-white bg-red-700 p-2.5 rounded-full  hover:opacity-70 '
                        onClick={() => setSelectedImages(selectedImages.filter(item => item !== image))}
                            >
                            <BsTrash />
                        </button>
                    </div>
                ))}
            </div>
        )}
    </div>
  )
}
