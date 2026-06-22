"use client";

export default function Error({ error, reset }) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-stone-50 px-6 text-center">
      <div className="max-w-xl">
        <img
          src="/logo.png"
          alt="Milele Twakumbuka"
          className="mx-auto mb-8 w-40"
        />

        <p className="mb-4 text-xs uppercase tracking-[0.3em] text-stone-400">
          Something went wrong
        </p>

        <h1 className="mb-6 font-serif text-5xl text-stone-900">
          We encountered an unexpected problem.
        </h1>

        <p className="mb-10 text-lg leading-relaxed text-stone-500">
          Please try again. If the issue persists, return home and continue
          preserving memories with dignity.
        </p>

        <div className="flex justify-center gap-4">
          <button
            onClick={() => reset()}
            className="rounded-full bg-stone-900 px-7 py-3 text-white"
          >
            Try Again
          </button>

          <a
            href="/"
            className="rounded-full border border-stone-200 px-7 py-3 text-stone-700"
          >
            Back Home
          </a>
        </div>
      </div>
    </main>
  );
}