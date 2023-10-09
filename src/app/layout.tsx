import './globals.css'
import type { Metadata } from 'next'
import Provider from '@/src/context/provider'
import { Rubik } from 'next/font/google'

const rubik = Rubik({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL("https://kicks-webshop.vercel.app/"),
  title: {
    default: 'Kicks',
    template: `Kicks | %s`
  },
  description: "Discover trendy footwear at Kicks! Shop top brands like Nike, Adidas, and Puma for style and performance. Elevate your look with our curated collection of sneakers and classics. Unbeatable style and comfort, delivered to your door!",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`bg-grayish ${rubik.className}`}>
        <Provider>
          {children}
        </Provider>
      </body>
    </html>
  )
}
