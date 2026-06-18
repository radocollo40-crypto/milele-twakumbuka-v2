"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { supabase } from "@/lib/supabase";

const helpReasons = [
  "Memorial ownership requests",
  "Privacy concerns",
  "Content reports",
  "Technical support",
  "Family wall assistance",
  "Funeral notice corrections",
];

const faqs = [
  {
    question: "Can memorials be edited?",
    answer:
      "Yes. Memorial creators can edit their memorials, and certain correction or ownership requests can be reviewed by support.",
  },
  {
    question: "Can inappropriate content be reported?",
    answer:
      "Yes. Content that appears disrespectful, false, harmful, or private may be reported for review.",
  },
  {
    question: "Can family walls remain private?",
    answer:
      "Yes. Family Walls are private spaces and access is limited to the owner, admins, and invited members.",
  },
];

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
            Contact Support
          </p>

          <h1 className="font-serif text-4xl leading-tight text-stone-900 sm:text-5xl">
            Need help with a memorial or family space?
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-sm font-light leading-relaxed text-stone-500 sm:text-base">
            Whether you have a question, wish to report content, request a
            correction, or need assistance with a memorial, funeral notice, or
            family wall, Milele Twakumbuka support is here to help.
          </p>
        </div>
      </section>

      <section className="px-5 py-16 sm:px-6">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-12">
          <div className="space-y-8 lg:col-span-5">
            <section className="rounded-3xl border border-stone-100 bg-white p-7 shadow-sm sm:p-8">
              <p className="mb-3 text-xs font-medium uppercase tracking-[0.25em] text-stone-400">
                Reach Us
              </p>

              <h2 className="mb-6 font-serif text-2xl text-stone-800 sm:text-3xl">
                Support channels
              </h2>

              <div className="space-y-4">
                <a
                  href="mailto:eternalmemories306@gmail.com"
                  className="block rounded-2xl border border-stone-100 bg-stone-50 p-5"
                >
                  <p className="mb-1 text-xs uppercase tracking-[0.2em] text-stone-400">
                    Email
                  </p>
                  <p className="break-words text-sm text-stone-700">
                    eternalmemories306@gmail.com
                  </p>
                </a>

                <a
                  href="https://wa.me/254742649875"
                  className="block rounded-2xl border border-stone-100 bg-stone-50 p-5"
                >
                  <p className="mb-1 text-xs uppercase tracking-[0.2em] text-stone-400">
                    WhatsApp
                  </p>
                  <p className="text-sm text-stone-700">+254 742 649 875</p>
                </a>

                <a
                  href="tel:+254742649875"
                  className="block rounded-2xl border border-stone-100 bg-stone-50 p-5"
                >
                  <p className="mb-1 text-xs uppercase tracking-[0.2em] text-stone-400">
                    Call
                  </p>
                  <p className="text-sm text-stone-700">+254 742 649 875</p>
                </a>
              </div>
            </section>

            <section className="rounded-3xl border border-stone-100 bg-white p-7 shadow-sm sm:p-8">
              <p className="mb-3 text-xs font-medium uppercase tracking-[0.25em] text-stone-400">
                We Can Help With
              </p>

              <div className="grid gap-3">
                {helpReasons.map((reason) => (
                  <div
                    key={reason}
                    className="rounded-2xl bg-stone-50 p-4 text-sm font-light text-stone-600"
                  >
                    ♡ {reason}
                  </div>
                ))}
              </div>
            </section>
          </div>

          <section className="rounded-3xl border border-stone-100 bg-white p-7 shadow-sm sm:p-8 lg:col-span-7">
            <h2 className="mb-2 font-serif text-2xl text-stone-800 sm:text-3xl">
              Send a message
            </h2>

            <p className="mb-7 text-sm font-light leading-relaxed text-stone-500">
              Share the details clearly so support can understand your request
              and respond appropriately.
            </p>

            <div className="grid gap-5">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="rounded-2xl border border-stone-200 bg-white px-5 py-4 text-sm outline-none focus:border-stone-400"
              />

              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                className="rounded-2xl border border-stone-200 bg-white px-5 py-4 text-sm outline-none focus:border-stone-400"
              />

              <input
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Subject"
                className="rounded-2xl border border-stone-200 bg-white px-5 py-4 text-sm outline-none focus:border-stone-400"
              />

              <textarea
                rows="7"
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                placeholder="Write your message..."
                className="rounded-2xl border border-stone-200 bg-white px-5 py-4 text-sm outline-none focus:border-stone-400"
              />

              {message && (
                <p className="rounded-2xl bg-stone-50 p-4 text-sm text-stone-600">
                  {message}
                </p>
              )}

              <button
                onClick={sendMessage}
                disabled={saving}
                className="rounded-full bg-stone-900 px-7 py-3.5 text-sm font-medium text-white disabled:opacity-60"
              >
                {saving ? "Sending..." : "Send Message"}
              </button>
            </div>
          </section>
        </div>
      </section>

      <section className="border-t border-stone-100 bg-white px-5 py-16 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 text-center">
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.25em] text-stone-400">
              Common Questions
            </p>

            <h2 className="font-serif text-3xl text-stone-800">
              Frequently asked questions
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {faqs.map((faq) => (
              <div
                key={faq.question}
                className="rounded-3xl border border-stone-100 bg-stone-50 p-6"
              >
                <h3 className="mb-3 font-serif text-xl text-stone-800">
                  {faq.question}
                </h3>

                <p className="text-sm font-light leading-relaxed text-stone-500">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-stone-100 bg-white px-5 py-14 sm:px-6">
        <div className="mx-auto max-w-4xl rounded-3xl bg-stone-900 p-7 text-white sm:p-8">
          <p className="mb-3 text-xs uppercase tracking-[0.25em] text-stone-400">
            Support Promise
          </p>

          <p className="font-serif text-2xl leading-relaxed text-stone-100 sm:text-3xl">
            Every memory deserves care, and every family deserves support.
          </p>

          <p className="mt-5 text-sm font-light leading-relaxed text-stone-400 sm:text-base">
            We aim to handle support requests with respect, patience, and care
            for the people and memories involved.
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