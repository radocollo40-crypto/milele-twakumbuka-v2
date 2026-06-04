"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

const FREE_VIDEO_LIMIT = 2;

export default function FamilyVideoSection({ wallId }) {
  const [videoFile, setVideoFile] = useState(null);
  const [videoPreview, setVideoPreview] = useState("");
  const [videos, setVideos] = useState([]);
  const [title, setTitle] = useState("");
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchVideos();
  }, [wallId]);

  async function fetchVideos() {
    if (!wallId) return;

    const { data, error } = await supabase
      .from("family_videos")
      .select("*")
      .eq("wall_id", Number(wallId))
      .order("created_at", { ascending: false });

    if (error) {
      setMessage(error.message);
      return;
    }

    setVideos(data || []);
  }

  function handleVideoChange(event) {
    const file = event.target.files?.[0];

    if (!file) return;

    setVideoFile(file);
    setVideoPreview(URL.createObjectURL(file));
    setMessage("");
  }

  async function uploadVideo() {
    if (videos.length >= FREE_VIDEO_LIMIT) {
      setMessage("Free family walls allow up to 2 private videos.");
      return;
    }

    if (!videoFile || !wallId) {
      setMessage("Please choose a video first.");
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

    const fileExt = videoFile.name.split(".").pop() || "mp4";
    const fileName = `${wallId}-${Date.now()}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from("family-videos")
      .upload(fileName, videoFile);

    if (uploadError) {
      setMessage(uploadError.message);
      setUploading(false);
      return;
    }

    const { data: publicUrlData } = supabase.storage
      .from("family-videos")
      .getPublicUrl(fileName);

    const uploadedUrl = publicUrlData.publicUrl;

    const { data, error: insertError } = await supabase
      .from("family_videos")
      .insert([
        {
          wall_id: Number(wallId),
          user_id: user.id,
          video_url: uploadedUrl,
          storage_path: fileName,
          title: title || "Family Video",
        },
      ])
      .select("*")
      .single();

    if (insertError) {
      setMessage(insertError.message);
      setUploading(false);
      return;
    }

    setVideos((prev) => [data, ...prev]);
    setVideoFile(null);
    setVideoPreview("");
    setTitle("");
    setMessage("Family video uploaded successfully.");
    setUploading(false);
  }

  async function deleteVideo(video) {
    const confirmed = confirm("Delete this family video?");
    if (!confirmed) return;

    if (video.storage_path) {
      await supabase.storage
        .from("family-videos")
        .remove([video.storage_path]);
    }

    const { error } = await supabase
      .from("family_videos")
      .delete()
      .eq("id", video.id);

    if (error) {
      setMessage(error.message);
      return;
    }

    setVideos((prev) => prev.filter((item) => item.id !== video.id));
  }

  return (
    <div className="mt-8 rounded-3xl border border-stone-100 bg-stone-50 p-5">
      <h3 className="mb-3 font-serif text-xl text-stone-800">
        Private Family Videos
      </h3>

      <p className="mb-2 text-sm leading-relaxed text-stone-500">
        Upload private remembrance videos, family clips, funeral speeches, or
        recorded memories.
      </p>

      <p className="mb-5 text-xs uppercase tracking-[0.2em] text-stone-400">
        {videos.length}/{FREE_VIDEO_LIMIT} free videos used
      </p>

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Video title, e.g. Funeral speech, family memory"
        className="mb-4 w-full rounded-2xl border border-stone-200 bg-white px-5 py-4 text-sm outline-none"
      />

      <label className="mb-4 inline-block cursor-pointer rounded-full border border-stone-200 bg-white px-6 py-3 text-sm text-stone-700">
        Choose Video
        <input
          type="file"
          accept="video/*"
          onChange={handleVideoChange}
          className="hidden"
        />
      </label>

      {videoPreview && (
        <video controls className="mb-4 w-full rounded-2xl">
          <source src={videoPreview} />
        </video>
      )}

      {message && <p className="mb-4 text-sm text-stone-500">{message}</p>}

      <button
        onClick={uploadVideo}
        disabled={uploading}
        className="rounded-full bg-stone-900 px-6 py-3 text-sm font-medium text-white disabled:opacity-60"
      >
        {uploading ? "Uploading..." : "Upload Video"}
      </button>

      <div className="mt-8 space-y-4">
        {videos.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-stone-200 bg-white p-6 text-center text-sm text-stone-400">
            No private family videos uploaded yet.
          </div>
        ) : (
          videos.map((video) => (
            <div
              key={video.id}
              className="rounded-2xl border border-stone-100 bg-white p-5"
            >
              <p className="mb-3 font-serif text-lg text-stone-800">
                {video.title || "Family Video"}
              </p>

              <video controls className="w-full rounded-2xl">
                <source src={video.video_url} />
              </video>

              <div className="mt-4 flex items-center justify-between gap-4">
                <p className="text-xs text-stone-400">
                  {new Date(video.created_at).toLocaleDateString()}
                </p>

                <button
                  onClick={() => deleteVideo(video)}
                  className="rounded-full bg-red-600 px-4 py-2 text-xs text-white"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}