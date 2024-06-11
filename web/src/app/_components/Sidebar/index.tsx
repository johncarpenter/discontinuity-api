'use client'
import { Fragment, useEffect, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { classNames } from '@/utils/classnames'
import { workspaceMenu } from '@/config/menu'
import { Link } from '@/components/Base/link'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import { LicenseType, workspaces } from '@prisma/client'
import { Button } from '../Base/button'
import { useWorkspace } from '@/app/_lib/client/workspaceProvider'
import { Badge } from '../Base/badge'
import { useOrganization } from '@/app/_lib/client/organizationProvider'
import ControlBar from '../ChatControlBar'

export type SidebarProps = {
  workspaces: workspaces[]
}

export default function Sidebar({ workspaces }: SidebarProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const [workspace, setWorkspace] = useWorkspace()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [organization, setOrganization] = useOrganization()

  //const router = useRouter()

  // const changeWorkspace = (workspace: string) => {
  //   setWorkspace(workspaces.find((w) => w.slug === workspace) || workspaces[0])

  //   router.push(`/app/workspace/${workspace}/chat`)
  //   setSidebarOpen(false)
  // }

  const pathname = usePathname()

  useEffect(() => {
    if (workspaces.length > 0 && !workspace) {
      setWorkspace(workspaces[0])
      const path = pathname.split('/')
      if (path[1] === 'workspace') {
        const workspace = workspaces.find((w) => w.slug === path[2])
        if (workspace) setWorkspace(workspace)
      }
    }
  }, [setWorkspace, workspace, workspaces, pathname])

  function isVisible(license: LicenseType) {
    // Display PRO features for upsell
    if (license === LicenseType.PRO) return true

    // If a PRO license is active, display all features
    if (organization?.license === LicenseType.PRO) return true

    // Display all features for TEAM license
    if (organization?.license === LicenseType.TEAM && license === LicenseType.TEAM) return true

    // Display all features for SOLO license
    if (organization?.license === LicenseType.SOLO && license === LicenseType.SOLO) return true

    return true
  }

  // function WorkspaceSwitcher({ workspaces }: { workspaces: workspaces[] }) {
  //   return (
  //     <div className="mb-4 -mx-2">
  //       <span className="text-xs uppercase text-gray-500 ">current workspace</span>
  //       <Field className="dark mt-2">
  //         {workspaces.length > 0 ? (
  //           <Select
  //             name="status"
  //             value={workspace?.slug}
  //             onChange={(e) => changeWorkspace(e.target.value)}
  //           >
  //             {workspaces.map((workspace: workspaces) => (
  //               <option key={workspace.id} value={workspace.slug}>
  //                 {workspace.name}
  //               </option>
  //             ))}
  //           </Select>
  //         ) : (
  //           <Button href="/app/workspaces">Manages Workspaces</Button>
  //         )}
  //       </Field>
  //     </div>
  //   )
  // }

  return (
    <>
      <div>
        {/* Top bar */}

        <div className="sticky top-0 z-50 flex items-center gap-x-6 bg-gray-900 px-4 py-4 shadow-sm sm:px-6 ">
          <Button
            plain
            className="-m-2.5 p-2.5 text-gray-400 lg:hidden"
            onClick={() => {
              setSidebarOpen(true)
            }}
          >
            <span className="sr-only">Open sidebar</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </Button>
          <div className="text-sm font-semibold leading-6 text-white h-10">
            <Link href="/app" className="flex items-center gap-x-2">
              <span className="sr-only">Discontinuity AI</span>
              <Image
                priority
                src="/images/bridge_logo.svg"
                height={45}
                width={55}
                className="lg:hidden"
                alt="Discontinuity AI"
              />
              <Image
                priority
                src="/images/bridge_logo_full.png"
                height={45}
                width={160}
                className="hidden lg:block"
                alt="Discontinuity AI"
              />
            </Link>
          </div>
          <div className="flex-1">
            <ControlBar />
          </div>
        </div>

        {/* Static sidebar for desktop */}

        <div className="hidden lg:fixed lg:top-16 lg:bottom-0 lg:z-40 lg:flex lg:flex-col">
          <div className="flex grow flex-col gap-y-5 overflow-y-auto px-6 bg-gray-900">
            <nav className="flex flex-1 flex-col">
              <ul className="flex flex-1 flex-col gap-y-7">
                <li>
                  <ul className="-mx-2 space-y-2">
                    {workspaceMenu(workspace?.slug).map((menu, index) => (
                      <div key={index} className="pt-8">
                        <span className="text-xs uppercase text-gray-500">{menu.name}</span>
                        <li>
                          <ul className="-mx-2 space-y-1 pt-2">
                            {menu.menuItems.map((item) => (
                              <li key={item.name}>
                                <MenuItem
                                  setSidebarOpen={setSidebarOpen}
                                  name={item.name}
                                  href={item.href}
                                  Icon={item.Icon}
                                  active={pathname == item.href}
                                  enabled={item.enabled}
                                  visible={isVisible(item.license)}
                                  license={item.license}
                                />
                              </li>
                            ))}
                          </ul>
                        </li>
                      </div>
                    ))}
                  </ul>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog as="div" className="relative z-50 lg:hidden" onClose={setSidebarOpen}>
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-900/80" />
            </Transition.Child>

            <div className="fixed inset-0 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                      <button
                        type="button"
                        className="-m-2.5 p-2.5"
                        onClick={() => setSidebarOpen(false)}
                      >
                        <span className="sr-only">Close sidebar</span>
                        <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                      </button>
                    </div>
                  </Transition.Child>
                  {/* Sidebar component, swap this element with another sidebar if you like */}
                  <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-2 ring-1 ring-white/10 pt-16">
                    <nav className="flex flex-1 flex-col">
                      <ul className="flex flex-1 flex-col gap-y-9">
                        <li>
                          <ul className="-mx-2 space-y-5">
                            {workspaceMenu(workspace?.slug).map((menu, index) => (
                              <div key={index}>
                                <span className="text-xs uppercase text-gray-500 ">
                                  {menu.name}
                                </span>
                                <li>
                                  <ul className="-mx-2 space-y-3">
                                    {menu.menuItems.map((item) => (
                                      <li key={item.name}>
                                        <MenuItem
                                          setSidebarOpen={setSidebarOpen}
                                          name={item.name}
                                          href={item.href}
                                          Icon={item.Icon}
                                          active={pathname == item.href}
                                          enabled={item.enabled}
                                          visible={isVisible(item.license ?? LicenseType.SOLO)}
                                          license={item.license}
                                        />
                                      </li>
                                    ))}
                                  </ul>
                                </li>
                              </div>
                            ))}
                          </ul>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>
      </div>
    </>
  )
}

type MenuItemProps = {
  name: string
  href: string
  Icon?: any
  active: boolean
  enabled: boolean
  visible: boolean
  license?: LicenseType
  setSidebarOpen: (open: boolean) => void
  minimized?: boolean
}

const MenuItem = ({
  name,
  href,
  Icon,
  active = false,
  enabled = true,
  visible = true,
  license = LicenseType.SOLO,
  setSidebarOpen,
  minimized = false,
}: MenuItemProps) => {
  return (
    (visible && enabled && (
      <Link
        onClick={() => setSidebarOpen?.(false)}
        href={enabled ? href : '#'}
        className={classNames(
          active ? 'bg-gray-800 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white',
          'group flex gap-x-3 rounded-md p-1 text-sm font-semibold leading-6'
        )}
      >
        <Icon className="h-6 w-6 shrink-0" aria-hidden="true" />
        {!minimized && name && (
          <>
            {name} {license === LicenseType.PRO && <Badge color="blue">Pro</Badge>}
          </>
        )}
      </Link>
    )) ||
    (visible && !enabled && (
      <span className="text-gray-400/60 group flex gap-x-3 p-1 text-sm font-semibold leading-6">
        <Icon className="h-6 w-6 shrink-0" aria-hidden="true" />
        {!minimized && name && (
          <>
            {name} {license === LicenseType.PRO && <Badge color="blue">Pro</Badge>}
          </>
        )}
      </span>
    )) ||
    null
  )
}
