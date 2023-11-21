import Mailgun from 'mailgun.js'
import FormData from 'form-data'

export const emailConfig = {
  username: 'api',
  key: process.env.EMAIL_SERVER_API_KEY ?? '',
  domain: 'discontinuity.ai',
}

const mailgun = new Mailgun(FormData)
const mg = mailgun.client(emailConfig)

export interface MailData {
  from?: string
  html: string
  subject: string
  text: string
  to: string
}

export const sendMail = async ({ from, html, subject, text, to }: MailData) => {
  const data = {
    from: from ?? process.env.EMAIL_FROM,
    to,
    subject,
    text,
    html,
  }

  //process.env.NODE_ENV === 'production'
  await mg.messages.create(emailConfig.domain, data)
  //: console.log(data);
}
