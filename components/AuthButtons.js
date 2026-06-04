"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function AuthButtons() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function getUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setUser(user || null);
    }

    getUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => subscription.unsubscribe();
  }, []);

  async function logout() {
    await supabase.auth.signOut();
    setUser(null);
    window.location.href = "/";
  }

  if (user) {
    return (
      <>
        <Link href="/my-memorials" className="hover:text-stone-900">
          My Memorials
        </Link>

        <button
          onClick={logout}
          className="rounded-full border border-stone-200 bg-white px-4 py-2 text-sm text-stone-700 hover:bg-stone-50"
        >
          Logout
        </button>
      </>
    );
  }

  return (
    <Link
      href="/login"
      className="rounded-full border border-stone-200 bg-white px-4 py-2 text-sm text-stone-700 hover:bg-stone-50"
    >
      Login
    </Link>
  );
}