"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function AddLovedOnePage() {
  const router = useRouter();

  const [user, setUser] = useState(null);
  const [checkingAuth, setCheckingAuth] = useState(true);

  const [name, setName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [deathDate, setDeathDate] = useState("");
  const [category, setCategory] = useState("Loved Ones");
  const [relationship, setRelationship] = useState("");
  const [tribute, setTribute] = useState("");
  const [story, setStory] = useState("");

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function checkUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setUser(user || null);
      setCheckingAuth(false);
    }

    checkUser();
  }, []);

  function handleImageChange(event) {
    const file = event.target.files?.[0];
    if (!file) return;

    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  }

  async function uploadImage() {
    if (!imageFile) return "";

    const fileExt = imageFile.name.split(".").pop();
    const fileName = `${Date.now()}-${Math.random()
      .toString(36)
      .substring(2)}.${fileExt}`;

    const { error } = await supabase.storage
      .from("memorial-images")
      .upload(fileName, imageFile);

    if (error) {
      throw new Error("Image upload failed.");
    }

    const { data } = supabase.storage
      .from("memorial-images")
      .getPublicUrl(fileName);

    return data.publicUrl;
  }

  async function createMemorial() {
    if (!name.trim()) {
      setMessage("Please enter the full name.");
      return;
    }

    if (!user) {
      setMessage("Please login first.");
      return;
    }

    setSaving(true);
    setMessage("");

    try {
      const imageUrl = await uploadImage();

      const { data, error } = await supabase
        .from("memorials")
        .insert([
          {
            name,
            birth_date: birthDate,
            death_date: deathDate,
            category,
            relationship,
            tribute,
            story,
            image_url: imageUrl,
            user_id: user.id,
          },
        ])
        .select()
        .single();

      if (error || !data) {
        setMessage("Something went wrong.");
        setSaving(false);
        return;
      }

      setMessage("Memorial created successfully. Opening memorial...");

      router.push(`/memorials/${data.id}`);
    } catch (error) {
      setMessage("Image upload failed.");
      setSaving(false);
    }
  }

  if (checkingAuth) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-stone-50">
        <p className="text-stone-500">Loading...</p>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="min-h-screen bg-stone-50 text-stone-900">
        <section className="flex min-h-screen items-center justify-center px-5">
          <div className="w-full max-w-xl rounded-3xl border border-stone-100 bg-white p-8 text-center shadow-sm">
            <p className="mb-4 text-xs uppercase tracking-[0.25em] text-stone-400">
              Family Access Required
            </p>

            <h1 className="mb-5 font-serif text-4xl text-stone-900">
              Login Required
            </h1>

            <p className="mb-8 text-sm font-light leading-relaxed text-stone-500">
              Creating memorials, editing information, uploading media, and
              managing family remembrance spaces requires a secure account.
            </p>

            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/login"
                className="rounded-full bg-stone-900 px-7 py-3 text-sm font-medium text-white"
              >
                Login
              </Link>

              <Link
                href="/signup"
                className="rounded-full border border-stone-200 bg-white px-7 py-3 text-sm font-medium text-stone-700"
              >
                Create Account
              </Link>
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-stone-50 text-stone-900">
      <section className="border-b border-stone-100 bg-white px-5 py-14 text-center sm:px-6 sm:py-16">
        <p className="mb-4 text-xs uppercase tracking-[0.25em] text-stone-400">
          Begin a Memorial
        </p>

        <h1 className="mb-5 font-serif text-4xl leading-tight text-stone-900 md:text-5xl">
          Add Loved One
        </h1>

        <p className="mx-auto max-w-2xl text-sm font-light leading-relaxed text-stone-500 md:text-base">
          Create a dignified remembrance page with memory, story, family, and
          legacy preserved with care.
        </p>
      </section>

      <section className="px-5 py-12 sm:px-6 sm:py-16">
        <div className="mx-auto max-w-4xl rounded-3xl border border-stone-100 bg-white p-6 shadow-sm sm:p-8 md:p-10">
          <div className="space-y-7">
            <div>
              <label className="mb-3 block text-xs uppercase tracking-[0.15em] text-stone-400">
                Full Name
              </label>

              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-2xl border border-stone-100 bg-stone-50 px-5 py-4 text-sm outline-none"
              />
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <input
                type="date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                className="w-full rounded-2xl border border-stone-100 bg-stone-50 px-5 py-4 text-sm outline-none"
              />

              <input
                type="date"
                value={deathDate}
                onChange={(e) => setDeathDate(e.target.value)}
                className="w-full rounded-2xl border border-stone-100 bg-stone-50 px-5 py-4 text-sm outline-none"
              />
            </div>

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full rounded-2xl border border-stone-100 bg-stone-50 px-5 py-4 text-sm outline-none"
            >
              <option>Loved Ones</option>
              <option>Historical Figures</option>
              <option>Community Tributes</option>
              <option>Children Remembered</option>
              <option>Veterans & Defenders</option>
              <option>Faith Leaders</option>
              <option>Artists & Cultural Figures</option>
            </select>

            <input
              value={relationship}
              onChange={(e) => setRelationship(e.target.value)}
              placeholder="Relationship"
              className="w-full rounded-2xl border border-stone-100 bg-stone-50 px-5 py-4 text-sm outline-none"
            />

            <input
              value={tribute}
              onChange={(e) => setTribute(e.target.value)}
              placeholder="Tribute"
              className="w-full rounded-2xl border border-stone-100 bg-stone-50 px-5 py-4 text-sm outline-none"
            />

            <textarea
              rows="7"
              value={story}
              onChange={(e) => setStory(e.target.value)}
              placeholder="Life story..."
              className="w-full rounded-2xl border border-stone-100 bg-stone-50 px-5 py-4 text-sm outline-none"
            />

            <div>
              <label className="inline-block cursor-pointer rounded-xl border border-stone-200 px-6 py-3 text-sm text-stone-700">
                Upload Photo

                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            </div>

            {imagePreview && (
              <div className="overflow-hidden rounded-3xl">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="h-80 w-full object-cover object-top"
                />
              </div>
            )}

            {message && (
              <p className="rounded-2xl bg-stone-50 p-4 text-sm text-stone-600">
                {message}
              </p>
            )}

            <button
              type="button"
              onClick={createMemorial}
              disabled={saving}
              className="rounded-full bg-stone-900 px-8 py-3.5 text-sm font-medium text-white disabled:opacity-60"
            >
              {saving ? "Creating..." : "Create Memorial"}
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}