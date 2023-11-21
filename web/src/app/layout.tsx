import type { Metadata } from 'next'
import { Source_Code_Pro, Libre_Franklin } from 'next/font/google'
import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'

const inter = Source_Code_Pro({
  subsets: ['latin'],
  weight: ['300', '400', '700'],
  variable: '--font-source-code-pro',
})
const poppins = Libre_Franklin({
  subsets: ['latin'],
  weight: ['300', '400', '700'],
  variable: '--font-libre-franklin',
})

export const metadata: Metadata = {
  title: 'Discontinuity.ai | Rapid AI for your Business',
  description: 'Rapid product development for your business using AI',
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.variable} ${poppins.variable}`}>{children}</body>
      </html>
    </ClerkProvider>
  )
}
