'use client'
import { EnvelopeIcon } from '@heroicons/react/24/outline'
import React, { useState } from 'react'
import { event } from '@/lib/client/gtag'
import HubspotContactForm from '../HubspotForm'

export default function ContactForm() {
  const [enabled, setEnabled] = useState(true)
  const [message, setMessage] = useState('')
  const [state, setState] = useState({
    first: '',
    last: '',
    email: '',
    company: '',
    message: '',
  })

  const handleChange = (e: { target: any }) => {
    const target = e.target
    const value = target.value
    const name = target.name

    setState({ ...state, [name]: value })
  }

  const submit = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    setEnabled(false)
    const res = await fetch(`/api/contact`, {
      body: JSON.stringify({
        email: state.email,
        first: state.first,
        last: state.last,
        company: state.company,
        message: state.message,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    })

    const { error } = await res.json()
    if (error) {
      setMessage('We are Sorry Something Went Wrong. Please contact us at hello@discontinuity.ai')
      return
    }
    event('generate_lead', { currency: 'CAD', value: 50 })

    setMessage('Thanks. One of our team will be in touch soon!')
  }

  return (
    <>
      <div className="mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-2 ">
        <div className="relative px-6 pb-10 pt-4 sm:pt-14 lg:static lg:px-8 lg:py-4">
          <div className="mx-auto max-w-4xl lg:mx-0 lg:max-w-lg">
            <div className="flex flex-col space-y-5">
              <span className="text-secondary-600 uppercase">
                Ready to Transform Your Organization with AI?
              </span>
              <h2 className="text-4xl font-bold ">
                <span className="block">Book Your Free Consultation</span>
              </h2>
              <p className=" mt-5 text-gray-600">
                Let's discuss how we can tailor our advisory and training services to meet your
                unique needs. Book a free consultation today.
              </p>
            </div>

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
        <div className="mt-16">
          <HubspotContactForm
            region="na1"
            portalId="45671738"
            formId="a0329af6-d716-4d8b-b082-76f879ba5b8d"
          />
        </div>
      </div>
    </>
  )
}
