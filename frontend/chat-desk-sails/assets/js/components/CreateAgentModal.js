import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import {
  ChatBubbleLeftEllipsisIcon,
  LockClosedIcon,
} from '@heroicons/react/24/outline'
import UploadDocumentComp from './UploadDocumentComp'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { appFirestore, appStorage } from '@/pages/lib/firebase'
import LoaderSpinner from './Loader-Comp'
import { doc, setDoc } from 'firebase/firestore'

export default function CreateAgentModal({ open, close, email, agentKey }) {
  const [selectedCategory, setSelectedCategory] = useState('')
  const [file, setFile] = useState(null)
  const [warning, setWarning] = useState('')
  const [checking, setChecking] = useState(false)
  const [agentName, setAgentName] = useState('')
  const deployAgentRef = useRef(null)
  const onClose = () => {
    close()
  }
  function deployAgent(e) {
    e.preventDefault()
    setChecking(true)
    const uploadAgentDoc = async () => {
      if (file) {
        const storagePath = `userDoc/${email}/${file?.name}`

        const storageRef = ref(appStorage, storagePath)

        const metadata = {
          contentType: file.type,
        }

        const uploadTask = uploadBytesResumable(storageRef, file, metadata)

        uploadTask.on(
          'state_changed',
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            console.log(`Upload is ${progress}% done`)
          },
          (error) => {
            setChecking(false)
            setWarning('Unable to upload Document, please try again.')
            console.log(error)
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then(async (docURL) => {
              try {
                const response = await fetch(
                  'http://0.0.0.0:8000/chunkdocument/',
                  {
                    method: 'POST',
                    headers: {
                      'content-type': 'application/json',
                    },
                    body: JSON.stringify({ document: docURL }),
                  }
                )
                const json = await response.json()
                console.log(json)
                await setDoc(
                  doc(appFirestore, 'USERS', email, agentKey, 'config'),
                  {
                    quicklinks: [],
                    agent_key: agentKey,
                    category: 'General',
                    description: '',
                    document: json?.chunks,
                    name: agentName,
                    rules: [],
                    deployed_date: new Date(),
                  }
                )
                onClose()
                setChecking(false)
              } catch (error) {
                console.log(error)
                setWarning(
                  'Unable to Deploy Agent, please try again later or contact support.'
                )
                setChecking(false)
              }
            })
          }
        )
      }
    }
    uploadAgentDoc()
  }
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50"
        initialFocus={deployAgentRef}
        onClose={onClose}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div className="flex flex-col items-start justify-start">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-500">
                    <ChatBubbleLeftEllipsisIcon
                      className="h-6 w-6 text-white"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="mt-4 text-left">
                    <Dialog.Title
                      as="h3"
                      className="text-base font-semibold leading-6 text-gray-900"
                    >
                      Create Chat Agent
                    </Dialog.Title>
                    <div>
                      <p className="text-sm text-gray-500">
                        Easily Deploy a chat agent with this simple steps.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-6 w-full">
                  <form
                    onSubmit={deployAgent}
                    className="flex w-full flex-col items-start justify-start space-y-4"
                  >
                    <div className="w-full">
                      <label
                        htmlFor="agentname"
                        className="text-xs text-gray-400"
                      >
                        Name of Agent:
                      </label>
                      <input
                        placeholder="Cynthia"
                        type="text"
                        name="agentname"
                        value={agentName}
                        onChange={(e) => setAgentName(e.target.value)}
                        id="agentname"
                        className="w-full border border-blue-100 p-2 placeholder:text-sm placeholder:font-light placeholder:text-gray-400 focus:outline focus:outline-blue-200"
                      />
                    </div>
                    <div className="flex w-full flex-col items-start justify-start space-y-2 border border-dashed border-gray-100 p-2">
                      <label className="text-xs text-gray-400">
                        Select Agent Category
                      </label>
                      <div className="flex w-full flex-wrap gap-2">
                        <button
                          type="button"
                          disabled
                          onClick={() => setSelectedCategory('General')}
                          className={
                            selectedCategory == 'General'
                              ? 'w-1/4 rounded-lg border border-blue-500 bg-blue-500 p-2 text-sm text-black hover:bg-blue-500'
                              : 'flex w-1/4 items-center justify-center space-x-2 rounded-lg border bg-blue-100 p-2 text-sm font-light text-black hover:bg-blue-400'
                          }
                        >
                          <span>General</span>
                          <LockClosedIcon className="h-4 w-4 text-pink-400" />
                        </button>
                        <button
                          type="button"
                          disabled
                          onClick={() => {
                            setSelectedCategory('Sales')
                          }}
                          className={
                            selectedCategory == 'Sales'
                              ? 'w-1/4 rounded-lg border border-blue-500 bg-blue-500 p-2 text-sm text-black hover:bg-blue-500'
                              : 'flex w-1/4 items-center  justify-center space-x-2 rounded-lg border bg-blue-100 p-2 text-sm font-light text-black hover:bg-blue-300'
                          }
                        >
                          <span>Sales</span>
                          <LockClosedIcon className="h-4 w-4 text-pink-400" />
                        </button>
                        <button
                          type="button"
                          disabled
                          onClick={() => setSelectedCategory('Support')}
                          className={
                            selectedCategory == 'Support'
                              ? 'w-1/4 rounded-lg border border-blue-500 bg-blue-500 p-2 text-sm text-black hover:bg-blue-500'
                              : 'flex w-1/4 items-center  justify-center space-x-2 rounded-lg border bg-blue-100 p-2 text-sm font-light text-black hover:bg-blue-300'
                          }
                        >
                          <span>Support</span>
                          <LockClosedIcon className="h-4 w-4 text-pink-400" />
                        </button>
                        <button
                          type="button"
                          disabled
                          onClick={() => {
                            setSelectedCategory('Hiring')
                          }}
                          className={
                            selectedCategory == 'Hiring'
                              ? 'w-1/4 rounded-lg border border-blue-500 bg-blue-500 p-2 text-sm text-black hover:bg-blue-500'
                              : 'flex w-1/4 items-center  justify-center space-x-2 rounded-lg border bg-blue-100 p-2 text-sm font-light text-black hover:bg-blue-300'
                          }
                        >
                          <span> Hiring</span>
                          <LockClosedIcon className="h-4 w-4 text-pink-400" />
                        </button>
                      </div>
                      <small className="font-light text-blue-500">
                        Feature Coming Soon
                      </small>
                    </div>
                    <div className="w-full">
                      <UploadDocumentComp
                        handleFile={(e) => {
                          setFile(e)
                        }}
                      />
                    </div>
                    {/* <div className="flex w-full flex-col items-start justify-start">
                      <label className="text-xs text-gray-400">
                        Chat Rules
                      </label>
                      <textarea
                        className="w-full rounded-md border border-gray-200 p-2 placeholder:text-sm placeholder:font-light placeholder:text-gray-300 focus:outline focus:outline-blue-50"
                        cols={4}
                        rows={5}
                        placeholder="Example: Don't Respond to questions that are not about the product [chat desk],"
                      />
                      <span className="text-sm font-light text-gray-500">
                        Please enter some rules you might want the chat agent to
                        follow. Seperate each rule with a comma.
                      </span>
                    </div> */}
                    <div className="mt-5 flex w-full flex-wrap gap-2">
                      <small className="text-center text-sm font-light text-red-300">
                        {warning}
                      </small>
                      <button
                        type="submit"
                        className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2"
                        ref={deployAgentRef}
                      >
                        {checking ? (
                          <LoaderSpinner />
                        ) : (
                          <span>Deploy Agent</span>
                        )}
                      </button>
                      <button
                        type="button"
                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-300 sm:col-start-1 sm:mt-0"
                        onClick={() => onClose()}
                      >
                        Cancel Deploy
                      </button>
                    </div>
                  </form>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
