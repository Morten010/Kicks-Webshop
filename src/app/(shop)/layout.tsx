import Navbar from '@/src/components/nav/Navbar'
import '../globals.css'
import type { Metadata } from 'next'
import { Rubik } from 'next/font/google'
import Footer from '@/src/components/Footer'
import { ToastContainer } from 'react-toastify'

const rubik = Rubik({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`bg-grayish ${rubik.className}`}>
          <div 
          className="max-w-screen-xl m-auto w-full py-6 px-4 min-h-screen flex flex-col gap-6"
          >
            <Navbar />
            {children}
            <Footer />
            <ToastContainer />
          </div>
      </body>
    </html>
  )
}
