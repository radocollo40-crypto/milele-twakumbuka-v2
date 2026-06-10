"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import AuthButtons from "./AuthButtons";

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const links = [
    { href: "/", label: "Home" },
    { href: "/memorials", label: "Memorials" },
    { href: "/categories", label: "Categories" },
    { href: "/tragedies", label: "Tragedies" },
    { href: "/funeral-announcements", label: "Funeral Notices" },
    { href: "/add-loved-one", label: "Add Loved One" },
    { href: "/about", label: "About" },
  ];

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-stone-200 bg-[#faf8f5]/95 backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <Link
          href="/"
          onClick={() => setOpen(false)}
          className="shrink-0 font-serif text-xl tracking-wide text-[#2f2f2f] sm:text-2xl"
        >
          Milele Twakumbuka
        </Link>

        <div className="hidden items-center gap-6 text-sm text-stone-600 lg:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition hover:text-black"
            >
              {link.label}
            </Link>
          ))}

          <AuthButtons />
        </div>

        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          className="rounded-full border border-stone-200 bg-white px-4 py-2 text-sm text-stone-700 shadow-sm lg:hidden"
        >
          {open ? "Close" : "Menu"}
        </button>

        {open && (
          <div className="absolute right-4 top-[72px] z-50 w-64 rounded-3xl border border-stone-100 bg-white p-4 shadow-xl lg:hidden">
            <div className="flex flex-col gap-1 text-sm text-stone-700">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-2xl px-4 py-3 transition hover:bg-stone-50 hover:text-black"
                >
                  {link.label}
                </Link>
              ))}

              <div className="mt-3 border-t border-stone-100 pt-3">
                <AuthButtons />
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}