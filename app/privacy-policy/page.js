import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export const metadata = {
  title: "Privacy Policy | Milele Twakumbuka",
  description:
    "Privacy Policy for Milele Twakumbuka, explaining how memorials, photos, condolences, funeral notices, accounts, and family wall information are handled.",
};

const sections = [
  {
    title: "Information We Collect",
    body: "We may collect information such as names, email addresses, account details, memorial content, uploaded photos, condolences, candles, flowers, funeral notice details, and family wall activity.",
  },
  {
    title: "Public Information",
    body: "Memorial pages, public condolences, candles, flowers, categories, tragedies, and funeral notices may be visible to visitors. Please avoid posting private family information unless you have permission to share it.",
  },
  {
    title: "Private Family Walls",
    body: "Family Walls are intended for invited members only. They may include private family conversations, photos, voice memories, and reflections. Access is limited to the wall owner, admins, and invited members.",
  },
  {
    title: "How We Use Information",
    body: "Information is used to create memorials, display funeral notices, manage family wall access, support account features, protect ownership permissions, improve the platform, and maintain a safe remembrance environment.",
  },
  {
    title: "Photos, Media & Memories",
    body: "Users should only upload photos, videos, voice notes, or other media they have the right to share. Families may request removal of content that violates privacy, dignity, or ownership concerns.",
  },
  {
    title: "Account Information",
    body: "Account information helps identify memorial creators, family wall members, and notice creators. This helps protect editing permissions, private access, and ownership of submitted content.",
  },
  {
    title: "Reports & Safety",
    body: "If content is reported, we may review related memorials, condolences, funeral notices, or family wall activity to protect families and maintain respectful use of the platform.",
  },
  {
    title: "Data Removal Requests",
    body: "Users and families may request correction or removal of content connected to them where appropriate. Some public memorial content may require review before removal to protect family rights, dignity, and authenticity.",
  },
  {
    title: "Changes to This Policy",
    body: "This Privacy Policy may be updated as Milele Twakumbuka grows. Continued use of the platform means you accept the latest version of this policy.",
  },
];

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-stone-50 text-stone-900">
      <Navbar />

      <section className="border-b border-stone-100 bg-white px-5 py-16 text-center sm:px-6 sm:py-20">
        <div className="mx-auto max-w-4xl">
          <img
            src="/logo.png"
            alt="Milele Twakumbuka"
            className="mx-auto mb-8 h-auto w-full max-w-[360px] object-contain"
          />

          <p className="mb-4 text-xs font-medium uppercase tracking-[0.25em] text-stone-400">
            Privacy Policy
          </p>

          <h1 className="font-serif text-4xl leading-tight text-stone-900 sm:text-5xl">
            Protecting family trust, memory, and dignity.
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-sm font-light leading-relaxed text-stone-500 sm:text-base">
            Milele Twakumbuka is built around remembrance, care, and respect.
            This Privacy Policy explains how we handle information shared
            through memorials, funeral notices, condolences, candles, flowers,
            accounts, and private family spaces.
          </p>
        </div>
      </section>

      <section className="px-5 py-16 sm:px-6">
        <div className="mx-auto max-w-4xl space-y-5">
          {sections.map((section) => (
            <section
              key={section.title}
              className="rounded-3xl border border-stone-100 bg-white p-7 shadow-sm sm:p-8"
            >
              <h2 className="mb-4 font-serif text-2xl text-stone-800 sm:text-3xl">
                {section.title}
              </h2>

              <p className="text-sm font-light leading-relaxed text-stone-600 sm:text-base">
                {section.body}
              </p>
            </section>
          ))}
        </div>
      </section>

      <section className="border-t border-stone-100 bg-white px-5 py-14 sm:px-6">
        <div className="mx-auto max-w-4xl rounded-3xl bg-stone-900 p-7 text-white sm:p-8">
          <p className="mb-3 text-xs uppercase tracking-[0.25em] text-stone-400">
            Important Reminder
          </p>

          <p className="font-serif text-2xl leading-relaxed text-stone-100">
            Please share only content you have permission to publish.
          </p>

          <p className="mt-4 text-sm font-light leading-relaxed text-stone-400">
            Memorials and family memories are deeply personal. Before posting
            names, photos, funeral details, or private reflections, please
            consider the wishes and privacy of the family involved.
          </p>
        </div>
      </section>

      <section className="px-5 py-14 sm:px-6">
        <div className="mx-auto flex max-w-4xl flex-col gap-3 sm:flex-row">
          <Link
            href="/"
            className="rounded-full border border-stone-200 bg-white px-6 py-3 text-center text-sm text-stone-600"
          >
            Back Home
          </Link>

          <Link
            href="/community-guidelines"
            className="rounded-full bg-stone-900 px-6 py-3 text-center text-sm text-white"
          >
            Community Guidelines
          </Link>

          <Link
            href="/terms"
            className="rounded-full border border-stone-200 bg-white px-6 py-3 text-center text-sm text-stone-600"
          >
            Terms & Conditions
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}