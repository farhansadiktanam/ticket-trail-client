"use client";

import Image from "next/image";
import Link from "next/link";

import {
  Card,
  CardContent as CardBody,
  CardFooter,
  Chip,
  Button,
} from "@heroui/react";

import { Bus, Package, Users, BadgeCheck, ArrowRight } from "lucide-react";

export default function TicketCard({ ticket }) {
  // console.log("From ticket card", ticket);
  return (
    <Card
      shadow="lg"
      className="group overflow-hidden rounded-2xl border border-white/10 bg-slate-900/60 backdrop-blur-xl hover:shadow-2xl hover:shadow-violet-500/10 hover:border-violet-500/30 transition-all duration-300 hover:-translate-y-2"
    >
      {/* Image */}
      <div className="relative h-56 overflow-hidden">
        <Image
          src={ticket.image}
          alt={ticket.title}
          fill
          unoptimized
          loading="eager"
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-linear-to-t from-slate-900/60 to-transparent" />
        <Chip
          variant="solid"
          className="absolute top-4 right-4 font-semibold bg-orange-500/90 text-white border border-orange-400/30"
        >
          ${ticket.price}
        </Chip>
      </div>

      {/* Content */}
      <CardBody className="space-y-4">
        {/* Title */}
        <h3 className="text-xl font-bold text-white line-clamp-1">
          {ticket.title}
        </h3>

        {/* Info */}
        <div className="grid grid-cols-2 gap-3 text-sm text-slate-300">
          <div className="flex items-center gap-2">
            <Package size={16} className="text-violet-400" />
            <span>{ticket.quantity} Tickets</span>
          </div>
          <div className="flex items-center gap-2">
            <Bus size={16} className="text-emerald-400" />
            <span>{ticket.transport}</span>
          </div>
        </div>

        {/* Perks */}
        <div>
          <h4 className="mb-2 text-sm font-semibold text-slate-300 flex items-center gap-2">
            <BadgeCheck size={16} className="text-yellow-400" />
            Perks
          </h4>
          <div className="flex flex-wrap gap-2">
            {ticket.perks.map((perk, index) => (
              <Chip
                key={index}
                size="sm"
                variant="flat"
                className="bg-orange-500/10 text-orange-300 border border-orange-500/20 text-xs"
              >
                {perk}
              </Chip>
            ))}
          </div>
        </div>
      </CardBody>

      {/* Footer */}
      <CardFooter className="flex items-center justify-between border-t border-white/5 mt-2">
        <div>
          <p className="text-xs text-slate-500">Price per Ticket</p>
          <p className="text-2xl font-bold text-violet-400">${ticket.price}</p>
        </div>

        <Link href={`/all-tickets/${ticket._id}`}>
          <Button
            // as={Link}
            endContent={<ArrowRight size={16} />}
            className="bg-orange-600 hover:bg-orange-500 text-white font-semibold"
            radius="lg"
          >
            See Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
