import { Dashboard } from '@/lib/server/organizations'
import {
  ChartPieIcon,
  ChartBarIcon,
  CursorArrowRippleIcon,
  TruckIcon,
  ShoppingBagIcon,
} from '@heroicons/react/24/outline'
import { classNames } from '@/lib/utils/classnames'

export interface DashboardIconProps {
  dashboard: Dashboard
  className?: any
}

/**
 * //  type: 'SUMMARY' | 'ECOMMERCE' | 'EXPERIENCE' | 'LOGISTICS' | 'RETAIL'
 *
 * @param dashboard
 * @param props
 * @returns
 */
export function DashboardIcon({ dashboard, className }: DashboardIconProps, ...props: any) {
  switch (dashboard.type) {
    case 'SUMMARY':
      return <ChartPieIcon className={classNames('text-grey-700', className)} {...props} />
    case 'ECOMMERCE':
      return <ChartBarIcon className={classNames('text-orange-700', className)} {...props} />
    case 'EXPERIENCE':
      return <CursorArrowRippleIcon className={classNames('text-sky-700', className)} {...props} />
    case 'LOGISTICS':
      return <TruckIcon className={classNames('text-green-400', className)} {...props} />
    case 'RETAIL':
      return <ShoppingBagIcon className={classNames('text-purple-400', className)} {...props} />
    default:
      return <ChartPieIcon className={classNames('text-sky-400', className)} {...props} />
  }
}
