/* eslint-disable @next/next/no-img-element */
"use client";

import { useAuth } from "@/Auth/AuthContext";
import UseAxiosPublic from "@/hooks/axiosPublic";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi"; // <-- import icons
interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  role?: string;
  avatarUrl?: string | null;
}
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const { user, loading } = useAuth();
  const axiosPublic = UseAxiosPublic();
  const toggleMenu = () => setIsOpen(!isOpen);
  const {
    data: profile,
    isLoading,
    refetch,
  } = useQuery<UserProfile>({
    queryKey: ["profile"],
    queryFn: async () => {
      const res = await axiosPublic.get("/api/auth/profile"); // cookies sent automatically
      return res.data.data.user as UserProfile;
    },
  });
  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Templates", href: "/templates" },
  ];

  return (
    <nav
      className="bg-gradient-to-r
    from-[#f9fbff] via-[#e3f3ff] to-[#f9fbff]  w-full sticky top-0 z-50"
    >
      <div className="w-11/12 mx-auto">
        <div className="flex justify-between h-16 items-center">
          {/* Logo + Links */}
          <div className="flex items-center space-x-8">
            {/* Logo */}
            <div className="flex-shrink-0 text-2xl  text-black">
              <Link href="/">
                Portfolio <span className="font-bold">Studio</span>
              </Link>
            </div>
          </div>{" "}
          {/* Desktop Links */}
          <div className="hidden md:flex space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`${
                  pathname === link.href
                    ? "font-bold text-gray-900 hover:font-bold"
                    : "font-medium text-gray-600 hover:font-bold"
                } transition`}
              >
                {link.name}
              </Link>
            ))}
          </div>
          <div className="hidden md:flex items-center font-semibold gap-3">
            {user ? (
              <Link
                href={`/dashboard/profile`}
                className="flex   gap-4 rounded-full  hover:border-purple-900 items-center"
              >
                Dashboard
                <img
                  src="https://i.ibb.co.com/whFmwwtW/Vector-4.png"
                  alt="dashboard"
                ></img>
              </Link>
            ) : (
              <>
                <Link
                  href="/templates/signin"
                  className="font-semibold hover:font-bold"
                >
                  Sign In
                </Link>
                <Link
                  href="/templates"
                  className="flex gap-1 items-center bg-gradient-to-r from-[#43454a] to-[#01040a] text-white px-5 py-2 rounded-sm hover:opacity-90 transition"
                >
                  Start Free
                </Link>
              </>
            )}
          </div>
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="text-gray-700 focus:outline-none"
            >
              {isOpen ? (
                <HiX className="h-6 w-6" />
              ) : (
                <HiMenu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute lg:hidden block right-0 w-3/4 md:w-1/2 bg-[#f9fbff] border-t border-gray-300 px-4 py-3 space-y-3 shadow-2xl rounded-md z-40">
          <div className="px-2 pt-2 pb-3 space-y-1 flex flex-col">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`${
                  pathname === link.href
                    ? "font-bold text-gray-900 hover:text-purple-600"
                    : "font-medium text-gray-600 hover:text-purple-600"
                } block transition`}
              >
                {link.name}
              </Link>
            ))}
            {user ? (
              <Link
                href={`/dashboard/profile`}
                className="flex  i gap-1 rounded-full  hover:border-purple-900 items-center"
              >
                Dashboard
                <img
                  src="https://i.ibb.co.com/whFmwwtW/Vector-4.png"
                  alt="dashboard"
                ></img>
              </Link>
            ) : (
              <>
                <Link
                  href="/templates/signin"
                  className="font-semibold hover:font-bold"
                >
                  Sign In
                </Link>
                <Link
                  href="/templates"
                  className="flex gap-1 items-center bg-gradient-to-r from-[#43454a] to-[#01040a] text-center text-white px-5 py-2 rounded-sm hover:opacity-90 transition"
                >
                  Start Free
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
