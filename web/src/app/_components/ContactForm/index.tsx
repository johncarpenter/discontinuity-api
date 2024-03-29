'use client'
import { EnvelopeIcon } from '@heroicons/react/24/outline'
import HubspotContactForm from '../HubspotForm'

export default function ContactForm() {
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
