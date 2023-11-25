'use client'
import { FullPageChat } from 'flowise-embed-react'

export interface ChatContainerFlowiseProps {
  chatflowid: string
}

export default function ChatContainerFlowise({ chatflowid }: ChatContainerFlowiseProps) {
  return (
    <>
      <div className="overflow-hidden top-9/16">
        <FullPageChat
          chatflowid={chatflowid}
          apiHost="https://flow.discontinuity.ai"
          isFullPage={false}
          welcomeMessage="Hello! This is a sample bot designed with the Discontinuity.AI process. It was trained with the <a href='/start'>Getting Started</a> page and can help you understand the Discontinuity.AI process<br/>Chatbots are an easy quick way to get started and comes included in all packages."
          fontSize={16}
          poweredByTextColor="#000000"
          botMessage={{
            backgroundColor: '#f7f8ff',
            textColor: '#303235',
            showAvatar: true,
            avatarSrc: 'https://discontinuity.ai/images/icon.svg',
          }}
          userMessage={{
            backgroundColor: '#3B81F6',
            textColor: '#ffffff',
            showAvatar: true,
          }}
          textInput={{
            placeholder: 'Ask about Discontinuity.AI',
            backgroundColor: '#ffffff',
            textColor: '#303235',
            sendButtonColor: '#3B81F6',
          }}
        />
      </div>
    </>
  )
}
