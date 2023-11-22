import { sendMail } from '@/app/_lib/server/mail'
import { contactFormSchema } from '@/lib/server/validator'
import { NextRequest } from 'next/server'

const html = ({
  name,
  email,
  company,
  message,
}: {
  name: string
  email: string
  company?: string
  message: string
}) => {
  return `
<body>
    <p>Response from the website</p>
    <p>Somebody is looking for something</p>
    <p>${name}</p>
    <p>${email}</p>
    <p>${company}</p>
    <p>${message}</p>
    
</body>
`
}

const text = ({
  name,
  email,
  company,
  message,
}: {
  name: string
  email: string
  company?: string
  message: string
}) => {
  return `
Hello there!

Somebody added a comment on the website; 

${name}
${email}
${company}
${message}

`
}

export async function POST(req: NextRequest) {
  try {
    const res = await req.json()
    const { email, first, last, company, message } = contactFormSchema.parse(res)

    await sendMail({
      html: html({ name: `${first} ${last}`, email, company, message }),
      subject: `[Discontinuity.AI] Contact Form`,
      text: text({ name: `${first} ${last}`, email, company, message }),
      to: `hello@discontinuity.ai`,
    })
  } catch (error) {
    return new Response(JSON.stringify({ error }), { status: 400 })
  }

  return new Response(JSON.stringify({ message: 'ok' }), { status: 200 })
}
