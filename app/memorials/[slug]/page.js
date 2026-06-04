import Link from "next/link";
import { supabase } from "@/lib/supabase";
import MemorialCondolencesSection from "../../../components/MemorialCondolencesSection";
import CandleSection from "../../../components/CandleSection";
import FlowerSection from "../../../components/FlowerSection";

async function getMemorial(slug) {
  const numericId = Number(slug);

  if (!Number.isFinite(numericId)) {
    return null;
  }

  const { data, error } = await supabase
    .from("memorials")
    .select("*")
    .eq("id", numericId)
    .maybeSingle();

  if (error || !data) {
    return null;
  }

  return data;
}

async function getGalleryImages(slug) {
  const { data } = await supabase
    .from("memorial_gallery")
    .select("*")
    .eq("memorial_id", slug)
    .order("created_at", { ascending: false });

  return data || [];
}

export default async function MemorialDetailPage({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug;

  const memorial = await getMemorial(slug);
  const galleryImages = await getGalleryImages(slug);

  if (!memorial) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-stone-50 px-6 text-center">
        <div>
          <h1 className="mb-4 font-serif text-4xl text-stone-800">
            Memorial not found
          </h1>

          <Link href="/memorials" className="text-sm text-stone-500 underline">
            Return to memorials
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-stone-50 text-stone-900">
      <section className="relative flex min-h-[60vh] items-end overflow-hidden">
        {memorial.image_url ? (
          <img
            src={memorial.image_url}
            alt={memorial.name}
            className="absolute inset-0 h-full w-full object-cover object-top"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-stone-200 text-7xl text-stone-400">
            ♡
          </div>
        )}

        <div className="absolute inset-0 bg-black/55" />

        <div className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-16 text-white">
          <p className="mb-4 text-xs uppercase tracking-[0.25em] text-stone-300">
            {memorial.category || "Loved Ones"}
          </p>

          <h1 className="mb-4 max-w-4xl font-serif text-4xl leading-tight md:text-6xl">
            {memorial.name}
          </h1>

          <p className="text-base text-stone-200 md:text-lg">
            {memorial.birth_date || "Birth"} —{" "}
            {memorial.death_date || "Remembrance"}
          </p>
        </div>
      </section>

      <section className="px-5 py-14 sm:px-6 sm:py-16">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.3fr_0.7fr]">
          <div className="space-y-10">
            <div className="rounded-3xl border border-stone-100 bg-white p-7 shadow-sm sm:p-8">
              <h2 className="mb-5 font-serif text-2xl text-stone-800">
                Tribute
              </h2>

              <p className="mb-8 text-base italic leading-relaxed text-stone-500 sm:text-lg">
                {memorial.tribute ||
                  "A life remembered with dignity and love."}
              </p>

              <div className="whitespace-pre-wrap text-[15px] font-light leading-relaxed text-stone-600">
                {memorial.story ||
                  "This memorial preserves a life story with care and reflection."}
              </div>
            </div>

            <div className="rounded-3xl border border-stone-100 bg-white p-7 shadow-sm">
              <div className="mb-7 flex items-center justify-between">
                <div>
                  <h2 className="font-serif text-2xl text-stone-800">
                    Memory Gallery
                  </h2>

                  <p className="mt-2 text-sm text-stone-500">
                    Shared moments and remembered memories.
                  </p>
                </div>

                <Link
                  href={`/memorials/${slug}/edit`}
                  className="rounded-full bg-stone-900 px-5 py-2 text-sm text-white"
                >
                  Manage Gallery
                </Link>
              </div>

              {galleryImages.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-stone-200 p-10 text-center text-sm text-stone-400">
                  No gallery memories uploaded yet.
                </div>
              ) : (
                <div className="grid gap-5 sm:grid-cols-2">
                  {galleryImages.map((image) => (
                    <div
                      key={image.id}
                      className="overflow-hidden rounded-3xl border border-stone-100"
                    >
                      <img
                        src={image.image_url}
                        alt=""
                        className="h-72 w-full object-cover object-top transition duration-500 hover:scale-105"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            <FlowerSection memorialId={Number(slug)} />

            <CandleSection memorialId={Number(slug)} />

            <MemorialCondolencesSection memorialId={Number(slug)} />
          </div>

          <aside className="space-y-6">
            <Link
              href={`/memorials/${slug}/edit`}
              className="block rounded-3xl border border-stone-100 bg-white p-7 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <p className="font-serif text-xl text-stone-800">
                Edit Memorial
              </p>

              <p className="mt-2 text-sm font-light text-stone-500">
                Update details, correct information, or manage this memorial.
              </p>
            </Link>

            <div className="rounded-3xl border border-stone-100 bg-white p-7 shadow-sm">
              <h3 className="mb-6 font-serif text-xl text-stone-800">
                Memorial Details
              </h3>

              <div className="space-y-5 text-sm">
                <div>
                  <p className="mb-1 text-stone-400">Category</p>
                  <p className="text-stone-700">
                    {memorial.category || "Loved Ones"}
                  </p>
                </div>

                <div>
                  <p className="mb-1 text-stone-400">Years</p>
                  <p className="text-stone-700">
                    {memorial.birth_date || "Birth"} —{" "}
                    {memorial.death_date || "Remembrance"}
                  </p>
                </div>

                <div>
                  <p className="mb-1 text-stone-400">Remembered As</p>
                  <p className="text-stone-700">
                    {memorial.relationship || "Personal remembrance"}
                  </p>
                </div>
              </div>
            </div>

            <Link
              href={`/memorials/${slug}/family-wall`}
              className="block rounded-3xl bg-stone-900 p-7 text-white transition hover:-translate-y-1"
            >
              <h3 className="mb-4 font-serif text-xl">
                Private Family Wall
              </h3>

              <p className="mb-6 text-sm font-light leading-relaxed text-stone-400">
                A protected remembrance space for family reflections,
                conversations, voice memories, photographs, and future
                family storytelling.
              </p>

              <div className="w-full rounded-2xl bg-white py-3 text-center text-sm font-medium text-stone-900">
                Enter Family Wall
              </div>
            </Link>
          </aside>
        </div>
      </section>

      <footer className="border-t border-stone-100 bg-white px-5 py-12 text-center sm:px-6 sm:py-14">
        <p className="mb-8 font-serif text-lg italic text-stone-400">
          ♡ In loving memory, forever remembered.
        </p>

        <div className="mb-8 flex flex-wrap justify-center gap-5 text-sm text-stone-500 sm:gap-7">
          <Link href="/">Home</Link>
          <Link href="/memorials">Memorials</Link>
          <Link href="/categories">Categories</Link>
          <Link href="/tragedies">Tragedies</Link>
          <Link href="/add-loved-one">Add Loved One</Link>
          <Link href="/about">About</Link>
        </div>

        <p className="mx-auto max-w-xl text-sm font-light leading-relaxed text-stone-400">
          Milele Twakumbuka preserves memory, legacy, reflection, and shared
          humanity across generations.
        </p>

        <p className="mt-10 text-xs uppercase tracking-[0.3em] text-stone-300">
          © 2026 Milele Twakumbuka
        </p>
      </footer>
    </main>
  );
}