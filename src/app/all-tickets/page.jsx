import FilterPanel from "@/components/FilterPanel";
import TicketCard from "@/components/TicketCard";
import { fetchTickets } from "@/lib/tickets/data";
import React from "react";

const TicketPage = async () => {
  const tickets = await fetchTickets();
  console.log(tickets);

  return (
    <div className="min-h-screen py-16 px-6 max-w-7xl mx-auto w-full space-y-12">
      <h1 className="text-4xl font-extrabold text-center tracking-tight">
        All Tickets
      </h1>
      <FilterPanel />
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {tickets?.map((ticket) => (
          <TicketCard ticket={ticket} key={ticket._id} />
        ))}
      </div>
    </div>
  );
};

export default TicketPage;
