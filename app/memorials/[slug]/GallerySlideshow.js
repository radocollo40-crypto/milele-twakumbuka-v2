"use client";

import { useState } from "react";

export default function GallerySlideshow({ images = [] }) {
  const [selectedImage, setSelectedImage] = useState(null);

  if (!images || images.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-stone-200 bg-stone-50 py-16 text-center">
        <p className="text-sm font-light italic text-stone-400">
          No gallery photos have been added yet.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {images.map((image, index) => (
          <button
            key={image}
            type="button"
            onClick={() => setSelectedImage(image)}
            className="group aspect-square overflow-hidden rounded-xl bg-stone-100 shadow-sm transition hover:shadow-lg"
          >
            <img
              src={image}
              alt={`Gallery image ${index + 1}`}
              className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            />
          </button>
        ))}
      </div>

      {selectedImage && (
        <div
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/90 p-6 backdrop-blur-sm"
        >
          <button
            type="button"
            onClick={() => setSelectedImage(null)}
            className="absolute right-5 top-5 rounded-full bg-white/10 px-4 py-2 text-sm text-white"
          >
            Close
          </button>

          <img
            src={selectedImage}
            alt=""
            className="max-h-[85vh] max-w-5xl rounded-2xl object-contain shadow-2xl"
          />
        </div>
      )}
    </>
  );
}