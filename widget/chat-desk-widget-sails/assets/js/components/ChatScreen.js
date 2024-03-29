import { appFirestore } from '@/config/firebase'
import { arrayUnion, doc, updateDoc } from 'firebase/firestore'
import React, { useState } from 'react'
export default function ChatScreen({
  agentConfig,
  id,
  agentKey,
  onClose,
  customer,
}) {
  const [message, setMessage] = useState('')
  const [chats, setChats] = useState([])

  async function createMessage(e) {
    e.preventDefault()
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

    await fetch('https://chatdesk-u4xh.onrender.com/queryembeddings/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: message,
      }),
    })
      .then((response) => {
        console.log(response)
        setMessage('')
      })
      .catch((error) => {
        console.log(error)
        setMessage('')
      })
  }
  return (
    <div className="w-full overflow-hidden">
      <div className="absolute left-0 top-0 flex h-[35px] w-full items-center justify-between rounded-tl-xl rounded-tr-xl border-2 border-blue-700 bg-blue-700 p-2">
        <span className="text-sm font-light text-white">Chat with Alakey</span>
        <button
          type="button"
          onClick={() => onClose()}
          className="text-center text-sm text-white"
        >
          Close Chat
        </button>
      </div>

      <div className="mt-12 flex h-full w-full flex-col space-y-2 overflow-y-auto">
        {chats.map((e, i) => {
          if (e.sender == 'ai') {
            return (
              <div key={i} className="flex w-full justify-start">
                <div className="flex w-3/4 flex-wrap justify-start rounded-xl bg-green-100 p-3 text-sm font-light text-gray-600">
                  <span>{e.message}</span>
                </div>
              </div>
            )
          }
          if (e.sender == 'user') {
            return (
              <div key={i} className="flex w-full justify-end">
                <div className="flex w-3/4 flex-wrap justify-end rounded-xl bg-pink-100 p-3 text-sm font-light text-gray-600">
                  <span>{e.message}</span>
                </div>
              </div>
            )
          }
        })}
      </div>
      <form
        onSubmit={createMessage}
        className="absolute bottom-2 left-0 flex h-[35px] w-full items-center justify-center rounded-xl bg-gray-50"
      >
        <textarea
          maxLength={200}
          rows={2}
          cols={2}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Write your message here..."
          className="w-full rounded-lg p-1 text-sm font-light placeholder:text-xs focus:border-none focus:outline-none focus:ring-0 active:border-none active:ring-0"
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
