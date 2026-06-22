import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-stone-50 px-6 text-center text-stone-900">
      <div className="max-w-xl">
        <img
          src="/logo.png"
          alt="Milele Twakumbuka"
          className="mx-auto mb-8 h-auto w-40 object-contain"
        />

        <p className="mb-4 text-xs uppercase tracking-[0.25em] text-stone-400">
          Page Not Found
        </p>

        <h1 className="mb-5 font-serif text-4xl leading-tight text-stone-900 sm:text-5xl">
          This memory could not be found.
        </h1>

        <p className="mx-auto mb-8 max-w-md text-sm font-light leading-relaxed text-stone-500 sm:text-base">
          The page may have been moved, removed, or the link may be incorrect.
          You can return to the memorial archive and continue from there.
        </p>

        <div className="flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/memorials"
            className="rounded-full bg-stone-900 px-7 py-3 text-sm font-medium text-white"
          >
            View Memorials
          </Link>

          <Link
            href="/"
            className="rounded-full border border-stone-200 bg-white px-7 py-3 text-sm font-medium text-stone-700"
          >
            Back Home
          </Link>
        </div>
      </div>
    </main>
  );
}