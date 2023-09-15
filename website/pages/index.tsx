import { PageSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'
import { sortedBlogPost, allCoreContent } from '@/lib/utils/contentlayer'
import { InferGetStaticPropsType } from 'next'
import { allBlogs } from 'contentlayer/generated'
import Hero from '@/components/Hero'
import CTA1 from '@/components/CTA1'
import PricingSection from '@/components/PricingSection'
import ContactForm from '@/components/ContactForm'

const MAX_DISPLAY = 5

export const getStaticProps = async () => {
  // TODO: move computation to get only the essential frontmatter to contentlayer.config
  const sortedPosts = sortedBlogPost(allBlogs)
  const posts = allCoreContent(sortedPosts)

  return { props: { posts } }
}

export default function Home({ posts }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <PageSEO title={siteMetadata.title} description={siteMetadata.description} />
      <section id="hero">
      < Hero/>
      </section>
      <section id="cta-1" className="pt-8">
        <CTA1/>
      </section>
      <section id="pricing" className="pt-8">
        <PricingSection/>
      </section>
      <section id="contact" className="pt-8">
        <ContactForm />
      </section>
    </>
  )
}
