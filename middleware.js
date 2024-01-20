import { NextResponse } from 'next/server';

export function middleware(req) {
  if (req.nextUrl.pathname !== req.nextUrl.pathname.toLowerCase()) {
    const newUrl = req.nextUrl.clone();
    newUrl.pathname = newUrl.pathname.toLowerCase();
    return NextResponse.redirect(newUrl);
  }

  return NextResponse.next();
}
