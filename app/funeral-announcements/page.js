"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function FuneralAnnouncementsPage() {
  const [user, setUser] = useState(null);
  const [memorials, setMemorials] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const [memorialId, setMemorialId] = useState("");
  const [serviceDate, setServiceDate] = useState("");
  const [serviceTime, setServiceTime] = useState("");
  const [venueName, setVenueName] = useState("");
  const [location, setLocation] = useState("");
  const [announcement, setAnnouncement] = useState("");
  const [contactName, setContactName] = useState("");
  const [contactPhone, setContactPhone] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    loadPage();
  }, []);

  async function loadPage() {
    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    setUser(user || null);

    const { data: memorialRows } = await supabase
      .from("memorials")
      .select("id, name")
      .order("created_at", { ascending: false });

    setMemorials(memorialRows || []);

    const { data: announcementRows } = await supabase
      .from("funeral_announcements")
      .select("*")
      .order("service_date", { ascending: true });

    setAnnouncements(announcementRows || []);
    setLoading(false);
  }

  async function createAnnouncement() {
    setMessage("");

    if (!user) {
      setMessage("Please login to create a funeral notice.");
      return;
    }

    if (!memorialId || !serviceDate || !venueName.trim() || !location.trim()) {
      setMessage("Please fill in the memorial, date, venue, and location.");
      return;
    }

    setSaving(true);

    const { error } = await supabase.from("funeral_announcements").insert([
      {
        memorial_id: Number(memorialId),
        user_id: user.id,
        service_date: serviceDate,
        service_time: serviceTime.trim(),
        venue_name: venueName.trim(),
        location: location.trim(),
        announcement: announcement.trim(),
        contact_name: contactName.trim(),
        contact_phone: contactPhone.trim(),
      },
    ]);

    if (error) {
      setMessage(error.message || "Unable to save notice.");
      setSaving(false);
      return;
    }

    setMessage("Funeral notice created successfully.");
    setMemorialId("");
    setServiceDate("");
    setServiceTime("");
    setVenueName("");
    setLocation("");
    setAnnouncement("");
    setContactName("");
    setContactPhone("");
    setShowForm(false);

    await loadPage();
    setSaving(false);
  }

  function getMemorialName(id) {
    const memorial = memorials.find((item) => item.id === id);
    return memorial?.name || "Memorial";
  }

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-stone-50">
        <p className="text-stone-500">Loading funeral notices...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-stone-50 px-5 py-14 text-stone-900">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-3 text-xs uppercase tracking-[0.25em] text-stone-400">
              Funeral Notices
            </p>

            <h1 className="font-serif text-4xl text-stone-900">
              Service & Burial Notices
            </h1>

            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-stone-500">
              A respectful notice board for funeral services, burial details,
              memorial gatherings, and family announcements.
            </p>
          </div>

          <button
            onClick={() => setShowForm((prev) => !prev)}
            className="rounded-full bg-stone-900 px-7 py-3 text-sm font-medium text-white"
          >
            {showForm ? "Close Form" : "Create Notice"}
          </button>
        </div>

        {showForm && (
          <section className="mb-12 rounded-3xl border border-stone-100 bg-white p-7 shadow-sm">
            <h2 className="mb-2 font-serif text-2xl text-stone-800">
              Create Funeral Notice
            </h2>

            <p className="mb-7 text-sm leading-relaxed text-stone-500">
              Add clear service details connected to an existing memorial.
            </p>

            {!user && (
              <div className="mb-6 rounded-2xl bg-stone-50 p-4 text-sm text-stone-600">
                Please{" "}
                <Link href="/login" className="underline underline-offset-4">
                  login
                </Link>{" "}
                to create a funeral notice.
              </div>
            )}

            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm text-stone-500">
                  Memorial
                </label>

                <select
                  value={memorialId}
                  onChange={(e) => setMemorialId(e.target.value)}
                  className="w-full rounded-2xl border border-stone-200 bg-white px-5 py-4 text-sm outline-none"
                >
                  <option value="">Select memorial</option>

                  {memorials.map((memorial) => (
                    <option key={memorial.id} value={memorial.id}>
                      {memorial.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm text-stone-500">
                  Service Date
                </label>

                <input
                  type="date"
                  value={serviceDate}
                  onChange={(e) => setServiceDate(e.target.value)}
                  className="w-full rounded-2xl border border-stone-200 px-5 py-4 text-sm outline-none"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-stone-500">
                  Service Time
                </label>

                <input
                  value={serviceTime}
                  onChange={(e) => setServiceTime(e.target.value)}
                  placeholder="Example: 10:00 AM"
                  className="w-full rounded-2xl border border-stone-200 px-5 py-4 text-sm outline-none"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-stone-500">
                  Venue Name
                </label>

                <input
                  value={venueName}
                  onChange={(e) => setVenueName(e.target.value)}
                  placeholder="Example: All Saints Cathedral"
                  className="w-full rounded-2xl border border-stone-200 px-5 py-4 text-sm outline-none"
                />
              </div>

              <div className="md:col-span-2">
                <label className="mb-2 block text-sm text-stone-500">
                  Location
                </label>

                <input
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Example: Nairobi, Kenya"
                  className="w-full rounded-2xl border border-stone-200 px-5 py-4 text-sm outline-none"
                />
              </div>

              <div className="md:col-span-2">
                <label className="mb-2 block text-sm text-stone-500">
                  Family Message
                </label>

                <textarea
                  rows="5"
                  value={announcement}
                  onChange={(e) => setAnnouncement(e.target.value)}
                  placeholder="Write a short respectful announcement..."
                  className="w-full rounded-2xl border border-stone-200 px-5 py-4 text-sm outline-none"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-stone-500">
                  Contact Name
                </label>

                <input
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  placeholder="Optional"
                  className="w-full rounded-2xl border border-stone-200 px-5 py-4 text-sm outline-none"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-stone-500">
                  Contact Phone
                </label>

                <input
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  placeholder="Optional"
                  className="w-full rounded-2xl border border-stone-200 px-5 py-4 text-sm outline-none"
                />
              </div>
            </div>

            {message && (
              <p className="mt-5 rounded-2xl bg-stone-50 p-4 text-sm text-stone-600">
                {message}
              </p>
            )}

            <button
              onClick={createAnnouncement}
              disabled={saving || !user}
              className="mt-6 rounded-full bg-stone-900 px-7 py-3 text-sm font-medium text-white disabled:opacity-60"
            >
              {saving ? "Saving..." : "Create Notice"}
            </button>
          </section>
        )}

        <section>
          <h2 className="mb-6 font-serif text-2xl text-stone-800">
            Upcoming Announcements
          </h2>

          {announcements.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-stone-200 bg-white p-10 text-center">
              <p className="mb-3 text-4xl">🕊️</p>
              <h3 className="mb-3 font-serif text-2xl text-stone-800">
                No announcements yet
              </h3>
              <p className="text-sm text-stone-500">
                Funeral and memorial service notices will appear here.
              </p>
            </div>
          ) : (
            <div className="grid gap-5 md:grid-cols-2">
              {announcements.map((item) => (
                <article
                  key={item.id}
                  className="rounded-3xl border border-stone-100 bg-white p-6 shadow-sm"
                >
                  <p className="mb-3 text-xs uppercase tracking-[0.25em] text-stone-400">
                    {new Date(item.service_date).toLocaleDateString()}
                    {item.service_time ? ` · ${item.service_time}` : ""}
                  </p>

                  <h3 className="font-serif text-2xl text-stone-900">
                    {getMemorialName(item.memorial_id)}
                  </h3>

                  <p className="mt-2 text-sm text-stone-500">
                    {item.venue_name}
                  </p>

                  <p className="mt-1 text-sm text-stone-500">
                    {item.location}
                  </p>

                  {item.announcement && (
                    <p className="mt-5 whitespace-pre-wrap text-sm leading-relaxed text-stone-600">
                      {item.announcement}
                    </p>
                  )}

                  {(item.contact_name || item.contact_phone) && (
                    <div className="mt-5 rounded-2xl bg-stone-50 p-4 text-sm text-stone-500">
                      {item.contact_name && <p>{item.contact_name}</p>}
                      {item.contact_phone && <p>{item.contact_phone}</p>}
                    </div>
                  )}

                  <Link
                    href={`/memorials/${item.memorial_id}`}
                    className="mt-5 inline-block text-sm text-stone-500 underline underline-offset-4"
                  >
                    View memorial
                  </Link>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}