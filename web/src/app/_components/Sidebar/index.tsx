'use client'
import { Fragment, useEffect, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { classNames } from '@/utils/classnames'
import Avatar from '../Avatar'
import { workspaceMenu } from '@/config/menu'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import { LicenseType, workspaces } from '@prisma/client'
import { Field } from '@/components/Base/fieldset'
import { Select } from '@/components/Base/select'
import { Button } from '../Base/button'
import { useRouter } from 'next/navigation'
import { useWorkspace } from '@/app/_lib/client/workspaceProvider'
import { Badge } from '../Base/badge'

export type SidebarProps = {
  workspaces: workspaces[]
}

export default function Sidebar({ workspaces }: SidebarProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const [workspace, setWorkspace] = useWorkspace()

  const router = useRouter()

  const changeWorkspace = (workspace: string) => {
    setWorkspace(workspaces.find((w) => w.slug === workspace) || workspaces[0])

    router.push(`/workspace/${workspace}/flow`)
    setSidebarOpen(false)
  }

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

  function WorkspaceSwitcher({ workspaces }: { workspaces: workspaces[] }) {
    return (
      <div className="mb-4 -mx-2">
        <span className="text-xs uppercase text-gray-500 ">current workspace</span>
        <Field className="dark mt-2">
          {workspaces.length > 0 ? (
            <Select
              name="status"
              value={workspace?.slug}
              onChange={(e) => changeWorkspace(e.target.value)}
            >
              {workspaces.map((workspace: workspaces) => (
                <option key={workspace.id} value={workspace.slug}>
                  {workspace.name}
                </option>
              ))}
            </Select>
          ) : (
            <Button href="/workspaces">Manages Workspaces</Button>
          )}
        </Field>
      </div>
    )
  }

  return (
    <>
      <div>
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
                  <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-2 ring-1 ring-white/10">
                    <div className="flex h-16 shrink-0 items-center">
                      <span className="sr-only">discontinuity.ai</span>
                      <div className="mr-3 mt-3">
                        <Image
                          priority
                          src="/images/bridge_logo_full.png"
                          height={90}
                          width={240}
                          alt="Discontinuity AI"
                        />
                      </div>
                    </div>
                    <nav className="flex flex-1 flex-col">
                      <WorkspaceSwitcher workspaces={workspaces} />
                      <ul className="flex flex-1 flex-col gap-y-7">
                        <li>
                          <ul className="-mx-2 space-y-1">
                            {workspaceMenu(workspace?.slug).map((menu, index) => (
                              <div key={index}>
                                <span className="text-xs uppercase text-gray-500 ">
                                  {menu.name}
                                </span>
                                <li>
                                  <ul className="-mx-2 space-y-1">
                                    {menu.menuItems.map((item) => (
                                      <li key={item.name}>
                                        <MenuItem
                                          setSidebarOpen={setSidebarOpen}
                                          name={item.name}
                                          href={item.href}
                                          Icon={item.Icon}
                                          active={pathname == item.href}
                                          enabled={item.enabled}
                                          visible={item.visible}
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
                        <li className="-mx-6 mt-auto">
                          <Avatar />
                        </li>
                      </ul>
                    </nav>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}

        <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
          <div className="flex grow flex-col gap-y-5 overflow-y-auto px-6 bg-gradient-to-br from-primary-800 to-primary-700  dark:from-black dark:to-black">
            <div className="flex h-16 shrink-0 items-center">
              <span className="sr-only">discontinuity.ai</span>
              <div className="mr-3 mt-3">
                <Image
                  priority
                  src="/images/bridge_logo_full.png"
                  height={86}
                  width={256}
                  alt="Discontinuity AI"
                />
              </div>
            </div>
            <nav className="flex flex-1 flex-col">
              <WorkspaceSwitcher workspaces={workspaces} />
              <ul className="flex flex-1 flex-col gap-y-7">
                <li>
                  <ul className="-mx-2 space-y-2">
                    {workspaceMenu(workspace?.slug).map((menu, index) => (
                      <div key={index}>
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
                                  visible={item.visible}
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

                <li className="-mx-6 mt-auto">
                  <Avatar />
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <div className="sticky top-0 z-50 flex items-center gap-x-6 bg-gray-900 px-4 py-4 shadow-sm sm:px-6 lg:hidden">
          <button
            type="button"
            className="-m-2.5 p-2.5 text-gray-400 lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
          <div className="flex-1 text-sm font-semibold leading-6 text-white">
            <Image
              priority
              src="/images/bridge_logo_full.png"
              height={45}
              width={150}
              alt="Discontinuity AI"
            />
          </div>
        </div>
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
}

const MenuItem = ({
  name,
  href,
  Icon,
  active = false,
  enabled = true,
  visible = true,
  license = LicenseType.TRIAL,
  setSidebarOpen,
}: MenuItemProps) => {
  return (
    (visible && enabled && (
      <Link
        onClick={() => setSidebarOpen?.(false)}
        href={enabled ? href : {}}
        className={classNames(
          active ? 'bg-gray-800 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white',
          'group flex gap-x-3 rounded-md p-1 text-sm font-semibold leading-6'
        )}
      >
        <Icon className="h-6 w-6 shrink-0" aria-hidden="true" />
        {name} {license === LicenseType.OPEN && <Badge color="blue">Pro</Badge>}
      </Link>
    )) ||
    (visible && !enabled && (
      <span className="text-gray-400/60 group flex gap-x-3 p-1 text-sm font-semibold leading-6">
        <Icon className="h-6 w-6 shrink-0" aria-hidden="true" />
        {name}
      </span>
    )) ||
    null
  )
}
