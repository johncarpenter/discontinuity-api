import { CheckIcon } from "@heroicons/react/20/solid";

const features = [
  {
    name: "Generative AI",
    description:
      "Have an idea for generating unqiue content? We can help you build it.",
  },
  {
    name: "Chatbots & Conversational AI",
    description:
      "Automate customer service, sales, and marketing with chatbots. Or allow your team to ask questions of your internal wiki or processes.",
  },
  {
    name: "Recommendation Engines",
    description:
      "Drive behaviours and sales with targeted recommendations, based on your data and ideas.",
  },
  {
    name: "Semantic Search and Discovery",
    description:
      "Go past keyword searches and build a search that helps users find what they are looking for with only context.",
  },
  {
    name: "Predictive Modeling",
    description:
      "Extend your data with predictive models to help you make better decisions.",
  },
  {
    name: "Automation Solutions",
    description:
      "Take your routine, standard processes and automate them to save time and money.",
  },
  {
    name: "Automous Agents",
    description:
      "Many hands make light work. Automate your process by having many agents working together to achieve a common goal.",
  },
  {
    name: "Decision Making Systems",
    description:
      "Struggling with prioritization? Let us help you build a system that pulls in all the relevant data and makes the decision for you.",
  },
];

export default function FeatureTypes() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          <div>
            <h2 className="text-base font-semibold leading-7 text-secondary-600">
              IMAGINATION
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              AI for your workplace
            </p>
            <p className="mt-6 text-base leading-7 text-gray-600">
              100% custom built code, designed to use the best AI tools and
              apply them to your data and your ideas.{" "}
              <i>Human built, AI powered.</i>
            </p>
          </div>
          <dl className="col-span-2 grid grid-cols-1 gap-x-8 gap-y-10 text-base leading-7 text-gray-600 sm:grid-cols-2 lg:gap-y-16">
            {features.map((feature) => (
              <div key={feature.name} className="relative pl-9">
                <dt className="font-semibold text-gray-900">
                  <CheckIcon
                    className="absolute left-0 top-1 h-5 w-5 text-primary-500"
                    aria-hidden="true"
                  />
                  {feature.name}
                </dt>
                <dd className="mt-2">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
