import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const isAppRoute = createRouteMatcher(['/app(.*)', '/api(.*)', '/app/organization(.*)'])

export default clerkMiddleware((auth, req) => {
  // Default protection for all app routes
  if (isAppRoute(req)) auth().protect()
})

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
}
