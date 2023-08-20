"use client"
import { loginValidation } from '@/src/lib/functions/loginValidation'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { BsArrowRightShort } from 'react-icons/bs'


type LoginFormProps = {
  redirect?: string | null
}

export default function LoginForm({redirect = null}: LoginFormProps ) {
  const router = useRouter()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errors, setErrors] = useState({
    email: "",
    password: ""
  })
  const [loading, setloading] = useState(false)
  const [msg, setMsg] = useState("")

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    //set loading true 
    setloading(true)
    //reset errors and msg
    setErrors({
      email: "",
      password: "",
    })
    setMsg("")
    
    //validate login
    const res = await loginValidation({
      email,
      password
    })
    
    //if email and password erros exist add them to state
    if(res.email && res.password){
      setErrors(res)
      setloading(false)
      return
    } 
    console.log(redirect);
    
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    })
    
    //if log in failed update error msg
    if(result?.error){
      setMsg("Incorrect username or password")
    }
    console.log(result);
    
    if(!result?.error){
      if(redirect){
        router.push(redirect)
      }else{
        router.push("/")
      }
    }

    setloading(false)
  }
  return (
    <form
    className='flex flex-col gap-4 mt-3'
    >
      <label>
        <span className='hidden'>Email</span>
        <input 
        type="text" 
        placeholder='Email'
        className={`bg-transparent border border-brand-black rounded-md p-2 w-full ${errors.email ? "border-red-600 focus:outline-red-600" : ""}`}
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        />
        {errors.email && (
          <p
          className='text-red-600 '
          >
            {errors.email}
          </p>
        )}
      </label>
      <label>
        <span className='hidden'>Password</span>
        <input 
        type="text" 
        placeholder='Password'
        className={`bg-transparent border border-brand-black rounded-md p-2 w-full ${errors.password ? "border-red-600 focus:outline-red-600" : ""}`}
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        />
        {errors.password && (
          <p
          className='text-red-600 '
          >
            {errors.password}
          </p>
        )}
      </label>

      {/* buttons */}
      {!loading && <button
      className='secondary-btn flex justify-between items-center'
      onClick={handleSubmit}
      >
        EMAIL LOGIN
        <BsArrowRightShort 
        className='text-2xl'
        />
      </button>}

      {loading && <button
      className='secondary-btn flex justify-between items-center opacity-60 hover:opacity-60'
      disabled
      >
        EMAIL LOGIN
        <BsArrowRightShort 
        className='text-2xl'
        />
      </button>}
      {/* end of buttons */}

      {/* error message */}
      {msg && <p
      className="text-red-600"
      >
          {msg}
      </p>}
      {/* end of error message */}

      <p
      className='text-sm'
      >
        By clicking 'Log In' you agree to our website KicksClub <Link href="/" className='underline'>Terms & Conditions</Link>, <Link href="/" className='underline'>Kicks Privacy</Link> <Link href="/" className='underline'>Notice and Terms & Conditions.</Link>
      </p>
      <Link 
      href="/auth/signup"
      className='underline text-sm'
      >
        Wanna Create an account?
      </Link>
    </form>
  )
}
