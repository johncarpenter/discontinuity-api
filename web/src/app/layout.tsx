import type { Metadata } from 'next'
import { Source_Code_Pro, Libre_Franklin, DM_Serif_Display } from 'next/font/google'
import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import { SWRProvider } from '@/lib/client/swr-provider'
import Analytics from '@/components/Analytics'

const source = Source_Code_Pro({
  subsets: ['latin'],
  weight: ['300', '400', '700'],
  variable: '--font-source-code-pro',
})
const libre = Libre_Franklin({
  subsets: ['latin'],
  weight: ['300', '400', '700'],
  variable: '--font-libre-franklin',
})
const serif = DM_Serif_Display({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-dm-serif-display',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://www.discontinuity.ai'),
  title: 'Discontinuity.ai | AI Developers for your AI ideas',
  description: 'AI Developers to build your AI Dreams',
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    title: 'Discontinuity.ai | AI Developers for your AI ideas',
    description: 'AI Developers to build your AI Dreams',
    images: [
      {
        url: '/images/grove.png',
        width: 1024,
        height: 1024,
        alt: 'Discontinuity.ai | AI Developers for your AI ideas',
      },
    ],
  },
  manifest: '/manifest.json',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <SWRProvider>
      <ClerkProvider>
        <html lang="en">
          <body className={`${source.variable} ${libre.variable} ${serif.variable}`}>
            {process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID && <Analytics />}
            {children}
          </body>
        </html>
      </ClerkProvider>
    </SWRProvider>
  )
}
