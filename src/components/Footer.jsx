import Link from "next/link";
import { Mail, Phone, Facebook, Ticket } from "lucide-react";

import { FaFacebook, FaTicketAlt } from "react-icons/fa";
import Logo from "./logo";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "All Tickets", href: "/tickets" },
  { label: "Contact Us", href: "/contact" },
  { label: "About", href: "/about" },
];

const paymentMethods = ["Visa", "Mastercard", "bKash", "Nagad"];

export default function Footer() {
  return (
    <footer className="relative bg-slate-100 text-slate-700 dark:bg-[#0B1320] dark:text-[#C7D0DD] transition-colors duration-200">
      {/* Perforated ticket-stub edge — theme adaptive */}
      {/* <div
        aria-hidden="true"
        className="h-3 w-full bg-slate-100 dark:bg-[#0B1320] transition-colors duration-200"
        style={{
          backgroundImage:
            "radial-gradient(circle, var(--stub-bg, #f1f5f9) 3px, transparent 3.5px)",
          backgroundSize: "18px 18px",
          backgroundPosition: "center",
        }}
      /> */}

      <div className="mx-auto max-w-7xl px-6 py-14 lg:px-12">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
          {/* Column 1 — Logo + description */}
          <div className="lg:pr-6">
            <div className="flex items-center gap-2">
              <Logo />
            </div>
            <p className="mt-4 text-sm leading-relaxed text-slate-500 dark:text-[#8A96A8]">
              Book bus, train, launch &amp; flight tickets easily.
            </p>
          </div>

          {/* Column 2 — Quick Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-900 dark:text-white">
              Quick Links
            </h3>
            <ul className="mt-5 space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-600 dark:text-[#8A96A8] transition-colors hover:text-orange-500 dark:hover:text-orange-500"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Contact Info */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-900 dark:text-white">
              Contact Info
            </h3>
            <ul className="mt-5 space-y-3">
              <li>
                <a
                  href="mailto:support@tickettrail.com"
                  className="flex items-center gap-2 text-sm text-slate-600 dark:text-[#8A96A8] transition-colors hover:text-orange-500 dark:hover:text-orange-500"
                >
                  <Mail className="h-4 w-4 shrink-0 text-slate-500 dark:text-slate-400" />
                  support@tickettrail.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+8800000000000"
                  className="flex items-center gap-2 text-sm text-slate-600 dark:text-[#8A96A8] transition-colors hover:text-orange-500 dark:hover:text-orange-500"
                >
                  <Phone className="h-4 w-4 shrink-0 text-slate-500 dark:text-slate-400" />
                  +880 000-000000
                </a>
              </li>
              <li>
                <a
                  href="https://facebook.com/tickettrail"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-slate-600 dark:text-[#8A96A8] transition-colors hover:text-orange-500 dark:hover:text-orange-500"
                >
                  <FaFacebook className="h-4 w-4 shrink-0 text-slate-500 dark:text-slate-400" />
                  facebook.com/tickettrail
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4 — Payment Methods */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-900 dark:text-white">
              Payment Methods
            </h3>
            <div className="mt-5 flex flex-wrap gap-2">
              {paymentMethods.map((method) => (
                <span
                  key={method}
                  className="rounded-md border border-slate-200 bg-white text-slate-700 dark:border-[#1E2A3D] dark:bg-[#101A2B] dark:text-[#C7D0DD] px-3 py-1.5 text-xs font-medium shadow-xs dark:shadow-none"
                >
                  {method}
                </span>
              ))}
            </div>
            <p className="mt-4 text-xs text-slate-500 dark:text-[#5C6779]">
              Secure payments powered by Stripe.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-dashed border-slate-200 dark:border-[#1E2A3D]">
        <div className="mx-auto max-w-7xl px-6 py-5 lg:px-12">
          <p className="text-center text-xs text-slate-500 dark:text-[#5C6779]">
            © 2026 TicketTrail. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
