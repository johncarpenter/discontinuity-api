import { ReactNode } from 'react'

interface Props {
    children: ReactNode
  }

export const SectionContainer = ({ children }: Props) => {
  return (
    <div className="w-full relative isolate overflow-hidden dark:bg-slate-800/80 bg-slate-200/80 rounded-xl">
      <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
            {children}
        </div>
      </div>
    </div>
  )
}
