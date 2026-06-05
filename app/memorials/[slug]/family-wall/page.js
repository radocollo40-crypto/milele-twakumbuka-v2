"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import VoiceRemembranceSection from "../../../../components/VoiceRemembranceSection";
import FamilyPhotoGallerySection from "../../../../components/FamilyPhotoGallerySection";

export default function FamilyWallPage() {
  const params = useParams();
  const slug = params.slug;

  const [user, setUser] = useState(null);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [wall, setWall] = useState(null);

  const [posts, setPosts] = useState([]);
  const [message, setMessage] = useState("");
  const [posting, setPosting] = useState(false);

  const [inviteLink, setInviteLink] = useState("");
  const [generatingLink, setGeneratingLink] = useState(false);
  const [copyMessage, setCopyMessage] = useState("");

  useEffect(() => {
    let mounted = true;

    async function loadWall() {
      try {
        const authTimeout = new Promise((_, reject) =>
          setTimeout(() => reject(new Error("Auth timeout")), 6000)
        );

        const result = await Promise.race([
          supabase.auth.getUser(),
          authTimeout,
        ]);

        const currentUser = result?.data?.user || null;

        if (!mounted) return;

        setUser(currentUser);

        if (!currentUser) {
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

        let existingWall = walls?.[0] || null;

        if (!existingWall) {
          const { data: createdWall, error: createError } = await supabase
            .from("family_walls")
            .insert([
              {
                memorial_id: memorialId,
                owner_id: currentUser.id,
                title: "Family Wall",
              },
            ])
            .select()
            .single();

          if (createError) {
            console.log(createError.message);
            setCheckingAuth(false);
            return;
          }

          existingWall = createdWall;
        }

        if (!mounted) return;

        setWall(existingWall);

        const { data: wallPosts } = await supabase
          .from("family_wall_posts")
          .select("*")
          .eq("wall_id", existingWall.id)
          .order("created_at", { ascending: false });

        if (mounted) setPosts(wallPosts || []);
      } catch (error) {
        console.log(error.message);
        if (mounted) setUser(null);
      } finally {
        if (mounted) setCheckingAuth(false);
      }
    }

    loadWall();

    return () => {
      mounted = false;
    };
  }, [slug]);

  async function createPost() {
    if (!message.trim() || !wall || !user) return;

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
    if (!wall || !user) {
      setCopyMessage("Family wall or user session not ready.");
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
          <p className="mb-4 text-xs uppercase tracking-[0.25em] text-stone-400">
            Private Family Wall
          </p>

          <h1 className="mb-4 font-serif text-3xl text-stone-900">
            Login Required
          </h1>

          <p className="mb-7 text-sm leading-relaxed text-stone-500">
            This family wall is private. Please login to access family
            reflections, conversation rooms, voice remembrance, and family
            photos.
          </p>

          <div className="flex flex-col gap-3">
            <Link
              href={`/login?redirect=/memorials/${slug}/family-wall`}
              className="rounded-full bg-stone-900 px-7 py-3 text-sm font-medium text-white"
            >
              Login
            </Link>

            <Link
              href={`/memorials/${slug}`}
              className="rounded-full border border-stone-200 bg-white px-7 py-3 text-sm font-medium text-stone-700"
            >
              Back to memorial
            </Link>
          </div>
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

              <Link
                href={`/memorials/${slug}/family-wall/conversation`}
                className="inline-flex items-center justify-center rounded-full bg-stone-900 px-6 py-3 text-sm font-medium text-white"
              >
                Open Conversation Room
              </Link>
            </div>
          </section>

          {wall && <VoiceRemembranceSection wallId={wall.id} />}

          {wall && <FamilyPhotoGallerySection wallId={wall.id} />}

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