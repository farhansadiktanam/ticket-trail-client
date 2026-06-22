import Link from "next/link";
import { Ticket, Home, Search } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex min-h-[80vh] flex-col items-center justify-center bg-white px-6 py-20 text-center">
      <div className="relative flex flex-col items-center">
        <span
          aria-hidden="true"
          className="absolute -top-8 select-none text-[120px] font-black leading-none text-[#0B1320]/5 sm:text-[160px]"
        >
          404
        </span>
        <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-amber-50">
          <Ticket className="h-10 w-10 text-amber-600" strokeWidth={1.75} />
        </div>
      </div>

      <p className="mt-8 text-sm font-semibold uppercase tracking-wider text-amber-600">
        Error 404
      </p>
      <h1 className="mt-3 text-3xl font-bold text-[#0B1320] sm:text-4xl">
        This route already departed
      </h1>
      <p className="mx-auto mt-4 max-w-md text-sm text-[#5C6779] sm:text-base">
        The page you&apos;re looking for doesn&apos;t exist, was moved, or the
        link is out of date. Let&apos;s get you back on track.
      </p>

      <div className="mt-8 w-32 border-t border-dashed border-[#E5E7EB]" />

      <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
        <Link
          href="/"
          className="flex items-center gap-2 rounded-lg bg-[#F2B134] px-6 py-2.5 text-sm font-semibold text-[#0B1320] transition-colors hover:bg-[#F5C158]"
        >
          <Home className="h-4 w-4" />
          Back to Home
        </Link>
        <Link
          href="/all-tickets"
          className="flex items-center gap-2 rounded-lg border border-[#E5E7EB] px-6 py-2.5 text-sm font-semibold text-[#0B1320] transition-colors hover:border-[#F2B134]/40 hover:text-amber-600"
        >
          <Search className="h-4 w-4" />
          Browse Tickets
        </Link>
      </div>
    </main>
  );
}
