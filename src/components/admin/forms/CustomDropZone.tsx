import React from 'react'
import Dropzone from 'react-dropzone'
import { BiImageAdd } from 'react-icons/bi'

export default function CustomDropZone({handleFiles}: {
    handleFiles: (acceptedFiles: File[]) => void
}) {
  return (
    <Dropzone onDrop={(acceptedFiles: File[]) => handleFiles(acceptedFiles)}>
        {({getRootProps, getInputProps}) => (
            <section className='p-2 rounded-lg w-full border-gray-500 border-dashed border-2 mb-4 mt-3 cursor-pointer'>
            <div 
            {...getRootProps()}
            className='w-full h-full grid place-content-center text-center text-gray-500 p-4'
            >
                <input {...getInputProps()} />
                <BiImageAdd
                className='text-5xl mx-auto text-brand-blue'
                />
                <p>Drag 'n' drop some files here, or click to select files</p>
            </div>
            </section>
        )}
    </Dropzone>
  )
}
