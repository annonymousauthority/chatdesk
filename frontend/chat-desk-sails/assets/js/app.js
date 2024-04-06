import { createInertiaApp } from '@inertiajs/react'
import { createRoot } from 'react-dom/client'
import '~/css/main.css'
import Layout from './pages/Layout'
import DashboardLayout from './pages/dashboard/Layout'

createInertiaApp({
  title: () => `Chat Desk - Smart Chat Widget for Modern Businesses`,
  resolve: (name) => {
    const page = require(`./pages/${name}`).default
    page.layout = name.startsWith('dashboard/')
      ? (page) => <DashboardLayout children={page} />
      : (page) => <Layout children={page} />
    return page
  },
  setup({ el, App, props }) {
    createRoot(el).render(<App {...props} />)
  },
})
