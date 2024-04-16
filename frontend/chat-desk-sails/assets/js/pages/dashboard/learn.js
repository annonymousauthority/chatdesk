export default function Learn() {
  return (
    <div className="flex h-screen flex-col items-start justify-start space-y-6">
      <div className="flex flex-col items-start justify-start">
        <h1 className="text-4xl font-bold text-gray-600 dark:text-gray-200">
          Learn About ChatDesks.
        </h1>
        <p className="text-sm font-light text-gray-600 dark:text-gray-200">
          An AI powered customer support agent that makes customer communication
          faster and seamless.
        </p>
      </div>
      <div className="flex flex-col items-start justify-start space-y-3 w-full lg:w-3/4">
        <div>
          <h2 className="text-3xl font-bold text-blue-400">
            What is ChatDesks?
          </h2>
          <p className="text-sm font-light text-gray-600 dark:text-gray-200">
            ChatDesks is a platform that deploys a customer support AI agent
            that's armed with information about your business. It utilizes
            information you provide about your business to provide the right
            response to users inquiries. We are constantly working on making the
            ChatDesks AI system even much more smarter and increase agency in
            how it evaluates it's responses before sending to the users.
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-500 dark:text-gray-400">
            What you get
          </h2>
          <p className="text-sm font-light text-gray-600 dark:text-gray-200">
            Our work on making ChatDesks fully integratable across a business
            operation, from user experience support to technical support drives
            the integration of core feature you will find in ChatDesks.
            Currently, you can deploy a Chat Agent that understands your
            business offering, products & or services. You can also customize
            your Agent's name. This feature is available to businesses across
            all pricing package. For our enterprise customers, you get to build
            your own widget and just utilize our APIs to handle the main logic
            of chatting agent management.
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-500 dark:text-gray-400">
            How to Get Started.
          </h2>
          <p className="text-sm font-light text-gray-600 dark:text-gray-200">
            To Get Started, you have to select a plan that meets your business
            case, and deploy your AI model. Once that is accomplished you can
            copy your widget url path and use on whichever page you want your
            widget to be displayed in.
          </p>
        </div>
      </div>
    </div>
  )
}
