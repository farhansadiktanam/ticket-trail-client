"use client";

import { useState, useEffect } from "react";
import { Button } from "@heroui/react";

const ROLE_STYLES = {
  admin: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  vendor: "bg-orange-500/10 text-orange-400 border-orange-500/20",
  user: "bg-slate-500/10  text-slate-400  border-slate-500/20",
};

export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/users`)
      .then((r) => r.json())
      .then(setUsers);
  }, []);

  async function updateRole(email, role) {
    await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/users/${email}/role`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ role }),
    });
    setUsers((prev) =>
      prev.map((u) => (u.email === email ? { ...u, role } : u)),
    );
  }

  async function markFraud(email) {
    if (
      !window.confirm(
        "Mark this vendor as fraud? All their tickets will be hidden.",
      )
    )
      return;
    await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/users/${email}/fraud`, {
      method: "PATCH",
    });
    setUsers((prev) =>
      prev.map((u) => (u.email === email ? { ...u, isFraud: true } : u)),
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold text-white">Manage Users</h1>

      <div className="overflow-x-auto rounded-2xl border border-white/5 bg-slate-900">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/5 text-xs text-slate-500 uppercase tracking-wider">
              <th className="px-5 py-4 text-left font-medium">Name</th>
              <th className="px-5 py-4 text-left font-medium">Email</th>
              <th className="px-5 py-4 text-left font-medium">Role</th>
              <th className="px-5 py-4 text-left font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {users.map((user) => (
              <tr key={user._id}>
                <td className="px-5 py-4 font-medium text-white">
                  {user.name}
                </td>
                <td className="px-5 py-4 text-slate-400 text-xs">
                  {user.email}
                </td>
                <td className="px-5 py-4">
                  <span
                    className={`rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase ${ROLE_STYLES[user.role] || ROLE_STYLES.user}`}
                  >
                    {user.isFraud ? "🚫 Fraud" : user.role}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <div className="flex flex-wrap gap-2">
                    <Button
                      size="sm"
                      isDisabled={user.role === "admin"}
                      onPress={() => updateRole(user.email, "admin")}
                      className="bg-purple-500/10 text-purple-400 border border-purple-500/20 text-xs h-8 px-3 disabled:opacity-30"
                    >
                      Make Admin
                    </Button>
                    <Button
                      size="sm"
                      isDisabled={user.role === "vendor"}
                      onPress={() => updateRole(user.email, "vendor")}
                      className="bg-orange-500/10 text-orange-400 border border-orange-500/20 text-xs h-8 px-3 disabled:opacity-30"
                    >
                      Make Vendor
                    </Button>
                    {user.role === "vendor" && !user.isFraud && (
                      <Button
                        size="sm"
                        onPress={() => markFraud(user.email)}
                        className="bg-red-500/10 text-red-400 border border-red-500/20 text-xs h-8 px-3"
                      >
                        Mark Fraud
                      </Button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
