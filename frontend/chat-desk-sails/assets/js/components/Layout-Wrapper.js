import Footer from '@/components/Footer'
import { appAuth } from '@/pages/lib/firebase'
import { Link, router } from '@inertiajs/react'
import { onAuthStateChanged } from 'firebase/auth'
import { useEffect, useState } from 'react'

export default function LayoutWrapper({ children }) {
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    onAuthStateChanged(appAuth, (user) => {
      if (user) {
        router.get('dashboard/chat-history/')
      } else {
        setLoading(false)
      }
    })
  }, [])
  if (loading) {
    return <div></div>
  } else {
    return (
      <>
        <main className="inter-chat-desk relative">
          <nav className="mx-auto mt-3 w-full">
            <div className="mx-auto flex max-w-6xl items-center justify-between">
              <div>
                <Link href="/">
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
                </Link>
              </div>
              <div className="flex items-center justify-center space-x-8">
                <Link
                  href="/"
                  className="hover:underline-blue-600 text-base font-medium hover:underline"
                >
                  Home
                </Link>
                <Link
                  href="/features"
                  className="hover:underline-blue-600 text-base font-medium hover:underline"
                >
                  Features
                </Link>
                <Link
                  href="/pricing"
                  className="hover:underline-blue-600 text-base font-medium hover:underline"
                >
                  Pricing
                </Link>
              </div>
              <div>
                <Link
                  href="/login"
                  className="w-[250px] rounded-xl bg-blue-600 p-3 text-white hover:bg-blue-700 hover:shadow-sm hover:shadow-blue-600/50"
                >
                  Signin
                </Link>
              </div>
            </div>
          </nav>
          <article>{children}</article>
          <Footer />
        </main>
      </>
    )
  }
}
