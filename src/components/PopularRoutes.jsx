import Link from "next/link";
import { Bus, TrainFront, Sailboat, Plane, ArrowRight } from "lucide-react";

const routes = [
  {
    id: 1,
    type: "bus",
    icon: Bus,
    from: "Dhaka",
    to: "Cox's Bazar",
    price: 850,
    duration: "9h 30m",
  },
  {
    id: 2,
    type: "train",
    icon: TrainFront,
    from: "Dhaka",
    to: "Chattogram",
    price: 450,
    duration: "6h",
  },
  {
    id: 3,
    type: "launch",
    icon: Sailboat,
    from: "Dhaka",
    to: "Barishal",
    price: 350,
    duration: "7h",
  },
  {
    id: 4,
    type: "flight",
    icon: Plane,
    from: "Dhaka",
    to: "Sylhet",
    price: 2900,
    duration: "45m",
  },
  {
    id: 5,
    type: "train",
    icon: TrainFront,
    from: "Dhaka",
    to: "Rajshahi",
    price: 525,
    duration: "6h 30m",
  },
  {
    id: 6,
    type: "bus",
    icon: Bus,
    from: "Chattogram",
    to: "Cox's Bazar",
    price: 420,
    duration: "4h",
  },
];

const typeStyles = {
  bus: "bg-orange-50 text-orange-600",
  train: "bg-teal-50 text-teal-600",
  launch: "bg-blue-50 text-blue-600",
  flight: "bg-purple-50 text-purple-600",
};

export default function PopularRoutes() {
  return (
    <section className="bg-slate-50 dark:bg-[#0B1320] px-6 py-16 lg:px-12 transition-colors duration-200">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mb-10 text-center">
          <span className="text-xs font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-500">
            Trending This Month
          </span>
          <h2 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">
            Popular Routes
          </h2>
          <p className="mt-3 text-sm text-slate-600 dark:text-[#8A96A8] sm:text-base">
            The journeys travelers are booking the most right now.
          </p>
        </div>

        {/* Route Cards Grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {routes.map((route) => {
            const Icon = route.icon;
            return (
              <Link
                key={route.id}
                href={`/all-tickets?from=${route.from}&to=${route.to}&type=${route.type}`}
                className="group relative rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900/60 p-5 transition-all hover:-translate-y-0.5 hover:border-amber-500/50 dark:hover:border-amber-500/50 hover:shadow-lg hover:shadow-black/5 dark:hover:shadow-amber-500/5"
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`flex h-10 w-10 items-center justify-center rounded-full ${typeStyles[route.type]}`}
                  >
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-[#9AA6B8]">
                    {route.duration}
                  </span>
                </div>

                <div className="mt-5 flex items-center gap-2 text-base font-semibold text-slate-900 dark:text-white">
                  <span>{route.from}</span>
                  <ArrowRight className="h-4 w-4 shrink-0 text-slate-400 dark:text-[#9AA6B8] transition-transform group-hover:translate-x-1" />
                  <span>{route.to}</span>
                </div>

                <div className="my-4 border-t border-dashed border-slate-200 dark:border-white/10" />

                <div className="flex items-baseline justify-between">
                  <p className="text-sm text-slate-600 dark:text-[#8A96A8]">
                    From{" "}
                    <span className="text-lg font-bold text-slate-900 dark:text-white">
                      ৳{route.price}
                    </span>
                  </p>
                  <span className="text-sm font-semibold text-amber-600 dark:text-amber-500 group-hover:underline">
                    View Tickets
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
