import MarketingLayout from '@/layouts/MarketingLayout'
import ContactForm from '@/components/ContactForm'
import GettingStarted from './GettingStarted'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Discontinuity.ai | AI Developers | Getting Started',
  description:
    'How to get started with Discontinuity.ai. What you need to know to build you AI Dreams',
  alternates: {
    canonical: 'https://discontinuity.ai/start',
  },
}

export default function StartPage() {
  return (
    <>
      <MarketingLayout>
        <GettingStarted />
        <div id="contact" />
        <ContactForm />
      </MarketingLayout>
    </>
  )
}
