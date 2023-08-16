import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function Footer() {
  return (
    <div 
    className='flex flex-col'
    >
        <footer 
        className='bg-brand-black rounded-2xl mb-10 overflow-hidden'
        >
            {/* top footer */}
            <section className="bg-brand-blue text-white flex flex-col md:flex-row px-4 py-8 sm:py-10 md:py-16 rounded-t-xl  ">
                <div
                className='md:w-[50%]'
                >
                    <h2
                    className='text-3xl mb-2 md:mb-4 font-semibold'
                    >
                        Join our KicksPlus Club & get 15% off
                    </h2>
                    <p
                    className='mb-2'
                    >
                        Sign up for free! Join the community.
                    </p>
                    <form
                    className='flex items-center gap-2 mt-3 md:mt-5'
                    >
                        <input type="text" 
                        className='p-2 bg-transparent border border-white rounded h-auto'
                        placeholder='Email address'
                        />
                        <button
                        className='secondary-btn'
                        >
                            SUBMIT
                        </button>
                    </form>
                </div>
                <div
                className='md:w-[50%] grid md:place-content-center mt-6 md: mt-0'
                >
                    <Image 
                    src="/white-logo-plus.svg"
                    width={367}
                    height={112}
                    alt='White kick logo with plus'
                    />
                </div>
            </section>
            {/* end of top footer */}

            {/* bottom footer */}
            <section
            className='text-white p-4 sm:grid sm:grid-cols-2 sm:gap-4 md:grid-cols-3 lg:grid-cols-4'
            >
                <div>
                    <h2
                    className='text-brand-yellow text-2xl font-semibold mb-2'
                    >
                        About us
                    </h2>
                    <p>
                        We are the biggest hyperstore in the universe. We got you all covered with our exclusive collections and latest drops.
                    </p>
                </div>

                <div className='hidden lg:inline-block'></div>
                
                <div>
                    <h2
                    className='text-brand-yellow text-2xl font-semibold mb-2'
                    >
                        Categories
                    </h2>
                    <ul>
                        <li>
                            <Link 
                            href="/"
                            className=' transition-opacity  hover:opacity-80'
                            >
                                Runners
                            </Link>
                        </li>
                        <li>
                            <Link 
                            href="/"
                            className=' transition-opacity  hover:opacity-80'
                            >
                                Sneakers
                            </Link>
                        </li>
                        <li>
                            <Link 
                            href="/"
                            className=' transition-opacity  hover:opacity-80'
                            >
                                Basketball
                            </Link>
                        </li>
                        <li>
                            <Link 
                            href="/"
                            className=' transition-opacity  hover:opacity-80'
                            >
                                Outdoor
                            </Link>
                        </li>
                        <li>
                            <Link 
                            href="/"
                            className=' transition-opacity  hover:opacity-80'
                            >
                                Golf
                            </Link>
                        </li>
                        <li>
                            <Link 
                            href="/"
                            className=' transition-opacity  hover:opacity-80'
                            >
                                Hiking
                            </Link>
                        </li>
                    </ul>
                </div>

                <div>
                    <h2
                    className='text-brand-yellow text-2xl font-semibold mb-2'
                    >
                        Company
                    </h2>
                    <ul>
                        <li>
                            <Link 
                            href="/company/about"
                            className=' transition-opacity  hover:opacity-80'
                            >
                                About
                            </Link>
                        </li>
                        <li>
                            <Link 
                            href="/"
                            className=' transition-opacity  hover:opacity-80'
                            >
                                Contact
                            </Link>
                        </li>
                        <li>
                            <Link 
                            href="/"
                            className=' transition-opacity  hover:opacity-80'
                            >
                                Blogs
                            </Link>
                        </li>
                    </ul>
                </div>
            </section>
            {/* end of bottom footer */}

            {/* kicks logo bottom */}
            <div
            className='rounded-b-2xl px-2'
            >
                <div
                className='relative md:h-[25vh] lg:h-[33vh] w-full'
                >
                    <div
                    className='w-full relative aspect-[1262/313.662]'
                    >
                        <Image 
                        src="/white-logo.svg"
                        fill
                        alt='White kick logo'
                        className='w-full object-fill'
                        />
                    </div>
                </div>
            </div>
            {/* kicks logo bottom */}

        </footer>

        <p
        className='text-center'
        >
            © All rights reserved | Design Made with ❤️ by <Link 
            href="https://visiata.com/"
            className='text-brand-blue font-bold'
            >Visiata Systems International</Link>
        </p>
    </div>
  )
}
