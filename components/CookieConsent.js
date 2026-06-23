"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem("milele_cookie_consent");

    if (!accepted) {
      setShow(true);
    }
  }, []);

  function acceptCookies() {
    localStorage.setItem("milele_cookie_consent", "accepted");
    setShow(false);
  }

  if (!show) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-[9999] mx-auto max-w-3xl rounded-3xl border border-stone-200 bg-white p-5 shadow-2xl">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="mb-1 font-serif text-lg text-stone-900">
            Cookies & privacy
          </p>

          <p className="text-sm font-light leading-relaxed text-stone-500">
            Milele Twakumbuka uses cookies to support login sessions, improve
            the experience, and understand website traffic. Read our{" "}
            <Link
              href="/privacy-policy"
              className="underline underline-offset-4"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </div>

        <button
          onClick={acceptCookies}
          className="shrink-0 rounded-full bg-stone-900 px-6 py-3 text-sm font-medium text-white"
        >
          I Understand
        </button>
      </div>
    </div>
  );
}