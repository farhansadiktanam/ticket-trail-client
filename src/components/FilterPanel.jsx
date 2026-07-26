"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@heroui/react";
import { FaSlidersH, FaHistory } from "react-icons/fa";

const TRANSPORT_TYPES = ["Bus", "Train", "Launch", "Flight"];

const FROM_LOCATIONS = [
  "Dhaka",
  "Chittagong",
  "Sylhet",
  "Rajshahi",
  "Khulna",
  "Barishal",
  "Cox's Bazar",
];

const SORT_OPTIONS = [
  { label: "Newest First", value: "" },
  { label: "Price: Low → High", value: "price_asc" },
  { label: "Price: High → Low", value: "price_desc" },
  { label: "Title: A → Z", value: "title_asc" },
];

const selectCls =
  "w-full h-11 pl-4 pr-10 rounded-xl border border-white/10 bg-slate-900/60 text-white text-sm appearance-none cursor-pointer focus:outline-none focus:border-orange-500/40 transition-colors";

export default function FilterPanel() {
  const router = useRouter();

  const [search, setSearch] = useState("");
  const [transportType, setTransportType] = useState("");
  const [from, setFrom] = useState("");
  const [sort, setSort] = useState("");

  function handleApply() {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (transportType) params.set("transportType", transportType);
    if (from) params.set("from", from);
    if (sort) params.set("sort", sort);
    router.push(`/all-tickets?${params.toString()}`);
  }

  function handleReset() {
    setSearch("");
    setTransportType("");
    setFrom("");
    setSort("");
    router.push("/all-tickets");
  }

  return (
    <Card className="bg-slate-900/60 border border-white/10 backdrop-blur-xl p-5 rounded-2xl">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5 items-end">
        {/* Search by title */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Search Title
          </label>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="e.g. Dhaka to Sylhet"
            className={selectCls}
          />
        </div>

        {/* Transport Type */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Transport Type
          </label>
          <div className="relative">
            <select
              value={transportType}
              onChange={(e) => setTransportType(e.target.value)}
              className={selectCls}
            >
              <option value="">All Types</option>
              {TRANSPORT_TYPES.map((t) => (
                <option key={t} value={t.toLowerCase()}>
                  {t}
                </option>
              ))}
            </select>
            <ChevronIcon />
          </div>
        </div>

        {/* From Location */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            From
          </label>
          <div className="relative">
            <select
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className={selectCls}
            >
              <option value="">All Locations</option>
              {FROM_LOCATIONS.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
            <ChevronIcon />
          </div>
        </div>

        {/* Sort */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Sort By
          </label>
          <div className="relative">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className={selectCls}
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            <ChevronIcon />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-2">
          <button
            onClick={handleApply}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-orange-500 hover:bg-orange-400 text-white font-semibold text-sm h-11 px-4 transition"
          >
            <FaSlidersH size={13} />
            Apply
          </button>
          <button
            onClick={handleReset}
            title="Reset filters"
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 text-slate-400 hover:text-white hover:bg-white/5 transition"
          >
            <FaHistory size={13} />
          </button>
        </div>
      </div>
    </Card>
  );
}

// small helper — avoids repeating the chevron SVG 3 times
function ChevronIcon() {
  return (
    <svg
      className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19 9l-7 7-7-7"
      />
    </svg>
  );
}
