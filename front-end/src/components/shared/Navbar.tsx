/* eslint-disable @next/next/no-img-element */
"use client";

import { useAuth } from "@/Auth/AuthContext";
import UseAxiosPublic from "@/hooks/axiosPublic";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import { motion, AnimatePresence } from "framer-motion";

interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  role?: string;
  avatarUrl?: string | null;
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const pathname = usePathname();
  const { user } = useAuth();
  const axiosPublic = UseAxiosPublic();

  const { data: profile } = useQuery<UserProfile>({
    queryKey: ["profile"],
    queryFn: async () => {
      const res = await axiosPublic.get("/api/auth/profile");
      return res.data.data.user as UserProfile;
    },
  });

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Templates", href: "/templates" },
    { name: "About", href: "/about" },
  ];

  return (
    <nav className="bg-gradient-to-r from-[#f9fbff] via-[#e3f3ff] to-[#f9fbff] w-full sticky top-0 z-50 backdrop-blur-md">
      <div className="w-11/12 mx-auto">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0 text-2xl text-black">
            <Link href="/">
              Portfolio <span className="font-bold">Studio</span>
            </Link>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-8 relative">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <div
                  key={link.href}
                  className="relative"
                  onMouseEnter={() => setHovered(link.href)}
                  onMouseLeave={() => setHovered(null)}
                >
                  <Link
                    href={link.href}
                    className={`transition font-medium ${
                      isActive
                        ? "text-gray-900 font-semibold"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    {link.name}
                  </Link>

                  {/* Animated underline */}
                  <AnimatePresence>
                    {hovered === link.href && (
                      <motion.div
                        layoutId="nav-underline"
                        className="absolute left-0 right-0 h-[2px] bg-black rounded-full"
                        initial={{ opacity: 0, x: -4 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 4 }}
                        transition={{
                          type: "spring",
                          stiffness: 500,
                          damping: 30,
                        }}
                      />
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center font-semibold gap-3">
            {user ? (
              <Link
                href={`/dashboard/profile`}
                className="flex gap-3 rounded-full hover:opacity-80 items-center"
              >
                Dashboard
                <img
                  src="https://i.ibb.co.com/whFmwwtW/Vector-4.png"
                  alt="dashboard"
                />
              </Link>
            ) : (
              <>
                <Link
                  href="/templates/signin"
                  className="font-semibold hover:font-bold transition"
                >
                  Sign In
                </Link>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href="/templates"
                    className="flex gap-1 items-center bg-gradient-to-r from-[#43454a] to-[#01040a] text-white px-5 py-2 rounded-sm hover:opacity-90 transition"
                  >
                    Start Free
                  </Link>
                </motion.div>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
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
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ type: "spring", stiffness: 100, damping: 15 }}
            className="absolute lg:hidden block right-0 w-3/4 md:w-1/2 bg-[#f9fbff] border-t border-gray-300 px-4 py-3 space-y-3 shadow-2xl rounded-md z-40"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 flex flex-col">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`${
                    pathname === link.href
                      ? "font-bold text-gray-900 hover:text-black"
                      : "font-medium text-gray-600 hover:text-black"
                  } block transition`}
                >
                  {link.name}
                </Link>
              ))}
              {user ? (
                <Link
                  href={`/dashboard/profile`}
                  className="flex gap-2 rounded-full hover:border-black items-center"
                >
                  Dashboard
                  <img
                    src="https://i.ibb.co.com/whFmwwtW/Vector-4.png"
                    alt="dashboard"
                  />
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
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
