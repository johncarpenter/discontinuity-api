import MarketingLayout from '@/app/_layouts/MarketingLayout'
import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return (
    <>
      <MarketingLayout>
        <div className="flex flex-col items-center justify-center w-full h-full">
          <SignIn
            redirectUrl={'/site'}
            appearance={{
              elements: {
                footer: {
                  display: 'none',
                },
              },
            }}
          />
        </div>
      </MarketingLayout>
    </>
  )
}
