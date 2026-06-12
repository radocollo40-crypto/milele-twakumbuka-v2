"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function AdminPage() {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    loadAdminPage();
  }, []);

  async function loadAdminPage() {
    setLoading(true);
    setMessage("");

    const {
      data: { user },
    } = await supabase.auth.getUser();

    setUser(user || null);

    if (!user) {
      setLoading(false);
      return;
    }

    const { data: adminRow } = await supabase
      .from("admin_users")
      .select("*")
      .eq("user_id", user.id)
      .eq("role", "admin")
      .maybeSingle();

    if (!adminRow) {
      setIsAdmin(false);
      setLoading(false);
      return;
    }

    setIsAdmin(true);

    const { data: reportRows, error } = await supabase
      .from("reports")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      setMessage(error.message || "Unable to load reports.");
      setReports([]);
    } else {
      setReports(reportRows || []);
    }

    setLoading(false);
  }

  async function updateReportStatus(reportId, status) {
    setMessage("");

    const { error } = await supabase
      .from("reports")
      .update({ status })
      .eq("id", reportId);

    if (error) {
      setMessage(error.message || "Unable to update report.");
      return;
    }

    setReports((current) =>
      current.map((report) =>
        report.id === reportId ? { ...report, status } : report
      )
    );

    setMessage(`Report marked as ${status}.`);
  }

  function getContentLink(report) {
    if (report.page_url) return report.page_url;

    if (report.content_type === "memorial") {
      return `/memorials/${report.content_id}`;
    }

    if (report.content_type === "funeral_notice") {
      return "/funeral-announcements";
    }

    return "/";
  }

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-stone-50">
        <p className="text-stone-500">Loading admin dashboard...</p>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-stone-50 px-5 text-center">
        <div className="max-w-md rounded-3xl bg-white p-8 shadow-sm">
          <h1 className="mb-4 font-serif text-3xl text-stone-900">
            Admin Login Required
          </h1>

          <p className="mb-6 text-sm text-stone-500">
            Please login with an admin account to access this dashboard.
          </p>

          <Link
            href="/login?redirect=/admin"
            className="rounded-full bg-stone-900 px-7 py-3 text-sm text-white"
          >
            Login
          </Link>
        </div>
      </main>
    );
  }

  if (!isAdmin) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-stone-50 px-5 text-center">
        <div className="max-w-md rounded-3xl bg-white p-8 shadow-sm">
          <h1 className="mb-4 font-serif text-3xl text-stone-900">
            Access Denied
          </h1>

          <p className="mb-6 text-sm text-stone-500">
            This area is only available to Milele Twakumbuka administrators.
          </p>

          <Link
            href="/"
            className="rounded-full bg-stone-900 px-7 py-3 text-sm text-white"
          >
            Back Home
          </Link>
        </div>
      </main>
    );
  }

  const pendingReports = reports.filter((report) => report.status === "pending");
  const reviewedReports = reports.filter((report) => report.status !== "pending");

  return (
    <main className="min-h-screen bg-stone-50 px-5 py-14 text-stone-900">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-3 text-xs uppercase tracking-[0.25em] text-stone-400">
              Admin Dashboard
            </p>

            <h1 className="font-serif text-4xl text-stone-900">
              Reports Review
            </h1>

            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-stone-500">
              Review reported memorials and funeral notices. Reported content
              remains visible until an admin reviews it.
            </p>
          </div>

          <Link
            href="/"
            className="rounded-full border border-stone-200 bg-white px-6 py-3 text-sm text-stone-600"
          >
            Back Home
          </Link>
        </div>

        {message && (
          <p className="mb-6 rounded-2xl bg-white p-4 text-sm text-stone-600 shadow-sm">
            {message}
          </p>
        )}

        <div className="mb-8 grid gap-4 md:grid-cols-3">
          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <p className="text-sm text-stone-400">Total Reports</p>
            <p className="mt-2 font-serif text-4xl text-stone-900">
              {reports.length}
            </p>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <p className="text-sm text-stone-400">Pending</p>
            <p className="mt-2 font-serif text-4xl text-stone-900">
              {pendingReports.length}
            </p>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <p className="text-sm text-stone-400">Reviewed</p>
            <p className="mt-2 font-serif text-4xl text-stone-900">
              {reviewedReports.length}
            </p>
          </div>
        </div>

        <section className="space-y-5">
          {reports.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-stone-200 bg-white p-10 text-center">
              <p className="mb-3 text-4xl">🕊️</p>

              <h2 className="mb-3 font-serif text-2xl text-stone-800">
                No reports yet
              </h2>

              <p className="text-sm text-stone-500">
                Submitted reports will appear here for admin review.
              </p>
            </div>
          ) : (
            reports.map((report) => (
              <article
                key={report.id}
                className="rounded-3xl border border-stone-100 bg-white p-6 shadow-sm"
              >
                <div className="mb-5 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div>
                    <p className="mb-2 text-xs uppercase tracking-[0.25em] text-stone-400">
                      {report.content_type} · Report #{report.id}
                    </p>

                    <h2 className="font-serif text-2xl text-stone-900">
                      {report.reason || "Reported content"}
                    </h2>

                    <p className="mt-2 text-xs text-stone-400">
                      Submitted:{" "}
                      {report.created_at
                        ? new Date(report.created_at).toLocaleString()
                        : "Unknown date"}
                    </p>
                  </div>

                  <span className="rounded-full bg-stone-100 px-4 py-2 text-xs uppercase tracking-[0.2em] text-stone-500">
                    {report.status || "pending"}
                  </span>
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <div className="rounded-2xl bg-stone-50 p-4">
                    <p className="mb-1 text-xs uppercase tracking-[0.2em] text-stone-400">
                      Content
                    </p>

                    <p className="text-sm text-stone-600">
                      Type: {report.content_type}
                    </p>

                    <p className="mt-1 text-sm text-stone-600">
                      ID: {report.content_id}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-stone-50 p-4">
                    <p className="mb-1 text-xs uppercase tracking-[0.2em] text-stone-400">
                      Report Details
                    </p>

                    <p className="text-sm text-stone-600">
                      {report.details || "No additional details provided."}
                    </p>
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap gap-3">
                  <Link
                    href={getContentLink(report)}
                    className="rounded-full bg-stone-900 px-5 py-2.5 text-sm text-white"
                  >
                    Open Content
                  </Link>

                  <button
                    onClick={() => updateReportStatus(report.id, "reviewed")}
                    className="rounded-full border border-stone-200 bg-white px-5 py-2.5 text-sm text-stone-600"
                  >
                    Mark Reviewed
                  </button>

                  <button
                    onClick={() => updateReportStatus(report.id, "resolved")}
                    className="rounded-full border border-stone-200 bg-white px-5 py-2.5 text-sm text-stone-600"
                  >
                    Mark Resolved
                  </button>

                  <button
                    onClick={() => updateReportStatus(report.id, "dismissed")}
                    className="rounded-full border border-stone-200 bg-white px-5 py-2.5 text-sm text-stone-600"
                  >
                    Dismiss
                  </button>
                </div>
              </article>
            ))
          )}
        </section>
      </div>
    </main>
  );
}