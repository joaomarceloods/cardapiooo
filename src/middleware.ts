import { authMiddleware, redirectToSignIn } from '@clerk/nextjs'
import { connectDatabase } from './database/connect'
import { Business } from './database/model'
import { NextResponse } from 'next/server'

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your Middleware
export default authMiddleware({
  // publicRoutes: ['/'],
})

export const config = {
  matcher: [
    // Captures any string that does not end with a dot followed by word characters or is equal to "_next".
    // The captured string can be of any length and can contain any characters.
    '/((?!.+\\.[\\w]+$|_next).*)',

    // Captures the root path
    '/',

    // Captures strings that start with either "api" or "trpc" and then captures the rest of the string,
    // allowing for any characters to follow.
    '/(api|trpc)(.*)'
  ],
}
