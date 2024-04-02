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
          content="This is the default description"
        />
        <meta name="inertia-version" content="[inertia-version]" />
        <meta
          name="inertia-root-url"
          content="https://firebasestorage.googleapis.com"
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
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-icon.png" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-icon-x3.png"
          type="image/png"
        />
        <link
          rel="apple-touch-icon-precomposed"
          href="/apple-touch-icon-precomposed.png"
        />
        <meta name="category" content="Technology" />
        <meta
          name="keywords"
          content="Javascript Developer, Learn Web Development, Web Development, Developer, Cost Saving, Freelancing, Tech, Open Source"
        />
        <meta
          property="og:image"
          content="v0/b/talentyard-82bac.appspot.com/o/school_of_ai%2Fassets%2FScreenshot%202024-03-03%20at%209.28.41%E2%80%AFAM-min.png?alt=media&token=b197c6b2-fa6d-4efb-92d5-96c1953cabae"
        />
        <meta
          property="og:title"
          content="Chat Desk - Smart Chat Widget for Modern Businesses"
        />
        <meta
          property="og:description"
          content="No longer burdened with the loneliness of intelligence we can now create intelligent systems that impact our daily live. Join us in this journey in the School of AI."
        />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="SoAI" />
        <meta property="og:author" content="Augustine Francis" />
        <meta property="og:url" content="https://www.learnwithaugustine.com" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:image"
          content="v0/b/talentyard-82bac.appspot.com/o/school_of_ai%2Fassets%2FScreenshot%202024-03-03%20at%209.28.41%E2%80%AFAM-min.png?alt=media&token=b197c6b2-fa6d-4efb-92d5-96c1953cabae"
        />
        <meta name="twitter:creator" content="@_Augustine_F" />
        <meta
          name="twitter:alt"
          content="Chat Desk - Smart Chat Widget for Modern Businesses"
        />
        <meta name="twitter:url" content="https://www.learnwithaugustine.com" />
        <meta
          name="twitter:title"
          content="Chat Desk - Smart Chat Widget for Modern Businesses"
        />
        <meta
          name="twitter:description"
          content="Chat Desk - Smart Chat Widget for Modern Businesses"
        />
        <meta name="twitter:app:id:iphone" content="twitter_app://iphone" />
        <meta name="twitter:app:id:ipad" content="twitter_app://ipad" />
        <meta
          name="twitter:app:id:googleplay"
          content="twitter_app://googleplay"
        />
        <meta name="robots" content="index, follow, nocache" />
        <meta
          name="googlebot"
          content="index, follow, noimageindex, max-video-preview=-1, max-image-preview=large, max-snippet=-1"
        />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      </Head>
      <LayoutWrapper children={children} />
     
    </>
  )
}
