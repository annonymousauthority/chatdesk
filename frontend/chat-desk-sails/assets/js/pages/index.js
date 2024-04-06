import { Link } from '@inertiajs/react'
import IframeResizer from 'iframe-resizer-react'

export default function Index() {
  return (
    <div className="relative mx-auto mt-16 flex h-full flex-col items-center justify-start p-6 pb-36 lg:p-0">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto flex w-full justify-center rounded-xl bg-[#C6D3FF] p-1 px-2 text-center text-gray-600 lg:w-[40%]">
          <span className="mx-auto text-sm font-light ">
            An AI <span className="font-semibold text-blue-600">Chat</span>{' '}
            widget with{' '}
            <span className="font-semibold text-blue-600">human-like</span>{' '}
            response.
          </span>
        </div>
        <div className="w-full space-y-3">
          <h1 className="mt-3 text-center text-3xl font-bold lg:text-6xl">
            Engage with your <span className="text-blue-600">Customers</span>{' '}
            <br /> Faster & Smarter
          </h1>
          <p className="mx-auto w-full text-center text-sm font-light lg:w-1/2">
            Keeping up with customer inquiries on your site doesn’t have to be a
            delayed or difficult process. With a simple setup, you can deploy AI
            agents to handle conversations and respond to your customers quickly
            and easily.
          </p>
          <div className="mx-auto flex w-full flex-col space-y-3 lg:w-1/3 lg:flex-row lg:items-center lg:justify-center lg:space-x-4 lg:space-y-0">
            <Link
              href="/login"
              className="flex w-full items-center justify-center rounded-xl bg-blue-700 p-3 text-center text-white shadow-sm shadow-blue-700 hover:bg-blue-800 lg:w-1/2"
            >
              {' '}
              Get Started
            </Link>
            <a
              href="#demo-contact"
              className="flex w-full justify-center rounded-xl  border border-blue-300 p-3 text-black shadow-sm hover:bg-gray-200 hover:text-black lg:w-1/2 dark:text-gray-200 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              {' '}
              Try Now
            </a>
          </div>
          <div className="mx-auto flex w-full items-center justify-center lg:w-1/3">
            <span className="mx-auto text-center text-sm text-gray-400">
              See pricing to get started:{' '}
              <Link href="/pricing" className="hover:underline">
                Pricing
              </Link>
            </span>
          </div>
        </div>
        <div className="mx-auto mt-6 w-full space-y-3 lg:mt-24">
          <h2 className="mx-auto flex items-center justify-center text-center text-4xl font-bold">
            Watch our Live Demo
          </h2>
          <div className="mx-auto w-full border border-gray-100 shadow-lg shadow-gray-300 lg:h-[400px] lg:w-[650px] dark:border-gray-800 dark:shadow-gray-800"></div>
        </div>
      </div>
      <div className="mt-6 w-full space-y-3 bg-yellow-50 py-12 lg:mt-24 dark:bg-[#131313]">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-start">
          <h3 className="mx-auto w-full text-center text-4xl font-bold lg:w-1/2">
            Give Customers the Attention They Deserve
          </h3>
          <Link
            href="/login"
            className=" mx-auto mt-6 flex w-full items-center justify-center rounded-xl bg-blue-700 p-3 text-white shadow-sm shadow-blue-700 hover:bg-blue-800 lg:mt-10 lg:w-1/3"
          >
            {' '}
            Get Started
          </Link>
          <div className="mt-10 flex w-full flex-col lg:flex-row lg:items-start lg:justify-between">
            <div className="flex w-full flex-col items-start justify-start lg:w-1/3">
              <small className="font-bold text-blue-500">Easy Setup</small>
              <span className="text-xl font-bold">Easy Agent Setup</span>
              <p className="text-base font-light">
                Easily setup your chat agents with information uploaded via a
                document of information about your business.
              </p>
            </div>
            <div className="w-full lg:w-1/2">
              <img
                src="/images/agent_setup_preview.png"
                width={500}
                height={500}
                alt="feedback preview"
              />
            </div>
          </div>
          <div className="mt-16 flex w-full flex-col lg:flex-row lg:items-start lg:justify-between">
            <div className="w-full lg:w-1/2">
              <img
                src="/images/feedback_preview.png"
                width={500}
                height={500}
                alt="feedback preview"
              />
            </div>
            <div className="flex w-full flex-col items-start justify-start lg:w-1/3">
              <small className="font-bold text-blue-500">
                Preview Feedback
              </small>
              <span className="text-xl font-bold">
                See Feedback of All Chat Sessions
              </span>
              <p className="text-base font-light">
                Get feedback from customers who have engaged with your chat
                agents. You get to see where they might be room for
                improvements, go through agent responses and so much more.
              </p>
            </div>
          </div>
          <div className="mt-16 flex w-full flex-col lg:flex-row lg:items-start lg:justify-between">
            <div className="flex w-full flex-col items-start justify-start lg:w-1/3">
              <small className="font-bold text-blue-500">
                Multi-Language Agents
              </small>
              <span className="text-xl font-bold">
                Deploy Multi-Language Agents
              </span>
              <p className="text-base font-light">
                You have a diverse language customer base? You can deploy your
                agents to respond with multiple languages and not have to worry
                about localization.
              </p>
            </div>
            <div className="w-full lg:w-1/2">
              <img
                src="/images/multi_language_preview.png"
                width={500}
                height={500}
                alt="multi-language preview"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="w-full space-y-3 bg-pink-50 py-12 dark:bg-[#131313]">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-start space-y-6">
          <div className="flex w-full flex-col items-center justify-start space-y-3">
            <h3 className="mx-auto w-full text-center text-4xl font-bold lg:w-1/2">
              Ready to Deploy your Care Agent.
            </h3>
            <p className="w-full text-center font-light text-gray-400 lg:w-1/2">
              Don’t worry, these are not automated responses, your agents will
              understand your business and how to respond before going out
              there.
            </p>
          </div>
          <div className="flex w-full flex-col items-center justify-start">
            <div className="mx-auto flex w-full flex-col space-y-3 lg:w-1/3 lg:flex-row lg:items-center lg:justify-center lg:space-x-4 lg:space-y-0">
              <button
                type="button"
                className="w-full rounded-xl bg-blue-700 p-3 text-white shadow-sm shadow-blue-700 hover:bg-blue-800 lg:w-1/2"
              >
                {' '}
                Get Started
              </button>
              <a
                href="#demo-contact"
                className="flex w-full justify-center rounded-xl  border border-blue-300 p-3 text-black shadow-sm hover:bg-gray-200 hover:text-black lg:w-1/2 dark:text-gray-200 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                {' '}
                Try now
              </a>
            </div>
            <div className="mx-auto flex w-full items-center justify-center lg:w-1/3">
              <span className="mx-auto text-center text-sm text-gray-400">
                See pricing to get started:{' '}
                <Link href="/pricing" className="hover:underline">
                  Pricing
                </Link>
              </span>
            </div>
          </div>
        </div>
      </div>
      <IframeResizer
        id="demo-contact"
        src="https://chatdesk-widget.onrender.com/?agentKey=Ax13g_nih0ld"
        style={{
          width: '1px',
          minWidth: '100%',
          height: '700px',
          minHeight: '700px',
          marginTop: '64px',
          marginLeft: '128px',
          marginRight: '128px',
        }}
      />
      <div className="my-32 mt-16 h-full w-full space-y-3"></div>
    </div>
  )
}
