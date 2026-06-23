"use client";

import { useState } from "react";

export default function ShareButtons({ title, url }) {
  const [copied, setCopied] = useState(false);

  const encodedTitle = encodeURIComponent(title || "Milele Twakumbuka");
  const encodedUrl = encodeURIComponent(url || "");

  const whatsappUrl = `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`;
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`;

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      setCopied(false);
    }
  }

  return (
    <div className="rounded-3xl border border-stone-100 bg-white p-7 shadow-sm">
      <h3 className="mb-3 font-serif text-xl text-stone-800">
        Share this memorial
      </h3>

      <p className="mb-5 text-sm font-light leading-relaxed text-stone-500">
        Share this remembrance page with family, friends, and community members.
      </p>

      <div className="flex flex-wrap gap-3">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full bg-green-600 px-5 py-2.5 text-sm font-medium text-white"
        >
          WhatsApp
        </a>

        <a
          href={facebookUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full bg-blue-600 px-5 py-2.5 text-sm font-medium text-white"
        >
          Facebook
        </a>

        <a
          href={twitterUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full bg-stone-900 px-5 py-2.5 text-sm font-medium text-white"
        >
          X
        </a>

        <button
          onClick={copyLink}
          className="rounded-full border border-stone-200 bg-white px-5 py-2.5 text-sm font-medium text-stone-700"
        >
          {copied ? "Copied" : "Copy Link"}
        </button>
      </div>
    </div>
  );
}