import { CheckCircleIcon } from '@heroicons/react/20/solid'
import Image from 'next/image'

export default function Course() {
  return (
    <div className="bg-white px-6 py-8 lg:px-8">
      <div className="mx-auto max-w-3xl text-base leading-7 text-gray-700">
        {/* Image section */}
        <div className="relative h-full overflow-hidden rounded-3xl shadow-2xl  bg-gray-900 px-6 pb-12 pt-64 sm:px-12 lg:px-8 lg:pb-8 xl:px-10 xl:pb-10 ">
          <Image
            src="/images/hero_3.png"
            alt="abstract image of stained glass windows"
            className="aspect-[5/2] xl:rounded-3xl object-cover"
            fill
          />
        </div>
        <p className="text-base font-semibold leading-7 text-secondary-600 uppercase mt-8">
          3 Day Introduction
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl ">
          Empower Your Leadership with AI: A Strategic Course for Senior Leaders
        </h1>
        <p className="mt-6 text-xl leading-8">
          In today's rapidly evolving digital landscape, Artificial Intelligence (AI) stands at the
          forefront of transformation, driving innovation, efficiency, and competitive advantage
          across all sectors. However, the journey from recognizing AI's potential to effectively
          integrating it into your organization can be complex, especially for leaders at the helm
          of this change. Our executive course, designed specifically for senior leaders,
          demystifies AI and provides a comprehensive roadmap for leveraging this powerful
          technology to secure your organization's future.
        </p>
        <div className="mt-10 max-w-2xl">
          <p>
            Over the span of seven meticulously crafted sessions, this course offers a deep dive
            into the essentials of AI for business leaders. From the foundational understanding of
            AI technologies and their business implications to strategic implementation and scaling,
            we cover the entire spectrum of knowledge needed to navigate the AI landscape
            confidently.
          </p>
          <ul className="mt-8 max-w-xl space-y-8 text-gray-600">
            <li className="flex gap-x-3">
              <CheckCircleIcon
                className="mt-1 h-5 w-5 flex-none text-primary-600"
                aria-hidden="true"
              />
              <span>
                <strong className="font-semibold text-gray-900">
                  Introduction to AI and Its Business Impact.
                </strong>{' '}
                Start your journey with a solid foundation, understanding what AI is, its types, and
                its transformative potential for businesses.
              </span>
            </li>
            <li className="flex gap-x-3">
              <CheckCircleIcon
                className="mt-1 h-5 w-5 flex-none text-primary-600"
                aria-hidden="true"
              />
              <span>
                <strong className="font-semibold text-gray-900">AI Strategy for Leaders.</strong>{' '}
                Learn to craft a visionary AI strategy, fostering an AI-ready culture while
                navigating ethical considerations and risk management.
              </span>
            </li>
            <li className="flex gap-x-3">
              <CheckCircleIcon
                className="mt-1 h-5 w-5 flex-none text-primary-600"
                aria-hidden="true"
              />
              <span>
                <strong className="font-semibold text-gray-900">
                  Data Strategy and Management.
                </strong>{' '}
                Delve into the backbone of AI—data. Master the art of managing, securing, and
                leveraging data to fuel AI initiatives.
              </span>
            </li>
            <li className="flex gap-x-3">
              <CheckCircleIcon
                className="mt-1 h-5 w-5 flex-none text-primary-600"
                aria-hidden="true"
              />
              <span>
                <strong className="font-semibold text-gray-900">
                  Understanding AI Technologies and Capabilities.
                </strong>{' '}
                Gain insights into the core AI technologies driving innovation today and explore
                their practical applications in various industries.
              </span>
            </li>
            <li className="flex gap-x-3">
              <CheckCircleIcon
                className="mt-1 h-5 w-5 flex-none text-primary-600"
                aria-hidden="true"
              />
              <span>
                <strong className="font-semibold text-gray-900">Implementing AI Projects.</strong>{' '}
                Transition from theory to practice. Learn the nuts and bolts of bringing AI projects
                to life, from ideation to execution and evaluation.
              </span>
            </li>
            <li className="flex gap-x-3">
              <CheckCircleIcon
                className="mt-1 h-5 w-5 flex-none text-primary-600"
                aria-hidden="true"
              />
              <span>
                <strong className="font-semibold text-gray-900">
                  Scaling AI Across the Organization.
                </strong>{' '}
                Discover strategies for broadening the impact of AI across your organization,
                ensuring seamless integration and sustained innovation.
              </span>
            </li>
            <li className="flex gap-x-3">
              <CheckCircleIcon
                className="mt-1 h-5 w-5 flex-none text-primary-600"
                aria-hidden="true"
              />
              <span>
                <strong className="font-semibold text-gray-900">
                  Future-proofing Your Organization with AI.
                </strong>{' '}
                Look beyond the horizon. Prepare your organization for continuous evolution in the
                AI space, ensuring long-term competitiveness and success.
              </span>
            </li>
          </ul>
          <p className="mt-8">
            Each session is enriched with real-world case studies, interactive workshops, and
            insights from industry experts, making learning both practical and inspirational.
            Designed for busy executives, this course not only equips you with the knowledge to lead
            AI initiatives but also empowers you to drive cultural and technological transformation
            within your organization.
          </p>
          <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">
            Who Should Enroll?
          </h2>
          <p className="mt-6">
            This course is tailored for senior leaders, executives, and decision-makers across
            industries looking to harness the power of AI to innovate, optimize, and lead their
            organizations into the future. Whether you're at the early stages of considering AI or
            looking to scale existing AI initiatives, this course will provide valuable insights and
            strategies to propel your organization forward. Join us to navigate the AI revolution
            with confidence. Empower your leadership with the knowledge and tools to not only adapt
            to the changing landscape but to shape it. Enroll today and be the change-maker in your
            organization's AI journey.
          </p>
          <figure className="relative isolate">
            <svg
              viewBox="0 0 162 128"
              fill="none"
              aria-hidden="true"
              className="absolute -left-2 -top-4 -z-10 h-32 stroke-black/50"
            >
              <path
                id="0ef284b8-28c2-426e-9442-8655d393522e"
                d="M65.5697 118.507L65.8918 118.89C68.9503 116.314 71.367 113.253 73.1386 109.71C74.9162 106.155 75.8027 102.28 75.8027 98.0919C75.8027 94.237 75.16 90.6155 73.8708 87.2314C72.5851 83.8565 70.8137 80.9533 68.553 78.5292C66.4529 76.1079 63.9476 74.2482 61.0407 72.9536C58.2795 71.4949 55.276 70.767 52.0386 70.767C48.9935 70.767 46.4686 71.1668 44.4872 71.9924L44.4799 71.9955L44.4726 71.9988C42.7101 72.7999 41.1035 73.6831 39.6544 74.6492C38.2407 75.5916 36.8279 76.455 35.4159 77.2394L35.4047 77.2457L35.3938 77.2525C34.2318 77.9787 32.6713 78.3634 30.6736 78.3634C29.0405 78.3634 27.5131 77.2868 26.1274 74.8257C24.7483 72.2185 24.0519 69.2166 24.0519 65.8071C24.0519 60.0311 25.3782 54.4081 28.0373 48.9335C30.703 43.4454 34.3114 38.345 38.8667 33.6325C43.5812 28.761 49.0045 24.5159 55.1389 20.8979C60.1667 18.0071 65.4966 15.6179 71.1291 13.7305C73.8626 12.8145 75.8027 10.2968 75.8027 7.38572C75.8027 3.6497 72.6341 0.62247 68.8814 1.1527C61.1635 2.2432 53.7398 4.41426 46.6119 7.66522C37.5369 11.6459 29.5729 17.0612 22.7236 23.9105C16.0322 30.6019 10.618 38.4859 6.47981 47.558L6.47976 47.558L6.47682 47.5647C2.4901 56.6544 0.5 66.6148 0.5 77.4391C0.5 84.2996 1.61702 90.7679 3.85425 96.8404L3.8558 96.8445C6.08991 102.749 9.12394 108.02 12.959 112.654L12.959 112.654L12.9646 112.661C16.8027 117.138 21.2829 120.739 26.4034 123.459L26.4033 123.459L26.4144 123.465C31.5505 126.033 37.0873 127.316 43.0178 127.316C47.5035 127.316 51.6783 126.595 55.5376 125.148L55.5376 125.148L55.5477 125.144C59.5516 123.542 63.0052 121.456 65.9019 118.881L65.5697 118.507Z"
              />
              <use href="#0ef284b8-28c2-426e-9442-8655d393522e" x={86} />
            </svg>

            <blockquote className="mt-6 text-xl font-semibold leading-8 text-primary-600">
              <p>
                “Artificial intelligence will reach human levels by around 2029. Follow that out
                further to, say, 2045, we will have multiplied the intelligence, the human
                biological machine intelligence of our civilization a billion-fold.”
              </p>
            </blockquote>

            <figcaption className="mt-6 text-sm leading-6 text-gray-700">
              <strong className="font-semibold text-primary">Ray Kurzweil,</strong> Futurist and
              Generally Smart Guy
            </figcaption>
          </figure>
        </div>
      </div>
    </div>
  )
}
