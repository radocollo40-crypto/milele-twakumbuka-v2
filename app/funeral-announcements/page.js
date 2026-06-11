"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import ReportButton from "@/components/ReportButton";

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

  const [editingId, setEditingId] = useState(null);
  const [editMemorialId, setEditMemorialId] = useState("");
  const [editServiceDate, setEditServiceDate] = useState("");
  const [editServiceTime, setEditServiceTime] = useState("");
  const [editVenueName, setEditVenueName] = useState("");
  const [editLocation, setEditLocation] = useState("");
  const [editAnnouncement, setEditAnnouncement] = useState("");
  const [editContactName, setEditContactName] = useState("");
  const [editContactPhone, setEditContactPhone] = useState("");

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

  function startEdit(item) {
    setEditingId(item.id);
    setEditMemorialId(String(item.memorial_id || ""));
    setEditServiceDate(item.service_date || "");
    setEditServiceTime(item.service_time || "");
    setEditVenueName(item.venue_name || "");
    setEditLocation(item.location || "");
    setEditAnnouncement(item.announcement || "");
    setEditContactName(item.contact_name || "");
    setEditContactPhone(item.contact_phone || "");
    setMessage("");
  }

  function cancelEdit() {
    setEditingId(null);
    setEditMemorialId("");
    setEditServiceDate("");
    setEditServiceTime("");
    setEditVenueName("");
    setEditLocation("");
    setEditAnnouncement("");
    setEditContactName("");
    setEditContactPhone("");
  }

  async function saveEdit(id) {
    setMessage("");

    if (!user) {
      setMessage("Please login to edit this notice.");
      return;
    }

    if (
      !editMemorialId ||
      !editServiceDate ||
      !editVenueName.trim() ||
      !editLocation.trim()
    ) {
      setMessage("Please fill in the memorial, date, venue, and location.");
      return;
    }

    setSaving(true);

    const { error } = await supabase
      .from("funeral_announcements")
      .update({
        memorial_id: Number(editMemorialId),
        service_date: editServiceDate,
        service_time: editServiceTime.trim(),
        venue_name: editVenueName.trim(),
        location: editLocation.trim(),
        announcement: editAnnouncement.trim(),
        contact_name: editContactName.trim(),
        contact_phone: editContactPhone.trim(),
      })
      .eq("id", id)
      .eq("user_id", user.id);

    if (error) {
      setMessage(error.message || "Unable to update notice.");
      setSaving(false);
      return;
    }

    setMessage("Funeral notice updated successfully.");
    cancelEdit();
    await loadPage();
    setSaving(false);
  }

  async function deleteAnnouncement(id) {
    if (!user) return;

    const confirmDelete = window.confirm(
      "Delete this funeral notice? This cannot be undone."
    );

    if (!confirmDelete) return;

    const { error } = await supabase
      .from("funeral_announcements")
      .delete()
      .eq("id", id)
      .eq("user_id", user.id);

    if (error) {
      setMessage(error.message || "Unable to delete notice.");
      return;
    }

    setMessage("Funeral notice deleted.");
    await loadPage();
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
              <InputSelect
                label="Memorial"
                value={memorialId}
                onChange={setMemorialId}
                memorials={memorials}
              />

              <InputField
                label="Service Date"
                type="date"
                value={serviceDate}
                onChange={setServiceDate}
              />

              <InputField
                label="Service Time"
                value={serviceTime}
                onChange={setServiceTime}
                placeholder="Example: 10:00 AM"
              />

              <InputField
                label="Venue Name"
                value={venueName}
                onChange={setVenueName}
                placeholder="Example: All Saints Cathedral"
              />

              <InputField
                label="Location"
                value={location}
                onChange={setLocation}
                placeholder="Example: Nairobi, Kenya"
                full
              />

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

              <InputField
                label="Contact Name"
                value={contactName}
                onChange={setContactName}
                placeholder="Optional"
              />

              <InputField
                label="Contact Phone"
                value={contactPhone}
                onChange={setContactPhone}
                placeholder="Optional"
              />
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

        {message && !showForm && (
          <p className="mb-6 rounded-2xl bg-white p-4 text-sm text-stone-600 shadow-sm">
            {message}
          </p>
        )}

        <section>
          <h2 className="mb-6 font-serif text-2xl text-stone-800">
            Upcoming Funeral & Memorial Services
          </h2>

          {announcements.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-stone-200 bg-white p-10 text-center">
              <p className="mb-3 text-4xl">🕊️</p>
              <h3 className="mb-3 font-serif text-2xl text-stone-800">
                No notices yet
              </h3>
              <p className="text-sm text-stone-500">
                Funeral and memorial service notices will appear here.
              </p>
            </div>
          ) : (
            <div className="grid gap-5 md:grid-cols-2">
              {announcements.map((item) => {
                const isOwner = user?.id === item.user_id;
                const isEditing = editingId === item.id;

                return (
                  <article
                    key={item.id}
                    className="rounded-3xl border border-stone-100 bg-white p-6 shadow-sm"
                  >
                    {isEditing ? (
                      <div className="space-y-5">
                        <InputSelect
                          label="Memorial"
                          value={editMemorialId}
                          onChange={setEditMemorialId}
                          memorials={memorials}
                        />

                        <InputField
                          label="Service Date"
                          type="date"
                          value={editServiceDate}
                          onChange={setEditServiceDate}
                        />

                        <InputField
                          label="Service Time"
                          value={editServiceTime}
                          onChange={setEditServiceTime}
                        />

                        <InputField
                          label="Venue Name"
                          value={editVenueName}
                          onChange={setEditVenueName}
                        />

                        <InputField
                          label="Location"
                          value={editLocation}
                          onChange={setEditLocation}
                        />

                        <div>
                          <label className="mb-2 block text-sm text-stone-500">
                            Family Message
                          </label>

                          <textarea
                            rows="4"
                            value={editAnnouncement}
                            onChange={(e) =>
                              setEditAnnouncement(e.target.value)
                            }
                            className="w-full rounded-2xl border border-stone-200 px-5 py-4 text-sm outline-none"
                          />
                        </div>

                        <InputField
                          label="Contact Name"
                          value={editContactName}
                          onChange={setEditContactName}
                        />

                        <InputField
                          label="Contact Phone"
                          value={editContactPhone}
                          onChange={setEditContactPhone}
                        />

                        <div className="flex flex-wrap gap-2">
                          <button
                            onClick={() => saveEdit(item.id)}
                            disabled={saving}
                            className="rounded-full bg-stone-900 px-5 py-2.5 text-sm text-white disabled:opacity-60"
                          >
                            {saving ? "Saving..." : "Save Changes"}
                          </button>

                          <button
                            onClick={cancelEdit}
                            className="rounded-full border border-stone-200 bg-white px-5 py-2.5 text-sm text-stone-600"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <>
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

                        <div className="mt-5 flex flex-wrap items-center gap-3">
                          <Link
                            href={`/memorials/${item.memorial_id}`}
                            className="text-sm text-stone-500 underline underline-offset-4"
                          >
                            View memorial
                          </Link>

                          {isOwner && (
                            <>
                              <button
                                onClick={() => startEdit(item)}
                                className="text-sm text-stone-500 underline underline-offset-4"
                              >
                                Edit
                              </button>

                              <button
                                onClick={() => deleteAnnouncement(item.id)}
                                className="text-sm text-red-500 underline underline-offset-4"
                              >
                                Delete
                              </button>
                            </>
                          )}
                        </div>

                        <ReportButton
                          contentType="funeral_notice"
                          contentId={item.id}
                          pageUrl={`/funeral-announcements`}
                        />
                      </>
                    )}
                  </article>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

function InputField({
  label,
  value,
  onChange,
  type = "text",
  placeholder = "",
  full = false,
}) {
  return (
    <div className={full ? "md:col-span-2" : ""}>
      <label className="mb-2 block text-sm text-stone-500">{label}</label>

      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-stone-200 px-5 py-4 text-sm outline-none"
      />
    </div>
  );
}

function InputSelect({ label, value, onChange, memorials }) {
  return (
    <div>
      <label className="mb-2 block text-sm text-stone-500">{label}</label>

      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
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
  );
}