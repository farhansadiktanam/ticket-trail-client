"use client";

import { Avatar, Button } from "@heroui/react";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center p-4 shadow-lg">
      <h2 className="font-bold text-xl">
        Ticket
        <span className="text-xl font-black tracking-tighter text-orange-500">
          Trail
        </span>
      </h2>
      <ul className="flex gap-3 font-semibold">
        <li>
          <Link href={"/"}>Home</Link>
        </li>
        <li>
          <Link href={"/explore-cars"}>Explore Cars</Link>
        </li>
        <li>
          <Link href={"/add-car"}>Add Car</Link>
        </li>
        <li>
          <Link href={"/my-bookings"}> My Bookings</Link>
        </li>
      </ul>

      {/* <ul className="flex gap-3 items-center font-semibold">
        {user && (
          <li>
            <Link href={"/profile"}>Profile</Link>
          </li>
        )}
        {user ? (
          <>
            {" "}
            <Avatar>
              <Avatar.Image alt="John Doe" src={user?.image} />
              <Avatar.Fallback>
                {user?.name.slice(0, 2).toUpperCase()}
              </Avatar.Fallback>
            </Avatar>
          </>
        ) : (
          <>
            <li>
              <Link href={"/login"}>Login</Link>
            </li>
            <li>
              <Link href={"/register"}>Sign Up</Link>
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
      </ul> */}
    </nav>
  );
};

export default Navbar;
