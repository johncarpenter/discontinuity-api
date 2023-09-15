import { ChevronRightIcon } from '@heroicons/react/20/solid'
import Image from 'next/image'

export default function Hero() {
  return (
    <div className="relative isolate overflow-hidden ">
      <div className="mx-auto max-w-7xl lg:grid lg:grid-cols-12 lg:gap-x-8 lg:px-8">
        <div className="px-6 pb-10 sm:pb-12 lg:col-span-7 lg:px-0 lg:pb-20 lg:pt-8 xl:col-span-6">
          <div className="mx-auto max-w-2xl lg:mx-0">
 
          <h1 className="mt-10 text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-200 sm:text-6xl">
          <span className="text-secondary-500">Artificial Intelligence</span> will Transform the Workplace. 
          </h1>
          <p className="mt-6 text-lg leading-8 text-grey-700 dark:text-gray-300">
            Are You Prepared for the Coming Shift? We build the tools to help you get there.
          </p>
          <div className="mt-10 flex items-center gap-x-6">
            <a
              href="#contact"
              className="rounded-md dark:bg-primary-700/90 bg-primary-400/90 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-400"
            >
              Get started
            </a>
            <a href="/demo" className="text-sm font-semibold leading-6 text-white">
              Learn more <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
        </div>
        <div className="relative lg:col-span-5 lg:-mr-8 xl:absolute xl:inset-0 xl:left-1/2 xl:mr-0">
          <Image
            className="aspect-[3/2] w-full object-cover object-top lg:absolute lg:inset-0 lg:aspect-auto lg:h-full  rounded-xl"
            src="/static/images/image_4.png"
            alt=""
            layout="fill"
          />
        </div>

      </div>
    </div>
  )
}
