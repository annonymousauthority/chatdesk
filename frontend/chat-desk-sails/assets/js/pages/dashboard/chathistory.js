import AgentChat404 from '@/components/AgentChat404'

export default function ChatHistoryPage({ user }) {
  return (
    <div className="relative flex h-full flex-col items-start justify-start overflow-y-auto">
      <div className="flex flex-col items-start justify-start">
        <h1 className="text-4xl font-bold text-gray-400 dark:text-gray-200">Chat History</h1>
        <p className="text-sm text-gray-400">
          View the chat History of all your Chat Agents.
        </p>
      </div>
      <div className="mx-auto flex items-center justify-center">
        <AgentChat404 />
      </div>
    </div>
  )
}
