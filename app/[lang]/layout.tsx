import { i18n } from '@/i18n-config';
import { notFound } from 'next/navigation';
import { PropsWithChildren } from 'react';

interface LangLayoutProps extends PropsWithChildren {
  params: { lang: string };
}

const Layout = ({ children, params: { lang } }: LangLayoutProps) => {
  const checkLang = i18n.locales.find((locale) => locale === lang);
  if (!checkLang) {
    notFound();
  }
  return <>{children}</>;
};

export default Layout;
