"use client";

import { useEffect, useRef, useState } from "react";
import { supabase } from "@/lib/supabase";

const FREE_VOICE_LIMIT = 5;

export default function VoiceRemembranceSection({ wallId }) {
  const [audioFile, setAudioFile] = useState(null);
  const [audioPreview, setAudioPreview] = useState("");
  const [voiceNotes, setVoiceNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  const [recording, setRecording] = useState(false);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);

  useEffect(() => {
    fetchVoiceNotes();
  }, [wallId]);

  async function fetchVoiceNotes() {
    if (!wallId) return;

    const { data } = await supabase
      .from("family_voice_notes")
      .select("*")
      .eq("wall_id", wallId)
      .order("created_at", { ascending: false });

    setVoiceNotes(data || []);
  }

  function handleAudioChange(event) {
    const file = event.target.files?.[0];
    if (!file) return;

    setAudioFile(file);
    setAudioPreview(URL.createObjectURL(file));
    setMessage("");
  }

  async function startRecording() {
    if (voiceNotes.length >= FREE_VOICE_LIMIT) {
      setMessage("Free family walls allow up to 5 voice remembrances.");
      return;
    }

    setMessage("");

    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

    const recorder = new MediaRecorder(stream);
    mediaRecorderRef.current = recorder;
    chunksRef.current = [];

    recorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        chunksRef.current.push(event.data);
      }
    };

    recorder.onstop = () => {
      const blob = new Blob(chunksRef.current, { type: "audio/webm" });
      const file = new File([blob], `voice-${Date.now()}.webm`, {
        type: "audio/webm",
      });

      setAudioFile(file);
      setAudioPreview(URL.createObjectURL(blob));

      stream.getTracks().forEach((track) => track.stop());
    };

    recorder.start();
    setRecording(true);
  }

  function stopRecording() {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setRecording(false);
    }
  }

  async function uploadVoice() {
    if (voiceNotes.length >= FREE_VOICE_LIMIT) {
      setMessage("Free family walls allow up to 5 voice remembrances.");
      return;
    }

    if (!audioFile || !wallId) {
      setMessage("Please choose or record an audio file first.");
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

    const fileExt = audioFile.name.split(".").pop() || "webm";
    const fileName = `${wallId}-${Date.now()}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from("family-voice")
      .upload(fileName, audioFile);

    if (uploadError) {
      setMessage("Voice upload failed.");
      setUploading(false);
      return;
    }

    const { data: publicUrlData } = supabase.storage
      .from("family-voice")
      .getPublicUrl(fileName);

    const uploadedUrl = publicUrlData.publicUrl;

    const { data, error: insertError } = await supabase
      .from("family_voice_notes")
      .insert([
        {
          wall_id: wallId,
          user_id: user.id,
          audio_url: uploadedUrl,
          storage_path: fileName,
          title: title || "Voice Remembrance",
        },
      ])
      .select()
      .single();

    if (insertError) {
      setMessage("Voice saved to storage, but could not be listed.");
      setUploading(false);
      return;
    }

    setVoiceNotes((prev) => [data, ...prev]);
    setAudioFile(null);
    setAudioPreview("");
    setTitle("");
    setMessage("Voice remembrance uploaded successfully.");
    setUploading(false);
  }

  async function deleteVoice(note) {
    const confirmed = confirm("Delete this voice remembrance?");
    if (!confirmed) return;

    if (note.storage_path) {
      await supabase.storage.from("family-voice").remove([note.storage_path]);
    }

    const { error } = await supabase
      .from("family_voice_notes")
      .delete()
      .eq("id", note.id);

    if (!error) {
      setVoiceNotes((prev) => prev.filter((item) => item.id !== note.id));
    }
  }

  return (
    <div className="mt-8 rounded-3xl border border-stone-100 bg-stone-50 p-5">
      <h3 className="mb-3 font-serif text-xl text-stone-800">
        Voice Remembrance
      </h3>

      <p className="mb-2 text-sm leading-relaxed text-stone-500">
        Record or upload a private voice tribute, prayer, speech, or remembered
        message for the family wall.
      </p>

      <p className="mb-5 text-xs uppercase tracking-[0.2em] text-stone-400">
        {voiceNotes.length}/{FREE_VOICE_LIMIT} free voice notes used
      </p>

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title, e.g. Dad's prayer, funeral speech"
        className="mb-4 w-full rounded-2xl border border-stone-200 bg-white px-5 py-4 text-sm outline-none"
      />

      <div className="mb-4 flex flex-wrap gap-3">
        {!recording ? (
          <button
            onClick={startRecording}
            className="rounded-full bg-stone-900 px-6 py-3 text-sm font-medium text-white"
          >
            Start Recording
          </button>
        ) : (
          <button
            onClick={stopRecording}
            className="rounded-full bg-red-600 px-6 py-3 text-sm font-medium text-white"
          >
            Stop Recording
          </button>
        )}

        <label className="cursor-pointer rounded-full border border-stone-200 bg-white px-6 py-3 text-sm text-stone-700">
          Choose Audio
          <input
            type="file"
            accept="audio/*"
            onChange={handleAudioChange}
            className="hidden"
          />
        </label>
      </div>

      {audioPreview && (
        <audio controls className="mb-4 w-full">
          <source src={audioPreview} />
        </audio>
      )}

      {message && <p className="mb-4 text-sm text-stone-500">{message}</p>}

      <button
        onClick={uploadVoice}
        disabled={uploading}
        className="rounded-full bg-stone-900 px-6 py-3 text-sm font-medium text-white disabled:opacity-60"
      >
        {uploading ? "Uploading..." : "Upload Voice"}
      </button>

      <div className="mt-8 space-y-4">
        {voiceNotes.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-stone-200 bg-white p-6 text-center text-sm text-stone-400">
            No voice remembrances uploaded yet.
          </div>
        ) : (
          voiceNotes.map((note) => (
            <div
              key={note.id}
              className="rounded-2xl border border-stone-100 bg-white p-5"
            >
              <p className="mb-3 font-serif text-lg text-stone-800">
                {note.title || "Voice Remembrance"}
              </p>

              <audio controls className="w-full">
                <source src={note.audio_url} />
              </audio>

              <div className="mt-4 flex items-center justify-between gap-4">
                <p className="text-xs text-stone-400">
                  {new Date(note.created_at).toLocaleDateString()}
                </p>

                <button
                  onClick={() => deleteVoice(note)}
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