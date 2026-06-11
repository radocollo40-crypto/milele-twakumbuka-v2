import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-stone-100 bg-white px-5 py-12 text-center sm:px-6 sm:py-14">
      <p className="mb-8 font-serif text-lg italic text-stone-400">
        ♡ In loving memory, forever remembered.
      </p>

      <div className="mb-8 flex flex-wrap justify-center gap-5 text-sm text-stone-500 sm:gap-7">
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

        <Link href="/community-guidelines">
          Community Guidelines
        </Link>

        <Link href="/add-loved-one">
          Add Loved One
        </Link>

        <Link href="/about">
          About
        </Link>
      </div>

      <p className="mx-auto max-w-xl text-sm font-light leading-relaxed text-stone-400">
        A dignified digital remembrance platform designed to honor memory,
        legacy, and unity across communities.
      </p>

      <p className="mt-10 text-xs uppercase tracking-[0.3em] text-stone-300">
        © 2026 Milele Twakumbuka
      </p>
    </footer>
  );
}