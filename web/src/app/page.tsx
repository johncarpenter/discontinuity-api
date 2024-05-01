import MarketingLayout from '@/layouts/MarketingLayout'
import { Metadata } from 'next'
import MarketingHero from '@/components/Home/MarketingHero'
import Features from '@/components/Home/Features'
import SupportedModels from '@/components/Home/SupportedModels'
import Benefits from '@/components/Home/Benefits'
import ContactFormBeta from '@/components/Home/Contact'

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
        <div id="top" />
        <MarketingHero />
        <SupportedModels />
        <div id="benefits" />
        <Benefits />
        <Features />

        <div id="beta" />
        <ContactFormBeta />
      </MarketingLayout>
    </>
  )
}
