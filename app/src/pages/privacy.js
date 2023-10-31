import Meta from "@/components/Meta/index";
import { LandingLayout } from "@/layouts/index";
import {
  AboutUs,
  Header,
  TeamSection,
  ContactForm,
  Footer,
  Legal,
} from "@/sections/index";

const About = ({ articles }) => {
  return (
    <LandingLayout>
      <Meta
        title="Discontinuity.ai"
        description="Rapid Prototyping for AI/ML Projects"
      />
      <Header />
      <Legal />
      <div id="contact" />
      <ContactForm />
      <Footer />
    </LandingLayout>
  );
};

export default About;
