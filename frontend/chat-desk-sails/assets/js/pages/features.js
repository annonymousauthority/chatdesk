import { Link } from '@inertiajs/react'

export default function FeaturesPage() {
  return (
    <div className="relative mx-auto mt-16 flex h-full flex-col items-center justify-start pb-36 lg:p-0">
      <div className="mx-auto max-w-6xl p-6">
        <div className="w-full space-y-3">
          <h1 className="mt-3 text-center text-3xl font-bold lg:text-6xl">
            Let AI Agents Chat with <br />
            your customers like you would
          </h1>
          <div className="mx-auto flex w-full flex-col space-y-3 lg:w-1/3 lg:flex-row lg:items-center lg:justify-center lg:space-x-4 lg:space-y-0">
            <Link
              href="/login"
              className="flex w-full items-center justify-center rounded-xl bg-blue-700 p-3 text-white shadow-sm shadow-blue-700 hover:bg-blue-800 lg:w-1/2"
            >
              {' '}
              Get Started
            </Link>
            <a
              href="/#demo-contact"
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
      </div>
      <div className="mt-6 w-full space-y-3 bg-yellow-50 p-6 py-12 lg:mt-24 dark:bg-[#131313]">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-start">
          <h3 className="mx-auto w-full text-center text-4xl font-bold lg:w-1/2">
            Give Customers the Attention They Deserve
          </h3>
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
          <div className="mt-16 flex w-full items-start justify-between">
            <div className="w-full lg:w-1/2">
              <img
                src="/images/multiple_agents_preview.png"
                width={500}
                height={500}
                alt="multi-language preview"
              />
            </div>
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
          </div>
        </div>
      </div>
      <div className="w-full space-y-3 bg-pink-50 p-6 py-12 lg:mb-44 dark:bg-[#131313]">
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
                href="/#demo-contact"
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
        </div>
      </div>
    </div>
  )
}
