"use client";

import { useState, useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import { Card, CardContent as CardBody, Button } from "@heroui/react";
import { MapPin, Calendar, Clock, Ticket, Hash } from "lucide-react";

const STATUS_STYLES = {
  pending: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  accepted: "bg-green-500/10  text-green-400  border-green-500/20",
  rejected: "bg-red-500/10   text-red-400    border-red-500/20",
  paid: "bg-blue-500/10  text-blue-400   border-blue-500/20",
};

function Countdown({ departureDate }) {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    function calculate() {
      const diff = new Date(departureDate) - new Date();
      if (diff <= 0) return setTimeLeft("Departed");

      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const m = Math.floor((diff / (1000 * 60)) % 60);
      const s = Math.floor((diff / 1000) % 60);

      setTimeLeft(`${d}d ${h}h ${m}m ${s}s`);
    }

    calculate();
    const interval = setInterval(calculate, 1000);
    return () => clearInterval(interval);
  }, [departureDate]);

  const departed = timeLeft === "Departed";

  return (
    <div
      className={`flex items-center gap-1.5 text-xs font-mono font-semibold ${departed ? "text-slate-500" : "text-orange-400"}`}
    >
      <Clock className="h-3.5 w-3.5 shrink-0" />
      {departed ? "Departed" : `Departs in ${timeLeft}`}
    </div>
  );
}

export default function MyBookingsPage() {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;
    fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/bookings/user/${user.email}`)
      .then((r) => r.json())
      .then((data) => {
        setBookings(data);
        setLoading(false);
      });
  }, [user?.email]);

  async function handlePayNow(booking) {
    // TODO: wire up Stripe payment
    // router.push(`/dashboard/payment/${booking._id}`)
    alert(`Pay ৳${booking.totalPrice} for booking ${booking._id}`);
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-slate-400 text-sm">Loading bookings…</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold text-white">My Booked Tickets</h1>

      {bookings.length === 0 && (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-white/5 bg-slate-900 py-20 text-center">
          <Ticket className="h-10 w-10 text-slate-700 mb-3" />
          <p className="text-white font-semibold">No bookings yet.</p>
          <p className="mt-1 text-sm text-slate-500">
            Browse tickets and make your first booking.
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {bookings.map((booking) => {
          const departed = new Date(booking.departureDate) < new Date();
          const canPay = booking.status === "accepted" && !departed;

          return (
            <Card
              key={booking._id}
              className="bg-slate-900 border border-white/5 p-0 overflow-hidden"
            >
              {/* Image */}
              <div className="relative h-40 w-full overflow-hidden">
                <img
                  src={booking.ticketImage}
                  alt={booking.ticketTitle}
                  className="w-full h-full object-cover"
                />
                {/* Status badge */}
                <span
                  className={`absolute top-3 left-3 rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider backdrop-blur-sm ${STATUS_STYLES[booking.status]}`}
                >
                  {booking.status}
                </span>
              </div>

              <CardBody className="flex flex-col gap-3 p-4">
                {/* Title */}
                <h3 className="font-bold text-white text-sm line-clamp-1">
                  {booking.ticketTitle}
                </h3>

                {/* Route */}
                <div className="flex items-center gap-1.5 text-xs text-slate-400">
                  <MapPin className="h-3.5 w-3.5 text-orange-500 shrink-0" />
                  {booking.from} → {booking.to}
                </div>

                {/* Date */}
                <div className="flex items-center gap-1.5 text-xs text-slate-400">
                  <Calendar className="h-3.5 w-3.5 text-slate-600 shrink-0" />
                  {new Date(booking.departureDate).toLocaleDateString("en-BD", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </div>

                {/* Countdown — hidden if rejected */}
                {booking.status !== "rejected" && (
                  <Countdown departureDate={booking.departureDate} />
                )}

                <div className="border-t border-dashed border-white/5" />

                {/* Qty & Total */}
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-1 text-xs text-slate-400">
                    <Hash className="h-3 w-3" />
                    {booking.quantity} seat{booking.quantity > 1 ? "s" : ""}
                  </span>
                  <span className="font-bold text-white">
                    ৳{booking.totalPrice.toLocaleString()}
                  </span>
                </div>

                {/* Pay Now — only if accepted and not departed */}
                {canPay && (
                  <Button
                    onPress={() => handlePayNow(booking)}
                    className="w-full bg-linear-to-r from-orange-500 to-indigo-600 text-white font-bold text-xs h-9"
                  >
                    Pay Now — ৳{booking.totalPrice.toLocaleString()}
                  </Button>
                )}

                {/* Departed + accepted notice */}
                {booking.status === "accepted" && departed && (
                  <p className="text-center text-xs text-slate-500">
                    Payment window closed — trip departed.
                  </p>
                )}
              </CardBody>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
