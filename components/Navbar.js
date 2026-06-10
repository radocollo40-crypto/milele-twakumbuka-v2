import Link from "next/link";

export default function Navbar() {
  return (
    <header className="border-b border-stone-200 bg-[#faf8f5]">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-7">
        <Link
          href="/"
          className="text-2xl font-light tracking-wide text-[#2f2f2f]"
        >
          Milele Twakumbuka
        </Link>

        <div className="hidden items-center gap-8 text-stone-600 md:flex">
          <Link href="/" className="transition hover:text-black">
            Home
          </Link>

          <Link href="/memorials" className="transition hover:text-black">
            Memorials
          </Link>

          <Link href="/categories" className="transition hover:text-black">
            Categories
          </Link>

          <Link href="/tragedies" className="transition hover:text-black">
            Tragedies
          </Link>

          <Link
            href="/funeral-announcements"
            className="transition hover:text-black"
          >
            Funeral Notices
          </Link>

          <Link href="/add-loved-one" className="transition hover:text-black">
            Add Loved One
          </Link>

          <Link href="/about" className="transition hover:text-black">
            About
          </Link>
        </div>
      </nav>
    </header>
  );
}