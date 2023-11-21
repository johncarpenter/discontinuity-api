import { authMiddleware, redirectToSignIn } from '@clerk/nextjs'
import { NextRequest, NextResponse } from 'next/server'

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your Middleware
export default authMiddleware({
  publicRoutes: [
    '/',
    '/sign-in',
    '/solutions',
    '/start',
    '/about',
    '/privacy',
    '/legal',
    '/api/contact',
  ],
  afterAuth(auth, req, evt) {
    const url = req.nextUrl.clone()
    const { pathname } = req.nextUrl

    // handle users who aren't authenticated
    if (!auth.userId && !auth.isPublicRoute) {
      return redirectToSignIn({ returnBackUrl: req.url })
    }
  },
})

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}
