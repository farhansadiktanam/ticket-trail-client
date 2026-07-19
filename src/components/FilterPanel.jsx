"use client";

import { useState } from "react";
import { Card, Input, Button, Label } from "@heroui/react";
import { FaSearch, FaSlidersH, FaHistory } from "react-icons/fa";
import { useRouter } from "next/navigation";

const transportTypes = ["Bus", "Train", "Launch", "Flight"];

const LOCATIONS = [
  "New York",
  "San Francisco",
  "London",
  "Dhaka",
  "Tokyo",
  "Berlin",
  "Online",
];

export default function FilterPanel() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const router = useRouter();

  const handleApplyFilters = () => {
    const params = new URLSearchParams();

    if (search) {
      params.set("search", search);
    }
    if (category) params.set("category", category);
    if (location) params.set("location", location);

    router.push(`/events?${params.toString()}`);
  };

  // const handleReset = () => {
  //   setSearch("");
  //   setCategory("");
  //   setLocation("");
  //   router.push("/events");
  // };

  return (
    <Card className="relative overflow-hidden p-6 rounded-2xl border border-white/10 bg-slate-900/60 backdrop-blur-xl shadow-2xl">
      {/* Glows */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-pink-500/10 blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/10 blur-3xl pointer-events-none -z-10" />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
        {/* Search */}
        <div className="flex flex-col gap-2">
          <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Search Title
          </label>
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search keyword..."
            variant="bordered"
            className="bg-slate-900/60 border-white/10 text-white h-11"
          />
        </div>

        {/* Transport */}
        <div className="flex flex-col gap-2">
          <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Transport Type
          </label>
          <div className="relative">
            <select
              value={transportTypes}
              onChange={(e) => setTransport(e.target.value)}
              className="w-full h-11 pl-4 pr-10 rounded-xl border border-white/10 bg-slate-900/60 text-white text-sm appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-pink-500/50"
            >
              <option value="" className="bg-slate-950">
                All Transport
              </option>
              {transportTypes.map((type) => (
                <option key={type} value={type} className="bg-slate-950">
                  {type}
                </option>
              ))}
            </select>
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
          </div>
        </div>

        {/* Location */}
        <div className="flex flex-col gap-2">
          <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Location
          </label>
          <div className="relative">
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full h-11 pl-4 pr-10 rounded-xl border border-white/10 bg-slate-900/60 text-white text-sm appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-pink-500/50"
            >
              <option value="" className="bg-slate-950">
                All Locations
              </option>
              {LOCATIONS.map((loc) => (
                <option key={loc} value={loc} className="bg-slate-950">
                  {loc}
                </option>
              ))}
            </select>
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
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-2">
          <Button
            // onClick={handleApply}
            startContent={<FaSlidersH size={13} />}
            className="bg-[#F2B134] text-[#0B1320] font-semibold h-11 px-5 hover:bg-[#F5C158] flex-1"
            radius="lg"
          >
            Apply
          </Button>
          <Button
            // onClick={handleReset}
            variant="bordered"
            isIconOnly
            className="border-white/10 hover:border-white/20 hover:bg-white/5 text-slate-400 h-11 w-11"
            radius="lg"
            title="Reset"
          >
            <FaHistory size={13} />
          </Button>
        </div>
      </div>
    </Card>
  );
}
