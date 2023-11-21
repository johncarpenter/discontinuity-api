import MarketingLayout from '@/layouts/MarketingLayout'
import ContactForm from '@/components/ContactForm'
import Advisory from './Advisory'
import Training from './Training'

export default function Home() {
  return (
    <>
      <MarketingLayout>
        <div id="prototyping" />
        <Advisory />
        <div id="training" />
        <div id="advisory" />
        <Training />
        <div id="contact" />
        <ContactForm />
      </MarketingLayout>
    </>
  )
}
