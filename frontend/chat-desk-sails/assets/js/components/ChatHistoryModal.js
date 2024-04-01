import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import {
  ChatBubbleLeftEllipsisIcon,
  CheckIcon,
} from '@heroicons/react/24/outline'

export default function ChatHistoryModal({ open, close, chats }) {
  const closeRef = useRef(null)

  const onClose = () => {
    close()
  }
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50 "
        initialFocus={closeRef}
        onClose={onClose}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-50 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6 dark:bg-gray-700">
                <div className="flex flex-col items-start justify-start">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-500">
                    <ChatBubbleLeftEllipsisIcon
                      className="h-6 w-6 text-white"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="mt-4 text-left">
                    <Dialog.Title
                      as="h3"
                      className="text-base font-semibold leading-6 text-gray-900 dark:text-gray-400"
                    >
                      Create Chat Agent
                    </Dialog.Title>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-200">
                        Easily Deploy a chat agent with this simple steps.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-6 w-full">
                  <div className="my-6 flex h-[55vh] w-full flex-col space-y-2 overflow-y-auto">
                    {chats.map((e, i) => {
                      if (e.sender == 'ai') {
                        return (
                          <div key={i} className="flex w-full justify-start">
                            <div className="flex w-3/4 flex-wrap justify-start rounded-xl bg-green-100 p-3 text-sm font-light text-gray-600">
                              <span className="flex w-full flex-wrap text-sm">
                                {e.message}
                              </span>
                            </div>
                          </div>
                        )
                      }
                      if (e.sender == 'user') {
                        return (
                          <div
                            key={i}
                            className="flex w-full flex-wrap justify-end"
                          >
                            <div className="flex w-3/4 flex-wrap justify-end rounded-xl bg-pink-100 p-3 text-sm font-light text-gray-600">
                              <span className="flex w-full flex-wrap text-sm">
                                {e.message}
                              </span>
                            </div>
                          </div>
                        )
                      }
                    })}
                  </div>
                </div>
                <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-300 sm:col-start-1 sm:mt-0"
                    ref={closeRef}
                    onClick={() => onClose()}
                  >
                    Close Chat
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
