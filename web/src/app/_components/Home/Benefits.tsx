import { ArrowPathIcon, CloudArrowUpIcon, LockClosedIcon } from '@heroicons/react/20/solid'

const features = [
  {
    name: 'Skip the Vendor Lock-In',
    description:
      'Our platform works with OpenAI, Anthropic, Google, and other leading AI models, so you can choose the best model for your needs',
    href: '#',
    icon: LockClosedIcon,
  },
  {
    name: 'Multiple Models - One Price',
    description:
      'Skip the license fees for multiple models. With Bridge, you can access multiple models for one low price.',
    href: '#',
    icon: ArrowPathIcon,
  },
  {
    name: 'Graphical Workflow Designer',
    description:
      'Build complex flows with our easy-to-use graphical workflow designer. No coding required.',
    href: '#',
    icon: CloudArrowUpIcon,
  },
  {
    name: 'Native RAG Integration',
    description:
      'Bring your own files and data with our native RAG integration. No custom work required.',
    href: '#',
    icon: CloudArrowUpIcon,
  },
  {
    name: 'Team Collaboration',
    description:
      'All models, data, and workflows are shared with your team. Teams can create, edit, and share models and workflows.',
    href: '#',
    icon: CloudArrowUpIcon,
  },
  {
    name: 'Improved Chat Functionality',
    description:
      'Improved chat functionality that lets you choose the foundation model that fits your needs.',
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
            All Your AI Tools in One Place
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-300">
            Bridge is a platform that makes AI accessible to everyone, regardless of skill level.
            With Bridge, you can leverage the power of AI without the need for expensive
            infrastructure or specialized personnel.
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
