'use client'
import React, { useState, useEffect } from 'react'
import useMessagePolling from '@/lib/client/useMessagePolling'
import sendChatMessage from '@/lib/client/sendChatMessage'

const ActionProvider = ({ createChatBotMessage, createCustomMessage, setState, children }) => {
  const [message, setMessage] = useState()
  const { response, status, isLoading, isError } = useMessagePolling(message?.run, message?.thread)

  const sendMessage = async (message) => {
    const resp = await sendChatMessage({
      text: message,
      assistant_id: 'asst_A6h4C1MU7K94GX7FKDjv8Nym',
    })
    setMessage({ run: resp.run, thread: resp.thread })
  }

  useEffect(() => {
    if (response) {
      setState((prev) => ({
        ...prev,
        messages: [
          ...prev.messages.slice(0, prev.messages.length - 1),
          (prev.messages[prev.messages.length] = createChatBotMessage(response)),
        ],
      }))
      setMessage({ run: '', thread: message.thread })
    } else if (isError) {
      setState((prev) => ({
        ...prev,
        messages: [
          ...prev.messages,
          createChatBotMessage(
            'Sorry, I am not able to respond to your message at the moment. Please try again later.'
          ),
        ],
      }))
      setMessage({ run: '', thread: message.thread })
    }
  }, [
    response,
    status,
    isLoading,
    isError,
    message,
    createChatBotMessage,
    setState,
    createCustomMessage,
  ])

  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          actions: {
            sendMessage,
          },
        })
      })}
    </div>
  )
}

export default ActionProvider
