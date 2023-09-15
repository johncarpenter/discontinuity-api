
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
    output_text: string
  }

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    const API_KEY = process.env.DIS_API_KEY
    const URL = 'https://api.discontinuity.ai/agent/demo/'
  
    fetch(`${URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY,
      },
      body: JSON.stringify({q: `${req.query.q}`})
      })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data)
        res.status(200).json(data)
      })
      .catch((error) => {
        console.error('Error:', error)
        res.status(501)
      })
  }