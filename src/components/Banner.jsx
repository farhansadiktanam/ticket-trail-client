"use client";

import { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import {
  Bus,
  TrainFront,
  Sailboat,
  Plane,
  Search,
  MapPin,
  CalendarDays,
} from "lucide-react";

const slides = [
  {
    id: "bus",
    icon: Bus,
    title: "Hit the road, your way",
    subtitle: "Compare and book bus tickets across every route.",
    gradient: "from-[#1B2A4A] via-[#142036] to-[#0B1320]",
  },
  {
    id: "train",
    icon: TrainFront,
    title: "Ride the rails, stress-free",
    subtitle: "Reserve train seats in seconds, no queues.",
    gradient: "from-[#1A3A3A] via-[#13282C] to-[#0B1320]",
  },
  {
    id: "launch",
    icon: Sailboat,
    title: "Sail to your next stop",
    subtitle: "Book river launch tickets with cabin options.",
    gradient: "from-[#0F2E44] via-[#102433] to-[#0B1320]",
  },
  {
    id: "flight",
    icon: Plane,
    title: "Take off in a few taps",
    subtitle: "Find flights and lock in fares before they rise.",
    gradient: "from-[#2A1E3F] via-[#201A33] to-[#0B1320]",
  },
];

const transportTypes = [
  { id: "bus", label: "Bus", icon: Bus },
  { id: "train", label: "Train", icon: TrainFront },
  { id: "launch", label: "Launch", icon: Sailboat },
  { id: "flight", label: "Flight", icon: Plane },
];

export default function Banner() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 4500, stopOnInteraction: false }),
  ]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [activeType, setActiveType] = useState("bus");

  const scrollTo = useCallback(
    (index) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi],
  );

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();
    return () => emblaApi.off("select", onSelect);
  }, [emblaApi]);

  const handleSearch = (e) => {
    e.preventDefault();
    // TODO: wire this up to your search/results route,
    // e.g. router.push(`/tickets?type=${activeType}&from=...&to=...&date=...`)
  };

  return (
    <section className="relative bg-[#0B1320]">
      {/* Carousel */}
      <div className="relative">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {slides.map((slide) => {
              const Icon = slide.icon;
              return (
                <div key={slide.id} className="min-w-0 flex-[0_0_100%]">
                  <div
                    className={`flex h-110 flex-col items-center justify-center bg-linear-to-br ${slide.gradient} px-6 text-center sm:h-120`}
                  >
                    <span className="rounded-full border border-[#F2B134]/30 bg-[#F2B134]/10 px-3 py-1 text-xs font-medium uppercase tracking-wider text-[#F2B134]">
                      TicketTrail
                    </span>
                    <Icon
                      className="mt-5 h-10 w-10 text-[#F2B134]"
                      strokeWidth={1.5}
                    />
                    <h1 className="mt-4 text-3xl font-bold text-white sm:text-4xl">
                      {slide.title}
                    </h1>
                    <p className="mt-3 max-w-md text-sm text-[#9AA6B8] sm:text-base">
                      {slide.subtitle}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Dots */}
        <div className="absolute inset-x-0 bottom-20 flex justify-center gap-2 sm:bottom-16">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              type="button"
              aria-label={`Go to slide ${index + 1}`}
              onClick={() => scrollTo(index)}
              className={`h-1.5 rounded-full transition-all ${
                index === selectedIndex
                  ? "w-6 bg-[#F2B134]"
                  : "w-1.5 bg-white/30"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Search widget — ticket-shaped card, overlaps the carousel */}
      <div className="relative z-10 mx-auto -mt-16 max-w-4xl px-4 sm:-mt-14 lg:px-0">
        <form
          onSubmit={handleSearch}
          className="relative rounded-2xl bg-[#101A2B] shadow-2xl shadow-black/40"
        >
          {/* Transport type tabs */}
          <div className="flex gap-1 overflow-x-auto px-4 pt-4 sm:px-6">
            {transportTypes.map((type) => {
              const Icon = type.icon;
              const isActive = activeType === type.id;
              return (
                <button
                  key={type.id}
                  type="button"
                  onClick={() => setActiveType(type.id)}
                  className={`flex shrink-0 items-center gap-1.5 rounded-t-lg px-4 py-2.5 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-[#1A2740] text-[#F2B134]"
                      : "text-[#8A96A8] hover:text-[#C7D0DD]"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {type.label}
                </button>
              );
            })}
          </div>

          {/* Perforated divider with ticket-stub notches */}
          <div className="relative mx-4 sm:mx-6">
            <div className="border-t border-dashed border-[#1E2A3D]" />
            <span className="absolute -left-6.5-top-3 h-6 w-6 rounded-full bg-[#0B1320] sm:-left-8.5" />
            <span className="absolute -right-6.5 -top-3 h-6 w-6 rounded-full bg-[#0B1320] sm:-right-8.5" />
          </div>

          {/* Fields */}
          <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 sm:p-6 lg:grid-cols-[1fr_1fr_1fr_auto]">
            <label className="flex flex-col gap-1.5">
              <span className="text-xs font-medium uppercase tracking-wider text-[#6E7A8F]">
                From
              </span>
              <div className="flex items-center gap-2 rounded-lg border border-[#1E2A3D] bg-[#0B1320] px-3 py-2.5">
                <MapPin className="h-4 w-4 shrink-0 text-[#6E7A8F]" />
                <input
                  type="text"
                  placeholder="Dhaka"
                  className="w-full bg-transparent text-sm text-white placeholder:text-[#5C6779] focus:outline-none"
                />
              </div>
            </label>

            <label className="flex flex-col gap-1.5">
              <span className="text-xs font-medium uppercase tracking-wider text-[#6E7A8F]">
                To
              </span>
              <div className="flex items-center gap-2 rounded-lg border border-[#1E2A3D] bg-[#0B1320] px-3 py-2.5">
                <MapPin className="h-4 w-4 shrink-0 text-[#6E7A8F]" />
                <input
                  type="text"
                  placeholder="Cox's Bazar"
                  className="w-full bg-transparent text-sm text-white placeholder:text-[#5C6779] focus:outline-none"
                />
              </div>
            </label>

            <label className="flex flex-col gap-1.5">
              <span className="text-xs font-medium uppercase tracking-wider text-[#6E7A8F]">
                Date
              </span>
              <div className="flex items-center gap-2 rounded-lg border border-[#1E2A3D] bg-[#0B1320] px-3 py-2.5">
                <CalendarDays className="h-4 w-4 shrink-0 text-[#6E7A8F]" />
                <input
                  type="date"
                  className="w-full bg-transparent text-sm text-white focus:outline-none scheme:dark"
                />
              </div>
            </label>

            <button
              type="submit"
              className="flex items-center justify-center gap-2 self-end rounded-lg bg-[#F2B134] px-6 py-2.5 text-sm font-semibold text-[#0B1320] transition-colors hover:bg-[#F5C158] sm:col-span-2 lg:col-span-1"
            >
              <Search className="h-4 w-4" />
              Search Tickets
            </button>
          </div>
        </form>
      </div>

      {/* Spacer so following content clears the overlapping card */}
      <div className="h-14 sm:h-12" />
    </section>
  );
}
