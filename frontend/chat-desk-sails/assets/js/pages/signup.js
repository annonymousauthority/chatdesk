import SignupScreen from '@/components/Signup-Screen'

export default function SignupPage() {
  return (
    <div className="flex h-screen flex-col items-center justify-start space-y-8 mt-12 lg:mt-24">
      <h1 className="text-3xl font-bold">Get Started with Chat Desk.</h1>
      <div className="w-full lg:w-1/3 2xl:w-1/4">
        <SignupScreen />
      </div>
    </div>
  )
}
