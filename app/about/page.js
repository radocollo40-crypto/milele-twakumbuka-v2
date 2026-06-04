import Link from "next/link";

const values = [
  {
    title: "Dignity",
    description:
      "Every memorial is treated with care, respect, and a quiet sense of honor.",
    icon: "◇",
  },
  {
    title: "Memory",
    description:
      "Stories, names, photographs, and reflections are preserved so they are not forgotten.",
    icon: "♡",
  },
  {
    title: "Family",
    description:
      "A space for loved ones to remember together, share comfort, and protect legacy.",
    icon: "⌁",
  },
  {
    title: "Community",
    description:
      "Honoring not only individuals, but also shared histories, collective loss, and public remembrance.",
    icon: "◎",
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-stone-50 text-stone-900">
      <header className="sticky top-0 z-50 border-b border-stone-100 bg-stone-50/90 backdrop-blur-md">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 md:py-5">
          <Link href="/" className="font-serif text-xl text-stone-900 sm:text-2xl">
            Milele Twakumbuka
          </Link>

          <div className="hidden items-center gap-8 text-sm font-medium text-stone-600 md:flex">
            <Link href="/">Home</Link>
            <Link href="/memorials">Memorials</Link>
            <Link href="/categories">Categories</Link>
            <Link href="/tragedies">Tragedies</Link>
            <Link href="/add-loved-one">Add Loved One</Link>
            <Link href="/about">About</Link>
          </div>

          <div className="md:hidden">
            <details className="relative">
              <summary className="cursor-pointer list-none rounded-full border border-stone-200 bg-white px-4 py-2 text-sm text-stone-700">
                Menu
              </summary>

              <div className="absolute right-0 mt-3 w-56 rounded-2xl border border-stone-100 bg-white p-4 shadow-xl">
                <div className="flex flex-col gap-4 text-sm text-stone-700">
                  <Link href="/">Home</Link>
                  <Link href="/memorials">Memorials</Link>
                  <Link href="/categories">Categories</Link>
                  <Link href="/tragedies">Tragedies</Link>
                  <Link href="/add-loved-one">Add Loved One</Link>
                  <Link href="/about">About</Link>
                </div>
              </div>
            </details>
          </div>
        </nav>
      </header>

      <section className="px-5 pb-16 pt-24 sm:px-6 sm:pt-32">
        <div className="mx-auto max-w-5xl">
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.25em] text-stone-400">
            About Milele Twakumbuka
          </p>

          <h1 className="mb-6 max-w-3xl font-serif text-4xl leading-tight text-stone-900 md:text-5xl">
            A quiet place for memory, dignity, and remembrance.
          </h1>

          <p className="max-w-3xl text-base font-light leading-relaxed text-stone-500 sm:text-lg">
            Milele Twakumbuka was created from a simple belief: every life
            deserves to be remembered with care, and every family deserves a
            dignified space to preserve memory.
          </p>
        </div>
      </section>

      <section className="px-5 pb-16 sm:px-6">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-12">
          <div className="rounded-2xl border border-stone-100 bg-white p-7 sm:p-8 lg:col-span-7">
            <h2 className="mb-5 font-serif text-2xl text-stone-800">
              Why this platform exists
            </h2>

            <div className="space-y-5 text-sm font-light leading-relaxed text-stone-600 sm:text-base">
              <p>
                In moments of loss, memory can feel scattered across messages,
                photographs, conversations, and silence. Milele Twakumbuka brings
                those memories into one gentle space.
              </p>

              <p>
                It is designed for families, communities, public remembrance,
                and historical reflection — without noise, spectacle, or
                pressure.
              </p>

              <p>
                Our goal is to make remembrance feel human: calm enough for
                grief, beautiful enough for legacy, and simple enough for anyone
                to use.
              </p>
            </div>
          </div>

          <div className="rounded-2xl bg-stone-900 p-7 text-white sm:p-8 lg:col-span-5">
            <p className="mb-4 text-xs uppercase tracking-[0.25em] text-stone-400">
              Our Promise
            </p>

            <p className="font-serif text-2xl leading-relaxed text-stone-100">
              We preserve memory with dignity, not noise.
            </p>

            <p className="mt-5 text-sm font-light leading-relaxed text-stone-400">
              Every page should feel respectful, soft, and emotionally safe —
              whether remembering a loved one, a community figure, or a national
              tragedy.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-stone-100 px-5 py-16 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10">
            <h2 className="font-serif text-2xl text-stone-800">
              What guides us
            </h2>

            <p className="mt-2 max-w-2xl text-sm font-light leading-relaxed text-stone-500">
              These principles shape the experience, language, and design of the
              platform.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => (
              <div
                key={value.title}
                className="rounded-2xl border border-stone-100 bg-white p-6 shadow-sm"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-stone-50 text-xl text-stone-400">
                  {value.icon}
                </div>

                <h3 className="mb-3 font-serif text-xl text-stone-800">
                  {value.title}
                </h3>

                <p className="text-sm font-light leading-relaxed text-stone-500">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-stone-100 bg-white px-5 py-16 text-center sm:px-6">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-5 font-serif text-2xl text-stone-800">
            Begin with one memory.
          </h2>

          <p className="mb-8 text-sm font-light leading-relaxed text-stone-500 sm:text-base">
            Create a memorial, browse remembrance pages, or explore Kenya’s
            shared memory through tragedy and history.
          </p>

          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/add-loved-one"
              className="rounded-full bg-stone-900 px-7 py-3.5 text-sm font-medium text-white"
            >
              Add Loved One
            </Link>

            <Link
              href="/memorials"
              className="rounded-full border border-stone-200 bg-white px-7 py-3.5 text-sm font-medium text-stone-700"
            >
              Browse Memorials
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-stone-100 bg-white px-5 py-12 text-center sm:px-6 sm:py-14">
        <p className="mb-8 font-serif text-lg italic text-stone-400">
          ♡ In loving memory, forever remembered.
        </p>

        <div className="mb-8 flex flex-wrap justify-center gap-5 text-sm text-stone-500 sm:gap-7">
          <Link href="/">Home</Link>
          <Link href="/memorials">Memorials</Link>
          <Link href="/categories">Categories</Link>
          <Link href="/tragedies">Tragedies</Link>
          <Link href="/add-loved-one">Add Loved One</Link>
          <Link href="/about">About</Link>
        </div>

        <p className="mx-auto max-w-xl text-sm font-light leading-relaxed text-stone-400">
          Milele Twakumbuka preserves memory, legacy, reflection, and shared
          humanity across generations.
        </p>

        <p className="mt-10 text-xs uppercase tracking-[0.3em] text-stone-300">
          © 2026 Milele Twakumbuka
        </p>
      </footer>
    </main>
  );
}