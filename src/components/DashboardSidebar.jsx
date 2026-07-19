"use client";

import { signOut, useSession } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  FaBuilding,
  FaCalendarAlt,
  FaHistory,
  FaHome,
  FaPlus,
  FaSignOutAlt,
  FaTicketAlt,
  FaUserCircle,
  FaUsers,
  FaUserShield,
} from "react-icons/fa";
import Logo from "./logo";
import toast from "react-hot-toast";
import { redirect, usePathname } from "next/navigation";

const DashboardSidebar = () => {
  const { data: session } = useSession();
  const user = session?.user;
  // const role = user?.role;
  const role = "vendor";
  const pathname = usePathname();

  // console.log(user, "DASHBOARD SIDEBAR");

  const vendorMenuItems = [
    {
      key: "profile",
      label: "Profile",
      icon: FaUsers,
      href: "/dashboard/vendor",
    },
    {
      key: "add-ticket",
      label: "Add Ticket",
      icon: FaBuilding,
      href: "/dashboard/vendor/add-ticket",
    },
    {
      key: "added-ticket",
      label: "Added Ticket",
      icon: FaPlus,
      href: "/dashboard/vendor/added-ticket",
    },
    {
      key: "requested-bookings",
      label: "Requested Bookings",
      icon: FaCalendarAlt,
      href: "/dashboard/vendor/requested-bookings",
    },
    {
      key: "revenue-overview",
      label: "Revenue Overview",
      icon: FaUsers,
      href: "/dashboard/vendor/revenue-overview",
    },
  ];

  const userMenuItems = [
    {
      key: "profile",
      label: "Profile",
      icon: FaUserCircle,
      href: "/dashboard/user",
    },
    {
      key: "booked-tickets",
      label: "Booked Tickets ",
      icon: FaTicketAlt,
      href: "/dashboard/user/booked-tickets",
    },
    {
      key: "transaction-history",
      label: "Transaction History",
      icon: FaHistory,
      href: "/dashboard/user/transaction-history",
    },
  ];
  const adminMenuItems = [
    {
      key: "profile",
      label: "Profile",
      icon: FaUserShield,
      href: "/dashboard/admin",
    },
    {
      key: "manage-tickets",
      label: "Manage Tickets ",
      icon: FaCalendarAlt,
      href: "/dashboard/admin/manage-tickets",
    },
    {
      key: "manage-users",
      label: "Manage Users",
      icon: FaHistory,
      href: "/dashboard/admin/manage-users",
    },
    {
      key: "advertise-tickets",
      label: "Advertise Tickets",
      icon: FaHistory,
      href: "/dashboard/admin/advertise-tickets",
    },
  ];

  const menuItems =
    role === "vendor"
      ? vendorMenuItems
      : role === "user"
        ? userMenuItems
        : role === "admin"
          ? adminMenuItems
          : null;

  console.log(menuItems, "menuitems");

  const handleLogout = async () => {
    await signOut();
    toast.success("Logout successfull...!!");
    redirect("/");
  };
  return (
    <div>
      <aside className="w-64 h-screen border-r border-white/5 bg-slate-950">
        <div className="h-full flex flex-col bg-slate-950/80 backdrop-blur-xl">
          {/* Brand / Logo */}
          <div className="px-6 py-5 border-b border-white/5">
            <Logo />
          </div>

          {/* User Profile */}
          <div className="px-6 py-5 border-b border-white/5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-pink-500/60 shrink-0">
                <Image
                  width={40}
                  height={40}
                  src={
                    user?.image ||
                    `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || "U")}&background=7c3aed&color=fff&bold=true`
                  }
                  alt="Avatar"
                  className="object-cover w-full h-full"
                  unoptimized
                />
              </div>
              <div className="overflow-hidden">
                <p className="text-white text-sm font-bold truncate leading-tight">
                  {user?.name}
                </p>
                <span
                  className={`text-[10px] font-bold uppercase tracking-wider ${
                    role === "admin"
                      ? "text-yellow-400"
                      : role === "organizer"
                        ? "text-indigo-400"
                        : "text-pink-400"
                  }`}
                >
                  {role}
                </span>
              </div>
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="grow overflow-y-auto px-3 py-4 space-y-1">
            <p className="text-[10px] text-slate-600 font-bold uppercase tracking-widest px-3 pb-2">
              Navigation
            </p>

            {menuItems?.map(({ key, label, icon: Icon, href }) => {
              const isActive = pathname === href;
              return (
                <Link
                  key={key}
                  href={href}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-150 cursor-pointer
                ${
                  isActive
                    ? "bg-pink-500/10 text-pink-400 border border-pink-500/20"
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                }`}
                >
                  <span
                    className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors
                  ${
                    isActive
                      ? "bg-pink-500/20 text-pink-400"
                      : "bg-white/5 text-slate-400 group-hover:text-white"
                  }`}
                  >
                    <Icon size={14} />
                  </span>
                  <span>{label}</span>
                  {isActive && (
                    <span className="ml-auto w-1.5 h-1.5 rounded-full bg-pink-400" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Bottom Links */}
          <div className="px-3 py-4 border-t border-white/5 space-y-1">
            <Link
              href="/"
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-400 hover:text-white hover:bg-white/5 transition-all duration-150"
            >
              <span className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                <FaHome size={13} />
              </span>
              Back to Site
            </Link>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-400 hover:text-red-400 hover:bg-red-500/5 transition-all duration-150 cursor-pointer"
            >
              <span className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                <FaSignOutAlt size={13} />
              </span>
              Sign Out
            </button>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default DashboardSidebar;
