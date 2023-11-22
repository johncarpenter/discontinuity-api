import MarketingLayout from '@/layouts/MarketingLayout'
import ContactForm from '@/components/ContactForm'
import About from './AboutUs'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Discontinuity.ai | About Us',
  description: 'About Discontinuity.ai, Team, and Mission',
  alternates: {
    canonical: 'https://discontinuity.ai/about',
  },
}

export default function AboutPage() {
  return (
    <>
      <MarketingLayout>
        <div id="aboutus" />
        <About />
        <div id="contact" />
        <ContactForm />
      </MarketingLayout>
    </>
  )
}
