import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-dvh w-full flex-col items-center justify-center gap-5">
      <h2 className="text-xl font-semibold">404 | Page Not Found</h2>
      <p className="text-sm">Could not find requested resource</p>
      <Link
        href="/"
        className="rounded-full bg-blue-500 px-4 py-2 text-sm text-white"
      >
        Return Home
      </Link>
    </div>
  );
}
