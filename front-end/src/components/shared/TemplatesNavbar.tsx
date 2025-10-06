"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { HiMenu, HiX } from "react-icons/hi";
import { FaUserCircle } from "react-icons/fa";
import { useAuth } from "@/Auth/AuthContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { user, loading } = useAuth();

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Templates", href: "/templates" },
  ];

  // Wait until AuthProvider loads user state
  if (loading) return null;

  return (
    <nav className="bg-[#f9fbff] shadow-sm fixed w-full z-50 top-0">
      <div className="w-11/12 mx-auto">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center gap-2 text-2xl font-bold text-black">
            <div className="rounded-full w-10 h-10 bg-gradient-to-r from-[#2563EB] to-[#7500A9F2] flex items-center justify-center">
              <span className="text-white font-bold">P</span>
            </div>
            <Link href="/">PortFolyHub</Link>
          </div>

          {/* Desktop links */}
          <div className="hidden lg:flex space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`${
                  pathname === link.href
                    ? "font-semibold text-gray-900"
                    : "font-medium text-gray-600 hover:text-purple-600"
                } transition`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Right section */}
          <div className="hidden lg:flex items-center gap-3">
            {user ? (
              <Link href={`/dashboard`} className="flex items-center">
                {user.avatarUrl ? (
                  <img
                    src={user.avatarUrl}
                    alt="User Avatar"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  <FaUserCircle className="w-10 h-10 text-gray-600" />
                )}
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
                  href="/login"
                  className="flex gap-1 items-center bg-gradient-to-r from-[#2563EB] to-[#153885] text-white px-5 py-2 rounded-sm hover:opacity-90 transition"
                >
                  Start Free
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
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

      {/* Mobile dropdown */}
      {isOpen && (
        <div className="lg:hidden absolute right-0 top-16 w-3/4 sm:w-1/2 bg-[#f9fbff] border-t border-gray-300 px-4 py-4 space-y-3 shadow-2xl rounded-md z-50">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className={`block ${
                pathname === link.href
                  ? "font-semibold text-gray-900"
                  : "font-medium text-gray-600 hover:text-purple-600"
              } transition`}
            >
              {link.name}
            </Link>
          ))}

          {user ? (
            <Link
              href={`/dashboard`}
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2 font-medium text-gray-700 hover:text-purple-600"
            >
              {user.avatarUrl ? (
                <img
                  src={user.avatarUrl}
                  alt="User Avatar"
                  className="w-8 h-8 rounded-full object-cover"
                />
              ) : (
                <FaUserCircle className="w-8 h-8" />
              )}
              Dashboard
            </Link>
          ) : (
            <>
              <Link
                href="/templates/signin"
                onClick={() => setIsOpen(false)}
                className="font-medium text-gray-600 hover:font-bold"
              >
                Sign In
              </Link>
              <Link
                href="/login"
                onClick={() => setIsOpen(false)}
                className="flex w-1/2 mt-3 gap-1 items-center bg-gradient-to-r from-[#2563EB] to-[#153885] text-white px-5 py-2 rounded-sm hover:opacity-90 transition"
              >
                Start Free
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
