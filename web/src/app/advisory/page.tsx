import MarketingLayout from '@/layouts/MarketingLayout'
import ContactForm from '@/components/ContactForm'
import Training from './Training'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Discontinuity.ai | AI Architects | MLOps | Data Science',
  description:
    'Needs some help on strategy, architecture, or implementation of AI/ML within your organization? We can help.',
  alternates: {
    canonical: 'https://discontinuity.ai/advisory',
  },
}

export default function Home() {
  return (
    <>
      <MarketingLayout>
        <div id="advisory" />
        <Training />
        <div id="contact" />
        <ContactForm />
      </MarketingLayout>
    </>
  )
}
