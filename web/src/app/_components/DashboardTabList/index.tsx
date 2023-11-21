'use client'
import { Dashboard } from '@/app/_lib/server/organizations'
import { Tab } from '@headlessui/react'
import { Fragment, useState } from 'react'
import DashboardEmbed from '@/components/DashboardEmbed'
import { classNames } from '@/app/_lib/utils/classnames'

export interface TabsProps {
  dashboards: Dashboard[]
  initialSelected?: number
}

const EmptyDashboard = () => (
  <div className="flex flex-col items-center justify-center h-full relative w-full rounded-lg border-2 border-dashed border-gray-300 p-12 text-center">
    <div className="text-gray-400 text-2xl">No Dashboards Available</div>
  </div>
)

export default function DashboardTabList({ dashboards, initialSelected }: TabsProps) {
  const [selected, setSelected] = useState(initialSelected ?? 0)

  return (
    <>
      {dashboards && dashboards.length > 0 ? (
        <Tab.Group selectedIndex={selected} onChange={setSelected}>
          <div className="border-b border-gray-200">
            <Tab.List>
              {dashboards.map((dashboard, index) => (
                <Tab as={Fragment} key={index}>
                  <button
                    className={classNames(
                      'whitespace-nowrap border-b-2 py-4 px-3 text-sm font-medium border-grey-500 focus:ring-0 focus:ring-offset-0 outline-none',
                      selected === index
                        ? 'border-primary-500 text-primary-600'
                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                    )}
                  >
                    {dashboard.title.substring(0, 40)}
                  </button>
                </Tab>
              ))}
            </Tab.List>
          </div>
          <Tab.Panels>
            {dashboards.map((dashboard) => (
              <Tab.Panel>
                <DashboardEmbed dashboard={dashboard} />
              </Tab.Panel>
            ))}
          </Tab.Panels>
        </Tab.Group>
      ) : (
        <EmptyDashboard />
      )}
    </>
  )
}
