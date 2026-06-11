import Link from "next/link";

export const metadata = {
  title: "Privacy Policy | Milele Twakumbuka",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-stone-50 px-5 py-14 text-stone-900">
      <div className="mx-auto max-w-4xl">
        <p className="mb-3 text-xs uppercase tracking-[0.25em] text-stone-400">
          Privacy Policy
        </p>

        <h1 className="font-serif text-5xl text-stone-900">
          Protecting Family Trust
        </h1>

        <p className="mt-6 max-w-3xl text-sm leading-relaxed text-stone-500">
          Milele Twakumbuka is built around memory, dignity, and trust. This
          Privacy Policy explains how we handle information shared through
          memorials, funeral notices, condolences, candles, flowers, accounts,
          and private family spaces.
        </p>

        <div className="mt-12 space-y-10">
          <section className="rounded-3xl bg-white p-8 shadow-sm">
            <h2 className="mb-4 font-serif text-3xl">
              Information We Collect
            </h2>

            <p className="leading-relaxed text-stone-600">
              We may collect information such as account details, names, email
              addresses, memorial content, uploaded photos, condolences, funeral
              notice details, candles, flowers, and family wall activity.
            </p>
          </section>

          <section className="rounded-3xl bg-white p-8 shadow-sm">
            <h2 className="mb-4 font-serif text-3xl">
              Public Information
            </h2>

            <p className="leading-relaxed text-stone-600">
              Memorial pages, public condolences, candles, flowers, categories,
              tragedies, and funeral notices may be visible to visitors. Please
              avoid posting private family information unless you have
              permission.
            </p>
          </section>

          <section className="rounded-3xl bg-white p-8 shadow-sm">
            <h2 className="mb-4 font-serif text-3xl">
              Private Family Walls
            </h2>

            <p className="leading-relaxed text-stone-600">
              Family Walls are intended for invited members only. They may
              include private family conversations, photos, voice memories, and
              reflections. Access is limited to the wall owner, admins, and
              invited members.
            </p>
          </section>

          <section className="rounded-3xl bg-white p-8 shadow-sm">
            <h2 className="mb-4 font-serif text-3xl">
              How We Use Information
            </h2>

            <p className="leading-relaxed text-stone-600">
              Information is used to create memorials, display funeral notices,
              manage family wall access, support account features, improve the
              platform, and help maintain a safe remembrance environment.
            </p>
          </section>

          <section className="rounded-3xl bg-white p-8 shadow-sm">
            <h2 className="mb-4 font-serif text-3xl">
              Photos, Media & Memories
            </h2>

            <p className="leading-relaxed text-stone-600">
              Users should only upload photos, videos, voice notes, or other
              media they have the right to share. Families may request removal
              of content that violates privacy, dignity, or ownership concerns.
            </p>
          </section>

          <section className="rounded-3xl bg-white p-8 shadow-sm">
            <h2 className="mb-4 font-serif text-3xl">
              Account Information
            </h2>

            <p className="leading-relaxed text-stone-600">
              Account information helps identify memorial creators, family wall
              members, and notice creators. We use this information to protect
              ownership, access, and editing permissions.
            </p>
          </section>

          <section className="rounded-3xl bg-white p-8 shadow-sm">
            <h2 className="mb-4 font-serif text-3xl">
              Reports & Safety
            </h2>

            <p className="leading-relaxed text-stone-600">
              If content is reported, we may review related memorials,
              condolences, funeral notices, or family wall activity to protect
              families and maintain respectful use of the platform.
            </p>
          </section>

          <section className="rounded-3xl bg-white p-8 shadow-sm">
            <h2 className="mb-4 font-serif text-3xl">
              Changes to This Policy
            </h2>

            <p className="leading-relaxed text-stone-600">
              This Privacy Policy may be updated as Milele Twakumbuka grows.
              Continued use of the platform means you accept the latest version
              of this policy.
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
            href="/community-guidelines"
            className="rounded-full bg-stone-900 px-6 py-3 text-sm text-white"
          >
            Community Guidelines
          </Link>
        </div>
      </div>
    </main>
  );
}