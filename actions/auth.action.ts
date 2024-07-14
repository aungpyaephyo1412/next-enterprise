'use server';

import { auth, signIn, signOut } from '@/auth';

export const getAuth = async () => auth().then((r) => r);

export const login = async () => {
  await signIn('credentials', {});
};

export const logout = async () => {
  await signOut();
};
