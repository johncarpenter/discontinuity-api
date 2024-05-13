import Image from 'next/image'

export default function Hero() {
  return (
    <div className="relative isolate overflow-hidden ">
      <div className="mx-auto max-w-7xl lg:grid lg:grid-cols-12 lg:gap-x-8 lg:px-8">
        <div className="px-6 sm:pb-12 lg:col-span-7 lg:px-0 lg:pb-20 lg:pt-8 xl:col-span-6">
          <span className=" text-secondary-600 uppercase">Not sure about adopting ai?</span>
          <h1 className="mt-10 text-6xl font-bold tracking-normal text-gray-900">
            Accelerating Your AI Journey: Advisory and Training Tailored for Success
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            From ideation to execution, Discontinuity.ai is your partner in demystifying AI adoption
            and unlocking its full potential for your organizations{' '}
          </p>
          <div className="mt-10 flex items-center gap-x-6">
            <a
              href="#contact"
              className="rounded-md bg-gray-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
            >
              Talk to Us
            </a>
          </div>
        </div>
        <div className="relative px-8 py-12 lg:col-span-5 lg:-mr-8 xl:absolute xl:inset-0 xl:left-1/2 xl:mr-0">
          <div className="relative h-full overflow-hidden rounded-3xl bg-gray-900 px-6 pb-12 pt-64 shadow-2xl sm:px-12 lg:max-w-lg lg:px-8 lg:pb-8 xl:px-10 xl:pb-10 ">
            <Image
              priority
              src="/images/hero.png"
              fill
              className="object-cover absolute inset-0 w-full h-full "
              alt="Stylized self-portrait of Van Gogh holding a phone taking a selfie."
            />
          </div>
        </div>
      </div>
    </div>
  )
}
