export interface ContentProps {
  children?: React.ReactNode
  thick?: boolean
  subtitle?: string
  title?: string
  displayName?: string
}

const Container = ({ children }: ContentProps) => {
  return <div className="flex flex-col space-y-2 pb-10">{children}</div>
}

Container.displayName = 'Container'

const Divider = ({ thick }: ContentProps) => {
  return thick ? (
    <hr className="border-2 dark:border-gray-400" />
  ) : (
    <hr className="border dark:border-gray-500" />
  )
}

Divider.displayName = 'Divider'

const Empty = ({ children }: ContentProps) => {
  return (
    <div>
      <div className="flex items-center justify-center rounded border-4 border-dashed bg-gray-100 p-5">
        <p>{children}</p>
      </div>
    </div>
  )
}

Empty.displayName = 'Empty'

const Title = ({ subtitle, title }: ContentProps) => {
  return (
    <div>
      <h3 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
        {title}
      </h3>
      <h4 className="text-gray-400">{subtitle}</h4>
    </div>
  )
}

const Content = ({ children }: ContentProps) => {
  return <div className="flex h-full flex-col space-y-5 overflow-y-auto p-3">{children}</div>
}

Content.Container = Container
Content.Divider = Divider
Content.Empty = Empty
Content.Title = Title

export default Content
