import Meta from "@/components/Meta/index";
import { LandingLayout } from "@/layouts/index";
import {
  AboutUs,
  Header,
  TeamSection,
  ContactForm,
  Footer,
  Advisory,
  Training,
} from "@/sections/index";

const About = ({ articles }) => {
  return (
    <LandingLayout>
      <Meta
        title="Discontinuity.ai"
        description="Rapid Prototyping for AI/ML Projects"
      />
      <Header />
      <div id="prototyping" />
      <Advisory />
      <div id="training" />
      <div id="advisory" />
      <Training />
      <div id="contact" />
      <ContactForm />
      <Footer />
    </LandingLayout>
  );
};

export default About;
