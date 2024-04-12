"use client"
import React, { useState } from 'react'
import CustomDropZone from './CustomDropZone'
import CategoryCard from '../../CategoryCard'

import { minLength, object, type Output, parse, string, maxLength} from 'valibot'; 
import { useUploadThing } from '@/src/app/utils/uploadthing';
import { toast } from 'react-toastify';
import createCategory from '@/src/lib/functions/createCategory';

export default function CreateCategoryForm() {
    const [file, setFile] = useState<File>()
    const [blob, setBlob] = useState<string>("")
    const [title, setTitle] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const { startUpload, permittedFileInfo } = useUploadThing("productImage");
    
    const formSchema = object({
        title: string("you're password must be atleast 2 characters long and not over 25 characters", [minLength(2), maxLength(20)]),
        file: string("Input file",[minLength(2)]),
    });

    type formData = Output<typeof formSchema>
    
    const handleFiles = (files: File[]) => {
        //check file size
        setError("")
        if(files[0].size > 4000000){
            setError("File is to big.")
            return
        }
        //make file:blob
        const imageArray = files.map((file) =>{
            return URL.createObjectURL(file as Blob | MediaSource)
        })
        setFile(files[0])
        setBlob(imageArray[0])
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        setLoading(false)
        setError("")
        try{
            parse(formSchema, {title: title, file: blob})
            const uploadedImage = await startUpload([file!])
            if(uploadedImage){
                const newCategory = await createCategory(uploadedImage, title)
                if(!newCategory){
                    setLoading(false)
                    setError("Something went wrong :(")
                }
                toast.success("Category was added!!!")
            }else{
                setLoading(false)
                throw new Error("Failed to upload image: forst")
            }
        }catch(err){
            let message = 'Unknown Error'
            if (err instanceof Error) message = err.message
            setError(message)
            setLoading(false)
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
            {!loading ? <button
            className='secondary-btn w-full'
            >
                Submit
            </button> : <button
            className='secondary-btn w-full opacity-60'
            disabled
            >
                Submit
            </button>}
        </div>
        <CategoryCard image={blob} title={title} style={"md:w-2/4"}/>
    </form>
  )
}
