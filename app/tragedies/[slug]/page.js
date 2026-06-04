import Link from "next/link";

const TRAGEDIES = {
  "garissa-university-attack": {
    title: "Garissa University Attack",
    year: "2015",
    category: "School Tragedies",
    location: "Garissa, Kenya",
    image:
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=2070&auto=format&fit=crop",
    summary:
      "A solemn remembrance of the students whose lives were taken, and the families and nation forever changed.",
    reflection:
      "This page exists as a quiet space of remembrance — preserving memory with dignity, care, and humanity.",
    details: [
      "Remembering the students, families, teachers, responders, and communities affected.",
      "Preserving the human memory beyond headlines and dates.",
      "Creating space for reflection, learning, and national remembrance.",
    ],
  },
  "westgate-attack": {
    title: "Westgate Attack",
    year: "2013",
    category: "Terror Attacks",
    location: "Nairobi, Kenya",
    image:
      "https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=2070&auto=format&fit=crop",
    summary:
      "Honoring the victims, survivors, responders, and families affected by a moment of national grief.",
    reflection:
      "A remembrance space for courage, loss, humanity, and the lives forever connected to this tragedy.",
    details: [
      "Honoring victims and survivors with calm remembrance.",
      "Recognizing responders, families, and ordinary acts of courage.",
      "Preserving memory in a way that remains respectful and human.",
    ],
  },
  "molo-tanker-tragedy": {
    title: "Molo Tanker Tragedy",
    year: "2009",
    category: "Public Disasters",
    location: "Molo, Kenya",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=2070&auto=format&fit=crop",
    summary:
      "A reflective remembrance of lives lost in one of Kenya’s painful public disasters.",
    reflection:
      "Some tragedies live quietly in families and communities long after public attention fades.",
    details: [
      "Remembering those who lost their lives and the families left grieving.",
      "Holding space for community pain and national reflection.",
      "Preserving memory with dignity beyond the moment of disaster.",
    ],
  },
  "solai-dam-tragedy": {
    title: "Solai Dam Tragedy",
    year: "2018",
    category: "Community Remembrance",
    location: "Solai, Nakuru County",
    image:
      "https://images.unsplash.com/photo-1470770903676-69b98201ea1c?q=80&w=2070&auto=format&fit=crop",
    summary:
      "Remembering families, homes, and lives affected by the devastating Solai dam disaster.",
    reflection:
      "A community tragedy is never only about what was destroyed, but also about what must be remembered.",
    details: [
      "Honoring lives, homes, and memories affected by the disaster.",
      "Creating space for community remembrance and reflection.",
      "Preserving the human story with care and dignity.",
    ],
  },
  "likoni-ferry-tragedy": {
    title: "Likoni Ferry Tragedy",
    year: "1994",
    category: "Historical Losses",
    location: "Likoni, Mombasa",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=2070&auto=format&fit=crop",
    summary:
      "Preserving memory of a tragedy carried in Kenya’s collective history.",
    reflection:
      "Historical loss deserves a place where memory can be held gently and passed forward.",
    details: [
      "Remembering those whose lives were lost.",
      "Recognizing the deep pain carried by families and communities.",
      "Keeping national memory alive with dignity.",
    ],
  },
  "river-road-fire-tragedies": {
    title: "River Road Fire Tragedies",
    year: "Remembered",
    category: "Public Disasters",
    location: "Nairobi, Kenya",
    image:
      "https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=2070&auto=format&fit=crop",
    summary:
      "A remembrance space for lives affected by fire tragedies in Nairobi’s historic corridors.",
    reflection:
      "Places hold memory. Streets, buildings, families, and communities carry stories that deserve dignity.",
    details: [
      "Remembering people affected by fire tragedies.",
      "Honoring families, workers, responders, and communities.",
      "Creating a calm archive for public memory and reflection.",
    ],
  },
};

