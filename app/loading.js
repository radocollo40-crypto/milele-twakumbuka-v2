export default function Loading() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-stone-50 px-6 text-center text-stone-900">
      <div className="max-w-md">
        <img
          src="/logo.png"
          alt="Milele Twakumbuka"
          className="mx-auto mb-8 h-auto w-36 object-contain opacity-90"
        />

        <p className="mb-4 text-xs uppercase tracking-[0.3em] text-stone-400">
          Milele Twakumbuka
        </p>

        <h1 className="mb-5 font-serif text-3xl leading-tight text-stone-900 sm:text-4xl">
          Loading memories...
        </h1>

        <p className="mx-auto text-sm font-light leading-relaxed text-stone-500">
          Please wait while we prepare this remembrance space.
        </p>

        <div className="mx-auto mt-8 h-1 w-32 overflow-hidden rounded-full bg-stone-200">
          <div className="h-full w-1/2 animate-pulse rounded-full bg-stone-800" />
        </div>
      </div>
    </main>
  );
}