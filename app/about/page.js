import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const values = [
  {
    title: "Dignity",
    description:
      "Every life story is treated with care, respect, and quiet honor.",
    icon: "◇",
  },
  {
    title: "Compassion",
    description:
      "The platform is designed to feel gentle, supportive, and emotionally safe.",
    icon: "♡",
  },
  {
    title: "Memory",
    description:
      "Names, photographs, stories, and reflections are preserved across generations.",
    icon: "⌁",
  },
  {
    title: "Legacy",
    description:
      "We help families and communities protect the meaning left behind by those they love.",
    icon: "◎",
  },
];

const offerings = [
  "Memorial Pages",
  "Funeral Notices",
  "Family Conversation Walls",
  "Candles and Flowers",
  "Community Tributes",
  "National Remembrance",
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-stone-50 text-stone-900">
      <Navbar />

      <section className="border-b border-stone-100 bg-white px-5 py-16 text-center sm:px-6 sm:py-20">
        <div className="mx-auto max-w-4xl">
          <img
            src="/logo.png"
            alt="Milele Twakumbuka"
            className="mx-auto mb-8 h-auto w-full max-w-[420px] object-contain"
          />

          <p className="mb-4 text-xs font-medium uppercase tracking-[0.25em] text-stone-400">
            About Milele Twakumbuka
          </p>

          <h1 className="mx-auto max-w-3xl font-serif text-4xl leading-tight text-stone-900 sm:text-5xl">
            A peaceful digital sanctuary for memory, dignity, and remembrance.
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-base font-light leading-relaxed text-stone-500 sm:text-lg">
            Milele Twakumbuka was created from a simple belief: every life
            deserves to be remembered with care, and every family deserves a
            dignified space to preserve memory.
          </p>
        </div>
      </section>

      <section className="px-5 py-16 sm:px-6">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-12">
          <div className="rounded-3xl border border-stone-100 bg-white p-7 shadow-sm sm:p-9 lg:col-span-7">
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.25em] text-stone-400">
              Why We Exist
            </p>

            <h2 className="mb-5 font-serif text-3xl text-stone-800">
              Memories should not disappear with time.
            </h2>

            <div className="space-y-5 text-sm font-light leading-relaxed text-stone-600 sm:text-base">
              <p>
                In moments of loss, memories are often scattered across phones,
                conversations, photographs, messages, and silence. Milele
                Twakumbuka brings those memories into one gentle and lasting
                place.
              </p>

              <p>
                It is designed for families, communities, public remembrance,
                and national reflection — without noise, pressure, or spectacle.
              </p>

              <p>
                Our goal is to make remembrance feel human: calm enough for
                grief, beautiful enough for legacy, and simple enough for anyone
                to use.
              </p>
            </div>
          </div>

          <div className="rounded-3xl bg-stone-900 p-7 text-white shadow-sm sm:p-9 lg:col-span-5">
            <p className="mb-4 text-xs uppercase tracking-[0.25em] text-stone-400">
              Our Promise
            </p>

            <p className="font-serif text-3xl leading-relaxed text-stone-100">
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

      <section className="border-t border-stone-100 bg-white px-5 py-16 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 text-center">
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.25em] text-stone-400">
              What We Offer
            </p>

            <h2 className="font-serif text-3xl text-stone-800">
              A complete space for remembrance.
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {offerings.map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-stone-100 bg-stone-50 p-5 text-center text-sm font-light text-stone-600"
              >
                ♡ {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-stone-100 px-5 py-16 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10">
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.25em] text-stone-400">
              Our Values
            </p>

            <h2 className="font-serif text-3xl text-stone-800">
              What guides Milele Twakumbuka
            </h2>
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
          <p className="font-serif text-2xl italic leading-relaxed text-stone-700 sm:text-3xl">
            “Gone from sight, but never from memory.”
          </p>

          <p className="mx-auto mt-6 max-w-2xl text-sm font-light leading-relaxed text-stone-500 sm:text-base">
            Begin with one memory. Create a memorial, browse remembrance pages,
            or preserve a loved one’s story for generations to come.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
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

      <Footer />
    </main>
  );
}