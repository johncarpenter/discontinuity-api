import { CircleStackIcon, ListBulletIcon, RocketLaunchIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'

export default function FeatureTechnicalSection() {
  return (
    <div className="py-16 sm:py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-7xl lg:mx-0">
          <span className=" text-secondary-600 uppercase">Invest in ideas, not tools</span>

          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl pt-4">
            Why Discontinuity.ai?
          </h2>

          {/* Image section */}
          <div className="relative h-full overflow-hidden rounded-3xl bg-gray-900 px-6 pb-12 pt-64 shadow-2xl sm:px-12 lg:px-8 lg:pb-8 xl:px-10 xl:pb-10 ">
            <Image
              src="/images/hero_2.png"
              alt="abstract image of ocean waves in sunset"
              className="aspect-[5/2] xl:rounded-3xl object-cover"
              fill
            />
          </div>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Discontinuity.ai has the tools and the experience to build, deploy and mananage your AI
            projects. We've built out the infrastructure to handle all the complexities in AI/ML
            applications. Focus on the ideas, and we'll handle the rest.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            <div className="flex flex-col">
              <dt>
                <h3 className="text-secondary-600 flex flex-row">
                  <ListBulletIcon className="mx-2 h-8 w-8" aria-hidden="true" />
                  Data Pipeline and Lake
                </h3>
              </dt>
              <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                <p className="flex-auto">
                  Getting your data into a usable format is the first step in any AI/ML project. We
                  run a compliant, secure cloud-data lake and pipeline that can easily bring your
                  data into a usable format.
                </p>
                <p className="mt-6"></p>
              </dd>
            </div>
            <div className="flex flex-col">
              <dt>
                <h3 className="text-secondary-600 flex flex-row">
                  <CircleStackIcon className="mx-2 h-8 w-8" aria-hidden="true" />
                  Vector Database(s)
                </h3>
              </dt>
              <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                <p className="flex-auto">
                  AI/ML require data stored in a way that allows them understand the context of the
                  data. Our high-performance vector databases can dramatically improve the
                  performance of your ML applications and provide a boost to your apps quality.
                </p>
                <p className="mt-6"></p>
              </dd>
            </div>
            <div className="flex flex-col">
              <dt>
                <h3 className="text-secondary-600 flex flex-row">
                  <RocketLaunchIcon className="mx-2 h-8 w-8" aria-hidden="true" />
                  High-Performance Compute
                </h3>
              </dt>
              <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                <p className="flex-auto">
                  AI/ML apps are resource intensive. We sandbox your applications within a secure
                  container and once you are ready for production, those containers can quickly be
                  moved to a scalable cluster.
                </p>
                <p className="mt-6"></p>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  )
}
