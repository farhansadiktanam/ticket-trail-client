"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Avatar, Button } from "@heroui/react";
import { FaTicketAlt } from "react-icons/fa";
import { authClient } from "@/lib/auth-client";
import Logo from "./logo";

export default function Navbar() {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const user = session?.user;
  console.log(user);

  const handleSignOut = async () => {
    await authClient.signOut();
    router.push("/");
  };

  return (
    <nav className="flex justify-between items-center p-4 shadow-lg bg-slate-900">
      <Link href="/" className="flex items-center gap-2">
        <Logo />
      </Link>

      <ul className="flex gap-3 font-semibold text-slate-200">
        <li>
          <Link href={"/"} className="transition-colors hover:text-orange-400">
            Home
          </Link>
        </li>
        <li>
          <Link
            href={"/all-tickets"}
            className="transition-colors hover:text-orange-400"
          >
            All Tickets
          </Link>
        </li>
        <li>
          <Link
            href={"/my-bookings"}
            className="transition-colors hover:text-orange-400"
          >
            My Bookings
          </Link>
        </li>
        <li>
          <Link
            href={"/contact"}
            className="transition-colors hover:text-orange-400"
          >
            Contact Us
          </Link>
        </li>
      </ul>

      <ul className="flex gap-3 items-center font-semibold text-slate-200">
        {user && (
          <li>
            <Link
              href={"/profile"}
              className="transition-colors hover:text-orange-400"
            >
              Profile
            </Link>
          </li>
        )}
        {user ? (
          <>
            {" "}
            <Avatar>
              <Avatar.Image alt={user?.name} src={user?.image} />
              <Avatar.Fallback>
                {user?.name?.slice(0, 2).toUpperCase()}
              </Avatar.Fallback>
            </Avatar>
          </>
        ) : (
          <>
            <li>
              <Link
                href={"/login"}
                className="transition-colors hover:text-orange-400"
              >
                Login
              </Link>
            </li>
            <li>
              <Link
                href={"/register"}
                className="transition-colors hover:text-orange-400"
              >
                Sign Up
              </Link>
            </li>{" "}
          </>
        )}
        {user && (
          <li>
            <Button
              variant="danger"
              className={"rounded-sm"}
              onClick={handleSignOut}
            >
              Logout
            </Button>
          </li>
        )}
      </ul>
    </nav>
  );
}
