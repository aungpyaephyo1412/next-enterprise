import { NextAuthConfig, Session, User } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
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

const authorizeUser = async (credentials: any): Promise<User> => {
  console.log(credentials.name);
  return {
    id: 'id',
    name: 'name',
    role: 'User',
    phone: 'phone',
    createdAt: new Date(),
    updatedAt: new Date(),
    dateOfBirth: new Date(),
    address: 'data.data.address',
    jwt: 'data.jwt',
  };
};

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  providers: [
    Credentials({
      authorize: authorizeUser,
    }),
  ],
  callbacks: {
    authorized({ auth, request }) {
      return handleRedirection(auth, request);
    },
    async jwt({ token, user, session, trigger }) {
      if (trigger === 'update') {
        return {
          ...token,
          ...session.user,
        };
      }
      if (trigger === 'signIn') {
        if (user)
          return {
            ...token,
            id: user.id,
            name: user.name,
            role: user.role,
            phone: user.phone,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
            dateOfBirth: user.dateOfBirth,
            address: user.address,
            jwt: user.jwt,
          };
      }

      return token;
    },
    async session({ session, token }) {
      if (token) {
        return {
          ...session,
          user: {
            id: token.id,
            name: token.name,
            role: token.role,
            phone: token.phone,
            age: token.age,
            createdAt: token.createdAt,
            updatedAt: token.updatedAt,
            dateOfBirth: token.dateOfBirth,
            address: token.address,
            jwt: token.jwt,
          },
        };
      }

      return session;
    },
  },
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60 * 24 * 30,
  },
} satisfies NextAuthConfig;
