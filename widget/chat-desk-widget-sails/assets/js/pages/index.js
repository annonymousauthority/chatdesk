import ChatWidget from '@/components/Chat-Widget'
import ChatWidgetContainer from '@/components/ChatWidgetContainer'
import { appFirestore } from '@/components/lib/firebase'
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from 'firebase/firestore'
import { useEffect, useState } from 'react'

export default function Index({ agentKey }) {
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
  const onButtonMinimize = (state) => {
    setMinimized(state)
  }
  if (loading) {
    return <></>
  } else {
    return (
      <div className="relative ">
        <ChatWidgetContainer>
          <ChatWidget
            agentConfig={agentConfig}
            id={userID}
            agentKey={agentKey}
            onMinimize={onButtonMinimize}
          />
        </ChatWidgetContainer>
      </div>
    )
  }
}
