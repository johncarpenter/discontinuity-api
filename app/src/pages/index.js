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
  FeatureTypes,
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
      <div id="pricing" />
      <Pricing />
      <div id="guides" />
      <Guides articles={articles} />
      <Testimonial />
      <FeatureTypes />
      <div id="contact" />
      <ContactForm />
      <Footer />
    </LandingLayout>
  );
};

export const getServerSideProps = async (context) => {
  // Pull in the articles from the Medium feed
  let articles = [];
  try {
    const res = await fetch(
      `https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@john_53682`
    );
    const data = await res.json();
    articles = data.items;
  } catch (e) {}

  return {
    props: {
      articles,
    },
  };
};

export default Home;
