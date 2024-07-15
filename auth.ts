import { authConfig } from '@/lib/auth.config';
import NextAuth from 'next-auth';

export const { auth, signIn, signOut, handlers } = NextAuth(authConfig);
