import MarketingLayout from '@/layouts/MarketingLayout'
import ContactForm from '@/components/ContactForm'
import Advisory from './Advisory'
import { Metadata } from 'next'
import FeatureTechnicalSection from '../_components/FeatureTechnicalSection'
import GettingStarted from './GettingStarted'

export const metadata: Metadata = {
  title: 'Discontinuity.ai | AI Architects | MLOps | Data Science',
  description:
    'Needs some help on strategy, architecture, or implementation of AI/ML within your organization? We can help.',
  alternates: {
    canonical: 'https://discontinuity.ai/prototyping',
  },
}

export default function Home() {
  return (
    <>
      <MarketingLayout>
        <div id="prototyping" />
        <Advisory />
        <GettingStarted />
        <div id="technical" />
        <FeatureTechnicalSection />
        <div id="contact" />
        <ContactForm />
      </MarketingLayout>
    </>
  )
}
