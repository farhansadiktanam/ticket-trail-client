import Link from "next/link";
import {
  Star,
  Quote,
  Bus,
  TrainFront,
  Sailboat,
  Plane,
  ArrowRight,
} from "lucide-react";

export const metadata = {
  title: "Testimonials | TicketTrail",
  description: "See what travelers are saying about booking with TicketTrail.",
};

const testimonials = [
  {
    name: "Tanvir Ahmed",
    location: "Dhaka",
    type: "bus",
    rating: 5,
    quote:
      "Booked a bus ticket to Cox's Bazar in under two minutes. The e-ticket showed up right away and the seat was exactly as shown.",
  },
  {
    name: "Nusrat Jahan",
    location: "Sylhet",
    type: "flight",
    rating: 5,
    quote:
      "Compared three airlines side by side and found a fare way below what I'd seen elsewhere. Smoothest flight booking I've done.",
  },
  {
    name: "Rafiul Islam",
    location: "Khulna",
    type: "train",
    rating: 4,
    quote:
      "Train seats sell out fast on my route, but TicketTrail showed live availability so I didn't waste time on sold-out coaches.",
  },
  {
    name: "Farzana Akter",
    location: "Barishal",
    type: "launch",
    rating: 5,
    quote:
      "Got a cabin seat on the launch to Dhaka without calling anyone. Payment was simple and support answered my question in minutes.",
  },
  {
    name: "Shahriar Kabir",
    location: "Chattogram",
    type: "bus",
    rating: 5,
    quote:
      "I travel for work every other week and this is the first booking site that's never given me a seat mix-up.",
  },
  {
    name: "Mim Sultana",
    location: "Rajshahi",
    type: "train",
    rating: 4,
    quote:
      "Clean interface, no hidden fees at checkout, and the reminder email before departure is a nice touch.",
  },
];

const transportMeta = {
  bus: { icon: Bus, label: "Bus", classes: "bg-orange-50 text-orange-600" },
  train: {
    icon: TrainFront,
    label: "Train",
    classes: "bg-teal-50 text-teal-600",
  },
  launch: {
    icon: Sailboat,
    label: "Launch",
    classes: "bg-blue-50 text-blue-600",
  },
  flight: {
    icon: Plane,
    label: "Flight",
    classes: "bg-purple-50 text-purple-600",
  },
};

const stats = [
  { label: "Average Rating", value: "4.8 / 5" },
  { label: "Verified Reviews", value: "2,400+" },
  { label: "Repeat Travelers", value: "68%" },
];

function getInitials(name) {
  return name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function StarRating({ rating }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={
            i < rating
              ? "h-4 w-4 fill-amber-400 text-amber-400"
              : "h-4 w-4 fill-none text-gray-300"
          }
        />
      ))}
    </div>
  );
}

export default function Testimonial() {
  return (
    <main>
      {/* Page Header Banner */}
      <section className="bg-slate-900 dark:bg-[#0B1320] px-6 py-16 text-center lg:px-12 transition-colors duration-200">
        <span className="text-xs font-semibold uppercase tracking-wider text-[#F2B134]">
          Trusted By Travelers
        </span>
        <h1 className="mt-2 text-3xl font-bold text-white sm:text-4xl">
          What Our Travelers Say
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-sm text-slate-300 dark:text-[#9AA6B8] sm:text-base">
          Real feedback from people who&apos;ve booked bus, train, launch, and
          flight tickets through TicketTrail.
        </p>

        <div className="mx-auto mt-10 grid max-w-2xl grid-cols-3 divide-x divide-slate-800 dark:divide-[#1E2A3D]">
          {stats.map((stat) => (
            <div key={stat.label} className="px-4">
              <p className="text-2xl font-bold text-white sm:text-3xl">
                {stat.value}
              </p>
              <p className="mt-1 text-xs text-slate-400 dark:text-[#8A96A8] sm:text-sm">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonial Grid */}
      <section className="bg-slate-50 dark:bg-slate-950 px-6 py-16 lg:px-12 transition-colors duration-200">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => {
            const meta = transportMeta[t.type];
            const TransportIcon = meta.icon;
            return (
              <div
                key={t.name}
                className="relative rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900/60 p-6 shadow-xs dark:shadow-none"
              >
                <Quote className="h-6 w-6 text-[#F2B134]/60 dark:text-[#F2B134]/40" />
                <p className="mt-3 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                  {t.quote}
                </p>

                <div className="my-5 border-t border-dashed border-slate-200 dark:border-white/10" />

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 dark:bg-slate-800 text-sm font-semibold text-[#F2B134]">
                      {getInitials(t.name)}
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-slate-900 dark:text-white">
                        {t.name}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-[#8A96A8]">
                        {t.location}
                      </p>
                    </div>
                  </div>

                  <span
                    className={`flex h-9 w-9 items-center justify-center rounded-full ${meta.classes}`}
                    title={meta.label}
                  >
                    <TransportIcon className="h-4 w-4" />
                  </span>
                </div>

                <div className="mt-4">
                  <StarRating rating={t.rating} />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA Band */}
      <section className="bg-slate-900 dark:bg-[#0B1320] px-6 py-14 text-center lg:px-12 transition-colors duration-200">
        <h2 className="text-2xl font-bold text-white sm:text-3xl">
          Ready to start your own journey?
        </h2>
        <p className="mx-auto mt-3 max-w-md text-sm text-slate-300 dark:text-[#9AA6B8]">
          Book your next bus, train, launch, or flight ticket in minutes.
        </p>
        <div className="mt-7 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/all-tickets"
            className="flex items-center gap-2 rounded-lg bg-[#F2B134] px-6 py-2.5 text-sm font-semibold text-slate-950 transition-colors hover:bg-[#F5C158]"
          >
            Browse Tickets
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/contact"
            className="text-sm font-semibold text-slate-300 dark:text-[#C7D0DD] transition-colors hover:text-white"
          >
            Share Your Story
          </Link>
        </div>
      </section>
    </main>
  );
}
