import Link from "next/link";

const categories = [
  {
    title: "Historical Figures",
    description: "Leaders, founders, and figures who shaped history.",
    href: "/memorials?category=Historical+Figures",
  },
  {
    title: "Loved Ones",
    description: "Personal memorials created by families.",
    href: "/memorials?category=Loved+Ones",
  },
  {
    title: "Children Remembered",
    description: "A gentle space for young lives remembered with love.",
    href: "/memorials?category=Children+Remembered",
  },
  {
    title: "Community Tributes",
    description: "Teachers, elders, and those who served communities.",
    href: "/memorials?category=Community+Tributes",
  },
  {
    title: "Veterans & Defenders",
    description: "Those who served, protected, and sacrificed for others.",
    href: "/memorials?category=Veterans+%26+Defenders",
  },
  {
    title: "Faith Leaders",
    description: "Spiritual guides and religious figures.",
    href: "/memorials?category=Faith+Leaders",
  },
  {
    title: "Artists & Cultural Figures",
    description: "Creatives whose work shaped culture and memory.",
    href: "/memorials?category=Artists+%26+Cultural+Figures",
  },
  {
    title: "Tragedies",
    description: "Collective loss, remembrance, and shared healing.",
    href: "/tragedies",
  },
];

export default function CategoriesPage() {
  return (
    <main className="min-h-screen bg-[#fbfaf8] text-[#1f1f1f]">
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
        <div className="mx-auto max-w-6xl">
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.25em] text-stone-400">
            Browse by meaning
          </p>

          <h1 className="mb-5 font-serif text-4xl leading-tight text-stone-900 md:text-5xl">
            Categories of Remembrance
          </h1>

          <p className="max-w-3xl text-base font-light leading-relaxed text-[#7a7168]">
            Every life tells a unique story. Browse memorials categorized by the
            legacy, memory, and meaning they carry.
          </p>
        </div>
      </section>

      <section className="px-5 pb-24 sm:px-6 sm:pb-28">
        <div className="mx-auto grid max-w-6xl gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <Link
              key={category.title}
              href={category.href}
              className="group rounded-3xl border border-[#eee8e1] bg-white p-7 shadow-sm transition hover:-translate-y-2 hover:shadow-lg"
            >
              <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f6f3ef] text-2xl transition group-hover:scale-110">
                ♡
              </div>

              <h2 className="mb-4 font-serif text-2xl text-stone-800 group-hover:underline">
                {category.title}
              </h2>

              <p className="text-sm font-light leading-relaxed text-[#7a7168]">
                {category.description}
              </p>
            </Link>
          ))}
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