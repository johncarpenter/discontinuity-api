import { createApiKey } from '@/prisma/services/apikey'
import { auth } from '@clerk/nextjs'
import { NextRequest, NextResponse } from 'next/server'

/** This is a test to stream out to the API */
export async function POST(req: NextRequest, { params }: { params: { workspaceId: string } }) {
  const { workspaceId } = params

  const { sessionId, orgId } = auth()
  if (!sessionId) {
    return NextResponse.json({ id: null }, { status: 401 })
  }

  if (orgId === null || orgId === undefined) {
    return NextResponse.json({}, { status: 401 })
  }

  const body = await req.json()
  const q = body.q ?? ''

  const API_URL = 'http://localhost:8000'
  const KEY = 'dbb64217-ef38-4d14-a8ac-4275435d8351'
  const SECRET = '457513e9-f5e8-4e2e-affe-dea917c06795'

  const token = await fetch(`${API_URL}/auth/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      client_id: KEY,
      client_secret: SECRET,
    }),
  })
  const { access_token } = await token.json()

  const apiquery = await fetch(`${API_URL}/workspace/search`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${access_token}`,
    },
    body: JSON.stringify({
      message: q,
    }),
  })

  const { text } = await apiquery.json()

  console.log(text)

  return NextResponse.json({ text })
}
