"use client";

import { useState, useEffect } from "react";
import { Button } from "@heroui/react";
import { Megaphone } from "lucide-react";

export default function AdminAdvertisePage() {
  const [tickets, setTickets] = useState([]);
  const advertisedCount = tickets.filter((t) => t.isAdvertised).length;

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/admin/tickets`)
      .then((r) => r.json())
      .then((data) =>
        setTickets(data.filter((t) => t.verificationStatus === "approved")),
      );
  }, []);

  async function toggleAdvertise(id, current) {
    if (!current && advertisedCount >= 6) {
      return alert("Maximum 6 tickets can be advertised at a time.");
    }
    await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/admin/tickets/${id}/advertise`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isAdvertised: !current }),
      },
    );
    setTickets((prev) =>
      prev.map((t) => (t._id === id ? { ...t, isAdvertised: !current } : t)),
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Advertise Tickets</h1>
        <span className="text-xs text-slate-400 bg-slate-800 border border-white/10 px-3 py-1.5 rounded-full">
          {advertisedCount} / 6 advertised
        </span>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-white/5 bg-slate-900">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/5 text-xs text-slate-500 uppercase tracking-wider">
              <th className="px-5 py-4 text-left font-medium">Ticket</th>
              <th className="px-5 py-4 text-left font-medium">Route</th>
              <th className="px-5 py-4 text-left font-medium">Price</th>
              <th className="px-5 py-4 text-left font-medium">Advertised</th>
              <th className="px-5 py-4 text-left font-medium">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {tickets.map((ticket) => (
              <tr key={ticket._id}>
                <td className="px-5 py-4 font-medium text-white">
                  {ticket.title}
                </td>
                <td className="px-5 py-4 text-slate-400 text-xs">
                  {ticket.from} → {ticket.to}
                </td>
                <td className="px-5 py-4 text-slate-300">৳{ticket.price}</td>
                <td className="px-5 py-4">
                  {ticket.isAdvertised ? (
                    <span className="flex items-center gap-1 text-orange-400 text-xs font-semibold">
                      <Megaphone className="h-3.5 w-3.5" /> Yes
                    </span>
                  ) : (
                    <span className="text-slate-500 text-xs">No</span>
                  )}
                </td>
                <td className="px-5 py-4">
                  <Button
                    size="sm"
                    onPress={() =>
                      toggleAdvertise(ticket._id, ticket.isAdvertised)
                    }
                    className={`text-xs h-8 px-3 border ${
                      ticket.isAdvertised
                        ? "bg-red-500/10 text-red-400 border-red-500/20"
                        : "bg-orange-500/10 text-orange-400 border-orange-500/20"
                    }`}
                  >
                    {ticket.isAdvertised ? "Remove" : "Advertise"}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
