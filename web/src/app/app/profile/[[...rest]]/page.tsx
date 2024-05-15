import Container from '@/app/_components/Container'
import PageHeader from '@/app/_components/PageHeader'
import { UserProfile } from '@clerk/nextjs'
import { dark } from '@clerk/themes'

const UserProfilePage = () => {
  return (
    <Container>
      <PageHeader title="Profile" breadcrumbs={[]} />
      <UserProfile
        appearance={{
          baseTheme: dark,
        }}
      />
    </Container>
  )
}
export default UserProfilePage
