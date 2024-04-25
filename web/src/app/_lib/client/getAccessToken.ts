export default async function getAccessToken(workspaceId: string) {
  const token = await fetch(`/api/workspace/${workspaceId}/login`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  const { access_token } = await token.json()

  return access_token
}
