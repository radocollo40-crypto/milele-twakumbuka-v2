"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const categories = [
  "All Tragedies",
  "School Tragedies",
  "Terror Attacks",
  "Public Disasters",
  "Historical Losses",
  "Community Remembrance",
];

const tragedies = [
  {
    title: "Garissa University Attack",
    slug: "garissa-university-attack",
    year: "2015",
    category: "School Tragedies",
    location: "Garissa, Kenya",
    description:
      "Remembering the students, families, and nation forever changed.",
  },
  {
    title: "Westgate Attack",
    slug: "westgate-attack",
    year: "2013",
    category: "Terror Attacks",
    location: "Nairobi, Kenya",
    description:
      "Honoring the victims, survivors, responders, and families affected.",
  },
  {
    title: "Molo Tanker Tragedy",
    slug: "molo-tanker-tragedy",
    year: "2009",
    category: "Public Disasters",
    location: "Molo, Kenya",
    description:
      "A reflective remembrance of lives lost in one of Kenya’s painful disasters.",
  },
  {
    title: "Solai Dam Tragedy",
    slug: "solai-dam-tragedy",
    year: "2018",
    category: "Community Remembrance",
    location: "Solai, Nakuru County",
    description:
      "Remembering families, homes, and lives affected by the Solai disaster.",
  },
  {
    title: "Likoni Ferry Tragedy",
    slug: "likoni-ferry-tragedy",
    year: "1994",
    category: "Historical Losses",
    location: "Likoni, Mombasa",
    description:
      "Preserving memory of a tragedy carried in Kenya’s collective history.",
  },
  {
    title: "River Road Fire Tragedies",
    slug: "river-road-fire-tragedies",
    year: "Remembered",
    category: "Public Disasters",
    location: "Nairobi, Kenya",
    description:
      "A remembrance space for lives affected by fire tragedies in Nairobi.",
  },
];

export default function TragediesPage() {
  const [selectedCategory, setSelectedCategory] = useState("All Tragedies");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTragedies = useMemo(() => {
    return tragedies.filter((item) => {
      const matchesCategory =
        selectedCategory === "All Tragedies" ||
        item.category === selectedCategory;

      const matchesSearch =
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.year.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchTerm]);

  return (
    <main className="min-h-screen bg-stone-50 text-stone-900">
      <Navbar />

      <section className="border-b border-stone-100 bg-white px-5 py-14 text-center sm:px-6 sm:py-16">
        <p className="mb-4 text-xs uppercase tracking-[0.3em] text-stone-400">
          Kenya Remembers
        </p>

        <h1 className="mx-auto mb-5 max-w-3xl font-serif text-4xl leading-tight text-stone-900 md:text-5xl">
          Tragedies remembered with dignity.
        </h1>

        <p className="mx-auto max-w-2xl text-sm font-light leading-relaxed text-stone-500 md:text-base">
          A gentle space for remembrance, reflection, and preserving the
          memories of lives, communities, and moments Kenya must never forget.
        </p>
      </section>

      <section className="border-b border-stone-100 bg-stone-50 px-5 py-5 sm:px-6">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 lg:flex-row lg:items-center">
          <input
            type="text"
            placeholder="Search tragedies, places, years..."
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            className="w-full rounded-2xl border border-stone-200 bg-white px-5 py-4 text-sm outline-none lg:max-w-md"
          />

          <div className="-mx-1 flex gap-3 overflow-x-auto px-1 pb-1">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setSelectedCategory(category)}
                className={`whitespace-nowrap rounded-full px-5 py-3 text-sm transition ${
                  selectedCategory === category
                    ? "bg-stone-900 text-white"
                    : "bg-white text-stone-600 hover:bg-stone-100"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-14 sm:px-6 sm:py-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex items-center gap-4">
            <div>
              <h2 className="font-serif text-2xl text-stone-800">
                Memorial Records
              </h2>
              <p className="mt-1 text-sm font-light text-stone-400">
                Showing: {selectedCategory}
              </p>
            </div>
            <div className="h-px flex-1 bg-stone-200" />
          </div>

          {filteredTragedies.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-stone-200 bg-white p-12 text-center">
              <p className="text-sm font-light text-stone-400">
                No tragedy records match your search.
              </p>
            </div>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
              {filteredTragedies.map((tragedy) => (
                <Link
                  key={tragedy.slug}
                  href={`/tragedies/${tragedy.slug}`}
                  className="group rounded-2xl border border-stone-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md sm:p-7"
                >
                  <p className="mb-4 text-xs uppercase tracking-[0.25em] text-stone-400">
                    {tragedy.category}
                  </p>

                  <h3 className="mb-3 font-serif text-2xl leading-tight text-stone-800">
                    {tragedy.title}
                  </h3>

                  <p className="mb-5 text-xs uppercase tracking-[0.18em] text-stone-400">
                    {tragedy.location} · {tragedy.year}
                  </p>

                  <p className="mb-7 text-sm font-light leading-relaxed text-stone-500">
                    {tragedy.description}
                  </p>

                  <span className="text-sm text-stone-700 underline-offset-4 group-hover:underline">
                    Open remembrance story
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}