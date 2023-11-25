'use client'

import { useState } from 'react'

export interface ChatMessageProps {
  text: string
  assistant_id: string
  thread_id?: string
}

export interface ChatMessageResponse {
  run: string
  thread: string
}

export default async function sendChatMessage({ text, assistant_id, thread_id }: ChatMessageProps) {
  const response = await fetch('/api/ai/assist', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ text, assistant_id, thread_id }),
    cache: 'force-cache',
  })

  const data = await response.json()

  const { run, thread } = data

  return { run, thread }
}
