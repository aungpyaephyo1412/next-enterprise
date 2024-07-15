import { login, logout } from '@/actions/auth.action';
import { auth } from '@/auth';
import ThemeToggle from '@/components/theme-toggle';

const Page = async () => {
  const session = await auth();
  return (
    <section
      title={'session'}
      className="flex min-h-dvh w-full flex-col items-center justify-center"
    >
      <h1>Nextjs template</h1>
      <ThemeToggle />
      {session ? (
        <form action={logout}>
          <button>Logout</button>
        </form>
      ) : (
        <form action={login}>
          <button>Sign in</button>
        </form>
      )}
    </section>
  );
};

export default Page;
