import MarketingLayout from '@/layouts/MarketingLayout'
import ContactForm from '@/components/ContactForm'
import Legal from './Legal'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Discontinuity.ai | AI Developers | Legal',
  description: 'About Discontinuity.ai terms and conditions',
  alternates: {
    canonical: 'https://discontinuity.ai/legal',
  },
}

export default function LegalPage() {
  return (
    <>
      <MarketingLayout>
        <Legal />
        <div id="contact" />
        <ContactForm />
      </MarketingLayout>
    </>
  )
}
