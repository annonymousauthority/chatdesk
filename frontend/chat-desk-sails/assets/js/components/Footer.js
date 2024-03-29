import { Link } from '@inertiajs/react'

export default function Footer() {
  return (
    <div className="absolute bottom-0 left-0 mt-24 flex min-h-[155px] w-full items-center justify-center border border-gray-200 bg-[#ffffff] p-3 text-white dark:bg-gray-900 dark:text-white dark:border-gray-800">
      <div className="flex w-full items-start justify-between">
        <div className="hidden lg:block lg:w-1/4"></div>
        <div className="w-1/4">
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
            <small className="w-[60px] leading-[1] text-gray-500 dark:text-gray-300">
              The easiest way to chat with your customers without human errors.
            </small>
          </div>
        </div>
        <div className="flex w-1/4 items-start justify-between">
          <div className="w-1/2">
            <span className="text-lg font-semibold text-gray-600 dark:text-gray-300">
              Solution
            </span>
            <ul className="flex flex-col items-start justify-start text-xs font-light text-black lg:text-sm dark:text-white">
              <Link
                href={'/pricing'}
                className="border-b-2 border-transparent hover:border-red-400"
              >
                Pricing
              </Link>
              <Link
                href={'/features'}
                className="border-b-2 border-transparent hover:border-red-400"
              >
                Features
              </Link>
              <Link
                href={'/consulting'}
                className="border-b-2 border-transparent hover:border-red-400"
              >
                Integration
              </Link>
              <Link
                href={'/contact'}
                className="border-b-2 border-transparent hover:border-red-400"
              >
                Demo
              </Link>
            </ul>
          </div>
          <div className="w-1/2">
            <span className="text-lg font-semibold text-gray-600 dark:text-gray-300">
              About Chat Desk
            </span>
            <ul className="flex flex-col items-start justify-start text-xs font-light text-black lg:text-sm dark:text-gray-300">
              <Link
                href={'/'}
                className="border-b-2 border-transparent hover:border-red-400"
              >
                Terms of Service
              </Link>
              <a
                href={'#school'}
                className="border-b-2 border-transparent hover:border-red-400"
              >
                Privacy Policy
              </a>
              <Link
                href={'/consulting'}
                className="border-b-2 border-transparent hover:border-red-400"
              >
                Contact us
              </Link>
            </ul>
          </div>
        </div>
        <div className="w-1/4"></div>
      </div>
    </div>
  )
}
