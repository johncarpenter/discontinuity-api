import MarketingLayout from '@/layouts/MarketingLayout'
import { Metadata } from 'next'
import ChatPanel from '@/components/ChatPanel'

export const metadata: Metadata = {
  title: 'Discontinuity.ai | About Us',
  description: 'About Discontinuity.ai, Team, and Mission',
  alternates: {
    canonical: 'https://discontinuity.ai/chat',
  },
}

export default function ChatPage() {
  return (
    <>
      <MarketingLayout>
        <ChatPanel />
      </MarketingLayout>
    </>
  )
}
