import FeedBack404 from '@/components/FeedBack404'
import LoaderSpinner from '@/components/Loader-Comp'
import { Listbox, Transition } from '@headlessui/react'
import {
  CheckIcon,
  ChevronUpDownIcon,
  StarIcon,
} from '@heroicons/react/20/solid'
import { collection, doc, getDocs } from 'firebase/firestore'
import { Fragment, useEffect, useState } from 'react'
import { appFirestore } from '../lib/firebase'

const startRating = [
  { id: 1, name: '1 Star' },
  { id: 2, name: '2 Star' },
  { id: 3, name: '3 Star' },
  { id: 4, name: '4 Star' },
  { id: 5, name: '5 Star' },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function FeedbackHistory({ user }) {
  const [selected, setSelected] = useState(startRating[3])
  const [feedbackHistory, setFeedbackHistory] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    ;(async () => {
      let history = []
      const userDocRef = doc(appFirestore, 'USERS', user.email)
      const agentCollectionRef = collection(userDocRef, user.agent_key)

      const qSnap = await getDocs(agentCollectionRef)

      qSnap.forEach((doc) => {
        if (doc.id !== 'config') {
          history.push({
            id: doc.id,
            rating: doc.data().feedback,
            comment: doc.data().feedback_comment,
            name: doc.data().name,
          })
        }
      })
      setFeedbackHistory(history)
      setTimeout(() => {
        setIsLoading(false)
      }, 500)
    })()
  }, [])
  return (
    <div className="flex h-screen flex-col items-start justify-start">
      <div className="flex flex-col items-start justify-start">
        <h1 className="text-4xl font-bold text-gray-600 dark:text-gray-200">
          Customers Feedback
        </h1>
        <p className="text-sm text-gray-400">
          View the feedback from chat sessions of all your Chat Agents.
        </p>
        <div className="flex items-center justify-start space-x-2">
          <span>Sort By Stars</span>
          <Listbox value={selected} onChange={setSelected}>
            {({ open }) => (
              <>
                <div className="relative mt-2">
                  <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
                    <span className="block truncate">{selected.name}</span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                      <ChevronUpDownIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </span>
                  </Listbox.Button>

                  <Transition
                    show={open}
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                      {startRating.map((person) => (
                        <Listbox.Option
                          key={person.id}
                          className={({ active }) =>
                            classNames(
                              active
                                ? 'bg-indigo-600 text-white'
                                : 'text-gray-900',
                              'relative cursor-default select-none py-2 pl-3 pr-9'
                            )
                          }
                          value={person}
                        >
                          {({ selected, active }) => (
                            <>
                              <span
                                className={classNames(
                                  selected ? 'font-semibold' : 'font-normal',
                                  'block truncate'
                                )}
                              >
                                {person.name}
                              </span>

                              {selected ? (
                                <span
                                  className={classNames(
                                    active ? 'text-white' : 'text-indigo-600',
                                    'absolute inset-y-0 right-0 flex items-center pr-4'
                                  )}
                                >
                                  <CheckIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                </span>
                              ) : null}
                            </>
                          )}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Transition>
                </div>
              </>
            )}
          </Listbox>
        </div>
      </div>
      <div className="mt-6 flex items-center justify-start">
        {!isLoading ? (
          <div className="w-full overflow-y-auto">
            {feedbackHistory != null ? (
              <div className="scroll-hide mt-8 flex w-full flex-wrap gap-2 overflow-y-auto">
                {feedbackHistory.map((e, i) => {
                  return (
                    <>
                      {e.rating > 0 && (
                        <div
                          className={`flex h-full w-full lg:w-1/2 flex-col items-start justify-start rounded-xl p-3 text-left ${
                            i % 2 === 0 ? 'bg-pink-500' : 'bg-blue-500'
                          }`}
                        >
                          <span className="text-sm font-semibold text-white">
                            {e.comment}
                          </span>
                          <div className="mt-3 flex w-full items-center justify-between">
                            <span className="text-sm font-light text-gray-100">
                              {e.name}
                            </span>
                            <div className="flex items-center justify-start">
                              {Array.from({ length: e.rating }, (_, index) => (
                                <StarIcon
                                  key={index}
                                  className="h-6 w-6 text-yellow-500"
                                />
                              ))}
                              {Array.from(
                                { length: 5 - e.rating },
                                (_, index) => (
                                  <StarIcon
                                    key={index}
                                    className="h-6 w-6 text-gray-100"
                                  />
                                )
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                    </>
                  )
                })}
              </div>
            ) : (
              <FeedBack404 />
            )}
          </div>
        ) : (
          <div className="text-token-text-primary mx-auto flex h-full w-full flex-col items-center justify-center gap-2 pb-2 text-sm">
            <LoaderSpinner />
          </div>
        )}
      </div>
    </div>
  )
}
