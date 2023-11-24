import { authMiddleware, redirectToSignIn } from '@clerk/nextjs'
import { NextResponse } from 'next/server'

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
  afterAuth(auth, req) {
    const url = req.nextUrl
    const { pathname, basePath } = req.nextUrl

    // handle users who aren't authenticated
    if (!auth.userId && !auth.isPublicRoute) {
      return redirectToSignIn({ returnBackUrl: req.url })
    }

    if (auth.isPublicRoute) {
      return NextResponse.next()
    }

    // redirect them to organization selection page
    if (auth.userId && !auth.orgSlug && pathname !== '/org-selection') {
      const orgSelection = new URL('/org-selection', req.url)
      return NextResponse.redirect(orgSelection)
    }

    const ignorePaths = ['/api', '/trpc', '/_next', '/site', '/org-selection']
    const inPaths = ignorePaths.some((path) => pathname.startsWith(path)) || pathname === '/'

    if (!inPaths) {
      const currentHost = auth.orgSlug

      if (currentHost === null || currentHost === undefined || currentHost === '') {
        url.pathname = `${pathname}`
      } else {
        url.pathname = `/site/${currentHost}${pathname}`
      }

      console.log(`Redirecting to ${url.toString()}`)

      return NextResponse.rewrite(new URL(`{basePath}${url.pathname}}`, req.nextUrl.origin))
    }
  },
})

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}
