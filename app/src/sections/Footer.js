import SocialIcon from "@/components/social-icons";
import Link from "next/link";
import Image from "next/image";

const navigation = {
  solutions: [
    { name: "Prototyping", href: "/solutions#prototyping" },
    { name: "Advisory", href: "/solutions#advisory" },
    { name: "Training", href: "/solutions#training" },
  ],
  support: [
    { name: "Pricing", href: "/#pricing" },
    { name: "Guides", href: "/#guides" },
    { name: "API Status", href: "#" },
  ],
  company: [
    { name: "About", href: "about" },
    { name: "Privacy", href: "#" },
    { name: "Terms", href: "#" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-gray-900" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="mx-auto max-w-7xl px-6 pb-8 pt-16 sm:pt-24 lg:px-8 lg:pt-32">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8">
            <Link href="/">
              <Image
                priority
                src="/static/images/glitch.svg"
                height={60}
                width={180}
                alt="Discontinuity AI Logo"
              />
            </Link>
            <p className="text-sm leading-6 text-gray-300">
              I for one welcome our new AI overlords
            </p>
            <div className="flex space-x-6">
              <SocialIcon
                kind="mail"
                href={`mailto:hello@discontinuity.ai`}
                size={6}
              />
              <SocialIcon
                kind="github"
                href={`https://github.com/2lines-software`}
                size={6}
              />
              <SocialIcon
                kind="youtube"
                href={`https://www.youtube.com/channel/UCTdZYHHbrDQre2DSJGCxlTQ`}
                size={6}
              />
              <SocialIcon
                kind="linkedin"
                href={`https://www.linkedin.com/in/johncarpenter2/`}
                size={6}
              />
              <SocialIcon
                kind="twitter"
                href={`https://twitter.com/johncarpenter`}
                size={6}
              />
            </div>
          </div>
          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-white">
                  Solutions
                </h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.solutions.map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        className="text-sm leading-6 text-gray-300 hover:text-white"
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6 text-white">
                  Support
                </h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.support.map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        className="text-sm leading-6 text-gray-300 hover:text-white"
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-white">
                  Company
                </h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.company.map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        className="text-sm leading-6 text-gray-300 hover:text-white"
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-16 border-t border-white/10 text-gray-500 pt-8 sm:mt-20 lg:mt-24">
          <div>
            <a href="https://2linessoftware.com">2Lines Software</a>
          </div>
          <div>{`© ${new Date().getFullYear()}`}</div>
        </div>
      </div>
    </footer>
  );
}
