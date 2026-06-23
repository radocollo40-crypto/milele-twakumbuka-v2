"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function MemorialViewCounter({ memorialId }) {
  const [views, setViews] = useState(0);

  useEffect(() => {
    if (!memorialId) return;

    async function recordView() {
      const visitorKey = `milele_viewed_memorial_${memorialId}`;
      let visitorId = localStorage.getItem("milele_visitor_id");

      if (!visitorId) {
        visitorId = crypto.randomUUID();
        localStorage.setItem("milele_visitor_id", visitorId);
      }

      const alreadyViewed = localStorage.getItem(visitorKey);

      if (!alreadyViewed) {
        await supabase.from("memorial_views").insert([
          {
            memorial_id: memorialId,
            visitor_id: visitorId,
          },
        ]);

        localStorage.setItem(visitorKey, "true");
      }

      const { count } = await supabase
        .from("memorial_views")
        .select("*", { count: "exact", head: true })
        .eq("memorial_id", memorialId);

      setViews(count || 0);
    }

    recordView();
  }, [memorialId]);

  return (
    <div className="rounded-3xl border border-stone-100 bg-white p-7 text-center shadow-sm">
      <p className="mb-3 text-3xl">🕊️</p>

      <p className="mb-2 text-xs uppercase tracking-[0.25em] text-stone-400">
        Remembered
      </p>

      <p className="font-serif text-4xl text-stone-900">
        {views.toLocaleString()} Visits
      </p>

      <p className="mt-3 text-sm font-light text-stone-500">
        A life that continues to be remembered.
      </p>
    </div>
  );
}