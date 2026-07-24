import FilterPanel from "@/components/FilterPanel";
import TicketCard from "@/components/TicketCard";
import { fetchTickets } from "@/lib/tickets/data";
import React from "react";

const TicketPage = async () => {
  const tickets = await fetchTickets();
  // console.log(tickets);

  return (
    <div className="min-h-screen py-16 px-6 max-w-7xl mx-auto w-full space-y-12 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200">
      <h1 className="text-4xl font-extrabold text-center tracking-tight text-orange-600 dark:text-orange-400">
        All Tickets
      </h1>

      <FilterPanel />

      {tickets && tickets.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {tickets.map((ticket) => (
            <TicketCard ticket={ticket} key={ticket._id} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40">
          <p className="text-lg font-medium text-slate-600 dark:text-slate-400">
            No tickets found matching your criteria.
          </p>
        </div>
      )}
    </div>
  );
};

export default TicketPage;
