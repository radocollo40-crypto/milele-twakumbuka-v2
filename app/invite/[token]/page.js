"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function InvitePage() {
  const params = useParams();
  const router = useRouter();
  const token = params.token;

  const [user, setUser] = useState(null);
  const [invite, setInvite] = useState(null);
  const [wall, setWall] = useState(null);
  const [loading, setLoading] = useState(true);
  const [joining, setJoining] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function loadInvite() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setUser(user || null);

      if (!user) {
        setLoading(false);
        return;
      }

      const { data: inviteData, error: inviteError } = await supabase
        .from("family_wall_invites")
        .select("*")
        .eq("invite_token", token)
        .single();

      if (inviteError || !inviteData) {
        setMessage("This invitation link is invalid or no longer available.");
        setLoading(false);
        return;
      }

      setInvite(inviteData);

      const { data: wallData, error: wallError } = await supabase
        .from("family_walls")
        .select("*")
        .eq("id", inviteData.family_wall_id)
        .single();

      if (wallError || !wallData) {
        setMessage("Family wall could not be found.");
        setLoading(false);
        return;
      }

      setWall(wallData);
      setLoading(false);
    }

    loadInvite();
  }, [token]);

  async function joinFamilyWall() {
    if (!user || !invite || !wall) return;

    setJoining(true);
    setMessage("");

    const { data: existingMember } = await supabase
      .from("family_wall_members")
      .select("*")
      .eq("wall_id", wall.id)
      .eq("invited_email", user.email)
      .maybeSingle();

    if (existingMember) {
      router.push(`/memorials/${wall.memorial_id}/family-wall`);
      return;
    }

    const { error } = await supabase.from("family_wall_members").insert([
      {
        wall_id: wall.id,
        invited_email: user.email,
        status: "accepted",
        role: "member",
      },
    ]);

    if (error) {
      setMessage(error.message || "Unable to join this family wall.");
      setJoining(false);
      return;
    }

    router.push(`/memorials/${wall.memorial_id}/family-wall`);
  }

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-stone-50">
        <p className="text-stone-500">Loading invitation...</p>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-stone-50 px-5 text-center text-stone-900">
        <div className="max-w-md rounded-3xl border border-stone-100 bg-white p-8 shadow-sm">
          <p className="mb-4 text-xs uppercase tracking-[0.25em] text-stone-400">
            Family Wall Invitation
          </p>

          <h1 className="mb-4 font-serif text-3xl text-stone-900">
            Login Required
          </h1>

          <p className="mb-7 text-sm leading-relaxed text-stone-500">
            Please login or create an account to accept this family wall
            invitation.
          </p>

          <div className="flex flex-col gap-3">
            <Link
              href={`/login?redirect=/invite/${token}`}
              className="rounded-full bg-stone-900 px-7 py-3 text-sm font-medium text-white"
            >
              Login
            </Link>

            <Link
              href="/signup"
              className="rounded-full border border-stone-200 bg-white px-7 py-3 text-sm font-medium text-stone-700"
            >
              Create Account
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-stone-50 px-5 text-center text-stone-900">
      <div className="w-full max-w-lg rounded-3xl border border-stone-100 bg-white p-8 shadow-sm">
        <p className="mb-4 text-xs uppercase tracking-[0.25em] text-stone-400">
          Family Wall Invitation
        </p>

        <h1 className="mb-4 font-serif text-3xl text-stone-900">
          Join Family Wall
        </h1>

        <p className="mb-7 text-sm leading-relaxed text-stone-500">
          You have been invited to join a private family remembrance space.
        </p>

        {message && (
          <p className="mb-6 rounded-2xl bg-stone-50 p-4 text-sm text-stone-600">
            {message}
          </p>
        )}

        {wall && (
          <button
            onClick={joinFamilyWall}
            disabled={joining}
            className="w-full rounded-full bg-stone-900 px-7 py-3 text-sm font-medium text-white disabled:opacity-60"
          >
            {joining ? "Joining..." : "Join Family Wall"}
          </button>
        )}

        <Link
          href="/"
          className="mt-6 block text-sm text-stone-400 underline underline-offset-4"
        >
          Back home
        </Link>
      </div>
    </main>
  );
}