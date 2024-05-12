const api = async (url: string, options: any) => {
  const { body, headers, ...opts } = options
  const requestBody = JSON.stringify(body)

  try {
    const response = await fetch(url, {
      body: requestBody,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      ...opts,
    })

    if (!response.ok) {
      throw new Error('There was an error fetching the data.')
    }

    const result = await response.json()
    return { status: response.status, ...result, url }
  } catch (error) {
    throw new Error('Unable to fetch data from the server.')
  }
}

export default api
