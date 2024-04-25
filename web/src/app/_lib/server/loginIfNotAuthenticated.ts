'use server'

export default async function loginIfNotAuthenticated(workspace: any) {
  const API_URL = process.env.NEXT_PUBLIC_DSC_API_URL
  const KEY = workspace.apikeys[0].client_id
  const SECRET = workspace.apikeys[0].client_secret

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

  return access_token
}
