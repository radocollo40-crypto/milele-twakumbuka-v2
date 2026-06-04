"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

const FREE_PHOTO_LIMIT = 10;

export default function FamilyPhotoGallerySection({ wallId }) {
  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState("");
  const [photos, setPhotos] = useState([]);
  const [title, setTitle] = useState("");
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchPhotos();
  }, [wallId]);

  async function fetchPhotos() {
    if (!wallId) return;

    const { data } = await supabase
      .from("family_photos")
      .select("*")
      .eq("wall_id", wallId)
      .order("created_at", { ascending: false });

    setPhotos(data || []);
  }

  function handlePhotoChange(event) {
    const file = event.target.files?.[0];

    if (!file) return;

    setPhotoFile(file);
    setPhotoPreview(URL.createObjectURL(file));
    setMessage("");
  }

  async function uploadPhoto() {
    if (photos.length >= FREE_PHOTO_LIMIT) {
      setMessage("Free family walls allow up to 10 private photos.");
      return;
    }

    if (!photoFile || !wallId) {
      setMessage("Please choose a photo first.");
      return;
    }

    setUploading(true);
    setMessage("");

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setMessage("Please login first.");
      setUploading(false);
      return;
    }

    const fileExt = photoFile.name.split(".").pop();
    const fileName = `${wallId}-${Date.now()}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from("family-photos")
      .upload(fileName, photoFile);

    if (uploadError) {
      setMessage("Photo upload failed.");
      setUploading(false);
      return;
    }

    const { data: publicUrlData } = supabase.storage
      .from("family-photos")
      .getPublicUrl(fileName);

    const uploadedUrl = publicUrlData.publicUrl;

    const { data, error: insertError } = await supabase
      .from("family_photos")
      .insert([
        {
          wall_id: wallId,
          user_id: user.id,
          image_url: uploadedUrl,
          storage_path: fileName,
          title: title || "Family Memory",
        },
      ])
      .select()
      .single();

    if (insertError) {
      setMessage("Photo saved to storage, but could not be listed.");
      setUploading(false);
      return;
    }

    setPhotos((prev) => [data, ...prev]);
    setPhotoFile(null);
    setPhotoPreview("");
    setTitle("");
    setMessage("Family photo uploaded successfully.");
    setUploading(false);
  }

  async function deletePhoto(photo) {
    const confirmed = confirm("Delete this family photo?");
    if (!confirmed) return;

    if (photo.storage_path) {
      await supabase.storage
        .from("family-photos")
        .remove([photo.storage_path]);
    }

    const { error } = await supabase
      .from("family_photos")
      .delete()
      .eq("id", photo.id);

    if (!error) {
      setPhotos((prev) =>
        prev.filter((item) => item.id !== photo.id)
      );
    }
  }

  return (
    <div className="mt-8 rounded-3xl border border-stone-100 bg-stone-50 p-5">
      <h3 className="mb-3 font-serif text-xl text-stone-800">
        Private Family Photos
      </h3>

      <p className="mb-2 text-sm leading-relaxed text-stone-500">
        Upload private family photos connected to this memorial wall.
      </p>

      <p className="mb-5 text-xs uppercase tracking-[0.2em] text-stone-400">
        {photos.length}/{FREE_PHOTO_LIMIT} free photos used
      </p>

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Photo title, e.g. Family gathering"
        className="mb-4 w-full rounded-2xl border border-stone-200 bg-white px-5 py-4 text-sm outline-none"
      />

      <label className="mb-4 inline-block cursor-pointer rounded-full border border-stone-200 bg-white px-6 py-3 text-sm text-stone-700">
        Choose Photo
        <input
          type="file"
          accept="image/*"
          onChange={handlePhotoChange}
          className="hidden"
        />
      </label>

      {photoPreview && (
        <div className="mb-4 overflow-hidden rounded-2xl border border-stone-100 bg-white">
          <img
            src={photoPreview}
            alt="Photo preview"
            className="h-72 w-full object-cover object-top"
          />
        </div>
      )}

      {message && (
        <p className="mb-4 text-sm text-stone-500">
          {message}
        </p>
      )}

      <button
        onClick={uploadPhoto}
        disabled={uploading}
        className="rounded-full bg-stone-900 px-6 py-3 text-sm font-medium text-white disabled:opacity-60"
      >
        {uploading ? "Uploading..." : "Upload Photo"}
      </button>

      <div className="mt-8">
        {photos.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-stone-200 bg-white p-6 text-center text-sm text-stone-400">
            No private family photos uploaded yet.
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2">
            {photos.map((photo) => (
              <div
                key={photo.id}
                className="overflow-hidden rounded-2xl border border-stone-100 bg-white"
              >
                <img
                  src={photo.image_url}
                  alt={photo.title || "Family photo"}
                  className="h-60 w-full object-cover object-top"
                />

                <div className="p-5">
                  <p className="mb-2 font-serif text-lg text-stone-800">
                    {photo.title || "Family Memory"}
                  </p>

                  <p className="mb-4 text-xs text-stone-400">
                    {new Date(photo.created_at).toLocaleDateString()}
                  </p>

                  <button
                    onClick={() => deletePhoto(photo)}
                    className="rounded-full bg-red-600 px-4 py-2 text-xs text-white"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}