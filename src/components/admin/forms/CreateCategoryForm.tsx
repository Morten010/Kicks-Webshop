"use client"
import React, { useState } from 'react'
import CustomDropZone from './CustomDropZone'
import CategoryCard from '../../CategoryCard'

import { minLength, object, type Output, parse, string, maxLength} from 'valibot'; 
import { useUploadThing } from '@/src/app/utils/uploadthing';
import CreateCategory from '@/src/lib/functions/createCategory';
import createCategory from '@/src/lib/functions/createCategory';
import { convertFile } from '@/src/app/utils/convertFile';

export default function CreateCategoryForm() {
    const [file, setFile] = useState<File>()
    const [blob, setBlob] = useState<string>("")
    const [title, setTitle] = useState("")
    const [error, setError] = useState("")
    const { startUpload } = useUploadThing("productImage");

    const formSchema = object({
        title: string("you're password must be atleast 2 characters long and not over 25 characters", [minLength(2), maxLength(20)]),
        file: string("Input file",[minLength(2)]),
    });

    type formData = Output<typeof formSchema>
    
    const handleFiles = (files: File[]) => {
        console.log(files);
        const imageArray = files.map((file) =>{
            return URL.createObjectURL(file as Blob | MediaSource)
        })
        setFile(files[0])
        setBlob(imageArray[0])
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        setError("")
        try{
            parse(formSchema, {title: title, file: blob})
            if(file){
                const uploadedImage = await startUpload([file])
                if(uploadedImage){
                    const newCategory = await createCategory(uploadedImage, title)
                    console.log(newCategory);
                    if(!newCategory){
                        setError("Something went wrong :(")
                    }

                }else{
                    throw new Error("Failed to upload image")
                }
            }

        }catch(err){
            let message = 'Unknown Error'
            if (err instanceof Error) message = err.message
            console.log({message});
            setError(message)
        }
        
    }

  return (
    <form
    className='flex flex-col md:flex-row max-w-[1200px]'
    onSubmit={(e) => handleSubmit(e)}
    >
        <div
        className='md:w-2/4 '
        >
            <label className='flex flex-col'>
                <span>Title</span>
                <input 
                type="text" 
                className='input-field' 
                placeholder='Category'
                value={title}
                onChange={(e) => setTitle(e.currentTarget.value)}
                />
            </label>
            <CustomDropZone handleFiles={handleFiles}/>
            <p
            className='text-red-600 mb-2'
            >
                {error}
            </p>
            <button
            className='secondary-btn w-full'
            >
                Submit
            </button>
        </div>
        <CategoryCard image={blob} title={title} style={"md:w-2/4"}/>
    </form>
  )
}
