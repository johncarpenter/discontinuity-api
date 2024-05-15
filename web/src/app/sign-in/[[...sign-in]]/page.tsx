import ContactFormBeta from '@/app/_components/Home/Contact'
import MarketingLayout from '@/app/_layouts/MarketingLayout'
import { SignIn } from '@clerk/nextjs'
import { EnvelopeIcon } from '@heroicons/react/24/outline'

export default function Page() {
  return (
    <>
      <MarketingLayout>
        <div className="mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-2 ">
          <div className="mt-6 ml-6">
            <SignIn
              redirectUrl={'/app'}
              appearance={{
                baseTheme: undefined,
                elements: {
                  footer: {
                    display: 'none',
                  },
                },
              }}
            />
          </div>
          <div className="relative px-6  pt-4 sm:pt-14 lg:static lg:px-8 lg:py-4">
            <div className="mx-auto max-w-4xl lg:mx-0 lg:max-w-lg ">
              <div className="flex flex-col space-y-5">
                <h2 className="text-4xl font-bold ">
                  <span className="block">Log into your Bridge Dashboard</span>
                </h2>
                <p className=" mt-5 text-gray-600">
                  Beta access is limited to select customers. If you are having problems logging in
                  contact us at;
                </p>
              </div>

              <dl className="lg:mt-10 space-y-4 text-base leading-7 text-gray-800 dark:text-gray-300">
                <div className="flex gap-x-4">
                  <dt className="flex-none">
                    <span className="sr-only">Email</span>
                    <EnvelopeIcon className="h-7 w-6 text-gray-400" aria-hidden="true" />
                  </dt>
                  <dd>
                    <a className="hover:text-gray-900" href="mailto:hello@discontinuity.ai">
                      support@discontinuity.ai
                    </a>
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
        <ContactFormBeta />
      </MarketingLayout>
    </>
  )
}
