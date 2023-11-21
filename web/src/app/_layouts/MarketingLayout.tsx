import React from 'react'
import NavBar from '@/components/NavBar'
import Footer from '@/components/Footer'

type MarketingLayoutProps = {
  children: React.ReactNode
}

export default function MarketingLayout({ children }: MarketingLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <header>
        <NavBar />
      </header>
      <main>
        <div className="mx-auto">{children}</div>
      </main>
      <footer className="mt-auto">
        <Footer />
      </footer>
    </div>
  )
}
