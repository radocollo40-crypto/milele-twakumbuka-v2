"use client";

import { useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [messageText, setMessageText] = useState("");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  async function sendMessage() {
    setMessage("");

    if (!name.trim() || !email.trim() || !subject.trim() || !messageText.trim()) {
      setMessage("Please fill in all fields.");
      return;
    }

    setSaving(true);

    const { error } = await supabase.from("support_messages").insert([
      {
        name: name.trim(),
        email: email.trim(),
        subject: subject.trim(),
        message: messageText.trim(),
        status: "new",
      },
    ]);

    setSaving(false);

    if (error) {
      setMessage(error.message || "Unable to send message.");
      return;
    }

    setName("");
    setEmail("");
    setSubject("");
    setMessageText("");
    setMessage("Thank you. Your message has been sent.");
  }

  return (
    <main className="min-h-screen bg-stone-50 px-5 py-14 text-stone-900">
      <div className="mx-auto max-w-4xl">
        <p className="mb-3 text-xs uppercase tracking-[0.25em] text-stone-400">
          Contact Support
        </p>

        <h1 className="font-serif text-4xl text-stone-900">Need help?</h1>

        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-stone-500">
          If you need help with a memorial, funeral notice, family wall,
          account, report, correction request, or removal concern, you can reach
          Milele Twakumbuka support here.
        </p>

        <section className="mt-10 grid gap-5 md:grid-cols-3">
          <a
            href="mailto:eternalmemories306@gmail.com"
            className="rounded-3xl border border-stone-100 bg-white p-6 shadow-sm"
          >
            <p className="mb-2 text-xs uppercase tracking-[0.2em] text-stone-400">
              Email
            </p>
            <p className="text-sm text-stone-700">
              eternalmemories306@gmail.com
            </p>
          </a>

          <a
            href="https://wa.me/254742649875"
            className="rounded-3xl border border-stone-100 bg-white p-6 shadow-sm"
          >
            <p className="mb-2 text-xs uppercase tracking-[0.2em] text-stone-400">
              WhatsApp
            </p>
            <p className="text-sm text-stone-700">+254 742 649 875</p>
          </a>

          <a
            href="tel:+254742649875"
            className="rounded-3xl border border-stone-100 bg-white p-6 shadow-sm"
          >
            <p className="mb-2 text-xs uppercase tracking-[0.2em] text-stone-400">
              Call
            </p>
            <p className="text-sm text-stone-700">+254 742 649 875</p>
          </a>
        </section>

        <section className="mt-10 rounded-3xl border border-stone-100 bg-white p-7 shadow-sm">
          <h2 className="mb-5 font-serif text-2xl text-stone-800">
            Send a message
          </h2>

          <div className="grid gap-5">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className="rounded-2xl border border-stone-200 px-5 py-4 text-sm outline-none"
            />

            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email"
              className="rounded-2xl border border-stone-200 px-5 py-4 text-sm outline-none"
            />

            <input
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Subject"
              className="rounded-2xl border border-stone-200 px-5 py-4 text-sm outline-none"
            />

            <textarea
              rows="6"
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              placeholder="Write your message..."
              className="rounded-2xl border border-stone-200 px-5 py-4 text-sm outline-none"
            />

            {message && (
              <p className="rounded-2xl bg-stone-50 p-4 text-sm text-stone-600">
                {message}
              </p>
            )}

            <button
              onClick={sendMessage}
              disabled={saving}
              className="rounded-full bg-stone-900 px-7 py-3 text-sm font-medium text-white disabled:opacity-60"
            >
              {saving ? "Sending..." : "Send Message"}
            </button>
          </div>
        </section>

        <div className="mt-8 rounded-3xl bg-white p-6 text-sm leading-relaxed text-stone-500 shadow-sm">
          For urgent concerns about harmful content, use the Report button on
          the memorial or funeral notice.
        </div>

        <Link
          href="/"
          className="mt-8 inline-block rounded-full border border-stone-200 bg-white px-6 py-3 text-sm text-stone-600"
        >
          Back Home
        </Link>
      </div>
    </main>
  );
}