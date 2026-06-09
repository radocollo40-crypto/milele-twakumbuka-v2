"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function FamilyConversationPage() {
  const { slug } = useParams();
  const bottomRef = useRef(null);

  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [wall, setWall] = useState(null);
  const [hasAccess, setHasAccess] = useState(false);
  const [messages, setMessages] = useState([]);

  const [text, setText] = useState("");
  const [fullName, setFullName] = useState("");
  const [nameSaving, setNameSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);

  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");

  useEffect(() => {
    let channel;

    async function loadConversation() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setUser(user || null);

      if (!user) {
        setLoading(false);
        return;
      }

      const { data: profileData } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .maybeSingle();

      setProfile(profileData || null);
      setFullName(profileData?.full_name || user?.user_metadata?.full_name || "");

      const { data: walls } = await supabase
        .from("family_walls")
        .select("*")
        .eq("memorial_id", Number(slug))
        .limit(1);

      const currentWall = walls?.[0] || null;
      setWall(currentWall);

      if (!currentWall) {
        setLoading(false);
        return;
      }

      let allowed = false;

      if (currentWall.owner_id === user.id) {
        allowed = true;
      } else {
        const { data: membership } = await supabase
          .from("family_wall_members")
          .select("id, role, status")
          .eq("wall_id", currentWall.id)
          .eq("user_id", user.id)
          .maybeSingle();

        if (membership) {
          allowed = true;
        }
      }

      setHasAccess(allowed);

      if (!allowed) {
        setLoading(false);
        return;
      }

      const { data } = await supabase
        .from("family_wall_messages")
        .select("*")
        .eq("wall_id", currentWall.id)
        .order("created_at", { ascending: true });

      setMessages(data || []);

      channel = supabase
        .channel(`family-wall-messages-${currentWall.id}`)
        .on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "family_wall_messages",
            filter: `wall_id=eq.${currentWall.id}`,
          },
          (payload) => {
            if (payload.eventType === "INSERT") {
              setMessages((prev) => {
                const exists = prev.some((item) => item.id === payload.new.id);
                return exists ? prev : [...prev, payload.new];
              });
            }

            if (payload.eventType === "UPDATE") {
              setMessages((prev) =>
                prev.map((item) =>
                  item.id === payload.new.id ? payload.new : item
                )
              );
            }

            if (payload.eventType === "DELETE") {
              setMessages((prev) =>
                prev.filter((item) => item.id !== payload.old.id)
              );
            }
          }
        )
        .subscribe();

      setLoading(false);
    }

    loadConversation();

    return () => {
      if (channel) supabase.removeChannel(channel);
    };
  }, [slug]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function getSenderName() {
    if (profile?.full_name?.trim()) return profile.full_name.trim();

    if (user?.user_metadata?.full_name?.trim()) {
      return user.user_metadata.full_name.trim();
    }

    return "";
  }

  async function saveName() {
    if (!fullName.trim() || !user) return;

    setNameSaving(true);

    const { error } = await supabase.from("profiles").upsert([
      {
        id: user.id,
        full_name: fullName.trim(),
        email: user.email || "",
      },
    ]);

    if (error) {
      alert(error.message || "Unable to save name.");
      setNameSaving(false);
      return;
    }

    setProfile({
      id: user.id,
      full_name: fullName.trim(),
      email: user.email || "",
    });

    setNameSaving(false);
  }

  async function sendMessage() {
    if (!text.trim() || !wall || !user || !hasAccess) return;

    const senderName = getSenderName();

    if (!senderName) {
      alert("Please enter your name first.");
      return;
    }

    setSending(true);

    const messageToSend = text.trim();
    setText("");

    const { error } = await supabase.from("family_wall_messages").insert([
      {
        wall_id: wall.id,
        user_id: user.id,
        sender_name: senderName,
        message: messageToSend,
      },
    ]);

    if (error) {
      setText(messageToSend);
      alert(error.message || "Unable to send message.");
    }

    setSending(false);
  }

  function startEdit(item) {
    setEditingId(item.id);
    setEditingText(item.message);
  }

  function cancelEdit() {
    setEditingId(null);
    setEditingText("");
  }

  async function saveEdit(id) {
    if (!editingText.trim() || !user || !hasAccess) return;

    await supabase
      .from("family_wall_messages")
      .update({ message: editingText.trim() })
      .eq("id", id)
      .eq("user_id", user.id);

    cancelEdit();
  }

  async function deleteMessage(id) {
    const confirmDelete = window.confirm("Delete this message?");
    if (!confirmDelete || !user || !hasAccess) return;

    const previousMessages = messages;
    setMessages((prev) => prev.filter((item) => item.id !== id));

    const { error } = await supabase
      .from("family_wall_messages")
      .delete()
      .eq("id", id)
      .eq("user_id", user.id);

    if (error) {
      setMessages(previousMessages);
      alert(error.message || "Unable to delete message.");
    }
  }

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-stone-50">
        <p className="text-stone-500">Opening conversation...</p>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-stone-50 px-5 text-center">
        <div className="max-w-md rounded-3xl bg-white p-8 shadow-sm">
          <h1 className="mb-4 font-serif text-3xl">Login Required</h1>

          <p className="mb-6 text-sm text-stone-500">
            Please login to enter this private family conversation.
          </p>

          <Link
            href={`/login?redirect=/memorials/${slug}/family-wall/conversation`}
            className="rounded-full bg-stone-900 px-7 py-3 text-sm text-white"
          >
            Login
          </Link>
        </div>
      </main>
    );
  }

  if (!hasAccess) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-stone-50 px-5 text-center">
        <div className="max-w-md rounded-3xl bg-white p-8 shadow-sm">
          <p className="mb-4 text-xs uppercase tracking-[0.25em] text-stone-400">
            Private Family Wall
          </p>

          <h1 className="mb-4 font-serif text-3xl">Access Required</h1>

          <p className="mb-7 text-sm leading-relaxed text-stone-500">
            You do not currently have access to this private family
            conversation. Please use an invitation link from the family owner or
            admin.
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

  if (!getSenderName()) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-stone-50 px-5 text-center">
        <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-sm">
          <p className="mb-4 text-xs uppercase tracking-[0.25em] text-stone-400">
            Family Identity
          </p>

          <h1 className="mb-4 font-serif text-3xl text-stone-900">
            Enter Your Name
          </h1>

          <p className="mb-6 text-sm leading-relaxed text-stone-500">
            This name will appear in the private family conversation so members
            know who is speaking.
          </p>

          <input
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Full name"
            className="mb-4 w-full rounded-2xl border border-stone-200 px-5 py-4 text-sm outline-none"
          />

          <button
            onClick={saveName}
            disabled={nameSaving}
            className="w-full rounded-full bg-stone-900 px-7 py-3.5 text-sm font-medium text-white disabled:opacity-60"
          >
            {nameSaving ? "Saving name..." : "Continue"}
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col bg-stone-50 text-stone-900">
      <header className="border-b border-stone-100 bg-white px-5 py-5">
        <div className="mx-auto flex max-w-4xl items-center justify-between gap-4">
          <div>
            <p className="mb-1 text-xs uppercase tracking-[0.25em] text-stone-400">
              Private Family Wall
            </p>

            <h1 className="font-serif text-2xl text-stone-900">
              Family Conversation
            </h1>
          </div>

          <Link
            href={`/memorials/${slug}/family-wall`}
            className="rounded-full border border-stone-200 px-5 py-2 text-sm text-stone-600"
          >
            Back
          </Link>
        </div>
      </header>

      <section className="mx-auto flex w-full max-w-4xl flex-1 flex-col px-5 py-6">
        <div className="mb-5 rounded-3xl border border-stone-100 bg-white p-5">
          <p className="text-sm leading-relaxed text-stone-500">
            A private room for family support, updates, planning, and quiet
            conversation.
          </p>
        </div>

        <div className="flex-1 space-y-4 overflow-y-auto rounded-3xl border border-stone-100 bg-white p-5">
          {messages.length === 0 ? (
            <div className="flex min-h-[320px] flex-col items-center justify-center text-center">
              <p className="mb-3 text-4xl">💬</p>

              <h2 className="mb-2 font-serif text-2xl text-stone-800">
                No conversation yet
              </h2>

              <p className="max-w-md text-sm text-stone-500">
                Start the family conversation with an update, memory, or simple
                message of support.
              </p>
            </div>
          ) : (
            messages.map((item) => {
              const isOwnMessage = item.user_id === user.id;
              const isEditing = editingId === item.id;
              const displayName = isOwnMessage
                ? "You"
                : item.sender_name || "Family Member";

              return (
                <div
                  key={item.id}
                  className={`max-w-[82%] rounded-3xl px-5 py-4 ${
                    isOwnMessage
                      ? "ml-auto bg-stone-900 text-white"
                      : "mr-auto bg-stone-100 text-stone-700"
                  }`}
                >
                  {isEditing ? (
                    <div>
                      <textarea
                        value={editingText}
                        onChange={(e) => setEditingText(e.target.value)}
                        className="mb-3 w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 text-sm text-stone-900 outline-none"
                      />

                      <div className="flex gap-2">
                        <button
                          onClick={() => saveEdit(item.id)}
                          className="rounded-full bg-white px-4 py-2 text-xs text-stone-900"
                        >
                          Save
                        </button>

                        <button
                          onClick={cancelEdit}
                          className="rounded-full border border-stone-400 px-4 py-2 text-xs"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <p className="whitespace-pre-wrap text-sm leading-relaxed">
                        {item.message}
                      </p>

                      <div className="mt-3 flex items-center justify-between gap-3">
                        <p
                          className={`text-[10px] uppercase tracking-[0.18em] ${
                            isOwnMessage ? "text-stone-300" : "text-stone-400"
                          }`}
                        >
                          {displayName} ·{" "}
                          {new Date(item.created_at).toLocaleString()}
                        </p>

                        {isOwnMessage && (
                          <div className="flex gap-2">
                            <button
                              onClick={() => startEdit(item)}
                              title="Edit message"
                              className="rounded-full bg-white/10 px-3 py-1 text-xs"
                            >
                              ✏️
                            </button>

                            <button
                              onClick={() => deleteMessage(item.id)}
                              title="Delete message"
                              className="rounded-full bg-white/10 px-3 py-1 text-xs"
                            >
                              🗑️
                            </button>
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </div>
              );
            })
          )}

          <div ref={bottomRef} />
        </div>

        <div className="mt-5 flex gap-3 rounded-3xl border border-stone-100 bg-white p-4">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") sendMessage();
            }}
            placeholder="Write a family message..."
            className="flex-1 rounded-2xl border border-stone-200 bg-stone-50 px-5 py-4 text-sm outline-none"
          />

          <button
            onClick={sendMessage}
            disabled={sending}
            className="rounded-full bg-stone-900 px-6 py-3 text-sm font-medium text-white disabled:opacity-60"
          >
            {sending ? "Sending..." : "Send"}
          </button>
        </div>
      </section>
    </main>
  );
}