import {
  Users,
  Ticket,
  ShoppingBag,
  Megaphone,
  CircleDollarSign,
  TrendingUp,
} from "lucide-react";
import { Card, CardContent as CardBody, CardHeader } from "@heroui/react";

// ── Static data — replace with real fetch later ───────────────────────────
const stats = [
  {
    label: "Total Users",
    value: "124",
    icon: Users,
    color: "text-indigo-400",
    bg: "bg-indigo-500/10",
  },
  {
    label: "Total Tickets",
    value: "38",
    icon: Ticket,
    color: "text-orange-400",
    bg: "bg-orange-500/10",
  },
  {
    label: "Total Bookings",
    value: "312",
    icon: ShoppingBag,
    color: "text-teal-400",
    bg: "bg-teal-500/10",
  },
  {
    label: "Advertised",
    value: "6 / 6",
    icon: Megaphone,
    color: "text-purple-400",
    bg: "bg-purple-500/10",
  },
  {
    label: "Total Revenue",
    value: "৳3,74,800",
    icon: CircleDollarSign,
    color: "text-green-400",
    bg: "bg-green-500/10",
  },
];

const getUsers = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/users`);
  const data = await res.json();
  return data || [];
};

const pendingTickets = [
  {
    _id: "1",
    title: "Dhaka to Chittagong Deluxe",
    vendorEmail: "vendor1@email.com",
    price: 1200,
    transportType: "bus",
  },
  {
    _id: "2",
    title: "Dhaka to Sylhet Night Coach",
    vendorEmail: "vendor2@email.com",
    price: 700,
    transportType: "bus",
  },
  {
    _id: "3",
    title: "Dhaka to Rajshahi Express",
    vendorEmail: "vendor3@email.com",
    price: 600,
    transportType: "train",
  },
];

const getBooking = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/bookings`);
  return res.json() || [];
};

const monthlyData = [
  { month: "Feb", value: 40 },
  { month: "Mar", value: 65 },
  { month: "Apr", value: 50 },
  { month: "May", value: 80 },
  { month: "Jun", value: 72 },
  { month: "Jul", value: 95 },
];

const ROLE_STYLES = {
  admin: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  vendor: "bg-orange-500/10 text-orange-400 border-orange-500/20",
  user: "bg-slate-500/10  text-slate-400  border-slate-500/20",
};

const TRANSPORT_STYLES = {
  bus: "bg-orange-500/10 text-orange-400",
  train: "bg-teal-500/10   text-teal-400",
  launch: "bg-blue-500/10   text-blue-400",
  flight: "bg-purple-500/10 text-purple-400",
};

export default async function AdminOverviewPage() {
  const max = Math.max(...monthlyData.map((d) => d.value));
  const users = await getUsers();
  const bookings = await getBooking();

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold text-white">Admin Overview</h1>

      {/* ── Stat Cards ── */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card
              key={stat.label}
              className="bg-slate-900 border border-white/5"
            >
              <CardBody className="flex items-center gap-3 p-4">
                <span
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${stat.bg} ${stat.color}`}
                >
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-[11px] text-slate-500">{stat.label}</p>
                  <p className="text-lg font-bold text-white">{stat.value}</p>
                </div>
              </CardBody>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* ── Bookings Bar Chart ── */}
        <Card className="bg-slate-900 border border-white/5">
          <CardHeader className="pb-0">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-orange-400" />
              <h2 className="text-sm font-bold text-white">Monthly Bookings</h2>
            </div>
          </CardHeader>
          <CardBody>
            <div className="flex items-end gap-3 h-36">
              {monthlyData.map((d) => {
                const heightPx = Math.round((d.value / max) * 120);
                return (
                  <div
                    key={d.month}
                    className="flex flex-1 flex-col items-center gap-1.5"
                  >
                    <span className="text-[10px] text-slate-500">
                      {d.value}
                    </span>
                    <div
                      className="w-full rounded-t-lg bg-linear-to-t from-orange-500 to-indigo-500"
                      style={{ height: `${heightPx}px` }}
                    />
                    <span className="text-[10px] text-slate-400">
                      {d.month}
                    </span>
                  </div>
                );
              })}
            </div>
          </CardBody>
        </Card>

        {/* ── Pending Tickets ── */}
        <Card className="bg-slate-900 border border-white/5">
          <CardHeader className="pb-0 flex items-center justify-between">
            <h2 className="text-sm font-bold text-white">Pending Approvals</h2>
            <span className="text-[10px] bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 rounded-full px-2 py-0.5 font-bold">
              {bookings.length} pending
            </span>
          </CardHeader>
          <CardBody className="flex flex-col gap-3">
            {bookings.length === 0 ? (
              <p className="text-sm text-slate-500 text-center py-4">
                All caught up!
              </p>
            ) : (
              bookings.map((ticket) => (
                <div
                  key={ticket._id}
                  className="flex items-center justify-between rounded-xl bg-slate-800/50 px-4 py-3"
                >
                  <div>
                    <p className="text-sm font-semibold text-white line-clamp-1">
                      {ticket.ticketTitle}
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {ticket.vendorEmail || ticket.userEmail}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded-md capitalize ${TRANSPORT_STYLES[ticket.transportType]}`}
                    >
                      {ticket.departureDate}
                    </span>
                    <span className="text-xs font-bold text-white">
                      Tk{ticket.totalPrice}
                    </span>
                  </div>
                </div>
              ))
            )}
          </CardBody>
        </Card>
      </div>

      {/* ── Recent Users ── */}
      <Card className="bg-slate-900 border border-white/5">
        <CardHeader className="pb-0">
          <h2 className="text-sm font-bold text-white">Recent Users</h2>
        </CardHeader>
        <CardBody>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/5 text-xs text-slate-500 uppercase tracking-wider">
                  <th className="pb-3 text-left font-medium">Name</th>
                  <th className="pb-3 text-left font-medium">Email</th>
                  <th className="pb-3 text-left font-medium">Role</th>
                  <th className="pb-3 text-left font-medium">Joined</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {users?.map((user) => (
                  <tr key={user._id}>
                    <td className="py-3 font-medium text-white">{user.name}</td>
                    <td className="py-3 text-slate-400 text-xs">
                      {user.email}
                    </td>
                    <td className="py-3">
                      <span
                        className={`rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase ${ROLE_STYLES[user.role]}`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="py-3 text-slate-400 text-xs">
                      {user.createdAt}
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
