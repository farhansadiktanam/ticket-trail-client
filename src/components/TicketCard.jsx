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
      className="group overflow-hidden rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900/60 backdrop-blur-xl hover:shadow-2xl hover:shadow-violet-500/10 hover:border-violet-500/30 transition-all duration-300 hover:-translate-y-2"
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
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent" />
        <Chip
          variant="solid"
          className="absolute top-4 right-4 font-semibold bg-orange-500 text-white border border-orange-400/30 shadow-md"
        >
          Tk {ticket.price}
        </Chip>
      </div>

      {/* Content */}
      <CardBody className="space-y-4 p-5">
        {/* Title */}
        <h3 className="text-xl font-bold text-slate-900 dark:text-white line-clamp-1">
          {ticket.title}
        </h3>

        {/* Info */}
        <div className="grid grid-cols-2 gap-3 text-sm text-slate-600 dark:text-slate-300">
          <div className="flex items-center gap-2">
            <Package
              size={16}
              className="text-violet-600 dark:text-violet-400 shrink-0"
            />
            <span>{ticket.quantity} Tickets</span>
          </div>
          <div className="flex items-center gap-2">
            <Bus
              size={16}
              className="text-emerald-600 dark:text-emerald-400 shrink-0"
            />
            <span>{ticket.transport}</span>
          </div>
        </div>

        {/* Perks */}
        <div>
          <h4 className="mb-2 text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
            <BadgeCheck
              size={16}
              className="text-amber-500 dark:text-yellow-400 shrink-0"
            />
            Perks
          </h4>
          <div className="flex flex-wrap gap-2">
            {ticket.perks.map((perk, index) => (
              <Chip
                key={index}
                size="sm"
                variant="flat"
                className="bg-orange-500/10 text-orange-600 dark:text-orange-300 border border-orange-500/20 text-xs font-medium"
              >
                {perk}
              </Chip>
            ))}
          </div>
        </div>
      </CardBody>

      {/* Footer */}
      <CardFooter className="flex items-center justify-between border-t border-slate-100 dark:border-white/5 px-5 py-4 mt-auto">
        <div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Price per Ticket
          </p>
          <p className="text-2xl font-bold text-violet-600 dark:text-violet-400">
            Tk {ticket.price}
          </p>
        </div>

        <Link href={`/all-tickets/${ticket._id}`}>
          <Button
            endContent={<ArrowRight size={16} />}
            className="bg-orange-600 hover:bg-orange-500 text-white font-semibold shadow-md shadow-orange-600/20"
            radius="lg"
          >
            See Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
