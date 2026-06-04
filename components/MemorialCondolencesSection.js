"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function MemorialCondolencesSection({ memorialId }) {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [anonymous, setAnonymous] = useState(false);

  const [condolences, setCondolences] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCondolences();
  }, [memorialId]);

  async function fetchCondolences() {
    const { data } = await supabase
      .from("condolences")
      .select("*")
      .eq("memorial_id", memorialId)
      .order("created_at", { ascending: false });

    setCondolences(data || []);
  }

  async function submitCondolence() {
    if (!message.trim()) return;

    setLoading(true);

    const { error } = await supabase.from("condolences").insert([
      {
        memorial_id: memorialId,
        name: anonymous ? null : name,
        message,
        is_anonymous: anonymous,
      },
    ]);

    if (!error) {
      setName("");
      setMessage("");
      setAnonymous(false);

      fetchCondolences();
    }

    setLoading(false);
  }

  return (
    <div className="rounded-3xl border border-stone-100 bg-white p-7 shadow-sm">
      <div className="mb-8">
        <h2 className="font-serif text-2xl text-stone-800">
          Condolences
        </h2>

        <p className="mt-2 text-sm text-stone-500">
          Share a message of remembrance, comfort, or reflection.
        </p>
      </div>

      <div className="space-y-5">
        {!anonymous && (
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name (optional)"
            className="w-full rounded-2xl border border-stone-200 px-5 py-4 text-sm outline-none"
          />
        )}

        <textarea
          rows="5"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Write your condolence..."
          className="w-full rounded-2xl border border-stone-200 px-5 py-4 text-sm outline-none"
        />

        <label className="flex items-center gap-3 text-sm text-stone-600">
          <input
            type="checkbox"
            checked={anonymous}
            onChange={(e) => setAnonymous(e.target.checked)}
          />

          Remain anonymous
        </label>

        <button
          onClick={submitCondolence}
          disabled={loading}
          className="rounded-full bg-stone-900 px-7 py-3 text-sm font-medium text-white disabled:opacity-60"
        >
          {loading ? "Sending..." : "Send Condolence"}
        </button>
      </div>

      <div className="mt-10 space-y-5">
        {condolences.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-stone-200 p-8 text-center text-sm text-stone-400">
            No condolences yet.
          </div>
        ) : (
          condolences.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl border border-stone-100 bg-stone-50 p-5"
            >
              <div className="mb-3 flex items-center justify-between gap-4">
                <p className="font-medium text-stone-800">
                  {item.is_anonymous
                    ? "Anonymous"
                    : item.name || "Visitor"}
                </p>

                <p className="text-xs text-stone-400">
                  {new Date(item.created_at).toLocaleDateString()}
                </p>
              </div>

              <p className="text-sm leading-relaxed text-stone-600">
                {item.message}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}