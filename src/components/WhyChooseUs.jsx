import { Route, ShieldCheck, Zap, Headphones } from "lucide-react";

const features = [
  {
    icon: Route,
    title: "All Transport, One Place",
    description:
      "Bus, train, launch & flight — search and compare every option in a single place.",
  },
  {
    icon: ShieldCheck,
    title: "Secure Payments",
    description:
      "Stripe-secured checkout keeps your card details and transactions protected.",
  },
  {
    icon: Zap,
    title: "Instant E-Tickets",
    description:
      "Your ticket lands the moment payment clears — no waiting, no counters.",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description:
      "Real help whenever you need it, before, during, or after your trip.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-slate-100 dark:bg-[#0B1320] px-6 py-16 lg:px-12 transition-colors duration-200">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 text-center">
          <span className="text-xs font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-500">
            The TicketTrail Difference
          </span>
          <h2 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">
            Why Choose Us?
          </h2>
          <p className="mt-3 text-sm text-slate-600 dark:text-[#8A96A8] sm:text-base">
            Booking should be the easy part of the journey.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900/60 p-6 transition-shadow hover:shadow-lg hover:shadow-black/5 dark:hover:shadow-amber-500/5"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400">
                  <Icon className="h-6 w-6" strokeWidth={1.75} />
                </span>
                <h3 className="mt-4 text-base font-semibold text-slate-900 dark:text-white">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-[#8A96A8]">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
