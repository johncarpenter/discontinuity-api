import Image from 'next/image'

export default function MarketingHero() {
  return (
    <div className="relative isolate px-6 pt-4 lg:px-8">
      <div className="mx-auto max-w-4xl ">
        <div className="text-center">
          <div className="flex items-center justify-center gap-x-2">
            <h1 className="mt-10 pb-10 text-6xl font-bold tracking-normal text-gray-900">
              Jump start company-wide AI initiatives faster with the Bridge platform.
            </h1>
          </div>
          <div className="flex items-center justify-center gap-x-2">
            <Image src="/images/bridge_logo_full.png" width={300} height={120} alt="Bridge Logo" />
            {/* <p className="pb-2 text-4xl font-bold tracking-tight  sm:text-6xl bg-gradient-to-r from-sky-800 to-orange-400 via-sky-700  bg-clip-text text-transparent">
              Bridge
            </p> */}
          </div>

          <p className="mt-6 text-lg leading-8 text-gray-600">
            Bridge is a web-based platform with a full suite of tools for building, deploying, and
            managing AI workflows, agents, and models. It is designed to be easy to use and flexible
            enough to meet the needs of any organization.
          </p>
        </div>
      </div>
      <div
        className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
        aria-hidden="true"
      >
        <div
          className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-secondary-100 to-secondary-300 opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>
    </div>
  )
}
