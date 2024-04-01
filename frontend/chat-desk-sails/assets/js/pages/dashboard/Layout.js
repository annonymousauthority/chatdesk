import Footer from '@/components/Footer'
import LoaderSpinner from '@/components/Loader-Comp'
import { LockClosedIcon } from '@heroicons/react/24/outline'
import { Link, router } from '@inertiajs/react'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { collection, doc, getDoc, getDocs } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { appAuth, appFirestore } from '@/pages/lib/firebase'

export default function DashboardLayout({ children }) {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)
  const [profileConfig, setProfileConfig] = useState(null)

  useEffect(() => {
    onAuthStateChanged(appAuth, async (user) => {
      if (!user) {
        router.get('/login')
      } else {
        const docRef = doc(appFirestore, 'USERS', user.email)
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
          setUser(docSnap.data())
          const userDocRef = doc(appFirestore, 'USERS', user.email)
          const configCollectionRef = collection(
            userDocRef,
            docSnap.data().config_code
          )
          const qconfigSnap = await getDocs(configCollectionRef)
          qconfigSnap.forEach((doc) => {
            if (doc.id === 'config') {
              setProfileConfig(doc.data())
            }
          })
        } else {
          router.get('/login')
        }
        setLoading(false)
      }
    })
  }, [])
  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <LoaderSpinner />
      </div>
    )
  } else {
    return (
      <main className="inter-chat-desk relative flex min-h-screen flex-col overflow-hidden">
        <nav className=" mx-auto w-full">
          <div className="mx-auto flex  max-w-6xl items-center justify-between">
            <img
              src="/images/logo_chat_desk.png"
              width={150}
              height={150}
              className="block dark:hidden"
            />
            <img
              src="/images/logo_chat_desk_white.png"
              width={150}
              height={150}
              className="hidden dark:block"
            />
            <div className="flex justify-end space-x-6">
              <button
                type="button"
                onClick={() => {
                  signOut(appAuth).then(() => {
                    router.visit('/login')
                  })
                }}
              >
                Logout
              </button>
              <img
                src={user.photoURL}
                width={50}
                height={50}
                className="rounded-full"
              />
            </div>
          </div>
        </nav>
        <div className="mt-24 min-h-screen w-full overflow-auto pb-64">
          <div className="mx-auto flex max-w-6xl items-start justify-start">
            <div className="flex h-full w-[15%] flex-col items-start justify-start space-y-12 overflow-y-hidden">
              <div className="flex flex-col items-start justify-start space-y-6">
                <span className="text-2xl font-bold">Agents</span>
                <ul className="flex flex-col items-start justify-start space-y-3 text-sm font-light">
                  <Link
                    href="/dashboard/chat-history"
                    className="font-normal hover:text-gray-400 hover:underline"
                  >
                    Chat History
                  </Link>
                  <Link
                    href="/dashboard/feedback-history"
                    className="font-normal hover:text-gray-400 hover:underline"
                  >
                    Feedback
                  </Link>
                  <Link
                    href="/dashboard/manage-agents"
                    className="font-normal hover:text-gray-400 hover:underline"
                  >
                    Manage Agents
                  </Link>
                </ul>
              </div>
              <div className="flex flex-col items-start justify-start space-y-6">
                <span className="text-2xl font-bold">Organization</span>
                <ul className="flex flex-col items-start justify-start space-y-3 text-sm font-light">
                  <Link
                    href="/dashboard/metrics"
                    className="font-normal hover:text-gray-400 hover:underline"
                  >
                    Usage Metric
                  </Link>
                  {profileConfig.invite_permission ? (
                    <Link
                      href="/dashboard/invite-users"
                      className="flex items-center justify-between font-normal hover:text-gray-400 hover:underline"
                    >
                      <span> Invite Collaborators</span>
                    </Link>
                  ) : (
                    <div className="flex cursor-pointer items-center justify-between font-normal hover:text-gray-400 hover:underline">
                      <span> Invite Collaborators</span>
                      <LockClosedIcon className="h-4 w-4 font-bold text-red-300" />
                    </div>
                  )}
                  <Link
                    href="/dashboard/billings"
                    className="font-normal hover:text-gray-400 hover:underline"
                  >
                    Billing
                  </Link>
                </ul>
              </div>
              <div className="flex flex-col items-start justify-start space-y-6">
                <span className="text-2xl font-bold">Docs</span>
                <ul className="flex flex-col items-start justify-start space-y-3 text-sm font-light">
                  {profileConfig.embed_code ? (
                    <Link
                      href="/dashboard/setup-widget"
                      className="flex items-center justify-between font-normal hover:text-gray-400 hover:underline"
                    >
                      <span> Embed Code</span>
                    </Link>
                  ) : (
                    <div className="flex cursor-pointer items-center justify-between font-normal hover:text-gray-400 hover:underline">
                      <span> Embed Code</span>
                      <LockClosedIcon className="h-4 w-4 font-bold text-red-300" />
                    </div>
                  )}
                  <Link
                    href="/dashboard/learn-chatdesk"
                    className="flex items-center justify-between font-normal hover:text-gray-400 hover:underline"
                  >
                    <span>Learn</span>
                  </Link>
                </ul>
              </div>
            </div>
            <article className="w-[85%] overflow-hidden lg:ml-8">
              {React.cloneElement(children, { user, profileConfig })}
            </article>
          </div>
        </div>
        {/* http://localhost:3001/?agentKey=Ax13g_nih0ld */}
      
        <Footer />
      </main>
    )
  }
}
