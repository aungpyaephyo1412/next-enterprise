import type { NextAuthConfig, Session } from 'next-auth';
import { NextRequest } from 'next/server';

const handleRedirection = (auth: Session | null, request: NextRequest) => {
  const { nextUrl } = request;
  const isLoggedIn = !!auth?.user;

  if (nextUrl.pathname.startsWith('/images')) {
    return true;
  }
  if (isLoggedIn) {
    const isRedirectPath = ['/login', '/register'].includes(nextUrl.pathname);
    if (isRedirectPath) {
      return Response.redirect(new URL('/home', nextUrl));
    }
    return true;
  } else {
    return ['/forgot-password', '/reset-password', '/register'].some((path) =>
      nextUrl.pathname.startsWith(path),
    );
  }
};

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request }) {
      return handleRedirection(auth, request);
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;
