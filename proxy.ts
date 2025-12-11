import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)",
]);

const isApiRoute = createRouteMatcher([
  "/api(.*)"
]);

export default clerkMiddleware(async (auth, req) => {
  // Handle API routes with basic auth only
  if (isApiRoute(req)) {
    await auth.protect();
    return;
  }

  // Handle dashboard routes with full authorization
  if (isProtectedRoute(req)) {
    await auth.protect();

    try {
      // Call our authorization API
      const authResponse = await fetch(`${req.nextUrl.origin}/api/auth/check-authorization`, {
        headers: {
          'Authorization': req.headers.get('authorization') || '',
          'Cookie': req.headers.get('cookie') || '',
        },
      });

      if (authResponse.status === 401) {
        // Not authenticated, redirect to login
        return NextResponse.redirect(new URL('/auth/login', req.url));
      }

      if (authResponse.status === 429) {
        // User is blocked, redirect to blocked page
        return NextResponse.redirect(new URL('/auth/blocked', req.url));
      }

      if (authResponse.status === 403) {
        // Not authorized, redirect to unauthorized page
        return NextResponse.redirect(new URL('/auth/unauthorized', req.url));
      }

      if (authResponse.status === 500) {
        // Server error, redirect to unauthorized page
        return NextResponse.redirect(new URL('/auth/unauthorized', req.url));
      }

      // If we get here, user is authorized
      return;
    } catch (error) {
      console.error('Middleware authorization check failed:', error);
      // On error, redirect to unauthorized page
      return NextResponse.redirect(new URL('/auth/unauthorized', req.url));
    }
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
}; 