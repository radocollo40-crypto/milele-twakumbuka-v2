import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-stone-100 bg-white px-5 py-14 text-center sm:px-6 sm:py-16">
      <div className="mx-auto max-w-5xl">

        <img
          src="/logo.png"
          alt="Milele Twakumbuka"
          className="mx-auto mb-6 h-24 w-auto object-contain"
        />

        <p className="mb-10 font-serif text-lg italic text-stone-400">
          ♡ In loving memory, forever remembered.
        </p>

        <div className="mb-10 flex flex-wrap justify-center gap-x-7 gap-y-4 text-sm text-stone-500">
          <Link href="/">Home</Link>

          <Link href="/memorials">
            Memorials
          </Link>

          <Link href="/categories">
            Categories
          </Link>

          <Link href="/tragedies">
            Tragedies
          </Link>

          <Link href="/funeral-announcements">
            Funeral Notices
          </Link>

          <Link href="/add-loved-one">
            Add Loved One
          </Link>

          <Link href="/about">
            About
          </Link>

          <Link href="/community-guidelines">
            Community Guidelines
          </Link>

          <Link href="/privacy-policy">
            Privacy Policy
          </Link>

          <Link href="/terms">
            Terms & Conditions
          </Link>

          <Link href="/contact">
            Contact Support
          </Link>
        </div>

        <p className="mx-auto max-w-2xl text-sm font-light leading-relaxed text-stone-400">
          A peaceful digital sanctuary dedicated to preserving memory,
          celebrating legacy, and honoring lives with dignity across families,
          communities, and generations.
        </p>

        <div className="mt-10 border-t border-stone-100 pt-8">
          <p className="text-xs uppercase tracking-[0.3em] text-stone-300">
            © 2026 Milele Twakumbuka
          </p>
        </div>
      </div>
    </footer>
  );
}