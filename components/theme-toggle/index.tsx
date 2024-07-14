import { SunIcon } from 'lucide-react';
import dynamic from 'next/dynamic';

const ThemeToggle = dynamic(
  () => import('@/components/theme-toggle/theme-switcher'),
  {
    loading: () => (
      <button className="flex size-10 items-center justify-center rounded-full opacity-80 outline-none transition-opacity hover:opacity-100">
        <SunIcon />
      </button>
    ),
    ssr: false,
  },
);

export default ThemeToggle;
