import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

export const contactFormSchema = z.object({
  email: z.string({ required_error: 'Email is required' }).email(),
  first: z.string().optional(),
  last: z.string().optional(),
  company: z.string().optional(),
  message: z.string(),
})
