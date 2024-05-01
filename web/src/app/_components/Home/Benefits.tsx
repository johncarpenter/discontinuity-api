import { ArrowPathIcon, CloudArrowUpIcon, LockClosedIcon } from '@heroicons/react/20/solid'

const features = [
  {
    name: 'Implement AI Without Disruption',
    description:
      'Our platform ensures that your transition to AI doesn’t disturb your current processes, allowing for a smooth adoption and immediate productivity gains.',
    href: '#',
    icon: LockClosedIcon,
  },
  {
    name: 'Built for All Skill Levels',
    description:
      'Bridge makes advanced AI technologies approachable and easy to use, even if you’re not a tech expert',
    href: '#',
    icon: ArrowPathIcon,
  },
  {
    name: 'Reduce Costs, Not Quality',
    description:
      'With Bridge, you can leverage the power of AI without the need for expensive infrastructure or specialized personnel. Save on costs while advancing your capabilities.',
    href: '#',
    icon: CloudArrowUpIcon,
  },
]

export default function Benefits() {
  return (
    <div className=" bg-gradient-to-br from-primary-800 to-primary-700 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <span className=" text-secondary-600 uppercase">Implement AI Anywhere</span>

          <p className="text-3xl font-bold tracking-tight text-white sm:text-4xl pt-4">
            Get AI to work for you, not the other way around
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-300">
            Combine your domain knowledge with the best AI models to solve critical problems faster,
            cheaper and more effectively than ever before.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.name} className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-white">
                  <feature.icon
                    className="h-5 w-5 flex-none text-secondary-400"
                    aria-hidden="true"
                  />
                  {feature.name}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-300">
                  <p className="flex-auto">{feature.description}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}
