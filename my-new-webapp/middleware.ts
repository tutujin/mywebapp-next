import { NextResponse } from 'next/server';

export function middleware() {
  return new NextResponse('Middleware works!', { status: 200 });
}

export const config = {
  matcher: '/',
};