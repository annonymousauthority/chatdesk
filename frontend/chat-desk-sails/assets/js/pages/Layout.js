import LayoutWrapper from '@/components/Layout-Wrapper'
import { Head } from '@inertiajs/react'

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>Chat Desk - Smart Chat Widget for Modern Businesses</title>
        <meta
          head-key="description"
          name="description"
          content="Keeping up with customer inquiries on your site doesn’t have to be a delayed or difficult process. With a simple setup, you can deploy AI agents to handle conversations and respond to your customers quickly and easily."
        />
        <meta name="inertia-version" content="0.1.1" />
        <meta
          name="inertia-root-url"
          content="https://firebasestorage.googleapis.com/"
        />
        <link rel="canonical" href="/" data-inertia-alternate />
        <link
          rel="alternate"
          hrefLang="en-US"
          href="/en-US"
          data-inertia-alternate
        />
        <link
          rel="alternate"
          hrefLang="de-DE"
          href="/de-DE"
          data-inertia-alternate
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="black" />
        <link rel="icon" type="image/x-icon" href="images/favicon.ico" />
        <link rel="apple-touch-icon" href="images/apple-icon.png" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="images/apple-icon-x3.png"
          type="image/png"
        />
        <link
          rel="apple-touch-icon-precomposed"
          href="images/apple-touch-icon-precomposed.png"
        />
        <meta name="category" content="Technology" />
        <meta
          name="keywords"
          content="Chatbot, customer care, AI, contact us"
        />
        <meta
          property="og:image"
          content="https://firebasestorage.googleapis.com/v0/b/chat-desk-1eeb2.appspot.com/o/Screenshot%202024-04-06%20at%201.34.50%E2%80%AFPM.png?alt=media&token=4b26b2d7-2b93-4767-90c8-f75198c87f88"
        />
        <meta
          property="og:title"
          content="Chat Desk - Smart Chat Widget for Modern Businesses"
        />
        <meta
          property="og:description"
          content="Keeping up with customer inquiries on your site doesn’t have to be a delayed or difficult process. With a simple setup, you can deploy AI agents to handle conversations and respond to your customers quickly and easily."
        />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="chatdesks" />
        <meta property="og:author" content="Augustine Francis" />
        <meta property="og:url" content="https://www.chatdesks.com" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content="@_Augustine_F" />
        <meta
          name="twitter:title"
          content="Chat Desk - Smart Chat Widget for Modern Businesses"
        />
        <meta
          name="twitter:description"
          content="Keeping up with customer inquiries on your site doesn’t have to be a delayed or difficult process. With a simple setup, you can deploy AI agents to handle conversations and respond to your customers quickly and easily."
        />
        <meta name="robots" content="index, follow, nocache" />
        <meta
          name="googlebot"
          content="index, follow, noimageindex, max-video-preview=-1, max-image-preview=large, max-snippet=-1"
        />
        <link rel="icon" type="image/png" href="images/favicon.svg" />
      </Head>
      <LayoutWrapper children={children} />
    </>
  )
}
