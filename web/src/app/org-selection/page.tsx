import Head from 'next/head'
import { OrganizationList } from '@clerk/nextjs'
import Card from '@/components/Card'

export default function Switcher() {
  return (
    <main className="flex flex-col items-center justify-center w-full h-full bg-gray-200">
      <Card>
        <Card.Body title="Switch Organizations">
          <OrganizationList
            hidePersonal={true}
            afterSelectOrganizationUrl="/"
            appearance={{
              elements: {
                button: {
                  display: 'none',
                },
                dividerRow: {
                  display: 'none',
                },
              },
            }}
          />
        </Card.Body>
      </Card>
    </main>
  )
}
