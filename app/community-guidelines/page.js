import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export const metadata = {
  title: "Community Guidelines | Milele Twakumbuka",
  description:
    "Community Guidelines for Milele Twakumbuka, helping families and communities preserve memories with dignity, compassion, accuracy, and respect.",
};

const sections = [
  {
    title: "Respect & Dignity",
    body: "Every memorial represents a real life, family, and community. Content shared on Milele Twakumbuka should be respectful, compassionate, and appropriate for a remembrance platform.",
  },
  {
    title: "Accuracy & Responsibility",
    body: "Please share information that you reasonably believe to be accurate. Funeral service dates, locations, biographies, photographs, and family information should be truthful and responsibly presented.",
  },
  {
    title: "Family Privacy",
    body: "Respect the privacy of grieving families. Do not publish private contact information, addresses, personal disputes, or sensitive family details without permission.",
  },
  {
    title: "Family Walls",
    body: "Family Walls are private remembrance spaces intended for invited family members and close friends. Members should communicate with kindness, protect privacy, and preserve the dignity of the memorial.",
  },
  {
    title: "Reporting Concerns",
    body: "Users may report memorials, condolences, funeral notices, or other content that appears to violate these guidelines. Reports help protect families, preserve trust, and maintain the peaceful purpose of the platform.",
  },
  {
    title: "Our Commitment",
    body: "We are committed to maintaining Milele Twakumbuka as a peaceful, respectful, and dignified space where memories can be preserved and shared across generations.",
  },
];

const prohibited = [
  "Hate speech or discrimination",
  "Harassment, bullying, or targeted insults",
  "Graphic or disturbing imagery",
  "False or misleading memorials",
  "Impersonation of families or individuals",
  "Spam, scams, or commercial exploitation",
  "Sharing private information without permission",
  "Content that intentionally causes distress to grieving families",
];

export default function CommunityGuidelinesPage() {
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
            Community Guidelines
          </p>

          <h1 className="font-serif text-4xl leading-tight text-stone-900 sm:text-5xl">
            Remember with kindness. Speak with compassion.
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-sm font-light leading-relaxed text-stone-500 sm:text-base">
            Milele Twakumbuka exists to honor lives, preserve memories, and
            support families. These guidelines help ensure that every memorial,
            tribute, family wall, condolence, and funeral notice remains
            respectful, accurate, and dignified.
          </p>
        </div>
      </section>

      <section className="px-5 py-16 sm:px-6">
        <div className="mx-auto max-w-4xl space-y-5">
          {sections.slice(0, 4).map((section) => (
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

          <section className="rounded-3xl border border-stone-100 bg-white p-7 shadow-sm sm:p-8">
            <h2 className="mb-4 font-serif text-2xl text-stone-800 sm:text-3xl">
              Prohibited Content
            </h2>

            <ul className="space-y-3 text-sm font-light leading-relaxed text-stone-600 sm:text-base">
              {prohibited.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </section>

          {sections.slice(4).map((section) => (
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
            Shared Responsibility
          </p>

          <p className="font-serif text-2xl leading-relaxed text-stone-100 sm:text-3xl">
            Preserve with dignity. Remember with care.
          </p>

          <p className="mt-5 text-sm font-light leading-relaxed text-stone-400 sm:text-base">
            Every message, tribute, photograph, and memory should help protect
            the peace of families and the legacy of those being remembered.
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
            href="/terms"
            className="rounded-full bg-stone-900 px-6 py-3 text-center text-sm text-white"
          >
            Terms & Conditions
          </Link>

          <Link
            href="/privacy-policy"
            className="rounded-full border border-stone-200 bg-white px-6 py-3 text-center text-sm text-stone-600"
          >
            Privacy Policy
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}