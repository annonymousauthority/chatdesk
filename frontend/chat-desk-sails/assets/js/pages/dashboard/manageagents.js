import CreateAgentModal from '@/components/CreateAgentModal'
import LoaderSpinner from '@/components/Loader-Comp'
import NoAgent404 from '@/components/NoAgent404'
import { TrashIcon } from '@heroicons/react/24/outline'
import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { appFirestore } from '../lib/firebase'

export default function ManageAgents({ user, profileConfig }) {
  const [createAgent, setCreateAgent] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [agent, setAgent] = useState(null)
  const [chatSessions, setChatSessions] = useState(0)
  const [agentData, setAgentData] = useState({
    rating: 0,
    feedback_count: 0,
  })

  function timestampToDate(timestamp) {
    const date = new Date(timestamp)
    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0') // Month is zero-indexed, so we add 1
    const year = date.getFullYear()

    return `${day}/${month}/${year}`
  }

  useEffect(() => {
    ;(async () => {
      console.log(new Date().getTime())
      let agent = []
      let count = 0
      let feedback_count = 0
      let rating_count = 0
      const userDocRef = doc(appFirestore, 'USERS', user.email)
      const agentCollectionRef = collection(userDocRef, user.agent_key)

      const qSnap = await getDocs(agentCollectionRef)

      qSnap.forEach((doc) => {
        if (doc.id === 'config') {
          agent.push(doc.data())
        } else {
          if (doc.data().feedback > 0) {
            feedback_count++
            let rc = rating_count
            rc += doc.data().feedback
            rating_count = Math.floor(rc / feedback_count)
          }
          count++
        }
      })
      setAgentData({
        ...agentData,
        rating: rating_count,
        feedback_count: feedback_count,
      })
      setChatSessions(count)
      setAgent(agent)
      setTimeout(() => {
        setIsLoading(false)
      }, 500)
    })()
  }, [])
  return (
    <div className="relative flex h-full flex-col items-start justify-start overflow-y-auto">
      <div className="flex w-full items-center justify-between">
        <div className="flex flex-col items-start justify-start">
          <h1 className="text-4xl font-bold text-gray-600 dark:text-gray-200">
            Manage Agents
          </h1>
          <p className="text-sm text-gray-400">
            You can manage your deployed agents here, or deploy new ones.
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            setCreateAgent(true)
          }}
          disabled={profileConfig.number_of_agent == 1 && agent != null}
          className={
            profileConfig.number_of_agent == 1 && agent != null
              ? 'w-[150px] rounded-xl bg-gray-400 p-1 text-white '
              : 'w-[150px] rounded-xl bg-blue-600 p-1 text-white hover:bg-blue-700'
          }
        >
          Add Agent
        </button>
      </div>
      <div className="flex w-full items-center justify-start">
        {!isLoading ? (
          <div className="mt-6 flex w-full items-center justify-center lg:w-[50%]">
            {agent != null ? (
              <div className="flex h-full w-full flex-col items-start justify-start rounded-xl border border-gray-200 bg-gray-100 p-3 shadow-lg shadow-gray-200 dark:bg-gray-800">
                <div className="flex w-full items-center justify-between">
                  <span className="text-xl font-semibold text-black dark:text-white">
                    {agent[0].name}
                  </span>
                  <button
                    type="button"
                    onClick={async () => {
                      await deleteDoc(
                        doc(
                          appFirestore,
                          `USERS/${user.email}/${user.agent_key}/`,
                          `config`
                        )
                      )
                      setAgent(null)
                    }}
                    className="text-sm text-gray-500 hover:text-gray-400 hover:underline dark:text-gray-300 dark:hover:text-gray-200"
                  >
                    <TrashIcon className="h-6 w-6 text-gray-500 hover:text-red-500" />
                  </button>
                </div>
                <div className="mt-6 flex w-full items-end justify-between">
                  <div className="flex flex-col items-start justify-start text-sm text-gray-500">
                    <span>Total Chat Sessions: {chatSessions}</span>
                    <span>Star Rating: {agentData.rating}</span>
                    <span>Feedback Count: {agentData.feedback_count}</span>
                  </div>
                  <div className="flex flex-col items-start justify-start text-sm font-light text-gray-500">
                    <span>Deployed Date:</span>
                    <span>{timestampToDate(agent[0].deployed_date)}</span>
                  </div>
                </div>
              </div>
            ) : (
              <NoAgent404 />
            )}
          </div>
        ) : (
          <div className="text-token-text-primary mx-auto flex h-full w-full flex-col items-center justify-center gap-2 pb-2 text-sm">
            <LoaderSpinner />
          </div>
        )}
      </div>
      <CreateAgentModal
        open={createAgent}
        close={() => {
          setCreateAgent(false)
        }}
      />
    </div>
  )
}
