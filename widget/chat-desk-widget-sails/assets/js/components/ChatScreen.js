// @ts-nocheck
import { appFirestore } from '@/components/lib/firebase'
import { arrayUnion, doc, updateDoc } from 'firebase/firestore'
import { useEffect, useState } from 'react'
export default function ChatScreen({
  agentConfig,
  id,
  agentKey,
  onClose,
  customer,
}) {
  const [message, setMessage] = useState('')
  const [chats, setChats] = useState([])

  useEffect(() => {
    setTimeout(() => {
      if (chats.length == 0) {
        let chat = [
          ...chats,
          {
            id: chats.length + 1,
            sender: 'ai',
            message: `Hello ${customer.name}, my name is ${agentConfig.name}. How can I help you today?`,
          },
        ]

        setChats(chat)
      }
    }, 1500)
  }, [])
  async function createMessage(e) {
    e.preventDefault()
    if (message != '' && message != null) {
      const mes = message
      let chat = {
        id: chats.length + 1,
        sender: 'user',
        message: message,
      }
      const chatRef = doc(
        appFirestore,
        `USERS/${id}/${agentKey}`,
        `Chat-by-${customer.email}`
      )
      const updatedChat = [...chats]
      updatedChat.push(chat)
      setChats(updatedChat)
      await updateDoc(chatRef, {
        chat: arrayUnion(chat),
      })
      setMessage('')
      const maxRetries = 3
      let retriesRemaining = maxRetries

      const aiQueryResponse = async () => {
        try {
          const response = await fetch(
            ' https://chatdesk-u4xh.onrender.com/queryembeddings/',
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                query: mes,
                category: 'Customer Rep.',
                document: agentConfig.document,
                name: customer.name,
                agent: agentConfig.name,
              }),
            }
          )
          const json = await response.json()
          let ai_chat = {
            id: updatedChat.length + 1,
            sender: 'ai',
            message: json.augmented_response,
          }
          const chatRef = doc(
            appFirestore,
            `USERS/${id}/${agentKey}`,
            `Chat-by-${customer.email}`
          )
          const uchat = [...updatedChat]
          uchat.push(ai_chat)
          setChats(uchat)
          await updateDoc(chatRef, {
            chat: arrayUnion(ai_chat),
          })
        } catch (error) {
          if (retriesRemaining > 0) {
            retriesRemaining--
            setTimeout(aiQueryResponse, 1500)
          } else {
            console.log('Error found', error)
            let ai_chat = {
              id: updatedChat.length + 1,
              sender: 'ai',
              message: 'Unable to provide response, please try again later.',
            }
            const chatRef = doc(
              appFirestore,
              `USERS/${id}/${agentKey}`,
              `Chat-by-${customer.email}`
            )
            const uchat = [...updatedChat]
            uchat.push(ai_chat)
            setChats(uchat)
          }
        }
      }
      aiQueryResponse()
    }
  }
  return (
    <div className="h-full w-full overflow-y-auto py-6">
      <div className="absolute left-0 top-0 flex h-[35px] w-full items-center justify-between rounded-tr-xl border-2 border-blue-700 bg-blue-700 p-2">
        <span className="text-sm font-light text-white">Chat with Alakey</span>
        <button
          type="button"
          onClick={() => onClose()}
          className="text-center text-sm text-white"
        >
          Close Chat
        </button>
      </div>

      <div className="my-12 flex w-full flex-col space-y-2 ">
        {chats.map((e, i) => {
          if (e.sender == 'ai') {
            return (
              <div key={i} className="flex w-full justify-start">
                <div className="w-3/4 rounded-xl bg-green-100 p-3 text-sm font-light text-gray-600">
                  <span className="flex flex-wrap break-words text-sm">
                    {e.message}
                  </span>
                </div>
              </div>
            )
          }
          if (e.sender == 'user') {
            return (
              <div key={i} className="flex w-full flex-wrap justify-end">
                <div className="w-3/4 rounded-xl bg-pink-100 p-3 text-sm font-light text-gray-600">
                  <span className="break-word flex-wrap text-sm">
                    {e.message}
                  </span>
                </div>
              </div>
            )
          }
        })}
      </div>
      <form
        onSubmit={createMessage}
        className="absolute bottom-2 left-0 flex h-[35px] w-full resize-none items-center justify-center rounded-br-xl rounded-tl-xl rounded-tr-xl bg-gray-50"
      >
        <textarea
          maxLength={200}
          rows={2}
          cols={2}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Write your message here..."
          className="w-full rounded-br-lg rounded-tl-lg rounded-tr-lg p-1 text-sm font-light placeholder:text-xs focus:border-none focus:outline-none focus:ring-0 active:border-none active:ring-0"
        ></textarea>
        <button
          type="submit"
          className="click absolute right-0 px-4 hover:scale-110"
        >
          <img
            src={'/images/send_icon.png'}
            alt="Send button"
            width={15}
            height={15}
          />
        </button>
      </form>
    </div>
  )
}
