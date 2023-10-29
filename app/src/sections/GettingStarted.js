import {
  CheckCircleIcon,
  InformationCircleIcon,
} from "@heroicons/react/20/solid";
import Link from "next/link";

export default function GettingStarted() {
  return (
    <div className="bg-white px-6 py-32 lg:px-8">
      <div className="mx-auto max-w-3xl text-base leading-7 text-gray-700">
        <p className="text-base font-semibold leading-7 text-secondary-600 uppercase">
          Getting Started
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          How the Process Works
        </h1>
        <div className="mt-10 max-w-2xl">
          <p>
            Ready to launch that AI prototype? Great! Ensuring the success of
            the prototype is equal parts technology and product strategy. Based
            on years of experience building, deploying and creating software
            experiences, Discontinuity.AI has distilled this down to a simple 3
            step process.
          </p>
          <ul role="list" className="mt-8 max-w-xl space-y-8 text-gray-600">
            <li className="flex gap-x-3">
              <CheckCircleIcon
                className="mt-1 h-5 w-5 flex-none text-primary-600"
                aria-hidden="true"
              />
              <span>
                <strong className="font-semibold text-gray-900">
                  Understand Your Goals and Outcomes
                </strong>{" "}
                Having a plan is always good. It keeps us focused on the things
                that matter. Spending the time upfront to clearly spell out what
                you are focused on will help determine how to ensure we are
                building the right things. Sure that sounds like consultant
                talk, but in order to have a Minimal Viable Product (MVP) you
                will need to know what Minimum and Viable mean.
              </span>
            </li>
            <li className="flex gap-x-3">
              <CheckCircleIcon
                className="mt-1 h-5 w-5 flex-none text-primary-600"
                aria-hidden="true"
              />
              <span>
                <strong className="font-semibold text-gray-900">
                  Choose Data, Model and Output
                </strong>{" "}
                This becomes the fun part, like picking which pizza toppings
                would be perfect. We will work with you to determine what needs
                to be done to achieve your MVP. The three sources we need to
                work through are;
                <br />
                <ul>
                  <li className="ml-4 mb-4 mt-4">
                    <span className="font-semibold">
                      What is Your Data Source?
                    </span>{" "}
                    AI is based upon data. Getting that data into a format
                    digestable by the AI model is important. We have a huge
                    array of options to work here from direct API connections,
                    to text files, images or PDFs.
                  </li>
                  <li className="ml-4 mb-4">
                    <span className="font-semibold">
                      What AI Model Do You Need?
                    </span>{" "}
                    AI models cover a huge range from small and focused, to
                    massive generalized LLMs. We have the expertise to help you
                    select the model that considers your privacy, budget,
                    performance and scaling concerns.
                  </li>
                  <li className="ml-4">
                    <span className="font-semibold">
                      How are the Results Delivered?
                    </span>{" "}
                    Out of the box we have API, javascript widgets, or (coming
                    soon) Zapier integration. We want to help make AI useful,
                    and that means making Discontinuity.AI part of your
                    workflow.
                  </li>
                </ul>
              </span>
            </li>
            <li className="flex gap-x-3">
              <CheckCircleIcon
                className="mt-1 h-5 w-5 flex-none text-primary-600"
                aria-hidden="true"
              />
              <span>
                <strong className="font-semibold text-gray-900">
                  Build It
                </strong>{" "}
                Armed with a goals, data and some strategies, Discontinuity.AI
                will build you a custom project in usually a week (Hey we
                aren&apos;t robots here.) The rapid turnover gives you a chance
                to seem how things are turning out.
              </span>
            </li>
            <li className="flex gap-x-3">
              <CheckCircleIcon
                className="mt-1 h-5 w-5 flex-none text-primary-600"
                aria-hidden="true"
              />
              <span>
                <strong className="font-semibold text-gray-900">
                  Measure and Provide Learnings
                </strong>{" "}
                The final step is making sure the project meets your needs by
                measuring the outcome against your goals from above. You will
                get access to a performance data about your model and can even
                send that data to systems that you rely on.
              </span>
            </li>
          </ul>
          <p className="mt-8">
            Having a prototype will arm you with data to help make the business
            case for AI. Having a strategy will ensure you can execute on the
            vision. Having a plan will ensure you can deliver on the strategy.
            Discontinuity.AI can help you with all three, for less than the
            price that over-paid consultant is charging you for dinner.
            <span className="text-primary-300">
              (Note to overpriced consultants: hey, if you need help with your
              AI, we can help you too! We offer Strategic Solutions to AI -
              Strategilutions. Wow we should really consider that consulting
              thing. )
            </span>
          </p>
          <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">
            Whats the catch?
          </h2>
          <p className="mt-6">
            No catches. AI app in a week. We&apos;ve built processes and tools
            around all the boring parts of AI so we can focus all of our efforts
            on solving your problems. Discontinuity.AI has a full data store,
            vector database, hosting cluster, and all the infrastructure to make
            it work nicely. We&apos;ve spent the time so you don&apos;t have to.
            Plus, we have AI to help us with the coding!
          </p>
          <p className="mt-6">
            <span className="font-semibold mt-6">Well a couple catches..</span>
            <ul>
              <li className="ml-4 mb-6 mt-6">
                <span className="font-semibold">First:</span> We&apos;re a small
                company with big ideas but meagre budgets. We can host your MVP
                but we can&apos;t support it forever.{" "}
                <span className="font-semibold">
                  We will host your solution for up to a year, and hold you to
                  reasonable limits on traffic{" "}
                  <Link className="text-primary-500" href="/privacy">
                    (see our terms)
                  </Link>
                </span>{" "}
                If you need more than an MVP, we are happy to talk about a
                powerful, scalable solution with you.
              </li>
              <li className="ml-4">
                <span className="font-semibold">Second:</span> AI is a
                fantastically powerful tool that can provide amazing insight
                into your data. There is almost no limit to what AI can achieve,
                but there are limits to what work Discontinuity.AI will do. We
                believe in AI being beneficial for all people and as such we
                reserve the right to refuse any work, even after it has started.
                You will be refunded the full amount, no harm no foul.
              </li>
            </ul>
          </p>
        </div>
      </div>
    </div>
  );
}
