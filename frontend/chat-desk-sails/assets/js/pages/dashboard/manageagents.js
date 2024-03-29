import CreateAgentModal from '@/components/CreateAgentModal'
import NoAgent404 from '@/components/NoAgent404'
import { useEffect, useState } from 'react'

export default function ManageAgents() {
  const [createAgent, setCreateAgent] = useState(false)
  return (
    <div className="relative flex h-full flex-col items-start justify-start overflow-y-auto">
      <div className="flex w-full items-center justify-between">
        <div className="flex flex-col items-start justify-start">
          <h1 className="text-4xl font-bold text-gray-400 dark:text-gray-200">
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
          className="w-[150px] rounded-xl bg-blue-600 p-1 text-white hover:bg-blue-700"
        >
          Add Agent
        </button>
      </div>
      <div className="mx-auto flex items-center justify-center">
        <NoAgent404 />
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
