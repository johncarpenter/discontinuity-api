import MarketingLayout from '@/layouts/MarketingLayout'
import ContactForm from '@/components/ContactForm'
import Legal from './Legal'

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
