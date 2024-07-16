import { login, logout } from '@/actions/auth.action';
import { auth } from '@/auth';
import LanguageSwitcher from '@/components/language-switcher';
import ThemeToggle from '@/components/theme-toggle';
import { getIntl } from '@/lib/intl';
const Page = async ({ params: { lang } }: { params: { lang: string } }) => {
  const session = await auth();
  const intl = await getIntl(lang);

  return (
    <section
      title={'session'}
      className="flex min-h-dvh w-full flex-col items-center justify-center"
    >
      {session ? (
        <form action={logout}>
          <button className="mb-7 rounded bg-blue-500 px-4 py-2 text-center text-white">
            {intl.formatMessage({ id: 'logout_account' })}
          </button>
        </form>
      ) : (
        <form action={login}>
          <button className="mb-7 rounded bg-blue-500 px-4 py-2 text-center text-white">
            {intl.formatMessage({ id: 'login_account' })}
          </button>
        </form>
      )}
      <h1>Nextjs template</h1>
      <ThemeToggle />
      <LanguageSwitcher />
    </section>
  );
};

export default Page;
