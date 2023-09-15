import { BuildingOffice2Icon, EnvelopeIcon, PhoneIcon } from '@heroicons/react/24/outline'
import { SectionContainer } from './SectionContainer'
import React, { useRef, useState } from 'react'

export default function ContactForm() {

    const [error, setError] = useState(false)
    const [message, setMessage] = useState('')
    const [state, setState] = useState({first:"", last:"", email:"", company:"", message:""})
  

    const handleChange = (e: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => {
        const target = e.target;
        const value = target.value;
        const name = target.name;

        setState({...state,
            [name]: value
        });
    }

    const submit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
  
      const res = await fetch(`/api/hubspot`, {
        body: JSON.stringify({
            email: state.email,
            first: state.first,
            last: state.last,
            company: state.company,
            message: state.message
        }),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      })
  
      const { error } = await res.json()
      if (error) {
        setError(true)
        setMessage('We are Sorry Something Went Wrong. Please contact us at hello@discontinuity.ai')
        return
      }
  
      setError(false)
      setMessage('Thanks. One of our team will be in touch soon!')
    }


  return (
    <SectionContainer>
      <div className="mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-2 ">
        <div className="relative px-6 pb-10 pt-4 sm:pt-14 lg:static lg:px-8 lg:py-4">
          <div className="mx-auto max-w-4xl lg:mx-0 lg:max-w-lg">
            <h2 className="text-3xl font-bold tracking-tight text-secondary-600">Build Something Today</h2>
            <p className="mt-6 text-lg leading-8 text-gray-800 dark:text-gray-300">
              We'd love to hear more about your projects and how we can help. Fill out the form below
              and we'll contact you as soon as possible. 
            </p>
            <dl className="mt-10 space-y-4 text-base leading-7 text-gray-800 dark:text-gray-300">
              <div className="flex gap-x-4">
                <dt className="flex-none">
                  <span className="sr-only">Email</span>
                  <EnvelopeIcon className="h-7 w-6 text-gray-400" aria-hidden="true" />
                </dt>
                <dd>
                  <a className="hover:text-gray-900" href="mailto:hello@discontinuity.ai">
                    hello@discontinuity.ai
                  </a>
                </dd>
              </div>
            </dl>
          </div>
        </div>
        <form onSubmit={submit} method="POST" className="px-6 pb-10 pt-10 sm:pb-14 lg:px-8 lg:py-12">
          <div className="mx-auto max-w-xl lg:mr-0 lg:max-w-lg">
            <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
              <div>
                <label htmlFor="first-name" className="block text-sm font-semibold leading-6 text-gray-800 dark:text-gray-300">
                  First name
                </label>
                <div className="mt-2.5">
                  <input
                    type="text"
                    name="first"
                    id="first-name"
                    autoComplete="given-name"
                    onChange={handleChange}
                    value={state.first}
                    className="dark:bg-slate-700/80 bg-slate-100/80 block w-full rounded-md border-0 px-3.5 py-2 text-gray-800 dark:text-gray-300 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="last-name" className="block text-sm font-semibold leading-6 text-gray-800 dark:text-gray-300">
                  Last name
                </label>
                <div className="mt-2.5">
                  <input
                    type="text"
                    name="last"
                    id="last-name"
                    autoComplete="family-name"
                    onChange={handleChange}
                    value={state.last}
                    className="dark:bg-slate-700/80 bg-slate-100/80 block w-full rounded-md border-0 px-3.5 py-2 text-gray-800 dark:text-gray-300 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="email" className="block text-sm font-semibold leading-6 text-gray-800 dark:text-gray-300">
                  Email
                </label>
                <div className="mt-2.5">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    autoComplete="email"
                    required
                    onChange={handleChange}
                    value={state.email}
                    className="dark:bg-slate-700/80 bg-slate-100/80 block w-full rounded-md border-0 px-3.5 py-2 text-gray-800 dark:text-gray-300 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="company" className="block text-sm font-semibold leading-6 ttext-gray-800 dark:text-gray-300">
                  Company
                </label>
                <div className="mt-2.5">
                  <input
                    type="text"
                    name="company"
                    id="company"
                    autoComplete="company"
                    onChange={handleChange}
                    value={state.company}
                    className="dark:bg-slate-700/80 bg-slate-100/80 block w-full rounded-md border-0 px-3.5 py-2 text-gray-800 dark:text-gray-300 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="message" className="block text-sm font-semibold leading-6 text-gray-800 dark:text-gray-300">
                  Message
                </label>
                <div className="mt-2.5">
                  <textarea
                    name="message"
                    id="message"
                    rows={4}
                    value={state.message}
                    onChange={handleChange}
                    className="dark:bg-slate-700/80 bg-slate-100/80 block w-full rounded-md border-0 px-3.5 py-2 text-gray-800 dark:text-gray-300 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                 
                  />
                </div>
              </div>
            </div>
            <div className="mt-8 flex justify-end">
              <button
                type="submit"
                className="rounded-md bg-primary-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Contact Enterprise Sales
              </button>
            </div>
            <p className="mt-6 text-lg leading-8 text-gray-800 dark:text-gray-300">
              {message}
            </p>
          </div>
        </form>
      </div>
    </SectionContainer>
  )
}
