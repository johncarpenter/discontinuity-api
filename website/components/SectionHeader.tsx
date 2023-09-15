interface SectionHeaderProps {
    small?: string
    title: string
    text: string
}

export default function SectionHeader({small, title, text} : SectionHeaderProps) {
    return (
      <div className="px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-base font-semibold leading-7 text-secondary-600">{small ?? ''}</p>
          <h2 className="mt-2 text-4xl font-bold tracking-tight dark:text-gray-100 text-gray-900 sm:text-6xl">{title}</h2>
          <p className="mt-6 text-lg leading-8 dark:text-gray-400 text-gray-600">
            {text}
          </p>
        </div>
      </div>
    )
  }
  