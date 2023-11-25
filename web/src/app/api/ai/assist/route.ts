import { auth } from '@clerk/nextjs'
import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

export async function POST(req: NextRequest) {
  const { sessionId, orgId } = auth()
  if (!sessionId) {
    return NextResponse.json({ id: null }, { status: 401 })
  }

  if (orgId === null || orgId === undefined) {
    return NextResponse.json({}, { status: 401 })
  }

  const data = await req.json()

  const { text, assistant_id, thread_id } = data

  if (!text) return NextResponse.json({ error: 'No text provided' }, { status: 400 })

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY_PRO as string,
  })

  let run

  if (thread_id) {
    // Get status of the thread
    await openai.beta.threads.create({
      messages: [
        {
          role: 'user',
          content: text,
        },
      ],
    })
    run = await openai.beta.threads.runs.create(thread_id, { assistant_id })
  } else {
    run = await openai.beta.threads.createAndRun({
      assistant_id: assistant_id,
      thread: {
        messages: [{ role: 'user', content: text }],
      },
    })
  }

  return NextResponse.json({ run: run.id, thread: run.thread_id })
}
