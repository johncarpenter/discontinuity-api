const api = async (url: string, options: any) => {
  const { body, headers, ...opts } = options
  const requestBody = JSON.stringify(body)

  console.log('api', url, { body, headers, ...opts })
  const response = await fetch(url, {
    body: requestBody,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    ...opts,
  })
  console.log(response)
  const result = await response.json()
  return { status: response.status, ...result, url }
}

export default api
