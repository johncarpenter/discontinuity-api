import Image from 'next/image'

export default function SupportedModels() {
  return (
    <div className="bg-white py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <span className=" text-secondary-600 uppercase">manage diverse technologies</span>

          <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl pt-4">
            One interface for all your AI models
          </h2>
          <div className="mx-auto mt-10 grid grid-cols-4 items-center gap-x-8 gap-y-10 sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:grid-cols-5">
            <Image
              className="col-span-2 max-h-12 w-full object-contain object-center lg:col-span-1"
              src="/images/logos/meta.webp"
              alt="Meta logo"
              width={110}
              height={48}
            />
            <Image
              className="col-span-2 max-h-12 w-full object-contain object-center lg:col-span-1"
              src="/images/logos/cohere.webp"
              alt="Cohere logo"
              width={110}
              height={48}
            />
            <Image
              className="col-span-2 max-h-12 w-full object-contain object-center lg:col-span-1"
              src="/images/logos/anthropic.webp"
              alt="Anthropic logo"
              width={110}
              height={48}
            />
            <Image
              className="col-span-2 max-h-12 w-full object-contain object-center lg:col-span-1"
              src="/images/logos/mistralai.webp"
              alt="Mistral AI logo"
              width={110}
              height={48}
            />
            <Image
              className="col-span-2 max-h-12 w-full object-contain object-center lg:col-span-1"
              src="/images/logos/openai.webp"
              alt="OpenAI logo"
              width={110}
              height={48}
            />
            {/* <Image
              className="col-span-2 max-h-12 w-full object-contain object-center lg:col-span-1"
              src="/images/logos/hf.png"
              alt="HuggingFace logo"
              width={110}
              height={48}
            /> */}
          </div>
        </div>
      </div>
    </div>
  )
}
