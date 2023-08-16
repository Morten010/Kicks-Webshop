"use client"

import { signOut } from 'next-auth/react'
import React from 'react'

export default function SignoutButton() {
  return (
    <button
      className='secondary-btn mt-4'
      onClick={() => signOut()}
      >
        Sign Out
      </button>
  )
}
