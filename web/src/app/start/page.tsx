import MarketingLayout from '@/layouts/MarketingLayout'
import ContactForm from '@/components/ContactForm'
import GettingStarted from './GettingStarted'

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
