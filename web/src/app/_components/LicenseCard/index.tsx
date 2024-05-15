import useCurrentOrganization from '@/app/_lib/client/useCurrentOrganization'
import Image from 'next/image'
import Link from 'next/link'

export default async function LicenseCard() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const organization = await useCurrentOrganization()

  return (
    <div className="overflow-hidden card-normal">
      <div className="px-4 py-5 sm:px-6">
        <Image
          src="/images/bridge_logo_full.png"
          alt="discontinuity.ai logo"
          width={240}
          height={110}
        />
        <h3 className="mt-8 text-lg font-medium leading-6 text-normal capitalize">
          {organization?.license.toLowerCase()} Edition
        </h3>
      </div>
      <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
        <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-lighter">Licensee</dt>
            <dd className="mt-1 text-sm text-normal">{organization?.name}</dd>
          </div>
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-lighter">Support</dt>
            <dd className="mt-1 text-sm text-normal">
              <Link href={'mailto:support@blacksquare.io'}>support@discontinuity.ai</Link>
            </dd>
          </div>
        </dl>
        <dl className="mt-4">
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-lighter">License ID</dt>
            <dd className="mt-1 text-sm text-normal">
              {organization.clerk_id ?? organization.user_clerk_id}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  )
}
