//import { auth } from '@clerk/nextjs'
import { NextRequest, NextResponse } from 'next/server'

type FlowiseType = {
  question: string
  history?: string[]
}

export async function POST(req: NextRequest) {
  const data = await req.json()

  const { question, history, id } = data

  if (!data) return NextResponse.json({ error: 'No text provided' }, { status: 400 })

  if (!id) return NextResponse.json({ error: 'No id provided' }, { status: 400 })

  const payload: FlowiseType = {
    question,
  }

  if (history) {
    payload['history'] = history
  }

  const result = await query(payload, id)

  return NextResponse.json(result, { status: 200 })
}

async function query(data: FlowiseType, chatflowId: string) {
  const url = `https://flow.discontinuity.ai/api/v1/prediction/${chatflowId}`
  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  })
  console.log('status', response.status, 'url', url, 'data', data)

  const result = await response.json()
  console.log('result', result, 'data', data)
  return result
}
