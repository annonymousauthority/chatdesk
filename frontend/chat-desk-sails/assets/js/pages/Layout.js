import LayoutWrapper from '@/components/Layout-Wrapper'
import { Head } from '@inertiajs/react'

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>Chat Desk - Smart Chat Widget for Modern Businesses</title>
      </Head>
      <LayoutWrapper children={children} />
    </>
  )
}
