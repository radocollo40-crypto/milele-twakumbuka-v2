"use client";

import { useState } from "react";

const CANDLE_TYPES = [
  {
    id: "peace_candle",
    name: "Peace Candle",
    flameColor: "#D4A853",
    desc: "A symbol of peace, rest, and remembrance.",
  },
  {
    id: "hope_candle",
    name: "Hope Candle",
    flameColor: "#6B9EC4",
    desc: "Honoring the light that continues through memory.",
  },
  {
    id: "unity_candle",
    name: "Unity Candle",
    flameColor: "#B07D56",
    desc: "Representing togetherness across family and community.",
  },
  {
    id: "prayer_candle",
    name: "Prayer Candle",
    flameColor: "#9B8EC4",
    desc: "Offered in reflection, prayer, and spiritual comfort.",
  },
  {
    id: "eternal_light",
    name: "Eternal Light",
    flameColor: "#E8C86A",
    desc: "A lasting symbol of enduring memory.",
  },
  {
    id: "love_candle",
    name: "Love Candle",
    flameColor: "#C48B8B",
    desc: "Honoring bonds of love that continue beyond loss.",
  },
];

const FLOWER_TYPES = [
  {
    id: "white_rose",
    name: "White Rose",
    emoji: "🌹",
    desc: "Purity, remembrance, and reverence.",
  },
  {
    id: "lily",
    name: "Lily",
    emoji: "🌸",
    desc: "Peace, renewal, and spiritual rest.",
  },
  {
    id: "lavender",
    name: "Lavender",
    emoji: "💜",
    desc: "Calmness, healing, and serenity.",
  },
  {
    id: "sunflower",
    name: "Sunflower",
    emoji: "🌻",
    desc: "Warmth, hope, and lasting light.",
  },
  {
    id: "tulip",
    name: "Tulip",
    emoji: "🌷",
    desc: "Care, comfort, and affection.",
  },
  {
    id: "orchid",
    name: "Orchid",
    emoji: "🌺",
    desc: "Enduring love and respect.",
  },
];

function CandleSVG({ flameColor }) {
  return (
    <svg width="36" height="52" viewBox="0 0 36 52" fill="none">
      <ellipse cx="18" cy="7" rx="5" ry="6.5" fill={flameColor} opacity="0.3" />
      <ellipse cx="18" cy="9" rx="3.5" ry="5" fill={flameColor} opacity="0.65" />
      <ellipse cx="18" cy="10" rx="1.8" ry="3" fill="#FEF9C3" />
      <line x1="18" y1="15" x2="18" y2="18" stroke="#A8A29E" strokeWidth="1.2" />
      <rect x="10" y="18" width="16" height="27" rx="2.5" fill="white" stroke="#E7E5E4" />
      <rect x="7" y="43" width="22" height="3.5" rx="1.5" fill="#F5F5F4" stroke="#E7E5E4" />
    </svg>
  );
}

