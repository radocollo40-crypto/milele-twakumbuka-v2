import Link from "next/link";
import FadeInSection from "../components/FadeInSection";
import { supabase } from "@/lib/supabase";
import AuthButtons from "../components/AuthButtons";

const CATEGORIES = [
  {
    name: "Historical Figures",
    href: "/memorials?category=Historical+Figures",
    desc: "Leaders, founders, and figures who shaped history.",
  },
  {
    name: "Loved Ones",
    href: "/memorials?category=Loved+Ones",
    desc: "Personal memorials created by families.",
  },
  {
    name: "Children Remembered",
    href: "/memorials?category=Children+Remembered",
    desc: "A gentle space for young lives.",
  },
  {
    name: "Community Tributes",
    href: "/memorials?category=Community+Tributes",
    desc: "Teachers, elders, and those who served.",
  },
  {
    name: "Veterans & Defenders",
    href: "/memorials?category=Veterans+%26+Defenders",
    desc: "Those who served and protected.",
  },
  {
    name: "Faith Leaders",
    href: "/memorials?category=Faith+Leaders",
    desc: "Spiritual guides and religious figures.",
  },
  {
    name: "Artists & Cultural Figures",
    href: "/memorials?category=Artists+%26+Cultural+Figures",
    desc: "Creatives who shaped culture.",
  },
  {
    name: "Tragedies",
    href: "/tragedies",
    desc: "Collective loss and shared remembrance.",
  },
];

async function getFeaturedMemorials() {
  const { data, error } = await supabase
    .from("memorials")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(4);

  if (error || !data) {
    return [];
  }

  return data;
}

