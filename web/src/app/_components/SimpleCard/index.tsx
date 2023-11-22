import { classNames } from '@/app/_lib/utils/classnames'

export interface SimpleCardProps {
  title: string
  subtitle: string
  Icon: React.ElementType
  href: string
  background_color: string
  icon_color: string
}

export default function SimpleCard({
  title,
  subtitle,
  href,
  background_color,
  icon_color,
  Icon,
}: SimpleCardProps) {
  return (
    <a href={href} className="hover:ring-1 hover:ring-primary-50">
      <div className="col-span-1 flex rounded-md shadow-sm">
        <div
          className={classNames(
            'flex w-16 flex-shrink-0 items-center justify-center',
            `${background_color}`
          )}
        >
          {Icon && <Icon className={classNames(`${icon_color}`, 'h-6 w-6')} aria-hidden="true" />}
        </div>
        <div className="flex flex-1 items-center justify-between truncate rounded-r-md border-b border-r border-t border-gray-200 bg-white">
          <div className="flex-1 truncate px-4 py-2 text-sm">
            {title}
            <p className="text-gray-500">{subtitle}</p>
          </div>
        </div>
      </div>
    </a>
  )
}
