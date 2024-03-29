import LoginScreen from '@/components/Login-Screen'

export default function Login() {
  return (
    <div className="relative flex h-screen flex-col items-center justify-start space-y-8 mt-12 lg:mt-24">
      <h1 className="text-3xl font-bold">{"Let's"} get you back in.</h1>
      <div className="w-full lg:w-1/3 2xl:w-1/4">
        <LoginScreen />
      </div>
    </div>
  )
}
