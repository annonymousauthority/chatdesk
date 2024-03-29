import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyAPg0h2K7AifxsnHqIOX_PJrDepyScaWhE',
  authDomain: 'chat-desk-1eeb2.firebaseapp.com',
  projectId: 'chat-desk-1eeb2',
  storageBucket: 'chat-desk-1eeb2.appspot.com',
  messagingSenderId: '177779577500',
  appId: '1:177779577500:web:5b94bbf62d781f35081359',
  measurementId: 'G-XJCW8DYP49',
}

const app = initializeApp(firebaseConfig)

const appFirestore = getFirestore(app)
const appStorage = getStorage(app)
const appAuth = getAuth(app)

export { appStorage, appAuth, appFirestore }
