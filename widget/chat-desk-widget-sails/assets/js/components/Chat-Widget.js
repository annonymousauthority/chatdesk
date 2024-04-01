import { useState } from 'react'
import ChatScreen from './ChatScreen'
import { doc, setDoc } from 'firebase/firestore'
import { ChevronDownIcon } from '@heroicons/react/24/solid'
import { appFirestore } from '@/components/lib/firebase'
export default function ChatWidget({ agentConfig, id, agentKey }) {
  const [loadChat, setLoadChat] = useState(false)
  const [view, setView] = useState(0)
  const [customer, setCustomer] = useState({
    email: '',
    name: '',
  })
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
  if (loadChat) {
    switch (view) {
      case 0:
        return (
          <div className="flex flex-col rounded-2xl border-2 border-blue-300 bg-gradient-to-b from-blue-600 via-blue-500 to-white px-8 shadow-xl shadow-blue-100 transition-transform delay-75 duration-300 ease-in-out lg:h-[500px] lg:w-[380px]">
            <div className="mt-12 flex w-full flex-col text-3xl font-bold text-white">
              <span>Hello ❤️</span>
              <span>How can we help?</span>
            </div>
            <button
              type="button"
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
                <div className="flex h-[40px] w-[40px] items-center justify-center rounded-full bg-blue-500 text-2xl">
                  <span>🤖</span>
                </div>
              </div>
            </button>
            {Object.entries(agentConfig.Quicklinks).length > 0 ? (
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
            <div className="absolute bottom-0 left-0 flex h-[65px] w-full items-center justify-center space-x-3 rounded-xl bg-gray-50">
              <svg
                width="17"
                height="22"
                viewBox="0 0 17 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="0.388751"
                  y="0.667804"
                  width="16.2188"
                  height="16.2188"
                  rx="3.68845"
                  stroke="black"
                  strokeWidth="0.784826"
                />
                <path
                  d="M13.2592 17.109C15.7077 17.109 16.7732 14.6151 16.9999 13.3682V21.0198L13.2592 17.109Z"
                  className="fill-black dark:fill-white"
                />
                <path
                  d="M4.18962 6.83932C4.18962 6.60354 4.24063 6.39383 4.34265 6.21019C4.44467 6.02429 4.58637 5.88032 4.76774 5.7783C4.95138 5.67401 5.15882 5.62187 5.39007 5.62187C5.67346 5.62187 5.91605 5.69668 6.11782 5.84631C6.3196 5.99595 6.45449 6.19999 6.52251 6.45844H5.88317C5.83556 6.35869 5.76755 6.28274 5.67913 6.2306C5.59298 6.17845 5.49436 6.15238 5.38327 6.15238C5.20416 6.15238 5.05907 6.21473 4.94798 6.33942C4.83689 6.46411 4.78134 6.63075 4.78134 6.83932C4.78134 7.0479 4.83689 7.21454 4.94798 7.33923C5.05907 7.46392 5.20416 7.52627 5.38327 7.52627C5.49436 7.52627 5.59298 7.5002 5.67913 7.44805C5.76755 7.39591 5.83556 7.31996 5.88317 7.2202H6.52251C6.45449 7.47866 6.3196 7.6827 6.11782 7.83233C5.91605 7.9797 5.67346 8.05338 5.39007 8.05338C5.15882 8.05338 4.95138 8.00237 4.76774 7.90035C4.58637 7.79606 4.44467 7.6521 4.34265 7.46846C4.24063 7.28482 4.18962 7.07511 4.18962 6.83932ZM8.04507 6.11837C8.26272 6.11837 8.43729 6.19092 8.56878 6.33602C8.70028 6.47885 8.76603 6.67609 8.76603 6.92774V8.03638H8.1879V7.00596C8.1879 6.879 8.15503 6.78038 8.08928 6.7101C8.02354 6.63982 7.93512 6.60467 7.82403 6.60467C7.71294 6.60467 7.62452 6.63982 7.55877 6.7101C7.49302 6.78038 7.46015 6.879 7.46015 7.00596V8.03638H6.87863V5.51985H7.46015V6.39383C7.5191 6.30995 7.59958 6.24307 7.7016 6.19319C7.80362 6.14331 7.91811 6.11837 8.04507 6.11837ZM9.0545 7.08418C9.0545 6.8892 9.09078 6.71803 9.16332 6.57067C9.23814 6.4233 9.33903 6.30995 9.46599 6.2306C9.59295 6.15125 9.73465 6.11157 9.89108 6.11157C10.0248 6.11157 10.1416 6.13878 10.2414 6.19319C10.3434 6.2476 10.4216 6.31901 10.476 6.40743V6.13878H11.0575V8.03638H10.476V7.76772C10.4193 7.85614 10.34 7.92755 10.238 7.98197C10.1382 8.03638 10.0214 8.06358 9.88768 8.06358C9.73351 8.06358 9.59295 8.02391 9.46599 7.94456C9.33903 7.86294 9.23814 7.74845 9.16332 7.60109C9.09078 7.45145 9.0545 7.27915 9.0545 7.08418ZM10.476 7.08758C10.476 6.94248 10.4352 6.82799 10.3536 6.7441C10.2742 6.66022 10.1767 6.61828 10.0611 6.61828C9.94549 6.61828 9.84687 6.66022 9.76525 6.7441C9.6859 6.82572 9.64623 6.93908 9.64623 7.08418C9.64623 7.22927 9.6859 7.3449 9.76525 7.43105C9.84687 7.51493 9.94549 7.55688 10.0611 7.55688C10.1767 7.55688 10.2742 7.51493 10.3536 7.43105C10.4352 7.34716 10.476 7.23267 10.476 7.08758ZM12.5359 7.54327V8.03638H12.24C12.0291 8.03638 11.8648 7.98537 11.7469 7.88334C11.629 7.77906 11.57 7.61015 11.57 7.37664V6.62168H11.3388V6.13878H11.57V5.67628H12.1516V6.13878H12.5325V6.62168H12.1516V7.38344C12.1516 7.44012 12.1652 7.48093 12.1924 7.50587C12.2196 7.5308 12.2649 7.54327 12.3284 7.54327H12.5359ZM5.18263 8.64907C5.43428 8.64907 5.65419 8.69895 5.84237 8.7987C6.03054 8.89846 6.17564 9.03902 6.27766 9.22039C6.38195 9.3995 6.43409 9.60694 6.43409 9.84273C6.43409 10.0762 6.38195 10.2837 6.27766 10.4651C6.17564 10.6464 6.0294 10.787 5.83896 10.8867C5.65079 10.9865 5.43201 11.0364 5.18263 11.0364H4.28824V8.64907H5.18263ZM5.14522 10.5331C5.36513 10.5331 5.5363 10.473 5.65873 10.3528C5.78115 10.2327 5.84237 10.0626 5.84237 9.84273C5.84237 9.62281 5.78115 9.45164 5.65873 9.32922C5.5363 9.20679 5.36513 9.14558 5.14522 9.14558H4.86976V10.5331H5.14522ZM8.54785 10.057C8.54785 10.1114 8.54445 10.1681 8.53765 10.227H7.22157C7.23064 10.3449 7.26804 10.4356 7.33379 10.4991C7.40181 10.5603 7.48456 10.5909 7.58204 10.5909C7.72714 10.5909 7.82803 10.5297 7.88471 10.4072H8.50364C8.4719 10.5319 8.41409 10.6442 8.3302 10.7439C8.24858 10.8437 8.14543 10.9219 8.02074 10.9786C7.89604 11.0352 7.75661 11.0636 7.60245 11.0636C7.41654 11.0636 7.25104 11.0239 7.10594 10.9446C6.96085 10.8652 6.84749 10.7519 6.76587 10.6045C6.68425 10.4571 6.64345 10.2848 6.64345 10.0876C6.64345 9.89034 6.68312 9.71803 6.76247 9.57067C6.84409 9.4233 6.95745 9.30995 7.10254 9.2306C7.24764 9.15125 7.41428 9.11157 7.60245 9.11157C7.78609 9.11157 7.94932 9.15011 8.09215 9.2272C8.23498 9.30428 8.34607 9.41423 8.42542 9.55706C8.50704 9.6999 8.54785 9.86653 8.54785 10.057ZM7.95272 9.90394C7.95272 9.80418 7.91872 9.72483 7.8507 9.66589C7.78269 9.60694 7.69767 9.57747 7.59565 9.57747C7.49816 9.57747 7.41541 9.60581 7.34739 9.66249C7.28165 9.71917 7.24084 9.79965 7.22497 9.90394H7.95272ZM9.62659 11.0636C9.46109 11.0636 9.31373 11.0352 9.1845 10.9786C9.05527 10.9219 8.95325 10.8448 8.87843 10.7473C8.80362 10.6476 8.76168 10.5365 8.75261 10.414H9.32733C9.33413 10.4798 9.36474 10.5331 9.41915 10.5739C9.47356 10.6147 9.54044 10.6351 9.61979 10.6351C9.69234 10.6351 9.74789 10.6215 9.78643 10.5943C9.82724 10.5648 9.84764 10.5274 9.84764 10.4821C9.84764 10.4276 9.8193 10.388 9.76262 10.363C9.70594 10.3358 9.61412 10.3064 9.48716 10.2746C9.35113 10.2429 9.23778 10.21 9.14709 10.176C9.05641 10.1397 8.97819 10.0842 8.91244 10.0094C8.84669 9.93228 8.81382 9.82912 8.81382 9.6999C8.81382 9.59107 8.84329 9.49245 8.90224 9.40403C8.96345 9.31335 9.05187 9.24193 9.1675 9.18979C9.28539 9.13764 9.42482 9.11157 9.58578 9.11157C9.82383 9.11157 10.0109 9.17052 10.1469 9.28841C10.2852 9.4063 10.3645 9.56273 10.385 9.75771H9.84764C9.83857 9.69196 9.8091 9.63982 9.75922 9.60127C9.71161 9.56273 9.64813 9.54346 9.56878 9.54346C9.50077 9.54346 9.44862 9.55706 9.41235 9.58427C9.37607 9.60921 9.35794 9.64435 9.35794 9.68969C9.35794 9.7441 9.38628 9.78491 9.44295 9.81212C9.5019 9.83932 9.59259 9.86653 9.71501 9.89374C9.85557 9.93001 9.97007 9.96628 10.0585 10.0026C10.1469 10.0366 10.224 10.0932 10.2897 10.1726C10.3577 10.2497 10.3929 10.354 10.3952 10.4855C10.3952 10.5966 10.3634 10.6963 10.2999 10.7847C10.2387 10.8709 10.1492 10.9389 10.0313 10.9888C9.91565 11.0386 9.78076 11.0636 9.62659 11.0636ZM11.9106 11.0364L11.3325 10.2406V11.0364H10.7509V8.51985H11.3325V9.91074L11.9072 9.13878H12.6247L11.8358 10.091L12.6315 11.0364H11.9106Z"
                  className="fill-black dark:fill-white"
                />
                <path
                  d="M5.09753 13.198C6.11775 14.3316 8.94034 15.9186 12.069 13.198"
                  stroke="#FFFCFC"
                  strokeWidth="0.340072"
                />
              </svg>
              <span className="text-sm font-light text-gray-500">
                Powered by Chat Desk
              </span>
            </div>
            <button
              onClick={() => setLoadChat(!loadChat)}
              className={
                loadChat
                  ? 'absolute -bottom-14 right-0 h-10 w-10 rotate-[360deg] rounded-full bg-blue-500 transition-transform delay-75 duration-300 hover:scale-110 hover:transition-transform'
                  : 'absolute -bottom-14 right-0 h-10 w-10 rotate-90 bg-blue-500 transition-transform delay-75 duration-300 hover:scale-110 hover:transition-transform'
              }
            >
              <ChevronDownIcon className="mx-auto h-6 w-6 font-bold text-white" />
            </button>
          </div>
        )
      case 1:
        return (
          <div className="flex flex-col rounded-2xl border-2 border-blue-300 bg-gradient-to-b from-blue-600 via-blue-500 to-white shadow-xl shadow-blue-100 lg:h-[500px] lg:w-[380px]">
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
                <button
                  type="submit"
                  className="mt-3 w-full rounded-xl bg-blue-700 p-2 text-white transition-transform delay-75 duration-300 hover:scale-105 hover:bg-blue-800"
                >
                  Begin Conversation
                </button>
              </form>
            </div>
            <div className="absolute bottom-0 left-0 flex h-[35px] w-full items-center justify-center space-x-3 rounded-xl bg-gray-50">
              <svg
                width="17"
                height="22"
                viewBox="0 0 17 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="0.388751"
                  y="0.667804"
                  width="16.2188"
                  height="16.2188"
                  rx="3.68845"
                  stroke="black"
                  strokeWidth="0.784826"
                />
                <path
                  d="M13.2592 17.109C15.7077 17.109 16.7732 14.6151 16.9999 13.3682V21.0198L13.2592 17.109Z"
                  className="fill-black dark:fill-white"
                />
                <path
                  d="M4.18962 6.83932C4.18962 6.60354 4.24063 6.39383 4.34265 6.21019C4.44467 6.02429 4.58637 5.88032 4.76774 5.7783C4.95138 5.67401 5.15882 5.62187 5.39007 5.62187C5.67346 5.62187 5.91605 5.69668 6.11782 5.84631C6.3196 5.99595 6.45449 6.19999 6.52251 6.45844H5.88317C5.83556 6.35869 5.76755 6.28274 5.67913 6.2306C5.59298 6.17845 5.49436 6.15238 5.38327 6.15238C5.20416 6.15238 5.05907 6.21473 4.94798 6.33942C4.83689 6.46411 4.78134 6.63075 4.78134 6.83932C4.78134 7.0479 4.83689 7.21454 4.94798 7.33923C5.05907 7.46392 5.20416 7.52627 5.38327 7.52627C5.49436 7.52627 5.59298 7.5002 5.67913 7.44805C5.76755 7.39591 5.83556 7.31996 5.88317 7.2202H6.52251C6.45449 7.47866 6.3196 7.6827 6.11782 7.83233C5.91605 7.9797 5.67346 8.05338 5.39007 8.05338C5.15882 8.05338 4.95138 8.00237 4.76774 7.90035C4.58637 7.79606 4.44467 7.6521 4.34265 7.46846C4.24063 7.28482 4.18962 7.07511 4.18962 6.83932ZM8.04507 6.11837C8.26272 6.11837 8.43729 6.19092 8.56878 6.33602C8.70028 6.47885 8.76603 6.67609 8.76603 6.92774V8.03638H8.1879V7.00596C8.1879 6.879 8.15503 6.78038 8.08928 6.7101C8.02354 6.63982 7.93512 6.60467 7.82403 6.60467C7.71294 6.60467 7.62452 6.63982 7.55877 6.7101C7.49302 6.78038 7.46015 6.879 7.46015 7.00596V8.03638H6.87863V5.51985H7.46015V6.39383C7.5191 6.30995 7.59958 6.24307 7.7016 6.19319C7.80362 6.14331 7.91811 6.11837 8.04507 6.11837ZM9.0545 7.08418C9.0545 6.8892 9.09078 6.71803 9.16332 6.57067C9.23814 6.4233 9.33903 6.30995 9.46599 6.2306C9.59295 6.15125 9.73465 6.11157 9.89108 6.11157C10.0248 6.11157 10.1416 6.13878 10.2414 6.19319C10.3434 6.2476 10.4216 6.31901 10.476 6.40743V6.13878H11.0575V8.03638H10.476V7.76772C10.4193 7.85614 10.34 7.92755 10.238 7.98197C10.1382 8.03638 10.0214 8.06358 9.88768 8.06358C9.73351 8.06358 9.59295 8.02391 9.46599 7.94456C9.33903 7.86294 9.23814 7.74845 9.16332 7.60109C9.09078 7.45145 9.0545 7.27915 9.0545 7.08418ZM10.476 7.08758C10.476 6.94248 10.4352 6.82799 10.3536 6.7441C10.2742 6.66022 10.1767 6.61828 10.0611 6.61828C9.94549 6.61828 9.84687 6.66022 9.76525 6.7441C9.6859 6.82572 9.64623 6.93908 9.64623 7.08418C9.64623 7.22927 9.6859 7.3449 9.76525 7.43105C9.84687 7.51493 9.94549 7.55688 10.0611 7.55688C10.1767 7.55688 10.2742 7.51493 10.3536 7.43105C10.4352 7.34716 10.476 7.23267 10.476 7.08758ZM12.5359 7.54327V8.03638H12.24C12.0291 8.03638 11.8648 7.98537 11.7469 7.88334C11.629 7.77906 11.57 7.61015 11.57 7.37664V6.62168H11.3388V6.13878H11.57V5.67628H12.1516V6.13878H12.5325V6.62168H12.1516V7.38344C12.1516 7.44012 12.1652 7.48093 12.1924 7.50587C12.2196 7.5308 12.2649 7.54327 12.3284 7.54327H12.5359ZM5.18263 8.64907C5.43428 8.64907 5.65419 8.69895 5.84237 8.7987C6.03054 8.89846 6.17564 9.03902 6.27766 9.22039C6.38195 9.3995 6.43409 9.60694 6.43409 9.84273C6.43409 10.0762 6.38195 10.2837 6.27766 10.4651C6.17564 10.6464 6.0294 10.787 5.83896 10.8867C5.65079 10.9865 5.43201 11.0364 5.18263 11.0364H4.28824V8.64907H5.18263ZM5.14522 10.5331C5.36513 10.5331 5.5363 10.473 5.65873 10.3528C5.78115 10.2327 5.84237 10.0626 5.84237 9.84273C5.84237 9.62281 5.78115 9.45164 5.65873 9.32922C5.5363 9.20679 5.36513 9.14558 5.14522 9.14558H4.86976V10.5331H5.14522ZM8.54785 10.057C8.54785 10.1114 8.54445 10.1681 8.53765 10.227H7.22157C7.23064 10.3449 7.26804 10.4356 7.33379 10.4991C7.40181 10.5603 7.48456 10.5909 7.58204 10.5909C7.72714 10.5909 7.82803 10.5297 7.88471 10.4072H8.50364C8.4719 10.5319 8.41409 10.6442 8.3302 10.7439C8.24858 10.8437 8.14543 10.9219 8.02074 10.9786C7.89604 11.0352 7.75661 11.0636 7.60245 11.0636C7.41654 11.0636 7.25104 11.0239 7.10594 10.9446C6.96085 10.8652 6.84749 10.7519 6.76587 10.6045C6.68425 10.4571 6.64345 10.2848 6.64345 10.0876C6.64345 9.89034 6.68312 9.71803 6.76247 9.57067C6.84409 9.4233 6.95745 9.30995 7.10254 9.2306C7.24764 9.15125 7.41428 9.11157 7.60245 9.11157C7.78609 9.11157 7.94932 9.15011 8.09215 9.2272C8.23498 9.30428 8.34607 9.41423 8.42542 9.55706C8.50704 9.6999 8.54785 9.86653 8.54785 10.057ZM7.95272 9.90394C7.95272 9.80418 7.91872 9.72483 7.8507 9.66589C7.78269 9.60694 7.69767 9.57747 7.59565 9.57747C7.49816 9.57747 7.41541 9.60581 7.34739 9.66249C7.28165 9.71917 7.24084 9.79965 7.22497 9.90394H7.95272ZM9.62659 11.0636C9.46109 11.0636 9.31373 11.0352 9.1845 10.9786C9.05527 10.9219 8.95325 10.8448 8.87843 10.7473C8.80362 10.6476 8.76168 10.5365 8.75261 10.414H9.32733C9.33413 10.4798 9.36474 10.5331 9.41915 10.5739C9.47356 10.6147 9.54044 10.6351 9.61979 10.6351C9.69234 10.6351 9.74789 10.6215 9.78643 10.5943C9.82724 10.5648 9.84764 10.5274 9.84764 10.4821C9.84764 10.4276 9.8193 10.388 9.76262 10.363C9.70594 10.3358 9.61412 10.3064 9.48716 10.2746C9.35113 10.2429 9.23778 10.21 9.14709 10.176C9.05641 10.1397 8.97819 10.0842 8.91244 10.0094C8.84669 9.93228 8.81382 9.82912 8.81382 9.6999C8.81382 9.59107 8.84329 9.49245 8.90224 9.40403C8.96345 9.31335 9.05187 9.24193 9.1675 9.18979C9.28539 9.13764 9.42482 9.11157 9.58578 9.11157C9.82383 9.11157 10.0109 9.17052 10.1469 9.28841C10.2852 9.4063 10.3645 9.56273 10.385 9.75771H9.84764C9.83857 9.69196 9.8091 9.63982 9.75922 9.60127C9.71161 9.56273 9.64813 9.54346 9.56878 9.54346C9.50077 9.54346 9.44862 9.55706 9.41235 9.58427C9.37607 9.60921 9.35794 9.64435 9.35794 9.68969C9.35794 9.7441 9.38628 9.78491 9.44295 9.81212C9.5019 9.83932 9.59259 9.86653 9.71501 9.89374C9.85557 9.93001 9.97007 9.96628 10.0585 10.0026C10.1469 10.0366 10.224 10.0932 10.2897 10.1726C10.3577 10.2497 10.3929 10.354 10.3952 10.4855C10.3952 10.5966 10.3634 10.6963 10.2999 10.7847C10.2387 10.8709 10.1492 10.9389 10.0313 10.9888C9.91565 11.0386 9.78076 11.0636 9.62659 11.0636ZM11.9106 11.0364L11.3325 10.2406V11.0364H10.7509V8.51985H11.3325V9.91074L11.9072 9.13878H12.6247L11.8358 10.091L12.6315 11.0364H11.9106Z"
                  className="fill-black dark:fill-white"
                />
                <path
                  d="M5.09753 13.198C6.11775 14.3316 8.94034 15.9186 12.069 13.198"
                  stroke="#FFFCFC"
                  strokeWidth="0.340072"
                />
              </svg>
              <span className="text-sm font-light text-gray-500">
                Powered by Chat Desk
              </span>
            </div>
            <button
              onClick={() => setLoadChat(!loadChat)}
              className={
                loadChat
                  ? 'absolute -bottom-10 right-0 rotate-[360deg] transition-transform delay-75 duration-300 hover:scale-110 hover:transition-transform'
                  : 'absolute -bottom-10 right-0 rotate-90 transition-transform delay-75 duration-300 hover:scale-110 hover:transition-transform'
              }
            >
              <img
                alt="Widget Icon"
                src="/images/close_widget.png"
                width={65}
                height={65}
              />
            </button>
          </div>
        )
      case 2:
        return (
          <div className=" flex flex-col rounded-xl border-2 border-blue-300 bg-blue-100 to-white px-8 shadow-xl shadow-blue-100 lg:h-[500px] lg:w-[380px]">
            <div className="h-full w-full overflow-y-auto">
              <ChatScreen
                customer={customer}
                agentConfig={agentConfig}
                agentKey={agentKey}
                id={id}
                onClose={() => {
                  setInSession(false)
                  setCustomer({
                    email: '',
                    name: '',
                  })
                  setView(0)
                }}
              />
            </div>
            <button
              onClick={() => setLoadChat(!loadChat)}
              className={
                loadChat
                  ? 'absolute -bottom-10 right-0 rotate-[360deg] transition-transform delay-75 duration-300 hover:scale-110 hover:transition-transform'
                  : 'absolute -bottom-10 right-0 rotate-90 transition-transform delay-75 duration-300 hover:scale-110 hover:transition-transform'
              }
            >
              <img
                alt="Widget Icon"
                src="/images/close_widget.png"
                width={65}
                height={65}
              />
            </button>
          </div>
        )
      default:
        break
    }
  } else {
    return (
      <div>
        <button
          onClick={() => setLoadChat(!loadChat)}
          className="delay-75 duration-300 hover:scale-110 hover:transition-transform"
        >
          <img
            alt="Widget Icon"
            src="/images/chat_icon.png"
            width={45}
            height={45}
          />
        </button>
      </div>
    )
  }
}
