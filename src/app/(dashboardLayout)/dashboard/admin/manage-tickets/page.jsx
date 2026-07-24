"use client";

import { useState, useEffect } from "react";
import { Card, CardBody, Button } from "@heroui/react";

const STATUS_STYLES = {
  pending: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  approved: "bg-green-500/10  text-green-400  border-green-500/20",
  rejected: "bg-red-500/10   text-red-400    border-red-500/20",
};

export default function AdminTicketsPage() {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/admin/tickets`)
      .then((r) => r.json())
      .then(setTickets);
  }, []);

  async function updateStatus(id, status) {
    await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/admin/tickets/${id}/status`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ verificationStatus: status }),
      },
    );
    // update UI instantly
    setTickets((prev) =>
      prev.map((t) =>
        t._id === id ? { ...t, verificationStatus: status } : t,
      ),
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold text-white">Manage Tickets</h1>

      <div className="overflow-x-auto rounded-2xl border border-white/5 bg-slate-900">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/5 text-xs text-slate-500 uppercase tracking-wider">
              <th className="px-5 py-4 text-left font-medium">Ticket</th>
              <th className="px-5 py-4 text-left font-medium">Vendor</th>
              <th className="px-5 py-4 text-left font-medium">Price</th>
              <th className="px-5 py-4 text-left font-medium">Status</th>
              <th className="px-5 py-4 text-left font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {tickets.map((ticket) => (
              <tr key={ticket._id}>
                <td className="px-5 py-4 font-medium text-white">
                  {ticket.title}
                </td>
                <td className="px-5 py-4 text-slate-400 text-xs">
                  {ticket.vendorEmail}
                </td>
                <td className="px-5 py-4 text-slate-300">৳{ticket.price}</td>
                <td className="px-5 py-4">
                  <span
                    className={`rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase ${STATUS_STYLES[ticket.verificationStatus]}`}
                  >
                    {ticket.verificationStatus}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      isDisabled={ticket.verificationStatus === "approved"}
                      onPress={() => updateStatus(ticket._id, "approved")}
                      className="bg-green-500/10 text-green-400 border border-green-500/20 text-xs h-8 px-3 disabled:opacity-30"
                    >
                      Approve
                    </Button>
                    <Button
                      size="sm"
                      isDisabled={ticket.verificationStatus === "rejected"}
                      onPress={() => updateStatus(ticket._id, "rejected")}
                      className="bg-red-500/10 text-red-400 border border-red-500/20 text-xs h-8 px-3 disabled:opacity-30"
                    >
                      Reject
                    </Button>
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
