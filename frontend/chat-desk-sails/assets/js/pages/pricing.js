import { Switch } from '@headlessui/react'
import { Link } from '@inertiajs/react'
import { useState } from 'react'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}
export default function PricingPage() {
  const [annual, setAnnual] = useState(false)
  const [pricing, setPricing] = useState({
    starter: ['12', '120'],
    plus: ['30', '300'],
    business: ['60', '660'],
    enterprise: [`Let's Talk`],
  })
  return (
    <div className="relative mx-auto mt-16 flex h-full flex-col items-center justify-start pb-44 lg:p-0">
      <div className="mx-auto max-w-6xl p-6">
        <div className="w-full space-y-3">
          <h1 className="mt-3 text-center text-3xl font-bold lg:text-6xl">
            Increase Customer Conversion <br />
            with Quick chat Response
          </h1>
          <p className="mx-auto w-full text-center text-sm font-light lg:w-1/2">
            Start by deploying a agent for general inquiries, and upgrade as you
            need.
          </p>
          <div className="mx-auto flex w-full items-center justify-center space-x-4 lg:w-1/3">
            <a
              href="/#demo-contact"
              className="flex w-full justify-center rounded-xl  border border-blue-300 p-3 text-black shadow-sm hover:bg-gray-200 hover:text-black lg:w-1/2 dark:text-gray-200 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              {' '}
              Try Now
            </a>
          </div>
          <div className="mx-auto flex justify-center">
            <Switch.Group as="div" className="flex items-center">
              <Switch
                checked={annual}
                onChange={setAnnual}
                className={classNames(
                  annual ? 'bg-indigo-600' : 'bg-gray-200',
                  'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2'
                )}
              >
                <span
                  aria-hidden="true"
                  className={classNames(
                    annual ? 'translate-x-5' : 'translate-x-0',
                    'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                  )}
                />
              </Switch>
              <Switch.Label as="span" className="ml-3 text-sm">
                <span className="font-medium text-gray-900 dark:text-gray-300">
                  Annual billing
                </span>{' '}
                <span className="text-gray-500">(Save 15%)</span>
              </Switch.Label>
            </Switch.Group>
          </div>
          <div className="mx-auto flex justify-center text-sm text-gray-500">
            <span>
              Have any questions?{' '}
              <Link href="" className="underline">
                Speak with us
              </Link>
            </span>
          </div>
        </div>
      </div>
      <div className="mt-6 w-full p-6 lg:mb-44 lg:mt-20">
        <div className="mx-auto flex max-w-6xl flex-wrap items-start justify-center gap-2 space-x-2">
          <div className="flex min-h-[400px] w-full flex-col items-center justify-between space-y-8 rounded-[21px] border border-gray-200 p-4 shadow-lg shadow-gray-100 lg:w-1/4 2xl:w-1/5 dark:border-gray-500 dark:shadow-gray-800">
            <div className="flex flex-col items-center justify-start space-y-4">
              <span className="text-xl font-semibold text-gray-400">
                Starter
              </span>
              <span className="font-semibold">
                ${annual ? pricing['starter'][1] : pricing['starter'][0]}
                {annual ? '/yr' : '/mo'}
              </span>
            </div>
            <div>
              <ul className="list-disc text-sm font-light text-gray-500 dark:text-gray-200">
                <li>1 Agent</li>
                <li>25 Customers/mo</li>
                <li>Get Customer Feedback</li>
                <li>1x Website</li>
                <li>Single Language Agent</li>
                <li>Customer Support</li>
              </ul>
            </div>
            <button
              type="button"
              className="w-full rounded-xl border border-gray-500 bg-transparent p-3 text-sm font-light hover:bg-gray-100 hover:text-black dark:border-gray-200 dark:hover:bg-purple-100"
            >
              Get Started
            </button>
          </div>
          <div className="flex min-h-[400px] w-full flex-col items-center justify-between space-y-8 rounded-[21px] border border-gray-200 p-4 shadow-lg shadow-gray-100 lg:w-1/4  2xl:w-1/5 dark:border-gray-500 dark:shadow-gray-800">
            <div className="flex flex-col items-center justify-start space-y-4">
              <span className="text-xl font-semibold text-gray-400">
                Starter Plus
              </span>
              <span className="font-semibold">
                ${annual ? pricing['plus'][1] : pricing['plus'][0]}
                {annual ? '/yr' : '/mo'}
              </span>
            </div>
            <div>
              <ul className="list-disc text-sm font-light text-gray-500 dark:text-gray-200">
                <li>1 Agent</li>
                <li>100 Customers/mo</li>
                <li>Get Customer Feedback</li>
                <li>1x Website</li>
                <li>Single Language Agent</li>
                <li>Customer Support</li>
              </ul>
            </div>
            <button
              type="button"
              className="w-full rounded-xl border border-gray-500 bg-transparent p-3 text-sm font-light hover:bg-gray-100 hover:text-black dark:border-gray-200 dark:hover:bg-purple-100"
            >
              Get Started
            </button>
          </div>
          <div className="flex min-h-[400px] w-full flex-col items-center justify-between space-y-8 rounded-[21px] border border-gray-200 p-4 shadow-lg shadow-gray-100 lg:w-1/4  2xl:w-1/5 dark:border-gray-500 dark:shadow-gray-800">
            <div className="flex flex-col items-center justify-start space-y-4">
              <span className="text-xl font-semibold text-gray-400">
                Business
              </span>
              <span className="font-semibold">
                ${annual ? pricing['business'][1] : pricing['business'][0]}
                {annual ? '/yr' : '/mo'}
              </span>
            </div>
            <div>
              <ul className="list-disc text-sm font-light text-gray-500 dark:text-gray-200">
                <li>Multiple Agent</li>
                <li>Unlimited Customers/mo</li>
                <li>Get Customer Feedback</li>
                <li>Unlimited Websites</li>
                <li>Multi-Language Agent</li>
                <li>Customer Support</li>
              </ul>
            </div>
            <button
              type="button"
              className="w-full rounded-xl border border-gray-500 bg-transparent p-3 text-sm font-light hover:bg-gray-100 hover:text-black dark:border-gray-200 dark:hover:bg-purple-100"
            >
              Get Started
            </button>
          </div>
          <div className="flex min-h-[400px] w-full flex-col items-center justify-between space-y-8 rounded-[21px] border border-gray-200 p-4 shadow-lg shadow-gray-100 lg:w-1/4  2xl:w-1/5 dark:border-gray-500 dark:shadow-gray-800">
            <div className="flex flex-col items-center justify-start space-y-4">
              <span className="text-xl font-semibold text-gray-400">
                Enterprise
              </span>
              <span className="font-semibold">{pricing['enterprise'][0]}</span>
            </div>
            <div>
              <ul className="list-disc text-sm font-light text-gray-500 dark:text-gray-200">
                <li>Unlimited Organizations</li>
                <li>Unlimited Agents</li>
                <li>Unlimited Customers/mo</li>
                <li>Get Customer Feedback</li>
                <li>Unlimited Website</li>
                <li>Multi-Language Agent</li>
                <li>Customer Support</li>
                <li>1-1 Chat with our Team Rep.</li>
              </ul>
            </div>
            <button
              type="button"
              className="w-full rounded-xl border border-gray-500 bg-transparent p-3 text-sm font-light hover:bg-gray-100 hover:text-black dark:border-gray-200 dark:hover:bg-purple-100"
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
      {/* <div className="mt-6 w-full lg:mt-14">
        <div className="mx-auto flex max-w-5xl flex-col items-start justify-start space-y-4 rounded-xl border border-gray-300 bg-gray-100 p-6 shadow-lg shadow-gray-100 dark:border-gray-500 dark:bg-gray-950 dark:shadow-gray-800">
          <div className="rounded-xl bg-white p-3 dark:bg-gray-700">
            <span className="text-xl font-semibold text-gray-500 dark:text-gray-300">
              One Time Service
            </span>
          </div>
          <div className="flex w-full items-start justify-start">
            <p className="w-full text-base font-light lg:w-5/6 ">
              Get the right training information sorted for you before getting
              started. We help you curate the right information about your
              business through a questionnaire and help you get started with
              your deployed service.
            </p>
            <button
              type="button"
              className="w-3/4 rounded-xl bg-purple-200 p-3 text-sm font-normal hover:bg-purple-400 lg:w-1/4 dark:bg-purple-500 dark:hover:bg-purple-600"
            >
              CONTACT US
            </button>
          </div>
        </div>
      </div> */}
    </div>
  )
}
