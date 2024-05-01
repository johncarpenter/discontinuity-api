import Image from 'next/image'

export default function Features() {
  return (
    <div className="py-16 sm:py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-7xl lg:mx-0 lg:text-center">
          <span className=" text-secondary-600 uppercase">Invest in ideas, not tools</span>

          <p className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl pt-4">
            Comprehensive solution for prototyping, testing and innovating your AI programs
          </p>

          <p className="mt-6 text-lg leading-8 text-gray-600">
            Empower your team to develop, deploy and leverage AI in your organization. With minimal
            effort and investment
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-10 lg:mt-12 lg:max-w-none">
          <div className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            <div className="flex flex-col  border-gray-400 rounded-3xl px-6 pb-12 pt-8 shadow-2xl sm:px-12 lg:px-8 lg:pb-8 xl:px-10 xl:pb-10">
              <Image
                src="/images/card_1.png"
                width={300}
                height={200}
                className="rounded-md  ring-1 ring-gray-900/10 mx-auto mb-6"
                alt="Application screenshot"
              />
              <h3 className="text-secondary-600 flex flex-row">Simple Data Integration</h3>
              <div className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                <p className="flex-auto">
                  Whether you're dealing with basic files or extensive data lakes, Bridge allows you
                  to seamlessly pull in corporate knowledge. Securely access and utilize your data
                  across various AI models and applications.
                </p>
                <p className="mt-6"></p>
              </div>
            </div>
            <div className="flex flex-col  border-gray-400 rounded-3xl px-6 pb-12 pt-8 shadow-2xl sm:px-12 lg:px-8 lg:pb-8 xl:px-10 xl:pb-10">
              <Image
                src="/images/card_2.png"
                width={300}
                height={200}
                className="rounded-md  ring-1 ring-gray-900/10 mx-auto mb-6"
                alt="Application screenshot"
              />
              <h3 className="text-secondary-600 flex flex-row">Manage Diverse AI Technologies</h3>
              <div className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                <p className="flex-auto">
                  From Amazon Bedrock to OpenAI, our platform supports a wide array of large
                  language models, ML tools and processes. Allowing you to work with the tools that
                  best fit your workflow.
                </p>
                <p className="mt-6"></p>
              </div>
            </div>
            <div className="flex flex-col  border-gray-400 rounded-3xl px-6 pb-12 pt-8 shadow-2xl sm:px-12 lg:px-8 lg:pb-8 xl:px-10 xl:pb-10">
              <Image
                src="/images/card_3.png"
                width={300}
                height={200}
                className="rounded-md ring-1 ring-gray-900/10 mx-auto mb-6"
                alt="Application screenshot"
              />{' '}
              <h3 className="text-secondary-600 flex flex-row">Deploy Organization Wide</h3>
              <div className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                <p className="flex-auto">
                  As a web-based platform, Bridge enables you to deploy AI models and workflows
                  throughout your organization with ease. Scale your AI initiatives without the need
                  for complex installations or specialized hardware.
                </p>
                <p className="mt-6"></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
