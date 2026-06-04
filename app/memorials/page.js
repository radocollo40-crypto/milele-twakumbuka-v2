"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

const categories = [
  "All",
  "Historical Figures",
  "Loved Ones",
  "Children Remembered",
  "Community Tributes",
  "Veterans & Defenders",
  "Faith Leaders",
  "Artists & Cultural Figures",
];

function MemorialsContent() {
  const searchParams = useSearchParams();
  const categoryFromUrl = searchParams.get("category") || "All";

  const [selectedCategory, setSelectedCategory] = useState(categoryFromUrl);
  const [searchTerm, setSearchTerm] = useState("");
  const [memorials, setMemorials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMemorials() {
      const { data, error } = await supabase
        .from("memorials")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && data) {
        setMemorials(data);
      }

      setLoading(false);
    }

    fetchMemorials();
  }, []);

  const filteredMemorials = useMemo(() => {
    return memorials.filter((person) => {
      const matchesCategory =
        selectedCategory === "All" || person.category === selectedCategory;

      const matchesSearch =
        person.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        person.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        person.tribute?.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [memorials, selectedCategory, searchTerm]);

  return (
    <main className="min-h-screen bg-[#fbfaf8] text-[#1f1f1f]">
      <section className="px-5 pb-12 pt-24 sm:px-6 sm:pb-16 sm:pt-32">
        <div className="mx-auto max-w-6xl">
          <p className="mb-4 text-xs uppercase tracking-[0.25em] text-stone-400">
            Memorial Archive
          </p>

          <h1 className="mb-5 font-serif text-4xl text-stone-900 md:text-5xl">
            Memorials
          </h1>

          <p className="max-w-3xl text-base font-light leading-relaxed text-[#7a7168]">
            Browse memorials created with dignity, remembrance, and care.
          </p>
        </div>
      </section>

      <section className="px-5 pb-12 sm:px-6 sm:pb-16">
        <div className="mx-auto max-w-6xl rounded-3xl border border-[#eee8e1] bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center">
            <input
              type="text"
              placeholder="Search memorials..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="min-h-14 flex-1 rounded-2xl border border-[#eee8e1] bg-[#fbfaf8] px-5 text-sm outline-none"
            />

            <div className="flex gap-3 overflow-x-auto pb-2">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  className={`whitespace-nowrap rounded-full px-5 py-3 text-sm transition ${
                    selectedCategory === category
                      ? "bg-[#1f1f1f] text-white"
                      : "bg-[#f6f3ef] text-[#5f5750]"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 pb-20 sm:px-6 sm:pb-28">
        <div className="mx-auto max-w-6xl">
          {loading ? (
            <div className="rounded-3xl border border-[#eee8e1] bg-white p-12 text-center shadow-sm">
              Loading memorials...
            </div>
          ) : filteredMemorials.length === 0 ? (
            <div className="rounded-3xl border border-[#eee8e1] bg-white p-12 text-center shadow-sm">
              No memorials found.
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredMemorials.map((person) => (
                <Link
                  key={person.id}
                  href={`/memorials/${person.id}`}
                  className="overflow-hidden rounded-3xl border border-[#eee8e1] bg-white shadow-sm transition hover:-translate-y-2 hover:shadow-lg"
                >
                  <div className="h-64 overflow-hidden bg-stone-200">
                    {person.image_url ? (
                      <img
                        src={person.image_url}
                        alt={person.name}
                        className="h-full w-full object-cover object-top transition duration-500 hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-5xl text-stone-400">
                        ♡
                      </div>
                    )}
                  </div>

                  <div className="p-7">
                    <p className="mb-3 text-xs uppercase tracking-[0.25em] text-[#9a8f82]">
                      {person.category}
                    </p>

                    <h2 className="mb-2 font-serif text-2xl">
                      {person.name}
                    </h2>

                    <p className="mb-5 text-sm text-[#9a928b]">
                      {person.birth_date || "Birth"} —{" "}
                      {person.death_date || "Remembrance"}
                    </p>

                    <p className="text-sm leading-relaxed text-[#5f5750]">
                      {person.tribute ||
                        "A life remembered with dignity and love."}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <footer className="border-t border-stone-100 bg-white px-5 py-12 text-center sm:px-6 sm:py-14">
        <p className="mb-8 font-serif text-lg italic text-stone-400">
          ♡ In loving memory, forever remembered.
        </p>

        <div className="mb-8 flex flex-wrap justify-center gap-5 text-sm text-stone-500 sm:gap-7">
          <Link href="/">Home</Link>
          <Link href="/memorials">Memorials</Link>
          <Link href="/categories">Categories</Link>
          <Link href="/tragedies">Tragedies</Link>
          <Link href="/add-loved-one">Add Loved One</Link>
          <Link href="/about">About</Link>
        </div>

        <p className="mx-auto max-w-xl text-sm font-light leading-relaxed text-stone-400">
          Milele Twakumbuka preserves memory, legacy, reflection, and shared
          humanity across generations.
        </p>

        <p className="mt-10 text-xs uppercase tracking-[0.3em] text-stone-300">
          © 2026 Milele Twakumbuka
        </p>
      </footer>
    </main>
  );
}

export default function MemorialsPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-[#fbfaf8] text-stone-500">
          Loading memorials...
        </main>
      }
    >
      <MemorialsContent />
    </Suspense>
  );
}