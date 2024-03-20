import Image from 'next/image'
const Features = () => {
  return (
    <div className="py-16 sm:py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="relative flex flex-col space-y-5">
          <div className="flex flex-col  space-y-5">
            <span className=" text-secondary-600 uppercase">Getting Started</span>
            <h2 className="text-4xl font-bold ">
              <span className="block">Bringing your AI concept to life has never been easier.</span>
            </h2>
            <p className="text-xl  text-gray-600">
              AI can transform your business, but doing it correctly can be challenging. We&apos;ll
              walk you through the strategy and tactics to help you springboard your AI programs
              your ideas.{' '}
            </p>
          </div>

          <div className="flex flex-col py-10 space-x-0 space-y-10 md:space-y-0 md:space-x-5 md:flex-row">
            <div className="px-5 space-y-3 md:w-1/3">
              <a href={'/advisory'}>
                <div className="flex flex-col items-center justify-start">
                  <div className="flex items-center justify-center w-48 h-48 rounded-lg">
                    <Image
                      priority
                      src="/images/rapid_prototyping.png"
                      className="rounded-lg"
                      width={200}
                      height={200}
                      alt="A group of artists gathered around a statue arguing over the design"
                    />
                  </div>
                  <h3 className="text-lg font-bold">AI Strategic Advisory</h3>
                  <p className="text-center text-gray-600">
                    Forge a clear path to AI integration with tailored strategic advice from our
                    experts.
                  </p>
                </div>
              </a>
            </div>

            <div className="px-5 space-y-3 md:w-1/3">
              <a href={'/training'}>
                <div className="flex flex-col items-center justify-start">
                  <div className="flex items-center justify-center w-48 h-48 rounded-lg">
                    <Image
                      priority
                      src="/images/data_driven.png"
                      className="rounded-lg"
                      width={200}
                      height={200}
                      alt="A philosopher giving a presentation in an amphitheater"
                    />
                  </div>
                  <h3 className="text-lg font-bold">Executive & Team Training</h3>
                  <p className="text-center text-gray-600">
                    Up-skill your leaders and teams with our specialized training programs, designed
                    to accelerate AI adoption.
                  </p>
                </div>
              </a>
            </div>
            <div className="px-5 space-y-3 md:w-1/3">
              <a href={'/prototyping'}>
                <div className="flex flex-col items-center justify-start ">
                  <div className="flex items-center justify-center w-48 h-48 rounded-lg">
                    <Image
                      priority
                      src="/images/infrastructure.png"
                      className="rounded-lg"
                      width={200}
                      height={200}
                      alt="A mason working on a castle"
                    />
                  </div>

                  <h3 className="text-lg text-center font-bold">Rapid Prototyping</h3>
                  <p className="text-center text-gray-600">
                    Quickly move from concept to prototype with our agile AI development approach.
                  </p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Features
