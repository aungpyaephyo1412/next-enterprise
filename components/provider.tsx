import { ThemeProvider } from 'next-themes';
import { ReactNode } from 'react';

const Provider = ({ children }: { children: ReactNode }) => {
  return (
    <ThemeProvider
      disableTransitionOnChange={false}
      storageKey='theme'
      attribute='class'
      defaultTheme='system'
      enableSystem
    >
      {children}
    </ThemeProvider>
  );
};

export default Provider;
