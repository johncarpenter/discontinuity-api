import { ExclamationTriangleIcon } from '@heroicons/react/20/solid'

export interface AlertProps {
  children?: React.ReactNode
}

const Alert = ({ children }: AlertProps) => {
  return <div className="flex flex-col space-y-2 pb-10">{children}</div>
}

const Warning = ({ children }: AlertProps) => {
  return (
    <div className="rounded-md bg-yellow-50 p-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <ExclamationTriangleIcon className="h-5 w-5 text-yellow-400" aria-hidden="true" />
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-yellow-800">Attention needed</h3>
          <div className="mt-2 text-sm text-yellow-700">
            <p>{children}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

Alert.Alert = Alert
Alert.Warning = Warning

export default Alert
