import MarketingLayout from '@/layouts/MarketingLayout'
import ContactForm from '@/components/ContactForm'
import { Metadata } from 'next'
import ContactStart from './ContactStart'

export const metadata: Metadata = {
  title: 'Discontinuity.ai | About Us',
  description: 'About Discontinuity.ai, Team, and Mission',
  alternates: {
    canonical: 'https://discontinuity.ai/about',
  },
}

export default function ContactPage() {
  return (
    <>
      <MarketingLayout>
        <div
          id="contact"
          className="flex flex-col md:flex-row items-center justify-center px-16 rounded-md border-zinc-700"
        >
          <div className="md:w-1/2">
            <ContactStart />
          </div>
          <div className="md:w-1/2">
            <ContactForm />
          </div>
        </div>
      </MarketingLayout>
    </>
  )
}
