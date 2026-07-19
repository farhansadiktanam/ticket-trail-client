import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Chip } from "@heroui/react";
import {
  ArrowLeft,
  MapPin,
  ArrowRight,
  CalendarDays,
  Clock,
  Bus,
  TrainFront,
  Plane,
  Ship,
  Tag,
} from "lucide-react";
import TicketBookingPanel from "@/components/TicketBookingPanel";

const TRANSPORT_ICONS = {
  bus: Bus,
  train: TrainFront,
  flight: Plane,
  plane: Plane,
  launch: Ship,
  ferry: Ship,
};

async function getTicket(id) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/single-ticket/${id}`,
    {
      cache: "no-store",
    },
  );
  if (!res.ok) return null;
  return res.json();
}

function formatDateTime(dateInput) {
  const date = new Date(dateInput);
  return {
    formattedDate: date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    }),
    formattedTime: date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    }),
  };
}

export default async function TicketDetailsPage({ params }) {
  const { id } = await params;
  const ticket = await getTicket(id);

  if (!ticket) notFound();

  const {
    image,
    title,
    from,
    to,
    transportType = "bus",
    price,
    quantity,
    perks = [],
    departureDate,
    description,
  } = ticket;

  const TransportIcon = TRANSPORT_ICONS[transportType?.toLowerCase()] || Bus;
  const { formattedDate, formattedTime } = formatDateTime(departureDate);

  return (
    <main className="min-h-screen bg-slate-950">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Back link */}
        <Link
          href="/all-tickets"
          className="mb-6 inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft size={16} />
          Back to All Tickets
        </Link>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* ── Left: main content ── */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {/* Hero image */}
            <div className="relative h-60 w-full overflow-hidden rounded-2xl sm:h-80">
              <Image
                src={image}
                alt={title}
                fill
                priority
                unoptimized
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 66vw"
              />
              <div className="absolute inset-0 bg-linear-to-t from-slate-950/60 via-transparent to-transparent" />
              <span className="absolute left-3 top-3 flex items-center gap-1.5 bg-slate-950/80 backdrop-blur-md text-orange-400 text-xs font-bold uppercase tracking-wide px-3 py-1.5 rounded-full border border-orange-500/20">
                <TransportIcon size={13} />
                {transportType}
              </span>
            </div>

            {/* Title & route */}
            <div>
              <h1 className="text-2xl font-extrabold text-white sm:text-3xl">
                {title}
              </h1>
              <div className="mt-2 flex flex-wrap items-center gap-2 text-slate-400 text-sm">
                <MapPin size={15} className="text-orange-500 shrink-0" />
                <span className="font-semibold text-slate-200">{from}</span>
                <ArrowRight size={14} className="text-slate-600" />
                <span className="font-semibold text-slate-200">{to}</span>
              </div>
              <div className="mt-2 flex flex-wrap gap-4 text-xs text-slate-500">
                <span className="flex items-center gap-1.5">
                  <CalendarDays size={14} />
                  {formattedDate}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock size={14} />
                  {formattedTime}
                </span>
              </div>
            </div>

            {/* About */}
            {description && (
              <div className="rounded-2xl border border-white/5 bg-slate-900/60 p-5">
                <h2 className="mb-2 text-sm font-bold uppercase tracking-wider text-slate-400">
                  About This Trip
                </h2>
                <p className="text-sm leading-relaxed text-slate-400 sm:text-base">
                  {description}
                </p>
              </div>
            )}

            {/* Perks */}
            {perks.length > 0 && (
              <div className="rounded-2xl border border-white/5 bg-slate-900/60 p-5">
                <h2 className="mb-3 text-sm font-bold uppercase tracking-wider text-slate-400">
                  Perks Included
                </h2>
                <div className="flex flex-wrap gap-2">
                  {perks.map((perk, i) => (
                    <span
                      key={i}
                      className="flex items-center gap-1.5 rounded-xl bg-white/5 border border-white/5 px-3 py-1.5 text-sm font-medium text-slate-300"
                    >
                      <Tag size={13} className="text-orange-400" />
                      {perk}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ── Right: booking panel ── */}
          <div className="lg:col-span-1">
            <TicketBookingPanel
              ticketId={ticket._id}
              price={price}
              quantity={quantity}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
