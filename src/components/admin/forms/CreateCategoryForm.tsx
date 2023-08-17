"use client"
import Image from 'next/image'
import React, { useState } from 'react'
import Dropzone from 'react-dropzone'
import { BiImageAdd } from 'react-icons/bi'
import CustomDropZone from './CustomDropZone'
import Link from 'next/link'
import { BsFillArrowUpRightSquareFill } from 'react-icons/bs'
import CategoryCard from '../../CategoryCard'

export default function CreateCategoryForm() {
    const [file, setFile] = useState<File>()
    const [blob, setBlob] = useState<string>("")
    const [title, setTitle] = useState("")
    
    const handleFiles = (files: File[]) => {
        console.log(files);
        const imageArray = files.map((file) =>{
            return URL.createObjectURL(file as Blob | MediaSource)
        })
        setFile(files[0])
        setBlob(imageArray[0])
    }

  return (
    <form
    className='flex flex-col md:flex-row max-w-[1200px]'
    >
        <div
        className='md:w-2/4'
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
        </div>
        <CategoryCard image={blob} title={title} style={"w-2/4"}/>
    </form>
  )
}
