import { Link, router } from '@inertiajs/react'
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth'
import { useEffect, useState } from 'react'
import Loader from './LoaderComp'
import LoaderSpinner from './Loader-Comp'
import { appAuth } from '@/pages/lib/firebase'

export default function LoginScreen() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [warning, setWarning] = useState('')
  const [checking, setChecking] = useState(false)
  async function signInPassword(e) {
    e.preventDefault()
    setChecking(true)
    signInWithEmailAndPassword(appAuth, formData.email, formData.password)
      .then((user) => {
        router.get('/dashboard/chat-history')
        setTimeout(() => {
          setChecking(false)
        }, 1500)
      })
      .catch((error) => {
        setTimeout(() => {
          setChecking(false)
        }, 1500)
        setWarning('Unable to sign in. Please try again later...')
      })
  }
  const signinPopup = async () => {
    const provider = new GoogleAuthProvider()
    signInWithPopup(appAuth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result)
        const token = credential.accessToken
        const user = result.user
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
        const email = error.customData.email
        const credential = GoogleAuthProvider.credentialFromError(error)
      })
  }
  return (
    <div className="w-full border-2 border-gray-100 p-6 py-10 shadow-lg shadow-gray-200 dark:border-gray-600 dark:bg-black/20 dark:shadow-gray-800">
      <form onSubmit={signInPassword} className="h-full w-full space-y-6 ">
        <div className="flex w-full flex-col items-start justify-start">
          <label className="font-regular text-[14px] text-gray-400">
            Email
          </label>
          <input
            placeholder="Enter email"
            type="email"
            id="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            required
            className="placeholder:font-regular w-full border border-gray-200 p-3 placeholder:text-sm placeholder:text-gray-300 focus:outline-1 focus:outline-blue-100 dark:text-gray-700"
          ></input>
        </div>
        <div className="flex w-full flex-col items-start justify-start">
          <label className="font-regular text-[14px] text-gray-400">
            Password
          </label>
          <input
            placeholder="••••••••"
            type="password"
            id="password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            required
            className="placeholder:font-regular w-full border border-gray-200 p-3 placeholder:text-sm placeholder:text-gray-300 focus:outline-1 focus:outline-blue-100 dark:text-gray-700"
          ></input>
        </div>
        <div className="flex w-full justify-end">
          <Link href={'/'} className="text-sm text-blue-600 hover:underline">
            Forgot Password
          </Link>
        </div>
        <div className="w-full">
          <button
            type="submit"
            disabled={checking}
            className={
              checking
                ? 'flex w-full items-center justify-center space-x-3 bg-gray-500 p-3 text-white hover:shadow-lg hover:shadow-blue-100 dark:hover:shadow-gray-800'
                : 'flex w-full items-center justify-center space-x-3 bg-blue-600 p-3 text-white hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-100 dark:hover:shadow-gray-800'
            }
          >
            {checking ? <LoaderSpinner /> : <span>Sign in</span>}
          </button>
          <span className="flex justify-center space-x-2 text-sm">
            <span>{"Don't"} have an account? </span>
            <Link
              href="/signup"
              className="text-blue-600 hover:text-blue-700 hover:underline"
            >
              Sign up
            </Link>
          </span>
        </div>
        <div className="w-full border border-dashed border-gray-200"></div>
      </form>
      <div className="mt-6 w-full">
        <button
          type="button"
          onClick={() => {
            signinPopup()
          }}
          className="flex w-full justify-center space-x-12 border border-blue-400/10 bg-white p-3 text-black hover:bg-blue-100 dark:bg-gray-900 dark:text-white dark:hover:bg-gray-700"
        >
          <span></span>
          <img
            alt="Google Logo"
            width={25}
            height={25}
            src={'/images/google_logo.png'}
          />
          <span className="text-gray-400">Sign in with Google</span>
          <span></span>
        </button>
      </div>
    </div>
  )
}
