import { auth } from '@/auth';
import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from 'next-themes';
import { ReactNode } from 'react';

const Provider = async ({ children }: { children: ReactNode }) => {
  const session = await auth();
  return (
    <SessionProvider session={session}>
      <ThemeProvider
        disableTransitionOnChange={false}
        storageKey='theme'
        attribute='class'
        defaultTheme='system'
        enableSystem
      >
        {children}
      </ThemeProvider>
    </SessionProvider>
  );
};

export default Provider;
