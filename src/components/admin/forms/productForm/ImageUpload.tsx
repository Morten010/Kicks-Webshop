import Image from 'next/image'
import React from 'react'
import { BsTrash } from 'react-icons/bs'
import {BiImageAdd} from "react-icons/bi"
import { LuImageOff } from 'react-icons/lu'
import CustomDropZone from '../CustomDropZone'

type ImageUploadProps = {
    setSelectedImages: ([]: string[]) => void
    selectedImages: string[]
}

export default function ImageUpload({setSelectedImages, selectedImages}: ImageUploadProps) {

    // when files are selected
    const onSelectFile = (selectedFiles: File[]) => {
        const selectedFilesArray = Array.from(selectedFiles)
        
        // make array of new images
        const imageArray = selectedFilesArray.map((file) =>{
            return URL.createObjectURL(file as Blob | MediaSource)
        })
        
        const sortedSelectImages = selectedImages.filter(image => {
            if(image){
                return image
            }
        })
        
        setSelectedImages([...sortedSelectImages, ...imageArray])
        
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
        
        <CustomDropZone handleFiles={onSelectFile} />

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
