"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function EditMemorialPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [allowed, setAllowed] = useState(false);

  const [name, setName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [deathDate, setDeathDate] = useState("");
  const [category, setCategory] = useState("Loved Ones");
  const [relationship, setRelationship] = useState("");
  const [tribute, setTribute] = useState("");
  const [story, setStory] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const [user, setUser] = useState(null);

  const [galleryImages, setGalleryImages] = useState([]);
  const [galleryUploading, setGalleryUploading] = useState(false);

  useEffect(() => {
    async function fetchMemorial() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setAllowed(false);
        setLoading(false);
        return;
      }

      setUser(user);

      const { data, error } = await supabase
        .from("memorials")
        .select("*")
        .eq("id", slug)
        .maybeSingle();

      if (error || !data || data.user_id !== user.id) {
        setAllowed(false);
        setLoading(false);
        return;
      }

      setAllowed(true);

      setName(data.name || "");
      setBirthDate(data.birth_date || "");
      setDeathDate(data.death_date || "");
      setCategory(data.category || "Loved Ones");
      setRelationship(data.relationship || "");
      setTribute(data.tribute || "");
      setStory(data.story || "");
      setImageUrl(data.image_url || "");

      const { data: galleryData } = await supabase
        .from("memorial_gallery")
        .select("*")
        .eq("memorial_id", slug)
        .order("created_at", { ascending: false });

      setGalleryImages(galleryData || []);

      setLoading(false);
    }

    fetchMemorial();
  }, [slug]);

  async function updateMemorial() {
    setSaving(true);

    const { error } = await supabase
      .from("memorials")
      .update({
        name,
        birth_date: birthDate,
        death_date: deathDate,
        category,
        relationship,
        tribute,
        story,
      })
      .eq("id", slug);

    setSaving(false);

    if (!error) {
      router.push(`/memorials/${slug}`);
    }
  }

  async function deleteMemorial() {
    const confirmed = confirm(
      "Are you sure you want to delete this memorial?"
    );

    if (!confirmed) return;

    const { error } = await supabase
      .from("memorials")
      .delete()
      .eq("id", slug);

    if (!error) {
      router.push("/memorials");
    }
  }

  async function uploadGalleryImage(event) {
    const file = event.target.files?.[0];

    if (!file || !user) return;

    if (galleryImages.length >= 5) {
      alert("Free memorials allow up to 5 gallery photos.");
      return;
    }

    setGalleryUploading(true);

    const fileExt = file.name.split(".").pop();

    const fileName = `${Date.now()}-${Math.random()
      .toString(36)
      .substring(2)}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from("memorial-images")
      .upload(fileName, file);

    if (uploadError) {
      alert("Upload failed.");
      setGalleryUploading(false);
      return;
    }

    const { data: publicUrlData } = supabase.storage
      .from("memorial-images")
      .getPublicUrl(fileName);

    const imageUrl = publicUrlData.publicUrl;

    const { error: insertError } = await supabase
      .from("memorial_gallery")
      .insert([
        {
          memorial_id: slug,
          user_id: user.id,
          image_url: imageUrl,
        },
      ]);

    if (!insertError) {
      setGalleryImages((prev) => [
        {
          image_url: imageUrl,
          id: Date.now(),
        },
        ...prev,
      ]);
    }

    setGalleryUploading(false);
  }

  async function deleteGalleryImage(id) {
    const confirmed = confirm("Delete this gallery image?");

    if (!confirmed) return;

    const { error } = await supabase
      .from("memorial_gallery")
      .delete()
      .eq("id", id);

    if (!error) {
      setGalleryImages((prev) =>
        prev.filter((image) => image.id !== id)
      );
    }
  }

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-stone-50">
        <p className="text-stone-500">Loading memorial...</p>
      </main>
    );
  }

  if (!allowed) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-stone-50 px-5 text-center">
        <div className="max-w-md rounded-3xl border border-stone-100 bg-white p-8 shadow-sm">
          <h1 className="mb-4 font-serif text-3xl text-stone-900">
            Access denied
          </h1>

          <p className="mb-7 text-sm text-stone-500">
            Only the creator of this memorial can manage it.
          </p>

          <Link
            href={`/memorials/${slug}`}
            className="rounded-full bg-stone-900 px-7 py-3 text-sm font-medium text-white"
          >
            Back to memorial
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-stone-50 px-5 py-10 text-stone-900 sm:px-6">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 flex items-center justify-between gap-4">
          <Link href={`/memorials/${slug}`} className="text-sm text-stone-500">
            ← Back to memorial
          </Link>

          <button
            onClick={deleteMemorial}
            className="rounded-full bg-red-600 px-5 py-2 text-sm text-white"
          >
            Delete Memorial
          </button>
        </div>

        <div className="rounded-3xl border border-stone-100 bg-white p-7 shadow-sm">
          <h1 className="mb-8 font-serif text-3xl text-stone-800">
            Edit Memorial
          </h1>

          <div className="space-y-6">
            {imageUrl && (
              <div className="overflow-hidden rounded-3xl">
                <img
                  src={imageUrl}
                  alt={name}
                  className="h-72 w-full object-cover object-top"
                />
              </div>
            )}

            <div>
              <label className="mb-2 block text-sm text-stone-500">
                Full Name
              </label>

              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-2xl border border-stone-200 px-5 py-4 outline-none"
              />
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <input
                type="date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                className="w-full rounded-2xl border border-stone-200 px-5 py-4 outline-none"
              />

              <input
                type="date"
                value={deathDate}
                onChange={(e) => setDeathDate(e.target.value)}
                className="w-full rounded-2xl border border-stone-200 px-5 py-4 outline-none"
              />
            </div>

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full rounded-2xl border border-stone-200 px-5 py-4 outline-none"
            >
              <option>Loved Ones</option>
              <option>Historical Figures</option>
              <option>Children Remembered</option>
              <option>Community Tributes</option>
              <option>Veterans & Defenders</option>
              <option>Faith Leaders</option>
              <option>Artists & Cultural Figures</option>
            </select>

            <input
              value={relationship}
              onChange={(e) => setRelationship(e.target.value)}
              placeholder="Relationship"
              className="w-full rounded-2xl border border-stone-200 px-5 py-4 outline-none"
            />

            <input
              value={tribute}
              onChange={(e) => setTribute(e.target.value)}
              placeholder="Tribute"
              className="w-full rounded-2xl border border-stone-200 px-5 py-4 outline-none"
            />

            <textarea
              rows="7"
              value={story}
              onChange={(e) => setStory(e.target.value)}
              placeholder="Life Story"
              className="w-full rounded-2xl border border-stone-200 px-5 py-4 outline-none"
            />

            <div className="rounded-3xl border border-stone-100 bg-stone-50 p-6">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <h2 className="font-serif text-2xl text-stone-800">
                    Gallery Photos
                  </h2>

                  <p className="mt-1 text-sm text-stone-500">
                    {galleryImages.length}/5 photos used
                  </p>
                </div>

                <label className="cursor-pointer rounded-full bg-stone-900 px-5 py-2 text-sm text-white">
                  {galleryUploading ? "Uploading..." : "Add Photo"}

                  <input
                    type="file"
                    accept="image/*"
                    onChange={uploadGalleryImage}
                    className="hidden"
                  />
                </label>
              </div>

              {galleryImages.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-stone-200 p-8 text-center text-sm text-stone-400">
                  No gallery photos uploaded yet.
                </div>
              ) : (
                <div className="grid gap-4 sm:grid-cols-2">
                  {galleryImages.map((image) => (
                    <div
                      key={image.id}
                      className="overflow-hidden rounded-2xl border border-stone-100 bg-white"
                    >
                      <img
                        src={image.image_url}
                        alt=""
                        className="h-56 w-full object-cover object-top"
                      />

                      <div className="p-4">
                        <button
                          onClick={() => deleteGalleryImage(image.id)}
                          className="w-full rounded-full bg-red-600 px-4 py-2 text-sm text-white"
                        >
                          Delete Photo
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={updateMemorial}
              disabled={saving}
              className="rounded-full bg-stone-900 px-7 py-3 text-sm font-medium text-white"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}