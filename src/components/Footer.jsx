import Link from "next/link";
import { Mail, Phone, Facebook, Ticket } from "lucide-react";

import { FaFacebook, FaTicketAlt } from "react-icons/fa";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "All Tickets", href: "/tickets" },
  { label: "Contact Us", href: "/contact" },
  { label: "About", href: "/about" },
];

const paymentMethods = ["Visa", "Mastercard", "bKash", "Nagad"];

export default function Footer() {
  return (
    <footer className="relative bg-[#0B1320] text-[#C7D0DD]">
      {/* Perforated ticket-stub edge — the footer's signature detail */}
      <div
        aria-hidden="true"
        className="h-3 w-full bg-[#0B1320]"
        style={{
          backgroundImage:
            "radial-gradient(circle, #060B12 3px, transparent 3.5px)",
          backgroundSize: "18px 18px",
          backgroundPosition: "center",
        }}
      />

      <div className="mx-auto max-w-7xl px-6 py-14 lg:px-12">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
          {/* Column 1 — Logo + description */}
          <div className="lg:pr-6">
            <div className="flex items-center gap-2">
              <div className="bg-linear-to-tr from-orange-500 to-orange-500 p-2 rounded-lg text-white shadow-md shadow-orange-500/20">
                <FaTicketAlt className="text-xl" />
              </div>
              <span className="font-extrabold text-xl tracking-tight bg-linear-to-r from-white via-slate-200 to-orange-500 bg-clip-text text-transparent">
                TicketTrail
              </span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-[#8A96A8]">
              Book bus, train, launch &amp; flight tickets easily.
            </p>
          </div>

          {/* Column 2 — Quick Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Quick Links
            </h3>
            <ul className="mt-5 space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#8A96A8] transition-colors hover:text-[#36C2B4]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Contact Info */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Contact Info
            </h3>
            <ul className="mt-5 space-y-3">
              <li>
                <a
                  href="mailto:support@tickettrail.com"
                  className="flex items-center gap-2 text-sm text-[#8A96A8] transition-colors hover:text-[#36C2B4]"
                >
                  <Mail className="h-4 w-4 shrink-0" />
                  support@tickettrail.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+8800000000000"
                  className="flex items-center gap-2 text-sm text-[#8A96A8] transition-colors hover:text-[#36C2B4]"
                >
                  <Phone className="h-4 w-4 shrink-0" />
                  +880 000-000000
                </a>
              </li>
              <li>
                <a
                  href="https://facebook.com/tickettrail"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-[#8A96A8] transition-colors hover:text-[#36C2B4]"
                >
                  <FaFacebook className="h-4 w-4 shrink-0" />
                  facebook.com/tickettrail
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4 — Payment Methods */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Payment Methods
            </h3>
            <div className="mt-5 flex flex-wrap gap-2">
              {paymentMethods.map((method) => (
                <span
                  key={method}
                  className="rounded-md border border-[#1E2A3D] bg-[#101A2B] px-3 py-1.5 text-xs font-medium text-[#C7D0DD]"
                >
                  {method}
                </span>
              ))}
            </div>
            <p className="mt-4 text-xs text-[#5C6779]">
              Secure payments powered by Stripe.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-dashed border-[#1E2A3D]">
        <div className="mx-auto max-w-7xl px-6 py-5 lg:px-12">
          <p className="text-center text-xs text-[#5C6779]">
            © 2025 TicketTrail. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
