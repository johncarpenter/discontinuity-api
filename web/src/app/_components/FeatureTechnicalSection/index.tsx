import {
  CircleStackIcon,
  DocumentChartBarIcon,
  InboxIcon,
  ListBulletIcon,
  RocketLaunchIcon,
  TrashIcon,
  UsersIcon,
} from '@heroicons/react/24/outline'
import Image from 'next/image'
const features = [
  {
    name: 'Data Lake',
    description:
      "Cloud-based, Petabyte-scale, compliant, secure and independent data lake. It's your data, you own it. ",
    href: '#',
    icon: InboxIcon,
  },
  {
    name: 'Automation Layer',
    description:
      'Execute any code in a secure, scalable, and compliant environment. Allows you to build, test and deploy automation code without impacting your production environment.',
    href: '#',
    icon: UsersIcon,
  },
  {
    name: 'AI/ML Engine',
    description:
      'Data + Automation + Vector Data = AI/ML. insight: has built a proprietary AI/ML engine that allows you to build and deploy AI/ML models in a fraction of the time and cost of other solutions. All included without major investment.',
    href: '#',
    icon: TrashIcon,
  },
]

export default function FeatureTechnicalSection() {
  return (
    <div className="py-16 sm:py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-7xl lg:mx-0">
          <h6 className=" text-secondary-600 uppercase">Invest in ideas, not tools</h6>

          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl pt-4">
            Why Discontinuity.ai?
          </h2>

          {/* Image section */}
          <div className="mt-16 sm:mt-18 xl:mx-auto xl:max-w-7xl xl:px-8">
            <img
              src="/images/hero_2.png"
              alt=""
              className="aspect-[5/2] w-full object-cover xl:rounded-3xl"
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
              <h3 className="text-secondary-600 flex flex-row">
                <ListBulletIcon className="mx-2 h-8 w-8" aria-hidden="true" />
                Data Pipeline and Lake
              </h3>
              <dd className="mt-1 flex flex-auto flex-col text-base leading-7 text-gray-600">
                <p className="flex-auto">
                  Getting your data into a usable format is the first step in any AI/ML project. We
                  run a compliant, secure cloud-data lake and pipeline that can easily bring your
                  data into a usable format.
                </p>
                <p className="mt-6"></p>
              </dd>
            </div>
            <div className="flex flex-col">
              <h3 className="text-secondary-600 flex flex-row">
                <CircleStackIcon className="mx-2 h-8 w-8" aria-hidden="true" />
                Vector Database(s)
              </h3>
              <dd className="mt-1 flex flex-auto flex-col text-base leading-7 text-gray-600">
                <p className="flex-auto">
                  AI/ML require data stored in a way that allows them understand the context of the
                  data. Our high-performance vector databases can dramatically improve the
                  performance of your ML applications and provide a boost to your apps quality.
                </p>
                <p className="mt-6"></p>
              </dd>
            </div>
            <div className="flex flex-col">
              <h3 className="text-secondary-600 flex flex-row">
                <RocketLaunchIcon className="mx-2 h-8 w-8" aria-hidden="true" />
                High-Performance Compute
              </h3>
              <dd className="mt-1 flex flex-auto flex-col text-base leading-7 text-gray-600">
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
