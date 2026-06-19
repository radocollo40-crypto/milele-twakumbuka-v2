import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

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
    <main className="min-h-screen bg-stone-50 text-stone-900">
      <Navbar />

      <section className="border-b border-stone-100 bg-white px-5 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.25em] text-stone-400">
            Browse by meaning
          </p>

          <h1 className="mb-5 font-serif text-4xl leading-tight text-stone-900 md:text-5xl">
            Categories of Remembrance
          </h1>

          <p className="max-w-3xl text-base font-light leading-relaxed text-stone-500">
            Every life tells a unique story. Browse memorials categorized by the
            legacy, memory, and meaning they carry.
          </p>
        </div>
      </section>

      <section className="px-5 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <Link
              key={category.title}
              href={category.href}
              className="group rounded-3xl border border-stone-100 bg-white p-7 shadow-sm transition hover:-translate-y-2 hover:shadow-lg"
            >
              <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-stone-50 text-2xl transition group-hover:scale-110">
                ♡
              </div>

              <h2 className="mb-4 font-serif text-2xl text-stone-800 group-hover:underline">
                {category.title}
              </h2>

              <p className="text-sm font-light leading-relaxed text-stone-500">
                {category.description}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}