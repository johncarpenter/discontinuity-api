import Hero from './_components/Hero'
import MarketingLayout from '@/layouts/MarketingLayout'
import ContactForm from '@/components/ContactForm'
import FeatureSection from '@/components/FeatureSection'
import BlogSlider from './_components/BlogSlider'
import { Metadata } from 'next'
import FeatureDetailSection from '@/components/FeatureDetailSection'

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://discontinuity.ai',
  },
}

export default function Home() {
  return (
    <>
      <MarketingLayout>
        <Hero />
        <section id="detail">
          <FeatureDetailSection />
        </section>
        <section id="features">
          <FeatureSection />
        </section>
        {/* <Testimonial /> */}

        <section id="blog">
          <BlogSlider />
        </section>

        <section id="contact">
          <ContactForm />
        </section>
      </MarketingLayout>
    </>
  )
}
