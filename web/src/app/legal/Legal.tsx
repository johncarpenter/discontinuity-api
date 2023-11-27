import Image from 'next/image'
import Link from 'next/link'

export default function Legal() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 items-start gap-x-8 gap-y-16 sm:gap-y-24 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div className="lg:pr-4 h-full">
            <div className="relative h-full overflow-hidden rounded-3xl bg-gray-900 px-6 pb-9 pt-64 shadow-2xl sm:px-12 lg:max-w-lg lg:px-8 lg:pb-8 xl:px-10 xl:pb-10 ">
              <Image
                priority
                src="/images/grove.png"
                fill
                className="object-cover absolute inset-0 w-full h-full "
                alt="An abstract illustration of a forest grove, with a stream running through it."
              />
            </div>
          </div>
          <div>
            <div className="text-base leading-7 text-gray-700 lg:max-w-lg">
              <p className="text-base font-semibold leading-7 text-secondary-600 uppercase">
                Privacy Policy
              </p>
              <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Privacy Guaranteed
              </h1>
              <div className="max-w-xl">
                <p className="mt-6">
                  Website - This one is easy. I use GA4, just live everyone. I should probably use
                  something else but thats the easiest. If you want to let us know you visited, send
                  us an{' '}
                  <Link className="text-secondary" href="mailto:hello@discontinuity.ai">
                    email.
                  </Link>{' '}
                  It&apos;s cool. We like to know who is interested in our work.
                </p>
                <p className="mt-8">
                  If you contact us using the form below, or from any other page, that information
                  is sent to via a third-party mailer (Mailgun). If you don&apos;t want to use the
                  form, you can email us at{' '}
                  <Link className="text-secondary" href="mailto:hello@discontinuity.ai">
                    hello@discontinuity.ai
                  </Link>{' '}
                  it all goes to the same location.
                </p>
                <p className="mt-8">
                  Blog links on the front page link to Medium. They likely use lots of trackers. We
                  don&apos;t know. Same thing applies here, if you want the information we are happy
                  to send it to you directly.
                </p>
                <p className="mt-8">
                  Logo and discontinuity.ai are trademarks of 2linessoftware.com (us). Please
                  don&apos;t use them without permission. Anything else is fair game. If you find
                  the site valuable, please share it with your friends and colleagues.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8 pt-16">
        <div className="mx-auto grid max-w-2xl grid-cols-1 items-start gap-x-8 gap-y-16 sm:gap-y-24 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div>
            <div className="text-base leading-7 text-gray-700 lg:max-w-lg">
              <p className="text-base font-semibold leading-7 text-secondary-600 uppercase">
                Terms of Use
              </p>
              <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Using your Software
              </h1>
              <div className="max-w-xl">
                <p className="mt-6">
                  Well this is where it gets complicated. We make software prototypes for you to
                  use. The terms written here apply to the use of the software, and form the basis
                  of an agreement between you and us (Discontinuity.ai). A separate contract will be
                  signed before the work starts, but here are the concepts.
                </p>
                <p className="mt-8">
                  1. We will build a prototype for you to use. It is not designed to be coommercial
                  software, so there may be bugs, security issues and stability issues. This is a
                  prototype, not a finished product. The prototype can be hosted for up to 1 year on
                  our servers. After that, we will provide you with the code and you can host it
                  yourself. If you exceed a reasonable demand on our servers, we will ask you to
                  cover some of the costs.
                </p>
                <p className="mt-8">
                  2. Discontinuity.ai owns the infrastucture, you own the code and your data. We
                  have no interest in sharing your data and if you&apos;d like we can sign an NDA.
                  After the term (1 year) we delete all data, code and information related to your
                  project. Nothing personal, we just like to ensure that we don&apos;t have any data
                  that we don&apos;t need.
                </p>
                <p className="mt-8">
                  3. Discontinuity.ai will not use your data for any purpose other than explicit
                  agreement with you. We will not sell your data, use it for training, or use it for
                  any other purpose than to provide you with the service you have requested. In the
                  event that there is any concerns feel free to refer to this as <i>Exhibit A</i> in
                  court
                </p>
                <p className="mt-8">
                  3a. However we may use commercial LLMs (Language Models) within your project. It
                  will be discussed with you beforehand. Those companies like OpenAI, CoHere, etc..
                  may use your data for training their models. We have no control over that. If you
                  have concerns, we are happy to roll together a local model that can be exclusively
                  used by you. That will be an extra cost.
                </p>
                <p className="mt-8">
                  4. The world is tough enough, we don&apos;t need to make it any more complicated.
                  Discontinuity.ai reserves the right to refuse any project for any reasons. We
                  won&apos;t work on anything illegal, immoral or generally bad for the world. We
                  are not lawyers (painfully obvious if you are still reading) but we are people,
                  and believe that we should all benefit from AI. In the event that things change on
                  your project, we will always return your investment, data and code. No hard
                  feelings.
                </p>
              </div>
            </div>
          </div>

          <div className="lg:pr-4 h-full">
            <div className="relative h-full overflow-hidden rounded-3xl bg-gray-900 px-6 pb-9 pt-64 shadow-2xl sm:px-12 lg:max-w-lg lg:px-8 lg:pb-8 xl:px-10 xl:pb-10 ">
              <Image
                priority
                src="/images/building.png"
                fill
                className="object-cover absolute inset-0 w-full h-full "
                alt="An abstract illustration of a building, symmetric and futuristic."
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
