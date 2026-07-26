"use client";

import { useState, useEffect } from "react";
import { Card, CardBody, Button } from "@heroui/react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const STATUS_STYLES = {
  pending: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  approved: "bg-green-500/10  text-green-400  border-green-500/20",
  rejected: "bg-red-500/10   text-red-400    border-red-500/20",
};

export default function AdminTicketsPage() {
  const [tickets, setTickets] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = () => {
      setLoading(true);
    };
    load();
    fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/admin/tickets?page=${page}&limit=8`,
    )
      .then((r) => r.json())
      .then((data) => {
        setTickets(data.tickets || []);
        setTotalPage(data.total_page || 1);
      })
      .finally(() => setLoading(false));
  }, [page]); // ✅ re-fetch whenever page changes

  async function updateStatus(id, status) {
    await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/admin/tickets/${id}/status`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ verificationStatus: status }),
      },
    );
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

        {/* Pagination */}
        <div className="flex items-center justify-between px-5 py-4 border-t border-white/5">
          <p className="text-xs text-slate-500">
            Page <span className="text-white font-semibold">{page}</span> of{" "}
            <span className="text-white font-semibold">{totalPage}</span>
          </p>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page <= 1}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold border border-white/10 text-slate-300 hover:bg-white/5 hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-colors"
            >
              <ChevronLeft size={14} />
              Prev
            </button>

            <div className="flex items-center gap-1">
              {Array.from({ length: totalPage }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`w-7 h-7 flex items-center justify-center rounded-lg text-xs font-semibold transition-colors ${
                    p === page
                      ? "bg-orange-500 text-white"
                      : "text-slate-400 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>

            <button
              onClick={() => setPage((p) => Math.min(totalPage, p + 1))}
              disabled={page >= totalPage}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold border border-white/10 text-slate-300 hover:bg-white/5 hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-colors"
            >
              Next
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
