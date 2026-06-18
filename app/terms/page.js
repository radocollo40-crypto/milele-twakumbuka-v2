import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export const metadata = {
  title: "Terms & Conditions | Milele Twakumbuka",
  description:
    "Terms and Conditions for using Milele Twakumbuka, including memorials, funeral notices, condolences, family walls, content ownership, and respectful use.",
};

const sections = [
  {
    title: "Purpose of the Platform",
    body: "Milele Twakumbuka exists to help families and communities honor loved ones, preserve memories, share funeral notices, and create dignified spaces for remembrance.",
  },
  {
    title: "User Responsibility",
    body: "Users are responsible for the memorials, photos, messages, condolences, funeral notices, and other content they submit. You should only share information you believe is accurate and that you have permission to publish.",
  },
  {
    title: "Memorial Ownership",
    body: "Memorials should be created by family members, close friends, authorized representatives, or people acting respectfully in good faith. Disputes about memorial ownership may require review, correction, transfer, or removal.",
  },
  {
    title: "Content Rights",
    body: "You retain responsibility for the content you upload. By sharing content on Milele Twakumbuka, you allow the platform to display it as part of the memorial, funeral notice, condolence, family wall, or remembrance feature you use.",
  },
  {
    title: "Family Walls",
    body: "Family Walls are private spaces. Access is controlled by owners, admins, and invitations. Members must respect the privacy, dignity, and emotional safety of the family space.",
  },
  {
    title: "Funeral Notices",
    body: "Users who create funeral notices are responsible for ensuring that dates, venues, family information, and service details are accurate and shared with appropriate permission.",
  },
  {
    title: "Reports & Moderation",
    body: "Content may be reported for review. Reported content is not automatically removed unless it is reviewed or clearly violates platform standards. We may remove, restrict, or correct content that violates these Terms or our Community Guidelines.",
  },
  {
    title: "Intellectual Property",
    body: "Users remain responsible for the content they upload. Please only share photographs, stories, and media that you have permission to use. Content that infringes on the rights of others may be removed after review.",
  },
  {
    title: "Limitation of Responsibility",
    body: "Milele Twakumbuka provides a platform for remembrance and community. While we strive to maintain respectful and accurate content, we cannot guarantee the completeness or accuracy of every submission. Users remain responsible for the information they publish.",
  },
  {
    title: "Service Changes",
    body: "Milele Twakumbuka may update, improve, limit, or change features over time as the platform grows. These Terms may also be updated to reflect new features, safety needs, or legal requirements.",
  },
];

const prohibited = [
  "Creating fake or misleading memorials",
  "Impersonating families or individuals",
  "Posting hateful, abusive, or harassing content",
  "Uploading graphic or disturbing media",
  "Sharing private information without permission",
  "Using the platform for spam, scams, or exploitation",
];

export default function TermsPage() {
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
            Terms & Conditions
          </p>

          <h1 className="font-serif text-4xl leading-tight text-stone-900 sm:text-5xl">
            Terms of Use
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-sm font-light leading-relaxed text-stone-500 sm:text-base">
            These Terms & Conditions explain the expectations for using Milele
            Twakumbuka. By using the platform, creating memorials, posting
            condolences, sharing funeral notices, or joining family walls, you
            agree to use the service respectfully and responsibly.
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
              Prohibited Use
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
            Our Commitment
          </p>

          <p className="font-serif text-2xl leading-relaxed text-stone-100 sm:text-3xl">
            Honoring lives. Preserving memories. Protecting legacy.
          </p>

          <p className="mt-5 text-sm font-light leading-relaxed text-stone-400 sm:text-base">
            Milele Twakumbuka is committed to providing a respectful and lasting
            space where families, communities, and future generations can
            remember, reflect, and celebrate lives with dignity, compassion, and
            care.
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
            href="/privacy-policy"
            className="rounded-full bg-stone-900 px-6 py-3 text-center text-sm text-white"
          >
            Privacy Policy
          </Link>

          <Link
            href="/community-guidelines"
            className="rounded-full border border-stone-200 bg-white px-6 py-3 text-center text-sm text-stone-600"
          >
            Community Guidelines
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}