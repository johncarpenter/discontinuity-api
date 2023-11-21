export interface CardProps {
  children?: React.ReactNode
  title?: string
  subtitle?: string
  danger?: boolean
}

const Body = ({ children, subtitle, title }: CardProps) => {
  return (
    <div className="flex flex-col space-y-3 overflow-auto p-5">
      {subtitle && (
        <h3 className="text-base font-semibold leading-7 text-primary-600">{subtitle}</h3>
      )}
      {title ? (
        <h2 className="text-2xl font-bold">{title}</h2>
      ) : (
        <div className="h-8 w-full animate-pulse rounded bg-gray-400" />
      )}

      <div className="flex flex-col">{children}</div>
    </div>
  )
}
Body.displayName = 'Body'

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
    <div className="flex flex-row items-center justify-between space-x-5 rounded-b border-t bg-gray-100 px-5 py-3 dark:border-t-gray-600 dark:bg-gray-900">
      {children}
    </div>
  )
}
Footer.displayName = 'Footer'

const Card = ({ children, danger }: CardProps) => {
  return danger ? (
    <div className="flex flex-col justify-between rounded border-2 border-red-600">{children}</div>
  ) : (
    <div className="flex flex-col justify-between overflow-hidden rounded border bg-white shadow sm:rounded-lg">
      {children}
    </div>
  )
}

Card.Footer = Footer
Card.Body = Body
Card.Empty = Empty

export default Card
