import { useEffect, useState } from 'react'
import ChatScreen from './ChatScreen'
import { doc, setDoc, updateDoc } from 'firebase/firestore'
import { StarIcon as StarSolidIcon } from '@heroicons/react/20/solid'
import { StarIcon as StarOutlineIcon } from '@heroicons/react/24/outline'
import { appFirestore } from '@/components/lib/firebase'

export default function ChatWidget({ agentConfig, id, agentKey, loading }) {
  const [loadChat, setLoadChat] = useState(false)
  const [view, setView] = useState(0)
  const [customer, setCustomer] = useState({
    email: '',
    name: '',
  })
  const [rating, setRating] = useState(0)
  const [isRated, setIsRated] = useState(false)
  const [rating_comment, setRatingComment] = useState('')
  const MAX_RATING = 5

  const handleRatingChange = async (newRating) => {
    setRating(newRating)
  }

  useEffect(() => {
    if (rating > 0) {
      ;(async () => {
        const chatRef = doc(
          appFirestore,
          `USERS/${id}/${agentKey}`,
          `Chat-by-${customer.email}`
        )
        await updateDoc(chatRef, {
          feedback: rating,
        })
        setTimeout(() => {
          setIsRated(true)
        }, 2000)
      })()
    }
  }, [rating])

  const [inSession, setInSession] = useState(false)
  async function createConversation(e) {
    e.preventDefault()
    await setDoc(
      doc(appFirestore, `USERS/${id}/${agentKey}`, `Chat-by-${customer.email}`),
      {
        chat: [],
        email: customer.email,
        name: customer.name,
        feedback: 0,
        feedback_comment: '',
      }
    )
    setInSession(true)
    setView(2)
  }

  async function sendFeedback(e) {
    e.preventDefault()
    if (rating_comment != null || rating_comment != '') {
      const chatRef = doc(
        appFirestore,
        `USERS/${id}/${agentKey}`,
        `Chat-by-${customer.email}`
      )
      await updateDoc(chatRef, {
        feedback_comment: rating_comment,
      })
      setCustomer({
        email: '',
        name: '',
      })
      setView(0)
    }
  }
  switch (view) {
    case 0:
      return (
        <div className="flex h-full w-full flex-col rounded-br-2xl rounded-tr-2xl bg-gray-800 to-white px-8  transition-transform delay-75 duration-300 ease-in-out">
          <div className="mt-12 flex w-full flex-col text-3xl font-bold text-white">
            <span>Hello ❤️</span>
            <span>How can we help?</span>
          </div>
          <button
            type="button"
            disabled={loading}
            onClick={() => {
              setView(1)
            }}
            className="mt-6 flex min-h-[65px] w-full cursor-pointer items-center justify-between rounded-xl bg-gray-100 p-3 text-left hover:bg-gray-200"
          >
            <div className="flex w-3/4 flex-col items-start justify-start">
              <span>Speak to our AI Agent</span>
              <span className="text-xs text-gray-400">
                Get real-time, and timely suppport.
              </span>
            </div>
            <div className="flex w-1/4 justify-end">
              <div className="flex h-[40px] w-[40px] items-center justify-center rounded-full bg-blue-950 text-2xl">
                <span>👩🏽‍🦱</span>
              </div>
            </div>
          </button>
          {!loading && Object.entries(agentConfig.Quicklinks).length > 0 ? (
            <div className="mt-6 flex min-h-[150px] flex-col items-start justify-start space-y-3 rounded-xl bg-white p-3">
              <span className="text-xl font-semibold text-gray-500">
                Quick Links
              </span>
              <div className="flex w-full flex-col space-y-3">
                {Object.entries(agentConfig.Quicklinks).map(
                  ([title, link], i) => (
                    <a
                      key={i}
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex w-full items-center justify-between text-sm hover:text-blue-400"
                    >
                      <span>{title}</span>
                      <span>{'>'}</span>
                    </a>
                  )
                )}
              </div>
            </div>
          ) : (
            <div></div>
          )}
        </div>
      )
    case 1:
      return (
        <div className="flex h-full w-full flex-col rounded-br-2xl rounded-tr-2xl bg-gray-800 ">
          <div className="flex h-full w-full flex-col items-start justify-start overflow-y-auto px-4">
            <div className="mt-12 flex w-full flex-col items-start justify-start text-left text-white">
              <span className="w-full text-xl font-semibold">
                Hello, My name is {agentConfig?.name}
              </span>
              <span className="text-sm font-light">
                {agentConfig?.description}
              </span>
            </div>
            <form
              onSubmit={createConversation}
              className="mt-6 flex w-full flex-col space-y-4"
            >
              <div className="flex flex-col justify-start">
                <label className="text-sm font-light text-gray-200">
                  Name:
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={customer.name}
                  onChange={(e) =>
                    setCustomer({ ...customer, name: e.target.value })
                  }
                  required
                  className="w-full border border-gray-200 p-2 placeholder:text-sm placeholder:font-light placeholder:text-gray-500"
                  placeholder="John Felix"
                ></input>
              </div>
              <div className="flex flex-col justify-start">
                <label className="text-sm font-light text-gray-200">
                  Email:
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={customer.email}
                  onChange={(e) =>
                    setCustomer({ ...customer, email: e.target.value })
                  }
                  required
                  className="w-full border border-gray-200 p-2 placeholder:text-sm placeholder:font-light placeholder:text-gray-500"
                  placeholder="j.felix@gmail.com"
                ></input>
              </div>
              <div className="flex flex-col space-y-1">
                <button
                  type="submit"
                  className="mt-3 w-full cursor-pointer rounded-xl bg-blue-700 p-2 text-white transition-transform delay-75 duration-300 hover:scale-105 hover:bg-blue-800"
                >
                  Begin Conversation
                </button>
                <button
                  type="button"
                  className="mx-auto cursor-pointer text-center text-white"
                  onClick={() => setView(0)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )
    case 2:
      return (
        <div className="relative flex h-full w-full flex-col rounded-br-2xl rounded-tr-2xl bg-blue-100 to-white px-8 ">
          <div className="h-full w-full overflow-y-auto">
            <ChatScreen
              customer={customer}
              agentConfig={agentConfig}
              agentKey={agentKey}
              id={id}
              onClose={() => {
                setInSession(false)
                setView(3)
              }}
            />
          </div>
        </div>
      )
    case 3:
      return (
        <div className="relative flex h-full w-full flex-col items-center justify-center rounded-br-2xl rounded-tr-2xl bg-blue-50 to-white px-8 ">
          <div className="mx-auto flex h-full w-full flex-col items-center justify-center overflow-y-auto">
            <span className="text-2xl font-semibold text-gray-400">
              Leave Feedback
            </span>
            <div className="flex w-full flex-col items-center justify-start space-y-4">
              {isRated ? (
                <div></div>
              ) : (
                <div className="flex items-center">
                  {[...Array(MAX_RATING)].map((_, index) => (
                    <span
                      key={index}
                      className="cursor-pointer"
                      onClick={() => handleRatingChange(index + 1)}
                    >
                      {rating >= index + 1 ? (
                        <StarSolidIcon className="h-8 w-8 text-yellow-400" />
                      ) : (
                        <StarOutlineIcon className="h-8 w-8 text-gray-400" />
                      )}
                    </span>
                  ))}
                </div>
              )}
              <p>
                Your rating: {rating} {rating > 4 ? '🎉' : ''}
              </p>
              <form className="w-full" onSubmit={sendFeedback}>
                <textarea
                  placeholder="Say something nice..."
                  className="w-full resize-none border border-gray-300 p-3 text-sm font-light focus:outline-none"
                  cols={5}
                  value={rating_comment}
                  onChange={(e) => setRatingComment(e.target.value)}
                  required
                  rows={3}
                />
                <button
                  type="submit"
                  className="w-full bg-blue-400 p-3 text-white hover:bg-blue-500"
                >
                  Send Feedback
                </button>
              </form>
            </div>
          </div>
        </div>
      )
    default:
      break
  }
}
