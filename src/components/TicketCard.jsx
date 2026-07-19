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
  console.log("From ticket card", ticket);

  return (
    <Card
      shadow="lg"
      className="group overflow-hidden rounded-2xl border border-default-200 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
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

        <Chip
          color="warning"
          variant="solid"
          className="absolute top-4 right-4 font-semibold"
        >
          ${ticket.price}
        </Chip>
      </div>

      {/* Content */}
      <CardBody className="space-y-4">
        {/* Title */}
        <div>
          <h3 className="text-xl font-bold line-clamp-1">{ticket.title}</h3>
        </div>

        {/* Info */}
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="flex items-center gap-2">
            <Package size={18} className="text-primary" />
            <span>{ticket.quantity} Tickets</span>
          </div>

          <div className="flex items-center gap-2">
            <Bus size={18} className="text-success" />
            <span>{ticket.transport}</span>
          </div>
        </div>

        {/* Perks */}
        <div>
          <h4 className="mb-2 font-semibold flex items-center gap-2">
            <BadgeCheck size={18} className="text-warning" />
            Perks
          </h4>

          <div className="flex flex-wrap gap-2">
            {ticket.perks.map((perk, index) => (
              <Chip key={index} size="sm" variant="flat" color="primary">
                {perk}
              </Chip>
            ))}
          </div>
        </div>
      </CardBody>

      {/* Footer */}
      <CardFooter className="flex items-center justify-between">
        <div>
          <p className="text-xs text-default-500">Price per Ticket</p>

          <p className="text-2xl font-bold text-primary">${ticket.price}</p>
        </div>

        <Link href={`/all-tickets/${ticket._id}`}>
          <Button color="primary" endContent={<ArrowRight size={18} />}>
            See Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
