"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function ReportButton({ contentType, contentId, pageUrl }) {
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState("");
  const [details, setDetails] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function submitReport() {
    setMessage("");

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setMessage("Please login to submit a report.");
      return;
    }

    if (!reason) {
      setMessage("Please select a reason.");
      return;
    }

    setSubmitting(true);

    const { error } = await supabase.from("reports").insert([
      {
        reporter_id: user.id,
        content_type: contentType,
        content_id: String(contentId),
        reason,
        details: details.trim(),
        status: "pending",
        page_url:
          pageUrl ||
          (typeof window !== "undefined" ? window.location.pathname : ""),
      },
    ]);

    if (error) {
      setMessage(error.message || "Unable to submit report.");
      setSubmitting(false);
      return;
    }

    setMessage("Thank you. Your report has been submitted for review.");
    setReason("");
    setDetails("");
    setSubmitting(false);

    setTimeout(() => {
      setOpen(false);
      setMessage("");
    }, 1800);
  }

  return (
    <div className="mt-5">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="text-xs text-stone-400 underline underline-offset-4 transition hover:text-stone-700"
      >
        {open ? "Close report" : "Report"}
      </button>

      {open && (
        <div className="mt-4 rounded-2xl border border-stone-100 bg-stone-50 p-4">
          <p className="mb-3 text-sm font-medium text-stone-700">
            Report this content
          </p>

          <select
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="mb-3 w-full rounded-2xl border border-stone-200 bg-white px-4 py-3 text-sm outline-none"
          >
            <option value="">Select reason</option>
            <option value="False information">False information</option>
            <option value="Impersonation">Impersonation</option>
            <option value="Inappropriate content">Inappropriate content</option>
            <option value="Harassment or abuse">Harassment or abuse</option>
            <option value="Spam">Spam</option>
            <option value="Privacy concern">Privacy concern</option>
            <option value="Other">Other</option>
          </select>

          <textarea
            rows="3"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            placeholder="Optional: add details for review"
            className="w-full rounded-2xl border border-stone-200 bg-white px-4 py-3 text-sm outline-none"
          />

          {message && (
            <p className="mt-3 rounded-2xl bg-white p-3 text-sm text-stone-600">
              {message}
            </p>
          )}

          <button
            type="button"
            onClick={submitReport}
            disabled={submitting}
            className="mt-4 rounded-full bg-stone-900 px-5 py-2.5 text-sm text-white disabled:opacity-60"
          >
            {submitting ? "Submitting..." : "Submit Report"}
          </button>
        </div>
      )}
    </div>
  );
}