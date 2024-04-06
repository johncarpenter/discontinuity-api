//import { auth } from '@clerk/nextjs'
import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'
import { TextContentBlock } from 'openai/resources/beta/threads/messages/messages.mjs'

export async function GET(
  req: NextRequest,
  { params }: { params: { thread: string; run: string } }
) {
  // const { sessionId, orgId } = auth()
  // if (!sessionId) {
  //   return NextResponse.json({ id: null }, { status: 401 })
  // }

  // if (orgId === null || orgId === undefined) {
  //   return NextResponse.json({}, { status: 401 })
  // }

  const { thread, run } = params

  if (!run || !thread)
    return NextResponse.json({ error: 'Requires run and thread id provided' }, { status: 400 })

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY_PRO as string,
  })

  const runStatus = await openai.beta.threads.runs.retrieve(thread, run)

  if (runStatus.status === 'completed') {
    const threadMessages = await openai.beta.threads.messages.list(thread)
    const message = threadMessages.data[0].content[0] as TextContentBlock

    // remove 【13†source】from text
    message.text.value = message.text.value.replace(/【\d+†source】/g, '')

    return NextResponse.json({ text: message.text.value, status: runStatus.status })
  }

  return NextResponse.json({ status: runStatus.status })
}
