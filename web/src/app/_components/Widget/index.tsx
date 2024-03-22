import Chatbot from 'react-chatbot-kit'

import config from './config'
import MessageParser from './MessageParser'
import ActionProvider from './ActionProvider'

import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { ArrowLeftCircleIcon, SparklesIcon } from '@heroicons/react/24/outline'

export default function Widget() {
  const saveMessages = (messages: any) => {
    localStorage.setItem('chat_messages', JSON.stringify(messages))
  }

  const loadMessages = () => {
    const messages = JSON.parse(localStorage.getItem('dsc_chat_messages') as string)
    return messages
  }

  const [open, setOpen] = useState(false)
  return (
    <>
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-20" onClose={setOpen}>
          <div className="fixed inset-0" />

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500 sm:duration-700"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500 sm:duration-700"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="pointer-events-auto w-screen max-w-md border-grey-800 border-2 shadow-xl">
                    <Chatbot
                      config={config}
                      messageParser={MessageParser}
                      actionProvider={ActionProvider}
                      headerText="Discontinuity.ai Chatbot"
                      placeholderText="Enter your question here"
                      messageHistory={loadMessages()}
                      saveMessages={saveMessages}
                    />
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
      <div
        role="button"
        tabIndex={0}
        className="fixed flex top-3 right-3 rounded-md bg-gradient-to-r from-blue-700 to-blue-900 items-center justify-center cursor-pointer  z-10"
        onClick={() => setOpen(!open)}
        onKeyDown={(key) => {
          if (key.key === 'c') setOpen(!open)
        }}
      >
        <div className="flex flex-row mx-auto p-3">
          <ArrowLeftCircleIcon className="h-6 w-6 mt-1 text-white" aria-hidden="true" />
          <SparklesIcon className="h-6 w-6 mt-1 text-white" aria-hidden="true" />
        </div>
      </div>
    </>
  )
}