export default async function HomePage() {
  const featuredMemorials = await getFeaturedMemorials();

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900">
      <header className="sticky top-0 z-50 border-b border-stone-100 bg-stone-50/90 backdrop-blur-md">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 md:py-5">
          <Link
            href="/"
            className="font-serif text-xl text-stone-900 sm:text-2xl"
          >
            Milele Twakumbuka
          </Link>

          <div className="hidden items-center gap-8 text-sm font-medium text-stone-600 md:flex">
            <Link href="/" className="hover:text-stone-900">Home</Link>
            <Link href="/memorials" className="hover:text-stone-900">Memorials</Link>
            <Link href="/categories" className="hover:text-stone-900">Categories</Link>
            <Link href="/tragedies" className="hover:text-stone-900">Tragedies</Link>
            <Link href="/add-loved-one" className="hover:text-stone-900">Add Loved One</Link>
            <Link href="/about" className="hover:text-stone-900">About</Link>
            <AuthButtons />
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
                  <AuthButtons />
                </div>
              </div>
            </details>
          </div>
        </nav>
      </header>

      <header className="relative border-b border-stone-100 py-20 sm:py-24 md:py-40">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2070&auto=format&fit=crop"
            className="h-full w-full object-cover opacity-10"
            alt=""
          />
        </div>

        <div className="relative z-10 mx-auto max-w-4xl space-y-6 px-5 text-center sm:px-6 md:space-y-7">
          <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-stone-400">
            In Loving Memory
          </p>

          <h1 className="font-serif text-4xl leading-tight text-stone-900 sm:text-5xl md:text-6xl">
            Milele Twakumbuka
          </h1>

          <p className="mx-auto max-w-2xl text-base font-light leading-relaxed text-stone-500 sm:text-lg">
            A peaceful and dignified space to honor loved ones, preserve memory,
            celebrate legacy, and remember together.
          </p>

          <div className="flex flex-col items-stretch justify-center gap-3 pt-2 sm:flex-row sm:items-center">
            <Link
              href="/memorials"
              className="rounded-full bg-stone-900 px-7 py-3.5 text-center text-sm font-medium text-white"
            >
              View Memorials
            </Link>

            <Link
              href="/add-loved-one"
              className="rounded-full border border-stone-200 bg-white px-7 py-3.5 text-center text-sm font-medium text-stone-700"
            >
              Add Loved One
            </Link>
          </div>
        </div>
      </header>

      <FadeInSection>
        <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
          <div className="mb-8 flex flex-col gap-3 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="font-serif text-2xl text-stone-800">
                Featured Memorials
              </h2>
              <p className="mt-1 text-sm font-light text-stone-400">
                Recently remembered lives and legacies.
              </p>
            </div>

            <Link href="/memorials" className="text-sm text-stone-500">
              Explore all →
            </Link>
          </div>

          {featuredMemorials.length === 0 ? (
            <div className="rounded-2xl border border-stone-100 bg-white p-8 text-center text-sm text-stone-400">
              No memorials have been added yet.
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
              {featuredMemorials.map((memorial) => (
                <Link
                  key={memorial.id}
                  href={`/memorials/${memorial.id}`}
                  className="group overflow-hidden rounded-2xl border border-stone-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="h-60 overflow-hidden bg-stone-100 sm:h-56">
                    {memorial.image_url ? (
                      <img
                        src={memorial.image_url}
                        alt={memorial.name}
                        className="h-full w-full object-cover object-top opacity-90 transition duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-5xl text-stone-300">
                        ♡
                      </div>
                    )}
                  </div>

                  <div className="p-5">
                    <p className="mb-2 text-xs uppercase tracking-[0.18em] text-stone-400">
                      {memorial.category || "Loved Ones"}
                    </p>

                    <h3 className="font-serif text-lg text-stone-800">
                      {memorial.name}
                    </h3>

                    <p className="mt-1 text-sm font-light text-stone-400">
                      {memorial.birth_date || "Birth"} —{" "}
                      {memorial.death_date || "Remembrance"}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>
      </FadeInSection>

      <FadeInSection>
        <section className="border-t border-stone-100 py-14 sm:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-8 sm:mb-10">
              <h2 className="font-serif text-2xl text-stone-800">
                Remembrance Categories
              </h2>
              <p className="mt-1 text-sm font-light text-stone-400">
                Explore memorials by meaning, history, family, and community.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
              {CATEGORIES.map((cat) => (
                <Link
                  key={cat.name}
                  href={cat.href}
                  className="rounded-xl border border-stone-100 bg-white p-5 transition hover:border-stone-200 hover:shadow-sm"
                >
                  <h3 className="mb-1 text-sm font-medium text-stone-800">
                    {cat.name}
                  </h3>
                  <p className="text-xs font-light leading-relaxed text-stone-400">
                    {cat.desc}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </FadeInSection>

      <FadeInSection>
        <section className="border-t border-stone-100 py-14 sm:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-start justify-between gap-6 rounded-2xl border border-stone-100 bg-white p-6 sm:p-8 md:flex-row md:items-center">
              <div className="max-w-xl space-y-2">
                <p className="text-xs font-medium uppercase tracking-widest text-stone-400">
                  Kenya Remembers
                </p>
                <h2 className="font-serif text-2xl text-stone-800">
                  Tragedies
                </h2>
                <p className="text-sm font-light leading-relaxed text-stone-500">
                  A gentle space for remembrance, reflection, and preserving the
                  memories of lives, communities, and moments Kenya must never
                  forget.
                </p>
              </div>

              <Link
                href="/tragedies"
                className="w-full rounded-full bg-stone-900 px-6 py-3 text-center text-sm font-medium text-white sm:w-auto"
              >
                Browse Tragedies
              </Link>
            </div>
          </div>
        </section>
      </FadeInSection>

      <FadeInSection>
        <section className="border-t border-stone-100 py-14 sm:py-16">
          <div className="mx-auto max-w-4xl space-y-7 px-5 text-center sm:px-6 lg:px-8">
            <h2 className="font-serif text-2xl text-stone-800">
              A living archive of memory
            </h2>

            <p className="font-light leading-relaxed text-stone-500">
              Milele Twakumbuka is built to preserve life stories with dignity —
              personal memories, family legacies, community histories, and
              national remembrance.
            </p>

            <Link
              href="/add-loved-one"
              className="inline-block w-full rounded-full bg-stone-900 px-7 py-3.5 text-center text-sm font-medium text-white sm:w-auto"
            >
              Add Loved One
            </Link>
          </div>
        </section>
      </FadeInSection>

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
          A dignified digital remembrance platform designed to honor memory,
          legacy, and unity across communities.
        </p>

        <p className="mt-10 text-xs uppercase tracking-[0.3em] text-stone-300">
          © 2026 Milele Twakumbuka
        </p>
      </footer>
    </div>
  );
}