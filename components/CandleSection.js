"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

const candleTypes = [
  {
    id: "white",
    emoji: "🤍",
    title: "White Candle",
    meaning: "Peace & Rest",
  },
  {
    id: "gold",
    emoji: "✨",
    title: "Gold Candle",
    meaning: "Honor & Legacy",
  },
  {
    id: "blue",
    emoji: "💙",
    title: "Blue Candle",
    meaning: "Reflection & Memory",
  },
  {
    id: "purple",
    emoji: "💜",
    title: "Purple Candle",
    meaning: "Dignity & Spiritual Remembrance",
  },
  {
    id: "red",
    emoji: "❤️",
    title: "Red Candle",
    meaning: "Love & Family",
  },
  {
    id: "green",
    emoji: "💚",
    title: "Green Candle",
    meaning: "Hope & Healing",
  },
];

export default function CandleSection({ memorialId }) {
  const [counts, setCounts] = useState({});
  const [loadingType, setLoadingType] = useState(null);

  useEffect(() => {
    fetchCandles();
  }, [memorialId]);

  async function fetchCandles() {
    const { data } = await supabase
      .from("candles")
      .select("candle_type")
      .eq("memorial_id", memorialId);

    const totals = {};

    candleTypes.forEach((type) => {
      totals[type.id] = 0;
    });

    data?.forEach((item) => {
      totals[item.candle_type] = (totals[item.candle_type] || 0) + 1;
    });

    setCounts(totals);
  }

  async function lightCandle(type) {
    setLoadingType(type);

    const { error } = await supabase.from("candles").insert([
      {
        memorial_id: memorialId,
        candle_type: type,
      },
    ]);

    if (!error) {
      setCounts((prev) => ({
        ...prev,
        [type]: (prev[type] || 0) + 1,
      }));
    }

    setLoadingType(null);
  }

  return (
    <div className="rounded-3xl border border-stone-100 bg-white p-5 shadow-sm sm:p-6">
      <div className="mb-7 text-center">
        <div className="mb-3 text-3xl opacity-80">
          🕯️
        </div>

        <h2 className="mb-3 font-serif text-2xl text-stone-800">
          Candle Remembrance
        </h2>

        <p className="mx-auto max-w-2xl text-sm leading-relaxed text-stone-500">
          Light a candle in honor, remembrance, reflection, healing, and love.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {candleTypes.map((candle) => (
          <div
            key={candle.id}
            className="rounded-2xl border border-stone-100 bg-stone-50 p-4"
          >
            <div className="mb-3 text-2xl opacity-85">
              {candle.emoji}
            </div>

            <h3 className="font-serif text-lg text-stone-800">
              {candle.title}
            </h3>

            <p className="mt-2 min-h-10 text-xs leading-relaxed text-stone-500">
              {candle.meaning}
            </p>

            <div className="my-4">
              <p className="text-2xl font-light text-stone-800">
                {counts[candle.id] || 0}
              </p>

              <p className="text-[10px] uppercase tracking-[0.2em] text-stone-400">
                lit
              </p>
            </div>

            <button
              onClick={() => lightCandle(candle.id)}
              disabled={loadingType === candle.id}
              className="w-full rounded-full bg-stone-900 px-4 py-2.5 text-xs font-medium text-white disabled:opacity-60"
            >
              {loadingType === candle.id ? "Lighting..." : "Light Candle"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}