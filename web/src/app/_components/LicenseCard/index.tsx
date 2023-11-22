import useCurrentOrganization from '@/lib/client/useCurrentOrganization'
import Image from 'next/image'
import Link from 'next/link'

export default async function LicenseCard() {
  const organization = await useCurrentOrganization()

  return (
    <div className="overflow-hidden bg-white shadow sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <Image src="/logos/Primary.png" alt="insight logo" width={180} height={90} />
        <h3 className="mt-8 text-lg font-medium leading-6 text-gray-900">
          {organization.edition} License
        </h3>
      </div>
      <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
        <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500">Licensee</dt>
            <dd className="mt-1 text-sm text-gray-900">{organization.name}</dd>
          </div>

          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500">Support Contact</dt>
            <dd className="mt-1 text-sm text-gray-900">
              <Link href={'mailto:support@blacksquare.io'}>support@blacksquare.io</Link>
            </dd>
          </div>
        </dl>
      </div>
    </div>
  )
}
