/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { XMarkIcon } from '@heroicons/react/24/outline'
import { classNames } from '@/lib/utils/classnames'

interface BadgeProps {
  text: string
  closeIcon?: boolean
  onClick?: () => void
}

export default function Badge({ text, closeIcon = false, onClick }: BadgeProps) {
  const bgColor = `bg-blue-100`
  const textColor = `text-blue-800`

  return (
    <>
      <span
        className={classNames(
          `inline-flex items-center rounded px-2 py-0.5 text-xs font-medium`,
          bgColor,
          textColor
        )}
        onClick={onClick}
      >
        {text}
        {closeIcon && (
          <XMarkIcon className={`-mr-0.5 ml-1 h-2 w-2 text-blue-400`} aria-hidden="true" />
        )}
      </span>
    </>
  )
}
