'use client'
import React from 'react'
import NavBar from '@/components/NavBar'
import Footer from '@/components/Footer'
import Widget from '@/components/Widget'

type MarketingLayoutProps = {
  children: React.ReactNode
}

export default function MarketingLayout({ children }: MarketingLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <header>
        <NavBar />
      </header>
      <main>
        <div className="mx-auto">{children}</div>
      </main>
      <footer className="mt-auto">
        <Footer />
      </footer>
      <Widget />
      {/* <BubbleChat
        chatflowid="8c416847-3999-4248-8167-1220917c9e2d"
        apiHost="https://flow.discontinuity.ai"
        theme={{
          chatWindow: {
            welcomeMessage:
              "Hello! This is a sample bot designed with the Discontinuity.AI process. It was trained with the <a href='/start'>Getting Started</a> page and can help you understand the Discontinuity.AI process<br/>Chatbots are an easy quick way to get started and comes included in all packages.",
            backgroundColor: '#ffffff',
            height: 700,
            width: 400,
            fontSize: 16,
            poweredByTextColor: '#ffffff',
            botMessage: {
              backgroundColor: '#f7f8ff',
              textColor: '#303235',
              showAvatar: true,
              avatarSrc: 'https://discontinuity.ai/images/icon.svg',
            },
            userMessage: {
              backgroundColor: '#3B81F6',
              textColor: '#ffffff',
              showAvatar: true,
            },
            textInput: {
              placeholder: 'Ask about Discontinuity.AI',
              backgroundColor: '#ffffff',
              textColor: '#303235',
              sendButtonColor: '#3B81F6',
            },
          },
        }}
      />*/}
    </div>
  )
}
