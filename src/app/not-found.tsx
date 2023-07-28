import { Footer } from '@/src/components'
import Navbar from '@/src/components/nav/Navbar'
import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div 
    className="max-w-screen-xl m-auto w-full py-6 px-4 min-h-screen flex flex-col gap-6"
    >
        <Navbar />
        <div
        className='h-[60vh] grid place-content-center text-center'
        >
            <h2
            className='text-4xl font-semibold text-brand-yellow mb-2'
            >
                Page Not Found
            </h2>
            <p>Could not find requested resource</p>
            <p>
                go back to the <Link 
                href="/"
                className='text-brand-blue underline'
                >
                    Homepage
                </Link>
            </p>

            <p
            className='mt-2 text-sm text-gray-500'
            >
                if the link dosent work, try and refresh the page :)
            </p>
        </div>
        <Footer />
    </div>
  )
}