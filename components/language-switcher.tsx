'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const LanguageSwitcher = () => {
  const pathname = usePathname().substring(4);
  return (
    <ul className="flex items-center justify-center gap-5">
      <Link
        href={`/en/${pathname}`}
        className="rounded-full bg-blue-500 px-4 py-2 text-white"
      >
        English
      </Link>
      <Link
        href={`/my/${pathname}`}
        className="rounded-full bg-blue-500 px-4 py-2 text-white"
      >
        Myanmar
      </Link>
    </ul>
  );
};

export default LanguageSwitcher;
