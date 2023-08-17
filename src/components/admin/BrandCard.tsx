"use client"
import deleteCategory from '@/src/lib/functions/brand/deleteCategory';
import React, { useState } from 'react'
import { BiChevronDown, BiChevronUp } from 'react-icons/bi';
import Modal from '../Modal';
import { toast } from 'react-toastify';

type itemProps = {
   item: {
        id: number;
        name: string | null;
        desc: string | null;
   },
}

export default function BrandCard({item}: itemProps ) {
    const [hidden, setHidden] = useState(false)
    const [showMore, setShowMore] = useState(false)
    const [showModal, setShowModal] = useState(false)

    const handleDelete = async () => {
        await deleteCategory(item.id) 
        toast.success("Category was deleted")
        setShowModal(false)
        setHidden(true)
    }
    
    const closeModal = () => {
        setShowModal(false)
    }

  return (
    <div
    key={item.name}
    className={`p-4 border rounded-lg bg-white flex flex-col gap-4 mb-auto ${hidden ? "hidden" : ""}`}
    >
        <h2
        className='text-2xl font-semibold'
        >
            {item.name}
        </h2>
        <p>
            {showMore ? item.desc : item.desc?.slice(0,100)}
            <br />
        </p>

        <span
        className='flex items-center gap-2 cursor-pointer text-sm hover:opacity-70'
        onClick={() => setShowMore(!showMore)}
        >
            Show More {showMore ? <BiChevronUp className='text-lg'/> : <BiChevronDown className='text-lg'/>}
        </span>

        <button
        className='danger-btn mt-auto'
        onClick={() => setShowModal(true)}
        >
            Delete Category
        </button>
        {showModal && <Modal
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
                Are you sure you wanna delete this category?
            </p>
        </Modal>}
    </div>
  )
}
