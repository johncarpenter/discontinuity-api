import { buttonize } from '@/lib/utils/buttonize'
import Link from 'next/link'
import { useState } from 'react'
import AgentSearch from './AgentSearch'
import { SectionContainer } from './SectionContainer'

export default function CTA1() {
  return (
        <SectionContainer>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-200 sm:text-4xl">
            We build agents that connect the best foundation models{' '}
            <span className="text-secondary-500">with your</span> data and documents.
            <br />
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-800 dark:text-gray-300">
            Our AI agents are a new type of automation tool that uses natural language to analyze
            patterns and take actions. Our AI agents can be customized to suit the specific needs of
            a business and can automate tasks, optimize processes, and ultimately enhance customer
            experience and business performance.
          </p>
          
            
        
          <h3 className="mt-2 ">
            <span className="text-2xl font-bold tracking-tight text-secondary-500">
              This agent was trained with a set of documents about Discontinuity.ai. <br/>Ask it any question about the company! 
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
