import MarketingLayout from '@/layouts/MarketingLayout'
import ContactForm from '@/components/ContactForm'
import About from './AboutUs'

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
