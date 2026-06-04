"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

const flowerTypes = [
  {
    id: "rose",
    emoji: "🌹",
    title: "Rose",
    meaning: "Love & Deep Respect",
  },
  {
    id: "lily",
    emoji: "🤍",
    title: "Lily",
    meaning: "Purity & Peaceful Rest",
  },
  {
    id: "carnation",
    emoji: "🌸",
    title: "White Carnation",
    meaning: "Remembrance & Devotion",
  },
  {
    id: "sunflower",
    emoji: "🌻",
    title: "Sunflower",
    meaning: "Warmth & Gratitude",
  },
  {
    id: "orchid",
    emoji: "🌺",
    title: "Orchid",
    meaning: "Dignity & Lasting Beauty",
  },
  {
    id: "olive",
    emoji: "🕊️",
    title: "Olive Branch",
    meaning: "Peace & Healing",
  },
];

export default function FlowerSection({ memorialId }) {
  const [counts, setCounts] = useState({});
  const [loadingType, setLoadingType] = useState(null);

  useEffect(() => {
    fetchFlowers();
  }, [memorialId]);

  async function fetchFlowers() {
    const { data } = await supabase
      .from("flowers")
      .select("flower_type")
      .eq("memorial_id", memorialId);

    const totals = {};

    flowerTypes.forEach((type) => {
      totals[type.id] = 0;
    });

    data?.forEach((item) => {
      totals[item.flower_type] = (totals[item.flower_type] || 0) + 1;
    });

    setCounts(totals);
  }

  async function sendFlower(type) {
    setLoadingType(type);

    const { error } = await supabase.from("flowers").insert([
      {
        memorial_id: memorialId,
        flower_type: type,
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
    <div className="rounded-3xl border border-stone-100 bg-white p-7 shadow-sm">
      <div className="mb-10 text-center">
        <div className="mb-4 text-6xl">💐</div>

        <h2 className="mb-3 font-serif text-2xl text-stone-800">
          Flower Tributes
        </h2>

        <p className="mx-auto max-w-2xl text-sm leading-relaxed text-stone-500">
          Offer flowers as a quiet sign of love, peace, remembrance, and
          gratitude.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {flowerTypes.map((flower) => (
          <div
            key={flower.id}
            className="rounded-3xl border border-stone-100 bg-stone-50 p-6"
          >
            <div className="mb-4 text-4xl">{flower.emoji}</div>

            <h3 className="font-serif text-xl text-stone-800">
              {flower.title}
            </h3>

            <p className="mt-2 text-sm leading-relaxed text-stone-500">
              {flower.meaning}
            </p>

            <div className="mb-6 mt-6">
              <p className="text-3xl font-light text-stone-800">
                {counts[flower.id] || 0}
              </p>

              <p className="text-xs uppercase tracking-[0.2em] text-stone-400">
                offered
              </p>
            </div>

            <button
              onClick={() => sendFlower(flower.id)}
              disabled={loadingType === flower.id}
              className="w-full rounded-full bg-stone-900 px-5 py-3 text-sm font-medium text-white disabled:opacity-60"
            >
              {loadingType === flower.id
                ? "Offering..."
                : `Offer ${flower.title}`}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}