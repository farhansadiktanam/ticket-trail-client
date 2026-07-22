"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@heroui/react";
import { Ticket, Shield, CheckCircle2, Minus, Plus } from "lucide-react";
import Link from "next/link";
import { useSession } from "@/lib/auth-client";

export default function TicketBookingPanel({ ticketId, price, quantity }) {
  const { data: session } = useSession();

  const router = useRouter();
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(false);
  const [booked, setBooked] = useState(false);

  const soldOut = quantity === 0;
  const total = price * qty;

  async function handleBook() {
    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/bookings`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ticketId,
            quantity: qty,
            userEmail: session?.user?.email,
          }),
        },
      );
      if (!res.ok) throw new Error("Booking failed");
      setBooked(true);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  // ── Success state ──────────────────────────────────────────────────────────
  if (booked) {
    return (
      <div className="sticky top-24 rounded-2xl border border-green-500/20 bg-slate-900/60 p-6 text-center">
        <div className="flex justify-center mb-4">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10 border border-green-500/20">
            <CheckCircle2 className="h-8 w-8 text-green-400" />
          </span>
        </div>
        <h3 className="text-lg font-bold text-white">Booking Confirmed!</h3>
        <p className="mt-1 text-sm text-slate-400">
          Your e-ticket has been sent to your email.
        </p>

        <div className="mt-5 rounded-xl border border-dashed border-white/10 bg-slate-800/40 p-4 text-left space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-slate-400">Seats</span>
            <span className="text-white font-semibold">{qty}×</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-400">Unit price</span>
            <span className="text-white">Tk{price.toLocaleString()}</span>
          </div>
          <div className="border-t border-white/5 pt-2 flex justify-between">
            <span className="text-slate-300 font-semibold">Total Paid</span>
            <span className="text-orange-400 font-extrabold text-lg">
              Tk{total.toLocaleString()}
            </span>
          </div>
        </div>

        <Link href={"/dashboard/user/booked-tickets"}>
          <Button
            onPress={() => router.push("/my-bookings")}
            className="mt-5 w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm h-10"
          >
            View My Bookings
          </Button>
        </Link>
      </div>
    );
  }

  // ── Booking panel ──────────────────────────────────────────────────────────
  return (
    <div className="sticky top-24 rounded-2xl border border-white/5 bg-slate-900/60 overflow-hidden">
      {/* Price header */}
      <div className="relative bg-linear-to-r from-orange-500 to-indigo-600 px-5 py-4">
        <p className="text-xs font-bold uppercase tracking-wider text-white/70">
          Price per seat
        </p>
        <p className="mt-0.5 text-3xl font-extrabold text-white">
          Tk{price.toLocaleString()}
        </p>
        {/* Ticket-stub notches */}
        <span className="absolute -bottom-3 left-4 h-6 w-6 rounded-full bg-slate-950" />
        <span className="absolute -bottom-3 right-4 h-6 w-6 rounded-full bg-slate-950" />
      </div>

      <div className="border-t border-dashed border-white/10 mx-4" />

      <div className="p-5 flex flex-col gap-4">
        {/* Availability */}
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-400">Seats available</span>
          <span
            className={
              quantity <= 5 && !soldOut
                ? "text-orange-400 font-semibold"
                : "text-white font-semibold"
            }
          >
            {soldOut ? (
              <span className="text-red-400">Sold Out</span>
            ) : (
              `${quantity} seats`
            )}
          </span>
        </div>

        {/* Quantity stepper */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
            Number of Seats
          </p>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              disabled={qty <= 1 || soldOut}
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-slate-800 text-white hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed transition"
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="flex-1 text-center text-lg font-bold text-white">
              {qty}
            </span>
            <button
              onClick={() => setQty((q) => Math.min(quantity, q + 1))}
              disabled={qty >= quantity || soldOut}
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-slate-800 text-white hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed transition"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Total */}
        <div className="flex items-center justify-between rounded-xl bg-slate-800/60 border border-white/5 px-4 py-3">
          <span className="text-sm text-slate-400">Total</span>
          <span className="text-xl font-extrabold text-orange-400">
            Tk{total.toLocaleString()}
          </span>
        </div>

        {/* Book button */}
        <Button
          onPress={handleBook}
          isLoading={loading}
          isDisabled={soldOut}
          className={`w-full font-bold text-sm h-10 ${
            soldOut
              ? "bg-white/5 text-slate-600 cursor-not-allowed"
              : "bg-linear-to-r from-orange-500 to-indigo-600 text-white shadow-lg shadow-orange-500/20 hover:shadow-orange-500/30"
          }`}
        >
          {!loading && <Ticket className="h-4 w-4 mr-1.5" />}
          {soldOut ? "Sold Out" : "Confirm Booking"}
        </Button>

        {/* Trust line */}
        <p className="flex items-center justify-center gap-1.5 text-xs text-slate-500">
          <Shield className="h-3.5 w-3.5 text-slate-600" />
          Secure checkout · Instant e-ticket
        </p>
      </div>
    </div>
  );
}
