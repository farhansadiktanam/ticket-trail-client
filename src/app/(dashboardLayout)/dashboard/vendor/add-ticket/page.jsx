"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import {
  Card,
  CardContent as CardBody,
  CardHeader,
  Button,
} from "@heroui/react";
import { uploadImage } from "@/utils/imageUpload";
import Image from "next/image";

const PERKS = [
  "AC",
  "WiFi",
  "Snacks",
  "Meal",
  "Blanket",
  "Charging Port",
  "Recliner Seat",
  "Cabin",
];

export default function VendorAddTicketPage() {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [selectedPerks, setSelectedPerks] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function togglePerk(perk) {
    setSelectedPerks((prev) =>
      prev.includes(perk) ? prev.filter((p) => p !== perk) : [...prev, perk],
    );
  }

  function handleImageChange(e) {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!imageFile) return setError("Please select an image.");

    const formData = new FormData(e.target);

    try {
      setLoading(true);
      const imageUrl = await uploadImage(imageFile);
      const payload = {
        title: formData.get("title"),
        from: formData.get("from"),
        to: formData.get("to"),
        transportType: formData.get("transportType"),
        price: Number(formData.get("price")),
        quantity: Number(formData.get("quantity")),
        departureDate: formData.get("departureDate"),
        departureTime: formData.get("departureTime"),
        description: formData.get("description"),
        perks: selectedPerks,
        image: imageUrl,
        vendorName: user?.name,
        vendorEmail: user?.email,
      };

      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/tickets`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to submit ticket");

      router.push("/all-tickets");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-white mb-6">Add New Ticket</h1>

      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4">
          {/* Basic Info */}
          <Card className="bg-slate-900 border border-white/5">
            <CardHeader className="text-xs font-bold uppercase tracking-wider text-slate-400 pb-0">
              Basic Info
            </CardHeader>
            <CardBody className="flex flex-col gap-3">
              <div>
                <label className="text-sm text-slate-400 mb-1 block">
                  Ticket Title *
                </label>
                <input
                  name="title"
                  required
                  placeholder="e.g. Dhaka to Chittagong Deluxe"
                  className={input}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm text-slate-400 mb-1 block">
                    From *
                  </label>
                  <input
                    name="from"
                    required
                    placeholder="Dhaka"
                    className={input}
                  />
                </div>
                <div>
                  <label className="text-sm text-slate-400 mb-1 block">
                    To *
                  </label>
                  <input
                    name="to"
                    required
                    placeholder="Chittagong"
                    className={input}
                  />
                </div>
              </div>
            </CardBody>
          </Card>

          {/* Transport & Pricing */}
          <Card className="bg-slate-900 border border-white/5">
            <CardHeader className="text-xs font-bold uppercase tracking-wider text-slate-400 pb-0">
              Transport & Pricing
            </CardHeader>
            <CardBody className="flex flex-col gap-3">
              <div>
                <label className="text-sm text-slate-400 mb-1 block">
                  Transport Type *
                </label>
                <select name="transportType" required className={input}>
                  <option value="bus">Bus</option>
                  <option value="train">Train</option>
                  <option value="launch">Launch</option>
                  <option value="flight">Flight</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm text-slate-400 mb-1 block">
                    Price (৳) *
                  </label>
                  <input
                    name="price"
                    type="number"
                    min={1}
                    required
                    placeholder="1200"
                    className={input}
                  />
                </div>
                <div>
                  <label className="text-sm text-slate-400 mb-1 block">
                    Seats *
                  </label>
                  <input
                    name="quantity"
                    type="number"
                    min={1}
                    required
                    placeholder="40"
                    className={input}
                  />
                </div>
              </div>
            </CardBody>
          </Card>

          {/* Departure */}
          <Card className="bg-slate-900 border border-white/5">
            <CardHeader className="text-xs font-bold uppercase tracking-wider text-slate-400 pb-0">
              Departure
            </CardHeader>
            <CardBody className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm text-slate-400 mb-1 block">
                  Date *
                </label>
                <input
                  name="departureDate"
                  type="date"
                  required
                  className={`${input} scheme:dark`}
                />
              </div>
              <div>
                <label className="text-sm text-slate-400 mb-1 block">
                  Time *
                </label>
                <input
                  name="departureTime"
                  type="time"
                  required
                  className={`${input} scheme:dark`}
                />
              </div>
            </CardBody>
          </Card>

          {/* Perks */}
          <Card className="bg-slate-900 border border-white/5">
            <CardHeader className="text-xs font-bold uppercase tracking-wider text-slate-400 pb-0">
              Perks
            </CardHeader>
            <CardBody className="grid grid-cols-2 gap-2">
              {PERKS.map((perk) => (
                <label
                  key={perk}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    value={perk}
                    checked={selectedPerks.includes(perk)}
                    onChange={() => togglePerk(perk)}
                    className="accent-orange-500 h-4 w-4"
                  />
                  <span className="text-sm text-slate-300">{perk}</span>
                </label>
              ))}
            </CardBody>
          </Card>

          {/* Image */}
          <Card className="bg-slate-900 border border-white/5">
            <CardHeader className="text-xs font-bold uppercase tracking-wider text-slate-400 pb-0">
              Ticket Image *
            </CardHeader>
            <CardBody className="flex flex-col gap-3">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="text-sm text-slate-400 file:mr-3 file:rounded-lg file:border-0 file:bg-slate-700 file:px-3 file:py-1.5 file:text-sm file:text-white file:cursor-pointer"
              />
              {preview && (
                <Image
                  src={preview}
                  alt="Preview"
                  fill
                  unoptimized
                  className="rounded-xl object-cover"
                />
              )}
            </CardBody>
          </Card>

          {/* Vendor Info */}
          <Card className="bg-slate-900 border border-white/5">
            <CardHeader className="text-xs font-bold uppercase tracking-wider text-slate-400 pb-0">
              Vendor Info
            </CardHeader>
            <CardBody className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm text-slate-400 mb-1 block">
                  Name
                </label>
                <input
                  value={user?.name || ""}
                  readOnly
                  className={`${input} opacity-50`}
                />
              </div>
              <div>
                <label className="text-sm text-slate-400 mb-1 block">
                  Email
                </label>
                <input
                  value={user?.email || ""}
                  readOnly
                  className={`${input} opacity-50`}
                />
              </div>
            </CardBody>
          </Card>

          {/* Error */}
          {error && (
            <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
              {error}
            </p>
          )}

          {/* Submit */}
          <Button
            type="submit"
            isLoading={loading}
            className="w-full bg-orange-500 hover:bg-orange-400 text-white font-bold h-11"
          >
            {loading ? "Submitting…" : "Add Ticket"}
          </Button>
        </div>
      </form>
    </div>
  );
}

const input =
  "w-full rounded-xl border border-white/10 bg-slate-800 px-4 py-2.5 text-sm text-white placeholder:text-slate-600 focus:border-orange-500/40 focus:outline-none";
