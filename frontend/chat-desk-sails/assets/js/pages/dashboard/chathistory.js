import AgentChat404 from '@/components/AgentChat404'
import ChatHistoryModal from '@/components/ChatHistoryModal'
import LoaderSpinner from '@/components/Loader-Comp'
import { StarIcon } from '@heroicons/react/20/solid'
import { TrashIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { collection, deleteDoc, doc, getDoc, getDocs } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { appFirestore } from '../lib/firebase'

export default function ChatHistoryPage({ user }) {
  const [chatHistory, setChatHistory] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [openChat, setOpenChat] = useState(false)
  const [chats, setChats] = useState(null)

  useEffect(() => {
    ;(async () => {
      let history = []
      const userDocRef = doc(appFirestore, 'USERS', user.email)
      const agentCollectionRef = collection(userDocRef, user.agent_key)

      const qSnap = await getDocs(agentCollectionRef)

      qSnap.forEach((doc) => {
        if (doc.id !== 'config') {
          history.push({ id: doc.id, data: doc.data() })
        }
      })
      setChatHistory(history)
      setTimeout(() => {
        setIsLoading(false)
      }, 500)
    })()
  }, [])
  return (
    <>
      {chats != null && (
        <ChatHistoryModal
          open={openChat}
          close={() => {
            setChats(null)
            setOpenChat(false)
          }}
          chats={chats}
        />
      )}
      <div className="relative flex h-full w-full flex-col items-start justify-start pt-0 lg:p-6">
        <div className="flex w-full flex-col items-start justify-start">
          <h1 className="text-4xl font-bold text-gray-600 dark:text-gray-200">
            Chat History
          </h1>
          <p className="text-sm text-gray-400">
            View the chat History of all your Chat Agents.
          </p>
        </div>
        {!isLoading ? (
          <div className=" w-full overflow-y-auto">
            {chatHistory != null ? (
              <div className="scroll-hide mt-8 flex w-full flex-wrap gap-2 overflow-y-auto">
                {chatHistory.map((e, i) => {
                  return (
                    <div
                      key={e.id}
                      className="hover:bg-gray-gray-200 flex h-[150px] w-full flex-col items-start justify-between rounded-xl border border-gray-200 bg-white p-6 py-3 hover:bg-gray-100 lg:w-1/3 dark:border-gray-700 dark:bg-gray-700 dark:shadow-gray-800 dark:hover:bg-gray-800"
                    >
                      <div className="flex w-full items-start justify-between">
                        <div className="flex flex-col items-start justify-start">
                          <span className="text-xl font-semibold text-gray-600 dark:text-gray-400">
                            Customer Details
                          </span>
                          <span className="text-sm font-light text-gray-400 dark:text-gray-200">
                            {e.data.email}
                          </span>
                          <span className="text-sm font-light text-gray-400 dark:text-gray-200">
                            {e.data.name}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={async () => {
                            await deleteDoc(
                              doc(
                                appFirestore,
                                `USERS/${user.email}/${user.agent_key}/`,
                                `${e.id}`
                              )
                            )
                            const updatedHistory = chatHistory.filter(
                              (item) => item.id !== e.id
                            )
                            setChatHistory(updatedHistory)
                          }}
                          className="text-sm text-gray-500 hover:text-gray-400 hover:underline dark:text-gray-300 dark:hover:text-gray-200"
                        >
                          <TrashIcon className="h-6 w-6 text-gray-500 hover:text-red-500" />
                        </button>
                      </div>
                      <div className="flex w-full items-start justify-between">
                        <div>
                          {e.data.feedback < 1 ? (
                            <span className="text-sm font-semibold text-gray-500 dark:text-gray-300">
                              No Feedback was given
                            </span>
                          ) : (
                            <div className="flex items-center justify-start">
                              {Array.from(
                                { length: e.data.feedback },
                                (_, index) => (
                                  <StarIcon
                                    key={index}
                                    className="h-6 w-6 text-yellow-500"
                                  />
                                )
                              )}
                              {Array.from(
                                { length: 5 - e.data.feedback },
                                (_, index) => (
                                  <StarIcon
                                    key={index}
                                    className="h-6 w-6 text-gray-500"
                                  />
                                )
                              )}
                            </div>
                          )}
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            setChats(e.data.chat)
                            setOpenChat(true)
                          }}
                          className="text-sm text-gray-500 hover:text-gray-400 hover:underline"
                        >
                          See chat
                        </button>
                      </div>
                    </div>
                  )
                })}
              </div>
            ) : (
              <AgentChat404 />
            )}
          </div>
        ) : (
          <div className="text-token-text-primary mx-auto flex h-full w-full flex-col items-center justify-center gap-2 pb-2 text-sm">
            <LoaderSpinner />
          </div>
        )}
      </div>
    </>
  )
}
