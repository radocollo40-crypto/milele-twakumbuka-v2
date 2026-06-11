import Link from "next/link";

export const metadata = {
  title: "Terms & Conditions | Milele Twakumbuka",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-stone-50 px-5 py-14 text-stone-900">
      <div className="mx-auto max-w-4xl">
        <p className="mb-3 text-xs uppercase tracking-[0.25em] text-stone-400">
          Terms & Conditions
        </p>

        <h1 className="font-serif text-5xl text-stone-900">
          Terms of Use
        </h1>

        <p className="mt-6 max-w-3xl text-sm leading-relaxed text-stone-500">
          These Terms & Conditions explain the expectations for using Milele
          Twakumbuka. By using the platform, creating memorials, posting
          condolences, sharing funeral notices, or joining family walls, you
          agree to use the service respectfully and responsibly.
        </p>

        <div className="mt-12 space-y-10">
          <section className="rounded-3xl bg-white p-8 shadow-sm">
            <h2 className="mb-4 font-serif text-3xl">
              Purpose of the Platform
            </h2>

            <p className="leading-relaxed text-stone-600">
              Milele Twakumbuka exists to help families and communities honor
              loved ones, preserve memories, share funeral notices, and create
              dignified spaces for remembrance.
            </p>
          </section>

          <section className="rounded-3xl bg-white p-8 shadow-sm">
            <h2 className="mb-4 font-serif text-3xl">
              User Responsibility
            </h2>

            <p className="leading-relaxed text-stone-600">
              Users are responsible for the memorials, photos, messages,
              condolences, funeral notices, and other content they submit. You
              should only share information you believe is accurate and that you
              have permission to publish.
            </p>
          </section>

          <section className="rounded-3xl bg-white p-8 shadow-sm">
            <h2 className="mb-4 font-serif text-3xl">
              Memorial Ownership
            </h2>

            <p className="leading-relaxed text-stone-600">
              Memorials should be created by family members, close friends,
              authorized representatives, or people acting respectfully in good
              faith. Disputes about memorial ownership may require review,
              correction, transfer, or removal.
            </p>
          </section>

          <section className="rounded-3xl bg-white p-8 shadow-sm">
            <h2 className="mb-4 font-serif text-3xl">
              Content Rights
            </h2>

            <p className="leading-relaxed text-stone-600">
              You retain responsibility for the content you upload. By sharing
              content on Milele Twakumbuka, you allow the platform to display it
              as part of the memorial, funeral notice, condolence, family wall,
              or remembrance feature you use.
            </p>
          </section>

          <section className="rounded-3xl bg-white p-8 shadow-sm">
            <h2 className="mb-4 font-serif text-3xl">
              Prohibited Use
            </h2>

            <ul className="space-y-3 text-stone-600">
              <li>• Creating fake or misleading memorials</li>
              <li>• Impersonating families or individuals</li>
              <li>• Posting hateful, abusive, or harassing content</li>
              <li>• Uploading graphic or disturbing media</li>
              <li>• Sharing private information without permission</li>
              <li>• Using the platform for spam, scams, or exploitation</li>
            </ul>
          </section>

          <section className="rounded-3xl bg-white p-8 shadow-sm">
            <h2 className="mb-4 font-serif text-3xl">
              Family Walls
            </h2>

            <p className="leading-relaxed text-stone-600">
              Family Walls are private spaces. Access is controlled by owners,
              admins, and invitations. Members must respect the privacy and
              dignity of the family space.
            </p>
          </section>

          <section className="rounded-3xl bg-white p-8 shadow-sm">
            <h2 className="mb-4 font-serif text-3xl">
              Reports & Moderation
            </h2>

            <p className="leading-relaxed text-stone-600">
              Content may be reported for review. Reported content is not
              automatically removed unless it is reviewed or clearly violates
              platform standards. We may remove, restrict, or correct content
              that violates these Terms or our Community Guidelines.
            </p>
          </section>

          <section className="rounded-3xl bg-white p-8 shadow-sm">
            <h2 className="mb-4 font-serif text-3xl">
              Service Changes
            </h2>

            <p className="leading-relaxed text-stone-600">
              Milele Twakumbuka may update, improve, limit, or change features
              over time as the platform grows. These Terms may also be updated
              to reflect new features, safety needs, or legal requirements.
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

          <Link
            href="/privacy-policy"
            className="rounded-full bg-stone-900 px-6 py-3 text-sm text-white"
          >
            Privacy Policy
          </Link>
        </div>
      </div>
    </main>
  );
}