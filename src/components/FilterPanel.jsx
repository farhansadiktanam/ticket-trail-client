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
    <Card
      className="relative overflow-hidden p-8 shadow-2xl rounded-3xl"
      radius="none"
    >
      {/* Decorative gradient glow behind the panel */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-linear-to-br from-pink-500/10 via-purple-600/5 to-transparent blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-linear-to-tr from-indigo-500/10 via-indigo-600/5 to-transparent blur-3xl pointer-events-none -z-10" />

      <div className="gap-6 grid grid-cols-1 md:grid-cols-4 items-end">
        {/* Search Input */}
        <div className="flex flex-col gap-2">
          <Label
            htmlFor="search-title"
            className="text-xs font-bold uppercase tracking-wider text-slate-400"
          >
            Search Title
          </Label>
          <Input
            // value={search}
            // onChange={(e) => setSearch(e.target.value)}
            id="search-title"
            placeholder="Search keyword..."
            // startContent={<FaSearch className="text-pink-500 text-sm mr-1" />}
            variant="bordered"
            className="w-full bg-slate-900/60 border border-white/10 rounded-xl p-3 focus:outline-none focus:border-pink-500 hover:border-white/20 text-white text-sm cursor-pointer h-12 flex items-center transition-all duration-300"
          />
        </div>

        {/* Category Selector */}
        <div className="flex flex-col gap-2">
          <Label
            htmlFor="filter-category"
            className="text-xs font-bold uppercase tracking-wider text-slate-400"
          >
            Transport Types
          </Label>
          <div className="relative group">
            <select
              // value={transportTypes}
              // onChange={(e) => setCategory(e.target.value)}
              aria-label="Category"
              className="w-full bg-slate-900/60 border border-white/10 rounded-xl px-3 h-12 text-white text-sm appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-pink-500/50"
            >
              <option value="" className="bg-slate-950 text-white">
                All Transport
              </option>
              {transportTypes.map((type) => (
                <option
                  key={type}
                  value={type}
                  className="bg-slate-950 text-white"
                >
                  {type}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Location Selector */}
        <div className="flex flex-col gap-2">
          <Label
            htmlFor="filter-location"
            className="text-xs font-bold uppercase tracking-wider text-slate-400"
          >
            Location
          </Label>
          <div className="relative group">
            <select
              // value={location}
              // onChange={(e) => setLocation(e.target.value)}
              aria-label="Category"
              className="w-full bg-slate-900/60 border border-white/10 rounded-xl px-3 h-12 text-white text-sm appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-pink-500/50"
            >
              <option value="" className="bg-slate-950 text-white">
                All Locations
              </option>
              {LOCATIONS.map((loc) => (
                <option
                  key={loc}
                  value={loc}
                  className="bg-slate-950 text-white"
                >
                  {loc}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 w-full">
          <Button
            // onClick={handleApplyFilters}
            className="flex items-center justify-center gap-2 self-end rounded-lg bg-[#F2B134] px-6 py-2.5 text-sm font-semibold text-[#0B1320] transition-colors hover:bg-[#F5C158] sm:col-span-2 lg:col-span-1 h-12"
            startContent={<FaSlidersH size={13} />}
          >
            Apply Filters
          </Button>
          <Button
            // onClick={handleReset}
            variant="bordered"
            className="border-white/10 hover:border-white/20 hover:bg-white/5 text-white font-semibold h-12 transition-all duration-200 px-4 min-w-0"
            title="Reset Filters"
          >
            <FaHistory size={13} className="text-slate-400 hover:text-white" />
          </Button>
        </div>
      </div>
    </Card>
  );
}
