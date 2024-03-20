import SimpleCard from '@/components/SimpleCard'

export default function Courses() {
  return (
    <div className="bg-white px-6 py-32 lg:px-8">
      <div className="mx-auto max-w-3xl text-base leading-7 text-gray-700">
        <p className="text-base font-semibold leading-7 text-secondary-600 uppercase">
          Available courses
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Open Training Courses
        </h1>
        <div className="mt-10 max-w-2xl">
          <SimpleCard
            title={'Strategic AI for Leaders'}
            subtitle={'Empower Your Leadership with AI: A Strategic Course for Senior Leaders'}
            cta={'Learn More'}
            src={'/images/course_1.png'}
            alt={'Abstract image gaudi inspired'}
            href={'/training/strategic-ai-for-leaders'}
          />
        </div>
      </div>
    </div>
  )
}
