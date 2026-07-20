import {
  Ticket,
  ShoppingBag,
  CircleDollarSign,
  TrendingUp,
} from "lucide-react";
import { Card, CardContent as CardBody, CardHeader } from "@heroui/react";

const stats = [
  {
    label: "Tickets Added",
    value: "12",
    icon: Ticket,
    color: "text-orange-400",
    bg: "bg-orange-500/10",
  },
  {
    label: "Tickets Sold",
    value: "87",
    icon: ShoppingBag,
    color: "text-indigo-400",
    bg: "bg-indigo-500/10",
  },
  {
    label: "Total Revenue",
    value: "৳1,04,400",
    icon: CircleDollarSign,
    color: "text-green-400",
    bg: "bg-green-500/10",
  },
];

const recentBookings = [
  {
    id: 1,
    ticket: "Dhaka to Chittagong Deluxe",
    user: "rafi@email.com",
    qty: 2,
    total: 2400,
    status: "paid",
  },
  {
    id: 2,
    ticket: "Dhaka to Cox's Bazar Express",
    user: "nusrat@email.com",
    qty: 1,
    total: 850,
    status: "accepted",
  },
  {
    id: 3,
    ticket: "Dhaka to Sylhet Night Coach",
    user: "tanvir@email.com",
    qty: 3,
    total: 2100,
    status: "pending",
  },
  {
    id: 4,
    ticket: "Dhaka to Rajshahi Green Line",
    user: "mim@email.com",
    qty: 1,
    total: 600,
    status: "rejected",
  },
  {
    id: 5,
    ticket: "Dhaka to Barishal Night Coach",
    user: "karim@email.com",
    qty: 2,
    total: 1800,
    status: "paid",
  },
];

const monthlyData = [
  { month: "Feb", amount: 8000 },
  { month: "Mar", amount: 15000 },
  { month: "Apr", amount: 9000 },
  { month: "May", amount: 21000 },
  { month: "Jun", amount: 18000 },
  { month: "Jul", amount: 27000 },
];

const STATUS_STYLES = {
  pending: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  accepted: "bg-green-500/10  text-green-400  border-green-500/20",
  rejected: "bg-red-500/10   text-red-400    border-red-500/20",
  paid: "bg-blue-500/10  text-blue-400   border-blue-500/20",
};

export default function VendorOverviewPage() {
  const maxAmount = Math.max(...monthlyData.map((d) => d.amount));

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold text-white">Overview</h1>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card
              key={stat.label}
              className="bg-slate-900 border border-white/5"
            >
              <CardBody className="flex items-center gap-4 p-5">
                <span
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${stat.bg} ${stat.color}`}
                >
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-xs text-slate-500">{stat.label}</p>
                  <p className="text-xl font-bold text-white mt-0.5">
                    {stat.value}
                  </p>
                </div>
              </CardBody>
            </Card>
          );
        })}
      </div>

      {/* Bar Chart */}
      <Card className="bg-slate-900 border border-white/5">
        <CardHeader className="pb-0">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-orange-400" />
            <h2 className="text-sm font-bold text-white">Monthly Revenue</h2>
          </div>
        </CardHeader>
        <CardBody>
          <div className="flex items-end gap-3 h-36">
            {monthlyData.map((d) => {
              const heightPx = Math.round((d.amount / maxAmount) * 120);
              return (
                <div
                  key={d.month}
                  className="flex flex-1 flex-col items-center gap-1.5"
                >
                  <span className="text-[10px] text-slate-500">
                    ৳{(d.amount / 1000).toFixed(0)}k
                  </span>
                  <div
                    className="w-full rounded-t-lg bg-linear-to-t from-orange-500 to-indigo-500"
                    style={{ height: `${heightPx}px` }}
                  />
                  <span className="text-[10px] text-slate-400">{d.month}</span>
                </div>
              );
            })}
          </div>
        </CardBody>
      </Card>

      {/* Recent Bookings */}
      <Card className="bg-slate-900 border border-white/5">
        <CardHeader className="pb-0">
          <h2 className="text-sm font-bold text-white">Recent Bookings</h2>
        </CardHeader>
        <CardBody>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/5 text-xs text-slate-500 uppercase tracking-wider">
                  <th className="pb-3 text-left font-medium">Ticket</th>
                  <th className="pb-3 text-left font-medium">User</th>
                  <th className="pb-3 text-left font-medium">Qty</th>
                  <th className="pb-3 text-left font-medium">Total</th>
                  <th className="pb-3 text-left font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {recentBookings.map((b) => (
                  <tr key={b.id}>
                    <td className="py-3 font-medium text-white">{b.ticket}</td>
                    <td className="py-3 text-slate-400 text-xs">{b.user}</td>
                    <td className="py-3 text-slate-300">{b.qty}</td>
                    <td className="py-3 font-semibold text-white">
                      ৳{b.total.toLocaleString()}
                    </td>
                    <td className="py-3">
                      <span
                        className={`rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${STATUS_STYLES[b.status]}`}
                      >
                        {b.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
