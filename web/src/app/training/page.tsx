import MarketingLayout from '@/layouts/MarketingLayout'
import ContactForm from '@/components/ContactForm'
import { Metadata } from 'next'
import Training from './Training'
import Courses from './Courses'

export const metadata: Metadata = {
  title: 'Discontinuity.ai | AI Developers | Getting Started',
  description:
    'How to get started with Discontinuity.ai. What you need to know to build you AI Dreams',
  alternates: {
    canonical: 'https://discontinuity.ai/training',
  },
}

export default function StartPage() {
  return (
    <>
      <MarketingLayout>
        <Training />
        <div id="contact" />
        <Courses />
        <ContactForm />
      </MarketingLayout>
    </>
  )
}
