import Image from 'next/image'

export default function EditorPlaceholder() {
  return (
    <div className="relative isolate overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 pb-24 pt-10 sm:pb-32 lg:flex lg:px-8 lg:py-8">
        <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl lg:flex-shrink-0 lg:pt-8">
          <div className="flex flex-col gap-x-2 mt-10 pb-10 ">
            <div className="my-3">
              <h1 className="text-6xl font-bold tracking-wide leading-snug text-white">
                Drag and Drop AI Workflows
              </h1>
            </div>

            <p className="mt-6 text-lg leading-8 text-normal">
              Implement a class leading Open-Source AI workflow editor in your application. Allow
              your teams to build complicated agents and workflow with ease.
            </p>
          </div>
          <div className="mt-10 flex items-center gap-x-6">
            <a href="#beta">
              <span className="rounded-full bg-primary-500/10 px-3 py-1 text-sm font-semibold leading-6 text-primary-400 ring-1 ring-inset ring-primary-500/20">
                Available on Pro and Enterprise Plans<span aria-hidden="true">→</span>
              </span>
            </a>
          </div>
        </div>
        <div className="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:ml-10 lg:mr-0 lg:mt-0 lg:max-w-none lg:flex-none xl:ml-32">
          <div className="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none">
            <div className="-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
              <Image
                src="/images/editor_screenshot.png"
                width={2432}
                height={1442}
                className="w-[76rem] rounded-md shadow-2xl ring-1 ring-gray-900/10"
                alt="Application screenshot"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
