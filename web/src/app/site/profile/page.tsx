import Container from '@/app/_components/Container'
import PageHeader from '@/app/_components/PageHeader'
import { UserProfile } from '@clerk/nextjs'

const UserProfilePage = () => {
  return (
    <Container>
      <PageHeader title="Profile" breadcrumbs={[]} />
      <UserProfile />
    </Container>
  )
}

;<UserProfile />

export default UserProfilePage
