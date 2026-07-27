"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Card,
  CardContent as CardBody,
  Button,
  Modal,
  ModalBackdrop,
  ModalContainer,
  ModalDialog,
  ModalHeader,
  ModalHeading,
  ModalBody,
  ModalFooter,
  ModalCloseTrigger,
  TextField,
  Label,
  Input,
  Select,
  useOverlayState,
} from "@heroui/react";
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

const TRANSPORT_ICONS = {
  bus: Bus,
  train: TrainFront,
  launch: Sailboat,
  flight: Plane,
};

const STATUS_STYLES = {
  pending: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  approved: "bg-green-500/10 text-green-400 border-green-500/20",
  rejected: "bg-red-500/10 text-red-400 border-red-500/20",
};

export default function VendorAddedTicketsPage() {
  const [tickets, setTickets] = useState([]);
  const { data: session } = useSession();
  const user = session?.user;

  const modalState = useOverlayState();
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [updating, setUpdating] = useState(false);

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

  // ── Open modal with selected ticket data ─────────────
  function handleUpdateClick(ticket) {
    setSelectedTicket({ ...ticket });
    modalState.open();
  }

  // ── Update fields in local state ─────────────────────
  function handleModalChange(e) {
    const { name, value } = e.target;
    setSelectedTicket((prev) => ({ ...prev, [name]: value }));
  }

  // ── Save changes ─────────────────────────────────────
  async function handleUpdateSubmit() {
    if (!selectedTicket) return;
    setUpdating(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/tickets/${selectedTicket._id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: selectedTicket.title,
            from: selectedTicket.from,
            to: selectedTicket.to,
            transportType: selectedTicket.transportType,
            price: Number(selectedTicket.price),
            quantity: Number(selectedTicket.quantity),
            departureDate: selectedTicket.departureDate,
            departureTime: selectedTicket.departureTime,
          }),
        },
      );

      if (!res.ok) throw new Error("Update failed");

      setTickets((prev) =>
        prev.map((t) =>
          t._id === selectedTicket._id ? { ...t, ...selectedTicket } : t,
        ),
      );

      modalState.close();
    } catch (err) {
      alert(err.message);
    } finally {
      setUpdating(false);
    }
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">My Added Tickets</h1>
        <Link href="/dashboard/vendor/add-ticket">
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
          <Link href="/dashboard/vendor/add-ticket" className="mt-4">
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
                <span
                  className={`absolute top-3 left-3 rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider backdrop-blur-sm ${STATUS_STYLES[ticket.verificationStatus]}`}
                >
                  {ticket.verificationStatus}
                </span>
                <span className="absolute top-3 right-3 flex items-center gap-1 bg-slate-950/80 backdrop-blur-sm text-slate-300 text-[10px] font-semibold uppercase px-2.5 py-1 rounded-full border border-white/10">
                  <Icon className="h-3 w-3" />
                  {ticket.transportType}
                </span>
              </div>

              <CardBody className="flex flex-col gap-3 p-4">
                <h3 className="font-bold text-white text-sm line-clamp-1">
                  {ticket.title}
                </h3>

                <div className="flex items-center gap-1.5 text-xs text-slate-400">
                  <MapPin className="h-3.5 w-3.5 text-orange-500 shrink-0" />
                  {ticket.from} → {ticket.to}
                </div>

                <div className="flex items-center gap-1.5 text-xs text-slate-400">
                  <Calendar className="h-3.5 w-3.5 text-slate-600 shrink-0" />
                  {ticket.departureDate} at {ticket.departureTime}
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="font-bold text-white">
                    ৳{ticket.price.toLocaleString()}
                  </span>
                  <span className="text-xs text-slate-400">
                    {ticket.quantity} seats left
                  </span>
                </div>

                <div className="border-t border-dashed border-white/5" />

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <Button
                    isDisabled={isRejected}
                    onPress={() => handleUpdateClick(ticket)}
                    className="flex-1 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white font-semibold text-xs h-9"
                  >
                    <Pencil className="h-3.5 w-3.5 mr-1" />
                    Update
                  </Button>
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

      {/* ── HeroUI Update Modal ── */}
      <Modal state={modalState}>
        <ModalBackdrop variant="blur">
          <ModalContainer size="lg">
            <ModalDialog className="bg-slate-900 border border-white/10 text-white">
              <ModalCloseTrigger />

              <ModalHeader className="border-b border-white/5">
                <ModalHeading className="text-white text-lg font-semibold">
                  Update Ticket
                </ModalHeading>
              </ModalHeader>

              <ModalBody className="py-4 flex flex-col gap-4">
                {selectedTicket && (
                  <>
                    <TextField>
                      <Label className="text-xs text-slate-400 mb-1 block">
                        Ticket Title
                      </Label>
                      <Input
                        name="title"
                        value={selectedTicket.title}
                        onChange={handleModalChange}
                        className="bg-slate-800 border-white/10 text-white text-sm rounded-xl"
                      />
                    </TextField>

                    <div className="grid grid-cols-2 gap-3">
                      <TextField>
                        <Label className="text-xs text-slate-400 mb-1 block">
                          From
                        </Label>
                        <Input
                          name="from"
                          value={selectedTicket.from}
                          onChange={handleModalChange}
                          className="bg-slate-800 border-white/10 text-white text-sm rounded-xl"
                        />
                      </TextField>
                      <TextField>
                        <Label className="text-xs text-slate-400 mb-1 block">
                          To
                        </Label>
                        <Input
                          name="to"
                          value={selectedTicket.to}
                          onChange={handleModalChange}
                          className="bg-slate-800 border-white/10 text-white text-sm rounded-xl"
                        />
                      </TextField>
                    </div>

                    <TextField>
                      <Label className="text-xs text-slate-400 mb-1 block">
                        Transport Type
                      </Label>
                      <Select
                        name="transportType"
                        value={selectedTicket.transportType}
                        onChange={handleModalChange}
                        className="bg-slate-800 border-white/10 text-white text-sm rounded-xl"
                      >
                        <option value="bus">Bus</option>
                        <option value="train">Train</option>
                        <option value="launch">Launch</option>
                        <option value="flight">Flight</option>
                      </Select>
                    </TextField>

                    <div className="grid grid-cols-2 gap-3">
                      <TextField>
                        <Label className="text-xs text-slate-400 mb-1 block">
                          Price (৳)
                        </Label>
                        <Input
                          name="price"
                          type="number"
                          min={1}
                          value={selectedTicket.price}
                          onChange={handleModalChange}
                          className="bg-slate-800 border-white/10 text-white text-sm rounded-xl"
                        />
                      </TextField>
                      <TextField>
                        <Label className="text-xs text-slate-400 mb-1 block">
                          Seats
                        </Label>
                        <Input
                          name="quantity"
                          type="number"
                          min={0}
                          value={selectedTicket.quantity}
                          onChange={handleModalChange}
                          className="bg-slate-800 border-white/10 text-white text-sm rounded-xl"
                        />
                      </TextField>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <TextField>
                        <Label className="text-xs text-slate-400 mb-1 block">
                          Departure Date
                        </Label>
                        <Input
                          name="departureDate"
                          type="date"
                          value={selectedTicket.departureDate}
                          onChange={handleModalChange}
                          className="bg-slate-800 border-white/10 text-white text-sm rounded-xl scheme:dark"
                        />
                      </TextField>
                      <TextField>
                        <Label className="text-xs text-slate-400 mb-1 block">
                          Departure Time
                        </Label>
                        <Input
                          name="departureTime"
                          type="time"
                          value={selectedTicket.departureTime}
                          onChange={handleModalChange}
                          className="bg-slate-800 border-white/10 text-white text-sm rounded-xl scheme:dark"
                        />
                      </TextField>
                    </div>
                  </>
                )}
              </ModalBody>

              <ModalFooter className="border-t border-white/5 flex justify-end gap-2">
                <Button
                  variant="flat"
                  slot="close"
                  className="text-slate-400 hover:text-white"
                >
                  Cancel
                </Button>
                <Button
                  isPending={updating}
                  onPress={handleUpdateSubmit}
                  className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold"
                >
                  Save Changes
                </Button>
              </ModalFooter>
            </ModalDialog>
          </ModalContainer>
        </ModalBackdrop>
      </Modal>
    </div>
  );
}
