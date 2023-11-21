import WheelSlide from '@/app/_components/WheelSlide'
import { CheckBadgeIcon } from '@heroicons/react/20/solid'
import SimpleCard from '@/app/_components/SimpleCard'
import {
  ChartBarIcon,
  CursorArrowRippleIcon,
  TruckIcon,
  ShoppingBagIcon,
} from '@heroicons/react/24/outline'

export default function DashboardNavigation() {
  return (
    <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
      <div className="lg:ml-4 mt-8 lg:pl-4 lg:pt-4">
        <div className="lg:max-w-lg  px-2">
          <h2 className="text-base font-semibold leading-7 text-primary-600">Better Data</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Find Your Insights
          </p>
          <p className="mt-6 text-xs text-gray-600">
            Select the DTC stage from the wheel below to find the dashboards that are most relevant.
          </p>
          <div className="grid grid-cols-1 gap-4 mt-6 sm:grid-cols-2 mb-8">
            <SimpleCard
              key={1}
              title="Marketing"
              subtitle="Analytics & Ads"
              Icon={CursorArrowRippleIcon}
              href={'/dashboards/experience'}
              background_color="bg-sky-400"
              icon_color="text-sky-700"
            />
            <SimpleCard
              key={2}
              title="Ecommerce"
              subtitle="Orders & Customers"
              Icon={ChartBarIcon}
              href={'/dashboards/ecommerce'}
              background_color="bg-orange-400"
              icon_color="text-orange-700"
            />
            <SimpleCard
              key={3}
              title="Logistics"
              subtitle="Inventory & Shipping"
              Icon={TruckIcon}
              href={'/dashboards/logistics'}
              background_color="bg-green-400"
              icon_color="text-green-700"
            />
            <SimpleCard
              key={4}
              title="Retail"
              subtitle="Product & Sales"
              Icon={ShoppingBagIcon}
              href={'/dashboards/retail'}
              background_color="bg-purple-400"
              icon_color="text-purple-700"
            />
          </div>
        </div>
      </div>
      <WheelSlide />
    </div>
  )
}
