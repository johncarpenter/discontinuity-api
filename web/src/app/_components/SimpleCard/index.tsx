import Image from 'next/image'

export interface SimpleCardProps {
  title: string
  subtitle: string
  cta: string
  href: string
  src: string
  alt: string
}

const imageCourse = (id: string, alt: string) => {
  return <Image priority src={id} className="rounded-lg" width={200} height={200} alt={alt} />
}

export default function SimpleCard({ title, subtitle, href, cta, src, alt }: SimpleCardProps) {
  return (
    <a href={href}>
      <div className="card-normal px-6 py-6 lg:px-8 overflow-hidden  shadow-xl hover:ring-1 hover:ring-secondary-500 ">
        <div className="col-span-1 flex ">
          <div className="flex items-center justify-center w-48 h-48 rounded-lg">
            {imageCourse(src, alt)}
          </div>

          <div className="flex flex-1 items-center justify-between">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-base font-semibold leading-6 text-normal">{title}</h3>
              <div className="mt-2 max-w-xl text-sm text-lighter">
                <p>{subtitle}</p>
              </div>
              <div className="mt-3 text-sm leading-6 font-semibold text-primary-600">
                {cta}
                <span aria-hidden="true"> &rarr;</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </a>
  )
}
