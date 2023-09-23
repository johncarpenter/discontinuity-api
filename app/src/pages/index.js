import Meta from "@/components/Meta/index";
import { LandingLayout } from "@/layouts/index";
import {
  Header,
  CallToAction,
  Features,
  Footer,
  Guides,
  Hero,
  Pricing,
  Testimonial,
  ContactForm,
} from "@/sections/index";

const Home = ({ articles }) => {
  return (
    <LandingLayout>
      <Meta
        title="Discontinuity.ai"
        description="Rapid Prototyping for AI/ML Projects"
      />
      <Header />
      <Hero />
      <Features />
      <Pricing />
      <Guides articles={articles} />
      <Testimonial />
      <CallToAction />
      <ContactForm />
      <Footer />
    </LandingLayout>
  );
};

export const getServerSideProps = async (context) => {
  // Pull in the articles from the Medium feed

  const res = await fetch(
    `https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@john_53682`
  );

  const data = await res.json();

  const articles = data.items;

  return {
    props: {
      articles,
    },
  };
};

export default Home;
