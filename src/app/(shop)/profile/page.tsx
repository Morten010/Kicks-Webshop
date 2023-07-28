"use client"
import React, { useEffect, useState } from 'react'
import { signOut, useSession } from "next-auth/react"

const initialUser = {
  email: "",
  firstName: "",
  lastName: "",
  gender: "",
}

export default function Profile() {
  const [user, setUser] = useState(initialUser)
  const { data, status, update } = useSession()

  useEffect(() => {
    if(data && data.user){
      setUser(data.user)
      console.log(data);
      
    }
  }, [data])
  
  return (
    <div
    className='flex flex-col gap-2'
    >
      {/* profile details */}
      {user.email && <div>
        <h1
        className='text-4xl font-semibold'
        >
          Profile
        </h1>

        {/* email */}
        <div
        className='mt-4'
        >
          <h2
          className='font-semibold text-lg'
          >
            Email
          </h2>
          <p>
            {user.email}
          </p>
        </div>

        {/* first name and last name */}
        <div
        className='mt-4 flex capitalize'
        >
          <div
          className='w-1/3'
          >
            <h2
            className='font-semibold text-lg'
            >
              First Name
            </h2>
            <p>
              {user.firstName ? user.firstName : "none found"}
            </p>
          </div>
          <div
          className='w-1/3'
          >
            <h2
            className='font-semibold text-lg'
            >
              Last Name
            </h2>
            <p>
              {user.lastName ? user.lastName : "none found"}
            </p>
          </div>
          <div
          className='w-1/3'
          >
            <h2
            className='font-semibold text-lg'
            >
              gender
            </h2>
            <p>
              {user.gender ? user.gender : "None Found"}
            </p>
          </div>
        </div>

      </div>}
      {/* end of profile details */}

      {/* signout button */}
      <button
      className='secondary-btn mt-4'
      onClick={() => signOut()}
      >
        Sign Out
      </button>
      {/* end of signout button */}
    </div>
  )
}
