import ThemeToggle from '@/components/theme-toggle';
import env from '@/env';

const Page = () => {
  const { ANALYZE } = env();
  console.log(ANALYZE);
  return (
    <section className='min-h-dvh w-full flex flex-col justify-center items-center'>
      <ThemeToggle />
      <h1 title='Testing-title'>Nextjs template</h1>
    </section>
  );
};

export default Page;
