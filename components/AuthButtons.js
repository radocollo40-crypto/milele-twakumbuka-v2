"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function AuthButtons({ mobile = false, onNavigate = null }) {
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
    if (onNavigate) onNavigate();
    window.location.href = "/";
  }

  if (user) {
    return (
      <div
        className={
          mobile
            ? "flex flex-col gap-1"
            : "flex items-center gap-4"
        }
      >
        <Link
          href="/my-memorials"
          onClick={onNavigate || undefined}
          className={
            mobile
              ? "rounded-2xl px-4 py-3 text-stone-700 transition hover:bg-stone-50 hover:text-black"
              : "transition hover:text-stone-900"
          }
        >
          My Memorials
        </Link>

        <button
          onClick={logout}
          className={
            mobile
              ? "rounded-2xl px-4 py-3 text-left text-stone-700 transition hover:bg-stone-50 hover:text-black"
              : "rounded-full border border-stone-200 bg-white px-4 py-2 text-sm text-stone-700 hover:bg-stone-50"
          }
        >
          Logout
        </button>
      </div>
    );
  }

  return (
    <Link
      href="/login"
      onClick={onNavigate || undefined}
      className={
        mobile
          ? "block rounded-2xl px-4 py-3 text-stone-700 transition hover:bg-stone-50 hover:text-black"
          : "rounded-full border border-stone-200 bg-white px-4 py-2 text-sm text-stone-700 hover:bg-stone-50"
      }
    >
      Login
    </Link>
  );
}