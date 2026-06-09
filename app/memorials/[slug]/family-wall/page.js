"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import VoiceRemembranceSection from "../../../../components/VoiceRemembranceSection";
import FamilyPhotoGallerySection from "../../../../components/FamilyPhotoGallerySection";

export default function FamilyWallPage() {
  const { slug } = useParams();

  const [user, setUser] = useState(null);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [hasAccess, setHasAccess] = useState(false);
  const [wall, setWall] = useState(null);
  const [memberRole, setMemberRole] = useState("member");

  const [posts, setPosts] = useState([]);
  const [message, setMessage] = useState("");
  const [posting, setPosting] = useState(false);

  const [inviteLink, setInviteLink] = useState("");
  const [generatingLink, setGeneratingLink] = useState(false);
  const [copyMessage, setCopyMessage] = useState("");

  const canManageWall =
    memberRole === "owner" ||
    memberRole === "admin" ||
    wall?.owner_id === user?.id;

  useEffect(() => {
    loadWall();
  }, [slug]);

  async function loadWall() {
    setCheckingAuth(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    setUser(user || null);

    if (!user) {
      setCheckingAuth(false);
      return;
    }

    const memorialId = Number(slug);

    const { data: walls } = await supabase
      .from("family_walls")
      .select("*")
      .eq("memorial_id", memorialId)
      .order("created_at", { ascending: true })
      .limit(1);

    let currentWall = walls?.[0] || null;

    if (!currentWall) {
      const { data: createdWall, error } = await supabase
        .from("family_walls")
        .insert([
          {
            memorial_id: memorialId,
            owner_id: user.id,
            title: "Family Wall",
          },
        ])
        .select()
        .single();

      if (error) {
        setCheckingAuth(false);
        return;
      }

      currentWall = createdWall;

      await supabase.from("family_wall_members").insert([
        {
          wall_id: currentWall.id,
          user_id: user.id,
          invited_email: user.email || "",
          status: "accepted",
          role: "owner",
        },
      ]);
    }

    setWall(currentWall);

    let role = "member";
    let allowed = false;

    if (currentWall.owner_id === user.id) {
      role = "owner";
      allowed = true;
    } else {
      const { data: membership } = await supabase
        .from("family_wall_members")
        .select("role, status")
        .eq("wall_id", currentWall.id)
        .eq("user_id", user.id)
        .maybeSingle();

      if (membership) {
        role = membership.role || "member";
        allowed = true;
      }
    }

    setMemberRole(role);
    setHasAccess(allowed);

    if (!allowed) {
      setCheckingAuth(false);
      return;
    }

    const { data: wallPosts } = await supabase
      .from("family_wall_posts")
      .select("*")
      .eq("wall_id", currentWall.id)
      .order("created_at", { ascending: false });

    setPosts(wallPosts || []);
    setCheckingAuth(false);
  }

  async function createPost() {
    if (!message.trim() || !wall || !user || !hasAccess) return;

    setPosting(true);

    const { data, error } = await supabase
      .from("family_wall_posts")
      .insert([
        {
          wall_id: wall.id,
          user_id: user.id,
          message,
        },
      ])
      .select()
      .single();

    if (!error && data) {
      setPosts((prev) => [data, ...prev]);
      setMessage("");
    }

    setPosting(false);
  }

  async function generateInviteLink() {
    if (!wall || !user || !canManageWall) {
      setCopyMessage("Only the wall owner or an admin can generate invites.");
      return;
    }

    setGeneratingLink(true);
    setCopyMessage("");

    const token =
      crypto.randomUUID().replace(/-/g, "") +
      Math.random().toString(36).substring(2);

    const { error } = await supabase.from("family_wall_invites").insert([
      {
        family_wall_id: wall.id,
        invite_token: token,
        created_by: user.id,
      },
    ]);

    if (error) {
      setCopyMessage(error.message || "Unable to generate invite link.");
      setGeneratingLink(false);
      return;
    }

    setInviteLink(`${window.location.origin}/invite/${token}`);
    setCopyMessage("Invite link generated.");
    setGeneratingLink(false);
  }

  async function copyInviteLink() {
    if (!inviteLink) return;
    await navigator.clipboard.writeText(inviteLink);
    setCopyMessage("Invite link copied.");
  }

  if (checkingAuth) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-stone-50">
        <p className="text-stone-500">Loading private wall...</p>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-stone-50 px-5 text-center text-stone-900">
        <div className="max-w-md rounded-3xl border border-stone-100 bg-white p-8 shadow-sm">
          <h1 className="mb-4 font-serif text-3xl">Login Required</h1>
          <p className="mb-7 text-sm leading-relaxed text-stone-500">
            Please login to access this private family wall.
          </p>
          <Link
            href={`/login?redirect=/memorials/${slug}/family-wall`}
            className="rounded-full bg-stone-900 px-7 py-3 text-sm font-medium text-white"
          >
            Login
          </Link>
        </div>
      </main>
    );
  }

  if (!hasAccess) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-stone-50 px-5 text-center text-stone-900">
        <div className="max-w-md rounded-3xl border border-stone-100 bg-white p-8 shadow-sm">
          <p className="mb-4 text-xs uppercase tracking-[0.25em] text-stone-400">
            Private Family Wall
          </p>

          <h1 className="mb-4 font-serif text-3xl">Access Required</h1>

          <p className="mb-7 text-sm leading-relaxed text-stone-500">
            You do not currently have access to this private family wall. Please
            use an invitation link from the family owner or admin.
          </p>

          <Link
            href={`/memorials/${slug}`}
            className="rounded-full bg-stone-900 px-7 py-3 text-sm text-white"
          >
            Back to Memorial
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-stone-50 px-5 py-14 text-stone-900 sm:px-6">
      <div className="mx-auto max-w-4xl">
        <div className="mb-10">
          <p className="mb-3 text-xs uppercase tracking-[0.25em] text-stone-400">
            Private Space
          </p>

          <h1 className="font-serif text-4xl text-stone-900">Family Wall</h1>

          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-stone-500">
            A protected remembrance space for family memories, private
            conversations, voice tributes, photographs, and reflection.
          </p>

          <p className="mt-4 inline-flex rounded-full bg-stone-100 px-4 py-2 text-xs uppercase tracking-[0.2em] text-stone-500">
            {memberRole}
          </p>
        </div>

        <div className="space-y-10 rounded-3xl border border-stone-100 bg-white p-7 shadow-sm">
          <section>
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h2 className="font-serif text-2xl text-stone-800">
                  Family Reflections
                </h2>

                <p className="mt-2 text-sm text-stone-500">
                  Share lasting memories, stories, and heartfelt reflections.
                </p>
              </div>

              <div className="rounded-full bg-stone-100 px-4 py-2 text-xs uppercase tracking-[0.2em] text-stone-500">
                Memory
              </div>
            </div>

            <div className="mb-8 rounded-3xl border border-stone-100 bg-stone-50 p-5">
              <textarea
                rows="5"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write a private family reflection..."
                className="mb-4 w-full rounded-2xl border border-stone-200 bg-white px-5 py-4 text-sm outline-none"
              />

              <button
                onClick={createPost}
                disabled={posting}
                className="rounded-full bg-stone-900 px-6 py-3 text-sm font-medium text-white disabled:opacity-60"
              >
                {posting ? "Posting..." : "Create Reflection"}
              </button>
            </div>

            {posts.length === 0 ? (
              <div className="rounded-3xl border border-dashed border-stone-200 p-10 text-center">
                <p className="mb-3 text-4xl">♡</p>

                <h3 className="mb-3 font-serif text-2xl text-stone-800">
                  No family reflections yet
                </h3>

                <p className="mx-auto max-w-xl text-sm leading-relaxed text-stone-500">
                  Family members can use this space for private memories,
                  reflections, and remembrance.
                </p>
              </div>
            ) : (
              <div className="space-y-5">
                {posts.map((post) => (
                  <div
                    key={post.id}
                    className="rounded-2xl border border-stone-100 bg-stone-50 p-5"
                  >
                    <div className="mb-3 flex items-center justify-between gap-4">
                      <p className="text-sm font-medium text-stone-800">
                        Family Member
                      </p>

                      <p className="text-xs text-stone-400">
                        {new Date(post.created_at).toLocaleDateString()}
                      </p>
                    </div>

                    <p className="whitespace-pre-wrap text-sm leading-relaxed text-stone-600">
                      {post.message}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </section>

          <section className="rounded-3xl border border-stone-100 bg-stone-50 p-5">
            <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="font-serif text-2xl text-stone-800">
                  Family Conversation
                </h2>

                <p className="mt-2 max-w-xl text-sm leading-relaxed text-stone-500">
                  Enter a private room for family support, coordination,
                  planning, updates, and ongoing conversations.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Link
                  href={`/memorials/${slug}/family-wall/conversation`}
                  className="inline-flex items-center justify-center rounded-full bg-stone-900 px-5 py-2.5 text-sm text-white"
                >
                  Conversation Room
                </Link>

                <Link
                  href={`/memorials/${slug}/family-wall/members`}
                  className="inline-flex items-center justify-center rounded-full border border-stone-200 bg-white px-5 py-2.5 text-sm text-stone-600 hover:bg-stone-50"
                >
                  Family Members
                </Link>
              </div>
            </div>
          </section>

          {wall && <VoiceRemembranceSection wallId={wall.id} />}

          {wall && <FamilyPhotoGallerySection wallId={wall.id} />}

          {canManageWall && (
            <section className="rounded-3xl border border-stone-100 bg-stone-50 p-5">
              <div className="rounded-3xl border border-stone-100 bg-white p-5">
                <h3 className="mb-4 font-serif text-xl text-stone-800">
                  Invite Family
                </h3>

                <p className="mb-4 text-sm leading-relaxed text-stone-500">
                  Generate a secure link and share it through WhatsApp or other
                  family groups.
                </p>

                <button
                  onClick={generateInviteLink}
                  disabled={generatingLink}
                  className="rounded-full bg-stone-900 px-6 py-3 text-sm font-medium text-white disabled:opacity-60"
                >
                  {generatingLink ? "Generating..." : "Generate Invite Link"}
                </button>

                {inviteLink && (
                  <div className="mt-5">
                    <input
                      readOnly
                      value={inviteLink}
                      className="w-full rounded-2xl border border-stone-200 bg-stone-50 px-5 py-4 text-sm"
                    />

                    <button
                      onClick={copyInviteLink}
                      className="mt-3 rounded-full border border-stone-200 px-5 py-2 text-sm"
                    >
                      Copy Link
                    </button>
                  </div>
                )}

                {copyMessage && (
                  <p className="mt-4 text-sm text-stone-500">{copyMessage}</p>
                )}
              </div>
            </section>
          )}
        </div>

        <div className="mt-10">
          <Link
            href={`/memorials/${slug}`}
            className="text-sm text-stone-500 underline underline-offset-4"
          >
            Back to memorial
          </Link>
        </div>
      </div>
    </main>
  );
}