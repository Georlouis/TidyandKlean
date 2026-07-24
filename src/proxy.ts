import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { decrypt, encrypt } from './lib/auth';

export async function proxy(request: NextRequest) {
  const session = request.cookies.get('session')?.value;
  let payload = null;
  
  if (session) {
    payload = await decrypt(session);
  }

  const isAdminRoute = request.nextUrl.pathname.startsWith('/admin');
  const isLoginRoute = request.nextUrl.pathname === '/login';
  const isApiRoute = request.nextUrl.pathname.startsWith('/api');
  const isStatic = request.nextUrl.pathname.match(/\.(.*)$/);

  // Analytics Tracker (Only track public pages)
  if (!isAdminRoute && !isLoginRoute && !isApiRoute && !isStatic) {
    const ip = request.headers.get('x-forwarded-for') || 'Unknown';
    const country = request.headers.get('x-vercel-ip-country') || 'Unknown';
    const region = request.headers.get('x-vercel-ip-country-region') || 'Unknown';
    const city = request.headers.get('x-vercel-ip-city') || 'Unknown';
    const userAgent = request.headers.get('user-agent') || 'Unknown';
    const referrer = request.headers.get('referer') || 'Direct';
    
    let device = 'desktop';
    if (/mobile/i.test(userAgent)) device = 'mobile';
    else if (/tablet/i.test(userAgent) || /ipad/i.test(userAgent)) device = 'tablet';

    let os = 'Unknown';
    if (/windows/i.test(userAgent)) os = 'Windows';
    else if (/mac/i.test(userAgent) && !/iphone|ipad/i.test(userAgent)) os = 'macOS';
    else if (/iphone|ipad/i.test(userAgent)) os = 'iOS';
    else if (/android/i.test(userAgent)) os = 'Android';
    else if (/linux/i.test(userAgent)) os = 'Linux';

    const botPattern = /bot|crawler|spider|crawling|slurp|facebookexternalhit/i;
    const isBot = botPattern.test(userAgent);

    // Non-blocking fetch to log the visit
    const url = new URL('/api/track', request.url);
    fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ip, country, region, city, userAgent, device, os, referrer, isBot, path: request.nextUrl.pathname
      })
    }).catch(() => {});
  }

  // Protect /admin routes
  if (isAdminRoute && !payload) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Redirect to /admin if already logged in and visiting /login
  if (isLoginRoute && payload) {
    return NextResponse.redirect(new URL('/admin', request.url));
  }

  // Standard response with refreshed cookie
  const res = NextResponse.next();
  if (payload) {
    const expires = new Date(Date.now() + 2 * 60 * 60 * 1000);
    res.cookies.set({
      name: 'session',
      value: await encrypt(payload),
      httpOnly: true,
      expires: expires,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
    });
  }

  return res;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
