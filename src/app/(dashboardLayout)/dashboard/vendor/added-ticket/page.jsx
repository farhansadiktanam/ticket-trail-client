"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent as CardBody, Button } from "@heroui/react";
import {
  Bus,
  TrainFront,
  Sailboat,
  Plane,
  MapPin,
  Calendar,
  Pencil,
  Trash2,
} from "lucide-react";
import { useSession } from "@/lib/auth-client";

// ── Replace this with a real fetch from your API ──────────────────────────
const SAMPLE_TICKETS = [
  {
    _id: "1",
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800",
    title: "Dhaka to Chittagong Deluxe",
    from: "Dhaka",
    to: "Chittagong",
    transportType: "bus",
    price: 1200,
    quantity: 8,
    departureDate: "2026-08-10",
    departureTime: "08:00",
    verificationStatus: "approved",
  },
  {
    _id: "2",
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800",
    title: "Dhaka to Cox's Bazar Express",
    from: "Dhaka",
    to: "Cox's Bazar",
    transportType: "bus",
    price: 850,
    quantity: 14,
    departureDate: "2026-08-12",
    departureTime: "21:00",
    verificationStatus: "pending",
  },
  {
    _id: "3",
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800",
    title: "Dhaka to Sylhet Night Coach",
    from: "Dhaka",
    to: "Sylhet",
    transportType: "bus",
    price: 700,
    quantity: 0,
    departureDate: "2026-08-15",
    departureTime: "22:00",
    verificationStatus: "rejected",
  },
];

const TRANSPORT_ICONS = {
  bus: Bus,
  train: TrainFront,
  launch: Sailboat,
  flight: Plane,
};

const STATUS_STYLES = {
  pending: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  approved: "bg-green-500/10  text-green-400  border-green-500/20",
  rejected: "bg-red-500/10   text-red-400    border-red-500/20",
};

export default function VendorAddedTicketsPage() {
  const [tickets, setTickets] = useState([]);
  const { data: session } = useSession();
  const user = session?.user;
  console.log(user);

  useEffect(() => {
    if (!user?.email) return;

    const getVendorTickets = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/vendor-tickets/${user.email}`,
      );
      const data = await res.json();
      setTickets(data);
    };

    getVendorTickets();
  }, [user?.email]);
  async function handleDelete(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this ticket?",
    );
    if (!confirmed) return;

    await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/tickets/${id}`, {
      method: "DELETE",
    });

    setTickets((prev) => prev.filter((t) => t._id !== id));
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">My Added Tickets</h1>
        <Link href="/vendor/add-ticket">
          <Button className="bg-orange-500 hover:bg-orange-400 text-white font-semibold text-sm h-9 px-4">
            + Add Ticket
          </Button>
        </Link>
      </div>

      {/* Empty state */}
      {tickets.length === 0 && (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-white/5 bg-slate-900 py-20 text-center">
          <p className="text-white font-semibold">No tickets added yet.</p>
          <p className="mt-1 text-sm text-slate-500">
            Start by adding your first ticket.
          </p>
          <Link href="/vendor/add-ticket" className="mt-4">
            <Button className="bg-orange-500 text-white font-semibold text-sm h-9 px-4">
              Add Ticket
            </Button>
          </Link>
        </div>
      )}

      {/* Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {tickets.map((ticket) => {
          const Icon = TRANSPORT_ICONS[ticket.transportType] || Bus;
          const isRejected = ticket.verificationStatus === "rejected";

          return (
            <Card
              key={ticket._id}
              className="bg-slate-900 border border-white/5 p-0 overflow-hidden"
            >
              {/* Image */}
              <div className="relative h-44 w-full overflow-hidden">
                <Image
                  src={ticket.image}
                  alt={ticket.title}
                  fill
                  unoptimized
                  className="rounded-xl object-cover"
                />
                {/* Status badge */}
                <span
                  className={`absolute top-3 left-3 rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider backdrop-blur-sm ${STATUS_STYLES[ticket.verificationStatus]}`}
                >
                  {ticket.verificationStatus}
                </span>
                {/* Transport badge */}
                <span className="absolute top-3 right-3 flex items-center gap-1 bg-slate-950/80 backdrop-blur-sm text-slate-300 text-[10px] font-semibold uppercase px-2.5 py-1 rounded-full border border-white/10">
                  <Icon className="h-3 w-3" />
                  {ticket.transportType}
                </span>
              </div>

              <CardBody className="flex flex-col gap-3 p-4">
                {/* Title */}
                <h3 className="font-bold text-white text-sm line-clamp-1">
                  {ticket.title}
                </h3>

                {/* Route */}
                <div className="flex items-center gap-1.5 text-xs text-slate-400">
                  <MapPin className="h-3.5 w-3.5 text-orange-500 shrink-0" />
                  {ticket.from} → {ticket.to}
                </div>

                {/* Date */}
                <div className="flex items-center gap-1.5 text-xs text-slate-400">
                  <Calendar className="h-3.5 w-3.5 text-slate-600 shrink-0" />
                  {ticket.departureDate} at {ticket.departureTime}
                </div>

                {/* Price & Quantity */}
                <div className="flex items-center justify-between text-sm">
                  <span className="font-bold text-white">
                    ৳{ticket.price.toLocaleString()}
                  </span>
                  <span className="text-xs text-slate-400">
                    {ticket.quantity} seats left
                  </span>
                </div>

                {/* Divider */}
                <div className="border-t border-dashed border-white/5" />

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <Link
                    href={`/vendor/update-ticket/${ticket._id}`}
                    className="flex-1"
                  >
                    <Button
                      isDisabled={isRejected}
                      className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white font-semibold text-xs h-9"
                    >
                      <Pencil className="h-3.5 w-3.5 mr-1" />
                      Update
                    </Button>
                  </Link>
                  <Button
                    isDisabled={isRejected}
                    onPress={() => handleDelete(ticket._id)}
                    className="flex-1 bg-red-500/10 hover:bg-red-500/20 disabled:opacity-40 text-red-400 font-semibold text-xs h-9 border border-red-500/20"
                  >
                    <Trash2 className="h-3.5 w-3.5 mr-1" />
                    Delete
                  </Button>
                </div>
              </CardBody>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
