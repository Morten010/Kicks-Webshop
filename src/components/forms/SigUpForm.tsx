"use client"
import createUser from '@/src/lib/functions/createUser'
import { validate } from '@/src/lib/functions/validate'
import Link from 'next/link'
import React, {useState} from 'react'
import { BsArrowRightShort } from 'react-icons/bs'


export default function SigUpForm() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [gender, setGender] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [msg, setMsg] = useState({
        "msg": "",
        status: false
    })
    

    // error handling
    const [errors, setErrors] = useState({
        firstName: "",
        lastName: "",
        gender: "",
        email: "",
        password: "",
    })

  // handle submit
  const handleSubmit = async (e: any) => {
    e.preventDefault()

    // create user object
    const user = {
      firstName,
      lastName,
      gender,
      email,
      password
    }

    //validate user
    const result = await validate(user)
    setErrors(result)

    //checks if everything is fille out
    if(!result.email && !result.firstName && !result.gender && !result.lastName && !result.password){
      const result = await createUser(user)
      
      setMsg(result)
    }

  }

    // handle gender change   
  const onGenderChange = (e: React.ChangeEvent<any>) => {
    setGender(e.target.value)
  }

  return (
    <form
        className='flex flex-col gap-3 mt-3'
        >
          {/* first name */}
          <h2
          className='text-xl font-semibold'
          >
            Your Name
          </h2>
          <label>
            <span className='hidden'>First Name</span>
            <input
            type="text"
            placeholder='First Name'
            className={`bg-transparent border border-brand-black rounded-md p-2 w-full ${errors.firstName ? "border-red-600 focus:outline-red-600" : ""}`}
            onChange={(e) => setFirstName(e.target.value)}

            value={firstName}
            />
            {errors.firstName && (
              <p
              key={errors.firstName}
              className='text-red-600 '
              >
                {errors.firstName}
              </p>
            )}
          </label>
          {/* last name */}
          <label>
            <span className='hidden'>Last Name</span>
            <input
            type="text"
            placeholder='Last Name'
            className={`bg-transparent border border-brand-black rounded-md p-2 w-full ${errors.lastName ? "border-red-600 focus:outline-red-600" : ""}`}
            onChange={(e) => setLastName(e.target.value)}
            value={lastName}
            />
            {errors.lastName && (
              <p
              className='text-red-600 '
              >
                {errors.lastName}
              </p>
            )}
          </label>


          <h2
          className='text-xl font-semibold'
          >
            Gender
          </h2>
          <div
          className='flex gap-4'
          >
            <label
            className={`flex gap-1 ${errors.gender ? "text-red-600" : ""}`}
            >
              <input
              type="radio"
              name='gender'
              value="male"
              checked={gender === "male"}
              onChange={onGenderChange}
              />
              <span>Male</span>
            </label>

            <label
            className={`flex gap-1 ${errors.gender ? "text-red-600" : ""}`}
            >
              <input
              type="radio"
              name='gender'
              value="female"
              checked={gender === "female"}
              onChange={onGenderChange}
              />
              <span>Female</span>
            </label>

            <label
            className={`flex gap-1 ${errors.gender ? "text-red-600" : ""}`}
            >
              <input
              type="radio"
              name='gender'
              value="other"
              checked={gender === "other"}
              onChange={onGenderChange}
              />
              <span>Other</span>
            </label>
          </div>
          {errors.gender && (
              <p
              className='text-red-600 '
              >
                {errors.gender}
              </p>
            )}

          <h2
          className='text-xl font-semibold'
          >
            Log In Details
          </h2>

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
            type="password"
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


        <button
        className='secondary-btn flex justify-between items-center'
        onClick={(e) => handleSubmit(e)}
        >
            CREATE ACCOUNT
            <BsArrowRightShort
            className='text-2xl'
            />
        </button>
        
        {/* error message */}
        {msg.msg && <p
        className={msg.status ? "text-green-500" : "text-red-600"}
        >
            {msg.msg} {msg.status && <Link
              href="/auth/signin"
              className='underline'
              >
                go to login page.
              </Link>
            }
        </p>}
        {/* end of error message */}

          <p
          className='text-sm'
          >
            By clicking 'Email login' you agree to our website KicksClub <Link href="/" className='underline'>Terms & Conditions</Link>, <Link href="/" className='underline'>Kicks Privacy</Link> <Link href="/" className='underline'>Notice and Terms & Conditions.</Link>
          </p>
          <Link
          href="/auth/signin"
          className='underline text-sm'
          >
            Already have an account?
          </Link>
    </form>
  )
}
