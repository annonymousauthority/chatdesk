import { useEffect, useState } from 'react'
import ChatWidget from './Chat-Widget'
import { appFirestore } from './lib/firebase'
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from 'firebase/firestore'

export default function ChatFrame({ agentKey }) {
  const [agentConfig, setagentConfig] = useState(null)
  const [userID, setuserID] = useState(null)
  const [loading, setLoading] = useState(true)
  const [minimized, setMinimized] = useState(false)

  useEffect(() => {
    if (agentConfig == null) {
      ;(async () => {
        const q = query(
          collection(appFirestore, 'USERS'),
          where('agent_key', '==', agentKey)
        )
        const querySnapshot = await getDocs(q)
        const id = querySnapshot.docs[0].id
        setuserID(id)
        const docRef = doc(appFirestore, `USERS/${id}/${agentKey}`, 'config')
        const docSnap = await getDoc(docRef)

        if (docSnap.exists()) {
          setagentConfig(docSnap.data())
          setLoading(false)
        } else {
          console.log('No such document!')
        }
      })()
    } else {
      setLoading(false)
    }
  }, [agentConfig])
  return (
    <div className="mx-auto flex h-[700px] min-h-full  w-3/4 max-w-[1200px] items-start justify-center rounded-2xl border">
      <div className="hidden h-full w-1/2 flex-col items-start justify-between bg-white lg:flex">
        <div className="h-[65px] w-full rounded-tl-2xl bg-gray-700"></div>
        <div className="h-65 flex w-full items-center justify-center space-x-3 rounded-xl py-6">
          <img
            alt="Logo Icon"
            src="./images/logo_powered.png"
            width="25"
            height="25"
          />
          <span className="text-sm font-light text-gray-500">
            Powered by Chat Desk
          </span>
        </div>
      </div>
      <div className="h-full w-full lg:w-1/2">
        <ChatWidget
          agentConfig={agentConfig}
          id={userID}
          agentKey={agentKey}
          loading={loading}
        />
        <div className="h-65 flex w-full items-center justify-center space-x-3 rounded-xl py-6 lg:hidden">
          <img
            alt="Logo Icon"
            src="./images/logo_powered.png"
            width="25"
            height="25"
          />
          <span className="text-sm font-light text-gray-500">
            Powered by Chat Desk
          </span>
        </div>
      </div>
    </div>
  )
}
