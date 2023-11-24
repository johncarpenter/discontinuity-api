import Sidebar from '@/app/_components/Sidebar'
import React from 'react'
import { Toaster } from 'react-hot-toast'

type AuthProps = {
  children: React.ReactNode
}

export default function AuthLayout({ children }: AuthProps) {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <nav>
        <Sidebar />
      </nav>
      <main className="lg:pl-72">
        <Toaster />
        <div className="mx-auto px-4 sm:px-6 lg:px-8">{children}</div>
      </main>
    </div>
  )
}
