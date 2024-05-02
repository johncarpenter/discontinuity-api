import { Subtitle } from '@/components/Base/text'

export interface CardProps {
  children?: React.ReactNode
  title?: string
  subtitle?: string
  danger?: boolean
}

const Title = ({ children, subtitle, title }: CardProps) => {
  return (
    <div className="flex flex-row items-center justify-between space-x-5 dark:prose-dark">
      <div className="flex flex-1 flex-col space-y-3 overflow-auto p-5">
        {title ? (
          <h2 className="text-2xl font-bold">{title}</h2>
        ) : (
          <div className="h-8 w-full animate-pulse rounded bg-gray-400" />
        )}
        {subtitle && <Subtitle>{subtitle}</Subtitle>}
      </div>
      {children}
    </div>
  )
}
Title.displayName = 'Title'

const Action = ({ children }: CardProps) => {
  return <div className="p-5">{children}</div>
}
Action.displayName = 'Action'

const Empty = ({ children }: CardProps) => {
  return (
    <div>
      <div className="flex items-center justify-center rounded border-4 border-dashed bg-gray-100 p-5 dark:border-gray-600 dark:bg-transparent">
        <p>{children}</p>
      </div>
    </div>
  )
}
Empty.displayName = 'Empty'

const Footer = ({ children }: CardProps) => {
  return (
    <div className="flex flex-row items-center justify-between space-x-5 rounded-b border-t bg-gray-100 px-5 py-3 dark:border-gray-600 dark:bg-gray-900">
      {children}
    </div>
  )
}
Footer.displayName = 'Footer'

const Card = ({ children, danger }: CardProps) => {
  return danger ? (
    <div className="flex flex-col justify-between rounded border-2 border-red-600">{children}</div>
  ) : (
    <div className="flex flex-col justify-between card-normal">{children}</div>
  )
}

Card.Footer = Footer
Card.Title = Title
Card.Empty = Empty
Card.Action = Action

export default Card
