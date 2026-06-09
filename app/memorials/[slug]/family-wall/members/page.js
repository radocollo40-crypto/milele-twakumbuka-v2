"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function FamilyWallMembersPage() {
  const { slug } = useParams();

  const [user, setUser] = useState(null);
  const [wall, setWall] = useState(null);
  const [myRole, setMyRole] = useState("member");
  const [hasAccess, setHasAccess] = useState(false);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const canManage = myRole === "owner" || myRole === "admin";

  useEffect(() => {
    loadPage();
  }, [slug]);

  async function loadPage() {
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

    const { data: walls } = await supabase
      .from("family_walls")
      .select("*")
      .eq("memorial_id", Number(slug))
      .limit(1);

    const currentWall = walls?.[0] || null;
    setWall(currentWall);

    if (!currentWall) {
      setMessage("Family wall not found.");
      setLoading(false);
      return;
    }

    let role = "member";
    let allowed = false;

    if (currentWall.owner_id === user.id) {
      role = "owner";
      allowed = true;
    } else {
      const { data: membership } = await supabase
        .from("family_wall_members")
        .select("role, status")
        .eq("wall_id", currentWall.id)
        .eq("user_id", user.id)
        .maybeSingle();

      if (membership) {
        role = membership.role || "member";
        allowed = true;
      }
    }

    setMyRole(role);
    setHasAccess(allowed);

    if (!allowed) {
      setLoading(false);
      return;
    }

    await loadMembers(currentWall.id, currentWall.owner_id);
    setLoading(false);
  }

  async function loadMembers(wallId, ownerId) {
    const { data: memberRows, error } = await supabase
      .from("family_wall_members")
      .select("*")
      .eq("wall_id", wallId)
      .order("created_at", { ascending: true });

    if (error) {
      setMessage(error.message || "Unable to load members.");
      setMembers([]);
      return;
    }

    const userIds = (memberRows || [])
      .map((member) => member.user_id)
      .filter(Boolean);

    const uniqueUserIds = Array.from(new Set(userIds));

    let profiles = [];

    if (uniqueUserIds.length > 0) {
      const { data: profileRows } = await supabase
        .from("profiles")
        .select("id, full_name, email")
        .in("id", uniqueUserIds);

      profiles = profileRows || [];
    }

    const profileMap = new Map(profiles.map((p) => [p.id, p]));

    const cleanedMembers = (memberRows || []).map((member) => {
      const profile = profileMap.get(member.user_id);

      return {
        ...member,
        full_name: profile?.full_name || member.invited_email || "Family Member",
        email: profile?.email || member.invited_email || "",
        display_role:
          member.user_id === ownerId ? "owner" : member.role || "member",
      };
    });

    setMembers(cleanedMembers);
  }

  async function promoteToAdmin(member) {
    if (!canManage || !wall || !hasAccess) return;

    setMessage("");

    const { error } = await supabase
      .from("family_wall_members")
      .update({ role: "admin" })
      .eq("id", member.id);

    if (error) {
      setMessage(error.message || "Unable to promote member.");
      return;
    }

    await loadMembers(wall.id, wall.owner_id);
  }

  async function demoteToMember(member) {
    if (!canManage || !wall || !hasAccess) return;

    setMessage("");

    const { error } = await supabase
      .from("family_wall_members")
      .update({ role: "member" })
      .eq("id", member.id);

    if (error) {
      setMessage(error.message || "Unable to update role.");
      return;
    }

    await loadMembers(wall.id, wall.owner_id);
  }

  async function removeMember(member) {
    if (!canManage || !wall || !hasAccess) return;

    if (member.user_id === wall.owner_id) {
      setMessage("The wall owner cannot be removed.");
      return;
    }

    const confirmRemove = window.confirm(
      `Remove ${member.full_name} from this family wall?`
    );

    if (!confirmRemove) return;

    setMessage("");

    const { error } = await supabase
      .from("family_wall_members")
      .delete()
      .eq("id", member.id);

    if (error) {
      setMessage(error.message || "Unable to remove member.");
      return;
    }

    await loadMembers(wall.id, wall.owner_id);
  }

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-stone-50">
        <p className="text-stone-500">Loading family members...</p>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-stone-50 px-5 text-center">
        <div className="max-w-md rounded-3xl bg-white p-8 shadow-sm">
          <h1 className="mb-4 font-serif text-3xl">Login Required</h1>

          <p className="mb-6 text-sm text-stone-500">
            Please login to manage family wall members.
          </p>

          <Link
            href={`/login?redirect=/memorials/${slug}/family-wall/members`}
            className="rounded-full bg-stone-900 px-7 py-3 text-sm text-white"
          >
            Login
          </Link>
        </div>
      </main>
    );
  }

  if (!hasAccess) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-stone-50 px-5 text-center">
        <div className="max-w-md rounded-3xl bg-white p-8 shadow-sm">
          <p className="mb-4 text-xs uppercase tracking-[0.25em] text-stone-400">
            Private Family Wall
          </p>

          <h1 className="mb-4 font-serif text-3xl">Access Required</h1>

          <p className="mb-7 text-sm leading-relaxed text-stone-500">
            You do not currently have access to view or manage this family wall.
            Please use an invitation link from the family owner or admin.
          </p>

          <Link
            href={`/memorials/${slug}`}
            className="rounded-full bg-stone-900 px-7 py-3 text-sm text-white"
          >
            Back to Memorial
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-stone-50 px-5 py-14 text-stone-900">
      <div className="mx-auto max-w-4xl">
        <div className="mb-10">
          <p className="mb-3 text-xs uppercase tracking-[0.25em] text-stone-400">
            Family Wall
          </p>

          <h1 className="font-serif text-4xl text-stone-900">
            Family Members
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-stone-500">
            View and manage people who have access to this private family
            remembrance space.
          </p>

          <p className="mt-4 inline-flex rounded-full bg-stone-100 px-4 py-2 text-xs uppercase tracking-[0.2em] text-stone-500">
            Your role: {myRole}
          </p>
        </div>

        {message && (
          <p className="mb-6 rounded-2xl bg-white p-4 text-sm text-stone-600 shadow-sm">
            {message}
          </p>
        )}

        <div className="space-y-4 rounded-3xl border border-stone-100 bg-white p-6 shadow-sm">
          {members.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-stone-200 p-10 text-center">
              <p className="mb-3 text-4xl">👥</p>

              <h2 className="mb-3 font-serif text-2xl text-stone-800">
                No members found
              </h2>

              <p className="text-sm text-stone-500">
                Members will appear here after they accept an invitation.
              </p>
            </div>
          ) : (
            members.map((member) => {
              const isOwner = member.display_role === "owner";
              const isSelf = member.user_id === user.id;

              return (
                <div
                  key={member.id}
                  className="flex flex-col gap-4 rounded-2xl border border-stone-100 bg-stone-50 p-5 md:flex-row md:items-center md:justify-between"
                >
                  <div>
                    <p className="font-medium text-stone-800">
                      {member.full_name}
                      {isSelf ? " (You)" : ""}
                    </p>

                    <p className="mt-1 text-xs uppercase tracking-[0.2em] text-stone-400">
                      {member.display_role}
                    </p>
                  </div>

                  {canManage && !isOwner && (
                    <div className="flex flex-wrap gap-2">
                      {member.display_role === "admin" ? (
                        <button
                          onClick={() => demoteToMember(member)}
                          className="rounded-full border border-stone-200 bg-white px-4 py-2 text-xs text-stone-600"
                        >
                          Make Member
                        </button>
                      ) : (
                        <button
                          onClick={() => promoteToAdmin(member)}
                          className="rounded-full border border-stone-200 bg-white px-4 py-2 text-xs text-stone-600"
                        >
                          Make Admin
                        </button>
                      )}

                      <button
                        onClick={() => removeMember(member)}
                        className="rounded-full bg-stone-900 px-4 py-2 text-xs text-white"
                      >
                        Remove
                      </button>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            href={`/memorials/${slug}/family-wall`}
            className="rounded-full border border-stone-200 bg-white px-6 py-3 text-sm text-stone-600"
          >
            Back to Family Wall
          </Link>

          <Link
            href={`/memorials/${slug}`}
            className="rounded-full bg-stone-900 px-6 py-3 text-sm text-white"
          >
            Back to Memorial
          </Link>
        </div>
      </div>
    </main>
  );
}