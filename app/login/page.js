"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

import { supabase } from "@/lib/supabase";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const redirectTo = searchParams.get("redirect") || "/add-loved-one";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function loginUser(e) {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setMessage(error.message);
      setLoading(false);
      return;
    }

    setMessage("Login successful. Redirecting...");
    setLoading(false);

    setTimeout(() => {
      router.push(redirectTo);
    }, 600);
  }

  return (
    <main className="min-h-screen bg-stone-50 text-stone-900">
      <section className="flex min-h-screen items-center justify-center px-5">
        <div className="w-full max-w-md rounded-3xl border border-stone-100 bg-white p-7 shadow-sm">
          <p className="mb-4 text-xs uppercase tracking-[0.25em] text-stone-400">
            Family Access
          </p>

          <h1 className="mb-4 font-serif text-3xl text-stone-900">
            Login
          </h1>

          <p className="mb-8 text-sm font-light leading-relaxed text-stone-500">
            Login to manage memorial details, uploads, and private family wall
            spaces.
          </p>

          <form onSubmit={loginUser} className="space-y-5">
            <div>
              <label className="mb-2 block text-sm text-stone-500">
                Email
              </label>

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-2xl border border-stone-200 px-5 py-4 text-sm outline-none"
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-stone-500">
                Password
              </label>

              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-2xl border border-stone-200 px-5 py-4 text-sm outline-none"
                required
              />
            </div>

            {message && (
              <p className="rounded-2xl bg-stone-50 p-4 text-sm text-stone-600">
                {message}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-full bg-stone-900 px-7 py-3.5 text-sm font-medium text-white disabled:opacity-60"
            >
              {loading ? "Logging in..." : "Login"}
            </button>

            <p className="text-center text-sm text-stone-500">
              No account yet?{" "}
              <Link href="/signup" className="underline underline-offset-4">
                Create one
              </Link>
            </p>

            <Link href="/" className="block text-center text-sm text-stone-400">
              Back home
            </Link>
          </form>
        </div>
      </section>
    </main>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-stone-50 text-stone-500">
          Loading login...
        </main>
      }
    >
      <LoginForm />
    </Suspense>
  );
}