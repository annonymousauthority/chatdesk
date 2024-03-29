export default function BillingPage() {
  return (
    <div className="flex flex-col justify-start items-start space-y-3">
      <h1 className="text-2xl font-bold">Billing</h1>
      <span className="text-left text-base font-light">
        You currently are not on any plan, upgrade your account to gain access
        to chat desk services.
      </span>
      <button className="bg-blue-500 p-2 text-center font-bold hover:bg-blue-700 text-white rounded-xl">
        Upgrade your plan
      </button>
    </div>
  )
}