export default function TributeInteractions() {
  const [activeTab, setActiveTab] = useState("candles");
  const [hoveredItem, setHoveredItem] = useState(null);
  const [counts, setCounts] = useState({});
  const [justPlaced, setJustPlaced] = useState(null);

  const activeList = activeTab === "candles" ? CANDLE_TYPES : FLOWER_TYPES;
  const hoveredData = hoveredItem
    ? activeList.find((item) => item.id === hoveredItem)
    : null;

  const total = Object.values(counts).reduce((sum, value) => sum + value, 0);

  function handlePlace(item) {
    setCounts((prev) => ({
      ...prev,
      [item.id]: (prev[item.id] || 0) + 1,
    }));

    setJustPlaced(item.name);
    setTimeout(() => setJustPlaced(null), 1800);
  }

  return (
    <section className="space-y-8">
      <div>
        <h2 className="font-serif text-xl text-stone-800">
          Remembrance Actions
        </h2>
        <p className="mt-2 text-sm font-light leading-relaxed text-stone-500">
          Offer a quiet symbol of remembrance with meaning and care.
        </p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-stone-100 bg-white">
        <div className="flex border-b border-stone-100">
          <button
            type="button"
            onClick={() => setActiveTab("candles")}
            className={`flex-1 py-4 text-sm font-medium ${
              activeTab === "candles"
                ? "border-b-2 border-stone-800 text-stone-900"
                : "text-stone-400"
            }`}
          >
            🕯️ Light Candle
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("flowers")}
            className={`flex-1 py-4 text-sm font-medium ${
              activeTab === "flowers"
                ? "border-b-2 border-stone-800 text-stone-900"
                : "text-stone-400"
            }`}
          >
            🌸 Leave Flower
          </button>
        </div>

        <div className="min-h-[70px] px-6 pb-4 pt-5">
          {hoveredData ? (
            <p className="text-sm font-light leading-relaxed text-stone-600">
              <span className="font-medium text-stone-700">
                {hoveredData.name} —{" "}
              </span>
              {hoveredData.desc}
            </p>
          ) : (
            <p className="text-xs font-light text-stone-400">
              {total > 0
                ? `${total} remembrance offering${total === 1 ? "" : "s"} placed`
                : "Hover over an item to read its meaning."}
            </p>
          )}
        </div>

        <div className="px-6 pb-6">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
            {activeList.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => handlePlace(item)}
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
                className="rounded-xl border border-stone-100 p-3 text-center transition hover:bg-stone-50"
              >
                <div className="mb-2 flex justify-center">
                  {activeTab === "candles" ? (
                    <CandleSVG flameColor={item.flameColor} />
                  ) : (
                    <div className="flex h-12 w-12 items-center justify-center rounded-full border border-stone-100 bg-stone-50 text-2xl">
                      {item.emoji}
                    </div>
                  )}
                </div>

                <p className="mb-1 text-[10px] font-medium leading-tight text-stone-600">
                  {item.name}
                </p>

                {counts[item.id] > 0 && (
                  <span className="text-[10px] text-stone-400">
                    {counts[item.id]}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {justPlaced && (
          <div className="border-t border-stone-100 bg-stone-50 py-3 text-center text-xs font-light text-stone-500">
            {justPlaced} placed with remembrance.
          </div>
        )}
      </div>

      <CondolenceWall />
    </section>
  );
}

function CondolenceWall() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      name: "Anonymous",
      date: "Today",
      text: "May this memory continue to bring comfort, strength, and quiet peace.",
    },
  ]);

  function postMessage() {
    if (!message.trim()) return;

    setMessages([
      {
        name: name.trim() || "Anonymous",
        date: "Just now",
        text: message.trim(),
      },
      ...messages,
    ]);

    setName("");
    setMessage("");
  }

  return (
    <section className="space-y-6">
      <div>
        <h2 className="font-serif text-xl text-stone-800">
          Condolences
        </h2>
        <p className="mt-2 text-sm font-light text-stone-500">
          Leave a respectful message of comfort, memory, or support.
        </p>
      </div>

      <div className="space-y-3 rounded-2xl border border-stone-100 bg-white p-6">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          className="w-full rounded-xl border border-stone-100 bg-stone-50 px-4 py-3 text-sm font-light outline-none"
        />

        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Write a respectful condolence..."
          rows="3"
          className="w-full resize-none rounded-xl border border-stone-100 bg-stone-50 px-4 py-3 text-sm font-light outline-none"
        />

        <div className="flex justify-end">
          <button
            type="button"
            onClick={postMessage}
            className="rounded-xl bg-stone-900 px-6 py-2.5 text-sm font-medium text-white"
          >
            Post Condolence
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {messages.map((item, index) => (
          <div
            key={index}
            className="space-y-2 rounded-xl border border-stone-100 bg-white p-5"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-stone-700">
                {item.name}
              </span>
              <span className="text-[11px] text-stone-400">
                {item.date}
              </span>
            </div>

            <p className="text-sm font-light leading-relaxed text-stone-600">
              {item.text}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}