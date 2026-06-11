import Link from "next/link";

export const metadata = {
  title: "Community Guidelines | Milele Twakumbuka",
};

export default function CommunityGuidelinesPage() {
  return (
    <main className="min-h-screen bg-stone-50 px-5 py-14 text-stone-900">
      <div className="mx-auto max-w-4xl">
        <p className="mb-3 text-xs uppercase tracking-[0.25em] text-stone-400">
          Community Guidelines
        </p>

        <h1 className="font-serif text-5xl text-stone-900">
          Respectful Remembrance
        </h1>

        <p className="mt-6 max-w-3xl text-sm leading-relaxed text-stone-500">
          Milele Twakumbuka exists to honor lives, preserve memories, and
          support families. These guidelines help ensure that every memorial,
          tribute, family wall, condolence, and funeral notice remains
          respectful, accurate, and dignified.
        </p>

        <div className="mt-12 space-y-10">

          <section className="rounded-3xl bg-white p-8 shadow-sm">
            <h2 className="mb-4 font-serif text-3xl">
              Respect & Dignity
            </h2>

            <p className="leading-relaxed text-stone-600">
              Every memorial represents a real life, family, and community.
              Content shared on Milele Twakumbuka should be respectful,
              compassionate, and appropriate for a remembrance platform.
            </p>
          </section>

          <section className="rounded-3xl bg-white p-8 shadow-sm">
            <h2 className="mb-4 font-serif text-3xl">
              Accuracy & Responsibility
            </h2>

            <p className="leading-relaxed text-stone-600">
              Please share information that you reasonably believe to be
              accurate. Funeral service dates, locations, biographies,
              photographs, and family information should be truthful and
              responsibly presented.
            </p>
          </section>

          <section className="rounded-3xl bg-white p-8 shadow-sm">
            <h2 className="mb-4 font-serif text-3xl">
              Family Privacy
            </h2>

            <p className="leading-relaxed text-stone-600">
              Respect the privacy of grieving families. Do not publish private
              contact information, addresses, or personal details without
              permission.
            </p>
          </section>

          <section className="rounded-3xl bg-white p-8 shadow-sm">
            <h2 className="mb-4 font-serif text-3xl">
              Family Walls
            </h2>

            <p className="leading-relaxed text-stone-600">
              Family Walls are private remembrance spaces intended for invited
              family members and close friends. Members should communicate with
              kindness and respect while preserving the dignity of the memorial.
            </p>
          </section>

          <section className="rounded-3xl bg-white p-8 shadow-sm">
            <h2 className="mb-4 font-serif text-3xl">
              Prohibited Content
            </h2>

            <ul className="space-y-3 text-stone-600">
              <li>• Hate speech or discrimination</li>
              <li>• Harassment or bullying</li>
              <li>• Graphic or disturbing imagery</li>
              <li>• False or misleading memorials</li>
              <li>• Impersonation of families or individuals</li>
              <li>• Spam or commercial advertising</li>
              <li>• Content intended to cause harm or distress</li>
            </ul>
          </section>

          <section className="rounded-3xl bg-white p-8 shadow-sm">
            <h2 className="mb-4 font-serif text-3xl">
              Reporting Abuse
            </h2>

            <p className="leading-relaxed text-stone-600">
              Users may report memorials, condolences, funeral notices, or
              other content that violates these guidelines. Reported content
              remains visible while under review to protect legitimate
              memorials from misuse of the reporting system.
            </p>
          </section>

          <section className="rounded-3xl bg-white p-8 shadow-sm">
            <h2 className="mb-4 font-serif text-3xl">
              Our Commitment
            </h2>

            <p className="leading-relaxed text-stone-600">
              We are committed to maintaining Milele Twakumbuka as a peaceful,
              respectful, and dignified space where memories can be preserved
              and shared across generations.
            </p>
          </section>

        </div>

        <div className="mt-12 flex flex-wrap gap-3">
          <Link
            href="/"
            className="rounded-full border border-stone-200 bg-white px-6 py-3 text-sm text-stone-600"
          >
            Back Home
          </Link>
        </div>
      </div>
    </main>
  );
}