import MarketingLayout from '@/layouts/MarketingLayout'
import ContactForm from '@/components/ContactForm'
import { Metadata } from 'next'
import Hero from '@/components/Hero'
import FeatureSection from '@/components/FeatureSection'
import BlogSlider from '@/components/BlogSlider'
import FeatureDetailSection from '@/components/FeatureDetailSection'

export const metadata: Metadata = {
  title: 'Discontinuity.ai | AI Architects | MLOps | Data Science',
  description:
    'Needs some help on strategy, architecture, or implementation of AI/ML within your organization? We can help.',
  alternates: {
    canonical: 'https://discontinuity.ai/advisory',
  },
}

export default function Advisory() {
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
