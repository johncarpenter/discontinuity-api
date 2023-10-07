import {
  CheckCircleIcon,
  InformationCircleIcon,
} from "@heroicons/react/20/solid";

export default function Training() {
  return (
    <div className="bg-white px-6 py-32 lg:px-8">
      <div className="mx-auto max-w-3xl text-base leading-7 text-gray-700">
        <p className="text-base font-semibold leading-7 text-secondary-600 uppercase">
          Training and Advisory
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Understanding AI from Business to Code
        </h1>
        <p className="mt-6 text-xl leading-8">
          AI is a fast moving industry, with changes on an almost daily basis.
          How do you ensure you are current and make the most of the technology?
        </p>
        <div className="mt-10 max-w-2xl">
          <p>
            Discontinuity.ai offers a range of strategic advisory services
            focused on ensuring teams and businesses are aligned with getting AI
            working for them. While there is lots of technical tranining on How
            AI Works, there is very little on How You Can Implement AI.
          </p>
          <ul role="list" className="mt-8 max-w-xl space-y-8 text-gray-600">
            <li className="flex gap-x-3">
              <CheckCircleIcon
                className="mt-1 h-5 w-5 flex-none text-primary-600"
                aria-hidden="true"
              />
              <span>
                <strong className="font-semibold text-gray-900">
                  Strategic Thinking.
                </strong>{" "}
                With experience at the C-Suite level, we can help you understand
                how AI can help your business. Helping you understand what is
                needed, when to invest, and what to expect as results. Jumping
                into AI without a strategic plan is a recipe for disaster.
              </span>
            </li>
            <li className="flex gap-x-3">
              <CheckCircleIcon
                className="mt-1 h-5 w-5 flex-none text-primary-600"
                aria-hidden="true"
              />
              <span>
                <strong className="font-semibold text-gray-900">
                  Training.
                </strong>{" "}
                Once you are aligned on the benefits of AI, how do you ensure
                the team buys in? We offer a range of training options to help
                your team understand the technology, the benefits, and the
                risks.
              </span>
            </li>
            <li className="flex gap-x-3">
              <CheckCircleIcon
                className="mt-1 h-5 w-5 flex-none text-primary-600"
                aria-hidden="true"
              />
              <span>
                <strong className="font-semibold text-gray-900">
                  Planning.
                </strong>{" "}
                AI is part data, part strategy, part IT and part process.
                Planning for AI deployments is a multi-disciplinary effort. We
                can help you understand what is needed, and how to plan for
                success.
              </span>
            </li>
          </ul>
          <p className="mt-8">
            Having a prototype will arm you with data to help make the business
            case for AI. Having a strategy will ensure you can execute on the
            vision. Having a plan will ensure you can deliver on the strategy.
            Discontinuity.AI can help you with all three, for less than the
            price that over-paid consultant is charging you for dinner. (Note to
            overpriced consultants: hey, if you need help with your AI, we can
            help you too!)
          </p>
          <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">
            Is this the right time for AI?
          </h2>
          <p className="mt-6">
            AI and machine-learning is fantastically complex and changes almost
            daily. But the fundamentals of AI remain the same. Understanding the
            cost/benefit, risks and strategies to implement AI can help you
            understand how your business can adapt to the changes. The risk of
            not adopting AI is far more expensive than investing in a strategic
            plan.
          </p>
          <figure className="mt-10 border-l border-indigo-600 pl-9">
            <blockquote className="font-semibold text-gray-900">
              <p>
                “Artificial intelligence will reach human levels by around 2029.
                Follow that out further to, say, 2045, we will have multiplied
                the intelligence, the human biological machine intelligence of
                our civilization a billion-fold.”
              </p>
            </blockquote>
            <figcaption className="mt-6 flex gap-x-4">
              <div className="text-sm leading-6">
                <strong className="font-semibold text-gray-900">
                  Ray Kurzweil
                </strong>{" "}
                – Futurist and Generally Smart Guy
              </div>
            </figcaption>
          </figure>
        </div>
      </div>
    </div>
  );
}