export default async function TragedyDetailPage({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug;
  const tragedy = TRAGEDIES[slug];

  if (!tragedy) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-stone-50 px-6 text-center">
        <div>
          <h1 className="mb-4 font-serif text-3xl text-stone-800">
            Tragedy memorial not found
          </h1>

          <Link
            href="/tragedies"
            className="text-sm text-stone-500 underline underline-offset-4"
          >
            Return to tragedies
          </Link>
        </div>
      </main>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900">
      <header className="relative border-b border-stone-100">
        <div className="absolute inset-0">
          <img
            src={tragedy.image}
            alt={tragedy.title}
            className="h-full w-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-stone-50/80" />
        </div>

        <div className="relative z-10 mx-auto max-w-5xl px-6 py-20 text-center">
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.25em] text-stone-400">
            {tragedy.category}
          </p>

          <h1 className="mx-auto mb-5 max-w-3xl font-serif text-4xl leading-tight text-stone-900 md:text-5xl">
            {tragedy.title}
          </h1>

          <p className="mb-4 text-sm font-light text-stone-500">
            {tragedy.location} · {tragedy.year}
          </p>

          <p className="mx-auto max-w-2xl text-base font-light leading-relaxed text-stone-600">
            {tragedy.summary}
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          <section className="space-y-8 lg:col-span-8">
            <div className="rounded-2xl border border-stone-100 bg-white p-8">
              <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-stone-400">
                Remembrance
              </p>

              <p className="font-serif text-2xl leading-relaxed text-stone-800">
                {tragedy.reflection}
              </p>
            </div>

            <div className="rounded-2xl border border-stone-100 bg-white p-8">
              <h2 className="mb-6 font-serif text-xl text-stone-800">
                Remembered with dignity
              </h2>

              <div className="space-y-4">
                {tragedy.details.map((item) => (
                  <div
                    key={item}
                    className="rounded-xl border border-stone-100 bg-stone-50 p-5"
                  >
                    <p className="text-sm font-light leading-relaxed text-stone-600">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <aside className="space-y-6 lg:col-span-4">
            <div className="rounded-2xl border border-stone-100 bg-white p-6">
              <h3 className="mb-4 text-sm font-medium uppercase tracking-wider text-stone-700">
                Details
              </h3>

              <dl className="space-y-3 text-sm">
                <div>
                  <dt className="text-xs font-light text-stone-400">
                    Category
                  </dt>
                  <dd className="mt-0.5 font-light text-stone-700">
                    {tragedy.category}
                  </dd>
                </div>

                <div>
                  <dt className="text-xs font-light text-stone-400">Year</dt>
                  <dd className="mt-0.5 font-light text-stone-700">
                    {tragedy.year}
                  </dd>
                </div>

                <div>
                  <dt className="text-xs font-light text-stone-400">
                    Location
                  </dt>
                  <dd className="mt-0.5 font-light text-stone-700">
                    {tragedy.location}
                  </dd>
                </div>
              </dl>
            </div>

            <div className="rounded-2xl bg-stone-900 p-6 text-white">
              <h3 className="mb-3 text-sm font-medium">
                National Remembrance
              </h3>

              <p className="text-xs font-light leading-relaxed text-stone-400">
                Milele Twakumbuka keeps this space calm, respectful, and
                focused on human memory rather than spectacle.
              </p>
            </div>

            <div className="rounded-2xl border border-stone-100 bg-white p-6">
              <h3 className="mb-3 font-serif text-lg text-stone-800">
                Add a Loved One
              </h3>

              <p className="mb-5 text-sm font-light leading-relaxed text-stone-500">
                If someone you remember is connected to this tragedy, you may
                create a memorial page and preserve their story with dignity.
              </p>

              <Link
                href={`/add-loved-one?tragedy=${slug}`}
                className="block rounded-full bg-stone-900 px-5 py-3 text-center text-sm font-medium text-white"
              >
                Add Loved One to This Tragedy
              </Link>
            </div>

            <Link
              href="/tragedies"
              className="block rounded-2xl border border-stone-100 bg-white p-6 text-sm font-medium text-stone-700 transition hover:border-stone-200 hover:shadow-sm"
            >
              ← Back to all tragedies
            </Link>
          </aside>
        </div>
      </main>

      <footer className="border-t border-stone-100 bg-white px-6 py-14 text-center">
        <p className="mb-8 font-serif text-lg italic text-stone-400">
          ♡ In remembrance, with dignity.
        </p>

        <div className="mb-8 flex flex-wrap justify-center gap-7 text-sm text-stone-500">
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
    </div>
  );
}