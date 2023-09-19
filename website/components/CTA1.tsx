import { buttonize } from '@/lib/utils/buttonize'
import Link from 'next/link'
import { useState } from 'react'
import AgentSearch from './AgentSearch'
import { SectionContainer } from './SectionContainer'

export default function CTA1() {
  return (
    <SectionContainer>
      <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-200 sm:text-4xl">
        Putting AI to work for your organization...{' '}
        <span className="text-secondary-500">with your data.</span>
        <br />
      </h2>
      <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-800 dark:text-gray-300">
        AI can be a powerful tool for your organization. We build custom AI solutions that help
        optimize your business processes, engage with your customers, and make better decisions.
        It's easier than you think.
      </p>

      <h3 className="mt-2 ">
        <span className="text-2xl font-bold tracking-tight text-secondary-500">
          Discontinuity.ai has the structure to build, host and manage your AI projects natively.
          <br />
          Ask it any question about the company!
        </span>
      </h3>
      <h3 className="mt-2">
        <Link href="/demo/discontinuity-website-semantic-search">
          <span role="button" className="text-2xl font-bold tracking-tight text-primary-500">
            &lt;read more about this agent here&gt;
          </span>
        </Link>
      </h3>

      <div className="mt-5 flex items-center justify-center gap-x-6">
        <AgentSearch />
      </div>
    </SectionContainer>
  )
}
