import { CheckCircleIcon } from '@heroicons/react/20/solid'

export default function Training() {
  return (
    <div className="bg-white px-6 pt-8 lg:px-8">
      <div className="mx-auto max-w-3xl text-base leading-7 text-gray-700">
        <p className="text-base font-semibold leading-7 text-secondary-600 uppercase">
          Discontinuity.AI Certified training courses
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Introduction to Training Courses
        </h1>
        <div className="mt-10 max-w-2xl">
          <p>
            Welcome to Discontinuity.ai's Training Hub, where we bridge the gap between AI ambition
            and expertise. In a world rapidly transformed by artificial intelligence, staying ahead
            means not just understanding AI but mastering it. Our suite of training courses is
            meticulously designed for organizations and professionals eager to harness the power of
            AI. Whether you're looking to kickstart your AI journey, elevate your team's skills, or
            lead your organization through digital transformation, our courses offer the knowledge,
            practical skills, and insights you need to thrive in the AI era.
          </p>

          <p className="mt-6 text-xl leading-8">Benefits of our Training Courses</p>
          <ul className="mt-8 max-w-xl space-y-8 text-gray-600">
            <li className="flex gap-x-3">
              <CheckCircleIcon
                className="mt-1 h-5 w-5 flex-none text-primary-600"
                aria-hidden="true"
              />
              <span>
                <strong className="font-semibold text-gray-900">Tailored Curriculum.</strong> Each
                course is custom-designed around the unique needs and challenges of your
                organization. This ensures that every lesson, case study, and project is directly
                relevant to your company's goals and industry context.
              </span>
            </li>
            <li className="flex gap-x-3">
              <CheckCircleIcon
                className="mt-1 h-5 w-5 flex-none text-primary-600"
                aria-hidden="true"
              />
              <span>
                <strong className="font-semibold text-gray-900">
                  Active Engagement and Interactivity.
                </strong>{' '}
                Our courses prioritize hands-on learning and active participation. We encourage
                learners to bring their own company-specific concepts and challenges into the
                classroom, fostering a dynamic environment where real-world problems are addressed
                with AI solutions.
              </span>
            </li>
            <li className="flex gap-x-3">
              <CheckCircleIcon
                className="mt-1 h-5 w-5 flex-none text-primary-600"
                aria-hidden="true"
              />
              <span>
                <strong className="font-semibold text-gray-900">
                  Flexible and In-Person Learning Options.
                </strong>{' '}
                There is a huge benefit to in learning training with our instructors but we
                recognize that isn't always possible. With a blend of online self-paced modules and
                live instructor-led sessions, our courses offer the flexibility to accommodate the
                schedules of busy professionals.
              </span>
            </li>
          </ul>
          <p className="mt-8">
            Transform your organization’s AI capabilities with training courses built around your
            specific needs and challenges. Embrace interactive learning designed for real-world
            application and active engagement. Discover a curriculum where your company’s goals
            drive the learning outcomes. Ready to embark on a tailored AI learning journey?
          </p>
        </div>
      </div>
    </div>
  )
}
