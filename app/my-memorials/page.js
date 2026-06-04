"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function MyMemorialsPage() {
  const [user, setUser] = useState(null);
  const [memorials, setMemorials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMyMemorials() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setUser(null);
        setLoading(false);
        return;
      }

      setUser(user);

      const { data } = await supabase
        .from("memorials")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      setMemorials(data || []);
      setLoading(false);
    }

    loadMyMemorials();
  }, []);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-stone-50">
        <p className="text-stone-500">Loading your memorials...</p>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-stone-50 px-5 text-center">
        <div className="max-w-md rounded-3xl border border-stone-100 bg-white p-8 shadow-sm">
          <h1 className="mb-4 font-serif text-3xl">Login Required</h1>
          <p className="mb-7 text-sm text-stone-500">
            Login to view and manage memorials you have created.
          </p>

          <Link
            href="/login"
            className="rounded-full bg-stone-900 px-7 py-3 text-sm font-medium text-white"
          >
            Login
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-stone-50 px-5 py-12 text-stone-900 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-4 text-xs uppercase tracking-[0.25em] text-stone-400">
              Family Dashboard
            </p>

            <h1 className="font-serif text-4xl text-stone-900">
              My Memorials
            </h1>

            <p className="mt-3 text-sm font-light text-stone-500">
              View and manage memorials created with your account.
            </p>
          </div>

          <Link
            href="/add-loved-one"
            className="rounded-full bg-stone-900 px-6 py-3 text-center text-sm font-medium text-white"
          >
            Add Loved One
          </Link>
        </div>

        {memorials.length === 0 ? (
          <div className="rounded-3xl border border-stone-100 bg-white p-10 text-center shadow-sm">
            <h2 className="mb-3 font-serif text-2xl">
              No memorials yet
            </h2>

            <p className="mb-7 text-sm text-stone-500">
              Create your first memorial to begin preserving a life story.
            </p>

            <Link
              href="/add-loved-one"
              className="rounded-full bg-stone-900 px-7 py-3 text-sm font-medium text-white"
            >
              Create Memorial
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {memorials.map((memorial) => (
              <div
                key={memorial.id}
                className="overflow-hidden rounded-3xl border border-stone-100 bg-white shadow-sm"
              >
                <div className="h-56 overflow-hidden bg-stone-200">
                  {memorial.image_url ? (
                    <img
                      src={memorial.image_url}
                      alt={memorial.name}
                      className="h-full w-full object-cover object-top"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-5xl text-stone-400">
                      ♡
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <p className="mb-2 text-xs uppercase tracking-[0.2em] text-stone-400">
                    {memorial.category || "Loved Ones"}
                  </p>

                  <h2 className="mb-2 font-serif text-2xl">
                    {memorial.name}
                  </h2>

                  <p className="mb-6 text-sm text-stone-400">
                    {memorial.birth_date || "Birth"} —{" "}
                    {memorial.death_date || "Remembrance"}
                  </p>

                  <div className="flex gap-3">
                    <Link
                      href={`/memorials/${memorial.id}`}
                      className="flex-1 rounded-full border border-stone-200 px-4 py-2 text-center text-sm text-stone-700"
                    >
                      View
                    </Link>

                    <Link
                      href={`/memorials/${memorial.id}/edit`}
                      className="flex-1 rounded-full bg-stone-900 px-4 py-2 text-center text-sm text-white"
                    >
                      Edit
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}