import { appAuth, appFirestore } from '@/lib/firebase'
import { Link } from '@inertiajs/react'
import {
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth'
import { addDoc, collection, doc, setDoc } from 'firebase/firestore'
import { useState } from 'react'
import Loader from './LoaderComp'

export default function SignupScreen() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  })
  const [warning, setWarning] = useState('')
  const [checking, setChecking] = useState(false)
  const [agreement, setAgreement] = useState(false)

  const signupByPassword = (e) => {
    e.preventDefault()
    setChecking(true)
    setWarning('')
    if (agreement) {
      createUserWithEmailAndPassword(appAuth, formData.email, formData.password)
        .then(async (user) => {
          await setDoc(doc(appFirestore, 'USERS', formData.email), {
            name: formData.name,
            email: formData.email,
            photoURL:
              'https://firebasestorage.googleapis.com/v0/b/chat-desk-1eeb2.appspot.com/o/circle_logo_icon.png?alt=media&token=b7fc7095-7909-403d-9724-32cd0530933c',
          })
          setTimeout(() => {
            setChecking(false)
          }, 1500)
        })
        .catch((error) => {
          setTimeout(() => {
            setChecking(false)
          }, 1500)
          setWarning('Unable to sign in... Try again later')
        })
    } else {
      setTimeout(() => {
        setChecking(false)
      }, 1500)
      setWarning('Please agree to terms of service before creating an account.')
      setTimeout(() => {
        setWarning('')
      }, 3000)
    }
  }

  const popupGoogle = async () => {
    if (agreement) {
      const provider = new GoogleAuthProvider()
      signInWithPopup(appAuth, provider)
        .then(async (result) => {
          const credential = GoogleAuthProvider.credentialFromResult(result)
          const token = credential.accessToken
          const user = result.user
          await setDoc(doc(appFirestore, 'USERS', user.email), {
            name: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
          })
        })
        .catch((error) => {
          const errorCode = error.code
          const errorMessage = error.message
          const email = error.customData.email
          const credential = GoogleAuthProvider.credentialFromError(error)
        })
    } else {
      setWarning('Please agree to terms of service before creating an account.')
      setTimeout(() => {
        setWarning('')
      }, 3000)
    }
  }
  return (
    <div className="w-full border-2 border-gray-100 p-6 py-10 shadow-lg shadow-gray-200 dark:border-gray-600 dark:bg-black/20 dark:shadow-gray-800">
      <form onSubmit={signupByPassword} className="h-full space-y-6 ">
        <div className="flex w-full flex-col items-start justify-start">
          <label className="font-regular text-[14px] text-gray-400">
            Full Name
          </label>
          <input
            placeholder="John Doe"
            type="text"
            id="name"
            value={formData.name}
            onChange={(e) => {
              setFormData({ ...formData, name: e.target.value })
            }}
            maxLength={45}
            required
            className="placeholder:font-regular w-full border border-gray-200 p-3 placeholder:text-sm placeholder:text-gray-300 focus:outline-1 focus:outline-blue-100 dark:text-gray-700"
          ></input>
        </div>
        <div className="flex w-full flex-col items-start justify-start">
          <label className="font-regular text-[14px] text-gray-400">
            Email
          </label>
          <input
            placeholder="Enter email"
            type="email"
            id="email"
            value={formData.email}
            onChange={(e) => {
              setFormData({ ...formData, email: e.target.value })
            }}
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
            onChange={(e) => {
              setFormData({ ...formData, password: e.target.value })
            }}
            required
            className="placeholder:font-regular w-full border border-gray-200 p-3 placeholder:text-sm placeholder:text-gray-300 focus:outline-1 focus:outline-blue-100 dark:text-gray-700"
          ></input>
        </div>
        <div className="w-full">
          <button
            type="submit"
            className="flex w-full items-center justify-center space-x-3 bg-blue-600 p-3 text-white hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-100 dark:hover:shadow-gray-800"
          >
            <Loader checker={checking} />
            <span>Sign up</span>
          </button>
          <span className="flex justify-center space-x-2 text-sm">
            <span>Already have an account? </span>
            <Link
              href={'/login'}
              className="text-blue-600 hover:text-blue-700 hover:underline"
            >
              Sign in
            </Link>
          </span>
        </div>
        <div className="w-full border border-dashed border-gray-200"></div>
      </form>
      <div className="mt-6 w-full">
        <small className="text-center text-sm font-light text-red-300">
          {warning}
        </small>
        <button
          type="button"
          onClick={() => {
            popupGoogle()
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
        <div className="mt-2 flex items-start justify-start space-x-3">
          <input
            type="checkbox"
            checked={agreement}
            onChange={() => {
              setAgreement(!agreement)
            }}
            className="mt-2 h-4 w-4"
          />
          <span className="text-sm text-gray-500">
            I agree to the{' '}
            <Link href={'/'} className="text-blue-400 underline">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link href={'/'} className="text-blue-400 underline">
              Privacy Policy{' '}
            </Link>
            of Chat Desk.
          </span>
        </div>
      </div>
    </div>
  )
}
