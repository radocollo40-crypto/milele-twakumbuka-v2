"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function AuthCallbackPage() {
  const [status, setStatus] = useState("checking");

  useEffect(() => {
    async function handleCallback() {
      const hashParams = new URLSearchParams(
        window.location.hash.replace("#", "")
      );

      const accessToken = hashParams.get("access_token");
      const refreshToken = hashParams.get("refresh_token");

      if (accessToken && refreshToken) {
        const { error } = await supabase.auth.setSession({
          access_token: accessToken,
          refresh_token: refreshToken,
        });

        if (error) {
          setStatus("error");
          return;
        }

        setStatus("success");
        return;
      }

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        setStatus("success");
      } else {
        setStatus("success");
      }
    }

    handleCallback();
  }, []);

  return (
    <main className="flex min-h-screen items-center justify-center bg-stone-50 px-5 text-stone-900">
      <div className="max-w-md rounded-3xl border border-stone-100 bg-white p-8 text-center shadow-sm">
        {status === "checking" && (
          <>
            <p className="mb-4 text-4xl">🕊️</p>
            <h1 className="mb-4 font-serif text-3xl text-stone-900">
              Verifying your email
            </h1>
            <p className="text-sm leading-relaxed text-stone-500">
              Please wait while we confirm your account.
            </p>
          </>
        )}

        {status === "success" && (
          <>
            <p className="mb-4 text-4xl">✓</p>
            <h1 className="mb-4 font-serif text-3xl text-stone-900">
              Email verified successfully
            </h1>
            <p className="mb-7 text-sm leading-relaxed text-stone-500">
              Your account is ready. You can now continue using Milele
              Twakumbuka.
            </p>

            <div className="flex flex-col gap-3">
              <Link
                href="/login"
                className="rounded-full bg-stone-900 px-7 py-3 text-sm font-medium text-white"
              >
                Continue to Login
              </Link>

              <Link
                href="/"
                className="rounded-full border border-stone-200 bg-white px-7 py-3 text-sm text-stone-600"
              >
                Back Home
              </Link>
            </div>
          </>
        )}

        {status === "error" && (
          <>
            <p className="mb-4 text-4xl">!</p>
            <h1 className="mb-4 font-serif text-3xl text-stone-900">
              Verification needs attention
            </h1>
            <p className="mb-7 text-sm leading-relaxed text-stone-500">
              Your email may already be verified. Try logging in, or contact
              support if you still cannot access your account.
            </p>

            <div className="flex flex-col gap-3">
              <Link
                href="/login"
                className="rounded-full bg-stone-900 px-7 py-3 text-sm font-medium text-white"
              >
                Go to Login
              </Link>

              <Link
                href="/contact"
                className="rounded-full border border-stone-200 bg-white px-7 py-3 text-sm text-stone-600"
              >
                Contact Support
              </Link>
            </div>
          </>
        )}
      </div>
    </main>
  );
}