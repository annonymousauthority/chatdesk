import { useState } from 'react'

export default function SelectCategory() {
  const [category, setCategory] = useState('general')

  return (
    <div className="flex h-full w-full flex-col items-center justify-start overflow-auto px-4">
      <div className="mt-12 flex h-full w-full flex-col items-center justify-start overflow-y-auto text-center text-white">
        <span className="w-full text-xl font-semibold">
          Select Conversation Category
        </span>
        <span className="text-sm font-light">
          What category best explains your current need?
        </span>
      </div>
      <div className="mt-3 flex flex-col space-y-3 ">
        <button
          type="button"
          onClick={() => setCategory('general')}
          className={
            category == 'general'
              ? 'flex w-full flex-col items-start justify-start rounded-xl bg-blue-400 p-3 text-left text-white hover:bg-blue-100 hover:text-black'
              : 'flex w-full flex-col items-start justify-start rounded-xl bg-white p-3 text-left hover:bg-blue-100 hover:text-black'
          }
        >
          <span className="text-sm font-semibold">General Inquiry</span>
          <span className="text-xs">
            Get general information about our product how the product can help
            you.
          </span>
        </button>
        <button
          type="button"
          onClick={() => setCategory('support')}
          className={
            category == 'support'
              ? 'flex w-full flex-col items-start justify-start rounded-xl bg-blue-400 p-3 text-left text-white hover:bg-blue-100 hover:text-black'
              : 'flex w-full flex-col items-start justify-start rounded-xl bg-white p-3 text-left hover:bg-blue-100 hover:text-black'
          }
        >
          <span className="text-sm font-semibold">Support</span>
          <span className="text-xs">
            Facing any difficulty or challenge? We’re here to help out.
          </span>
        </button>
        <button
          type="button"
          onClick={() => setCategory('sales')}
          className={
            category == 'sales'
              ? 'flex w-full flex-col items-start justify-start rounded-xl bg-blue-400 p-3 text-left text-white hover:bg-blue-100 hover:text-black'
              : 'flex w-full flex-col items-start justify-start rounded-xl bg-white p-3 text-left hover:bg-blue-100 hover:text-black'
          }
        >
          <span className="text-sm font-semibold">Sales</span>
          <span className="text-xs">
            Want to get the best deals on our product? Have a chat with us.
          </span>
        </button>
      </div>
      <button
        type="button"
        onClick={() => {}}
        className="mt-3 w-full rounded-xl bg-blue-500 p-2 text-white transition-transform delay-75 duration-300 hover:scale-105 hover:bg-blue-400"
      >
        Begin Conversation
      </button>
    </div>
  )
}
