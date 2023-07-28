import React from 'react'
import ReactDOM from "react-dom"
import {CgClose} from "react-icons/cg"

type ModalProps = {
    children: React.ReactNode;
    handleClose: () => void;
    handleCancel?: () => void;
    handleConfirm?: () => void;
}

export default function Modal({children, handleClose, handleConfirm, handleCancel}: ModalProps) {
  return ReactDOM.createPortal((
    // modal background
    <div
    className='w-full h-full bg-[rgba(221,221,221,0.3)] absolute top-0 grid place-content-center'
    >
        {/* modal */}
        <div
        className='bg-white rounded-lg min-w-[100px] min-h-[50px] relative p-4 flex flex-col gap-2'
        >
            {/* close button */}
            <button
            className='absolute top-3 right-3 text-2xl'
            onClick={() => handleClose()}
            >
                <CgClose />
            </button>
            {children}

            {/* cancel and confirm button */}
            <div
            className='flex gap-2'
            >
                {handleCancel && <button
                className='ghost-btn'
                onClick={() => handleCancel()}
                >
                    Cancel
                </button>}
                {handleConfirm && <button
                className='danger-btn'
                onClick={() => handleConfirm()}
                >
                    Delete
                </button>}
            </div>

        </div>
    </div>
  ), document.body)
}
