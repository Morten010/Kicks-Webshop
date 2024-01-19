import Link from 'next/link'
import React from 'react'

// styling 
import {BsArrowRightShort} from "react-icons/bs"
import LoginForm from '@/src/components/forms/LoginForm'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/src/lib/db/authOptions'
import { redirect } from 'next/navigation'


export default async function SignIn() {
  const session = await getServerSession(authOptions)
  // if user is signed in redirect to home
  if(session){
    redirect("/")
  }

  return (
    <div
    className='w-full flex flex-col sm:flex-row gap-4'
    >

      {/* login */}
      <div
      className='w-full sm:w-2/4 flex flex-col justify-center'
      >
          <h1
          className='text-3xl font-semibold mb-1'
          >
            Login
          </h1>
          <Link 
          href="/"
          className='underline'
          >
            Forgot your Password?
          </Link>

        <LoginForm redirect={"/"} />

      </div>
      {/* end of login */}

      {/* club signup */}
      <div
      className='w-full sm:w-2/4 p-4 bg-white rounded-2xl'
      >
        <h2
        className='text-2xl font-semibold'
        >
          Join  Kicks Club Get Rewarded Today.
        </h2>

        <p
        className='mt-2'
        >
          As kicks club member you get rewarded with what you love for doing what you love. Sign up today and receive immediate access to these Level 1 benefits:
        </p>

        <ul
        className='list-disc list-inside mt-3'
        >
          <li>
            Free shipping​
          </li>
          <li>
            A 15% off voucher for your next purchase​
          </li>
          <li>
            Access to Members Only products and sales​
          </li>
          <li>
            Access to adidas Running and Training apps​
          </li>
          <li>
            Special offers and promotions​
          </li>
        </ul>

        <p
        className='my-4'
        >
          Join now to start earning points, reach new levels and unlock more rewards and benefits from adiClub.​
        </p>

        <p
        className='secondary-btn flex justify-between items-center uppercase mt-8'
        >
          Join the club
          <BsArrowRightShort 
          className='text-2xl'
          />
        </p>
      </div>
      {/* end of club signup */}

    </div>
  )
}
