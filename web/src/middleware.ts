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
    '/prototyping',
    '/advisory',
    '/training',
    '/training/(.*)',
    '/about',
    '/privacy',
    '/legal',
    '/api/contact',
    '/contact',
    '/api/organization',
    '/api/ai/(.*)',
  ],
  afterAuth(auth, req) {
    const url = req.nextUrl.clone()
    const { pathname } = req.nextUrl

    // handle users who aren't authenticated
    if (!auth.userId && !auth.isPublicRoute) {
      return redirectToSignIn({ returnBackUrl: req.url })
    }

    const onboardingPaths = ['/org-selection', '/api/organization']
    // redirect them to organization selection page
    if (auth.userId && !auth.orgId && !onboardingPaths.includes(pathname)) {
      const orgSelection = new URL('/org-selection', req.url)
      return NextResponse.redirect(orgSelection)
    }

    // redirect them to organization selection page
    // if (auth.userId && !auth.orgSlug && pathname !== '/org-selection') {
    //   const orgSelection = new URL('/org-selection', req.url)
    //   return NextResponse.redirect(orgSelection)
    // }

    const ignorePaths = ['/api', '/trpc', '/_next', '/site', '/org-selection']
    const inPaths = ignorePaths.some((path) => pathname.startsWith(path))

    if (!inPaths) {
      const currentHost = auth.orgSlug

      if (currentHost === null || currentHost === undefined || currentHost === '') {
        url.pathname = `${pathname}`
      } else {
        url.pathname = `/site/${currentHost}${pathname}`
      }

      console.log(`Redirecting to ${url.toString()}`)

      return NextResponse.rewrite(url)
    }
  },
})

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}
