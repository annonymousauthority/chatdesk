import ChatFrame from '@/components/Chat-Frame'

export default function Index({ agentKey }) {
  return (
    <div className="relative my-auto">
      <ChatFrame agentKey={agentKey} />
    </div>
  )
}
