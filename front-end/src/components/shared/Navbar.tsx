"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { HiMenu, HiX } from "react-icons/hi"; // <-- import icons
import butonIcon from "../../../public/img/Group.png";
import Image from "next/image";
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Templates", href: "/templates" },
  ];

  return (
    <nav className="bg-[#f9fbff] shadow-sm fixed w-full z-40 top-0">
      <div className="w-11/12 mx-auto">
        <div className="flex justify-between h-16 items-center">
          {/* Logo + Links */}
          <div className="flex items-center space-x-8">
            {/* Logo */}
            <div className="flex-shrink-0 text-2xl font-bold text-purple-600">
              <Link href="/">PortFolyHub</Link>
            </div>

            {/* Desktop Links */}
            <div className="hidden md:flex space-x-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`${
                    pathname === link.href
                      ? "font-bold text-gray-900 hover:text-purple-600"
                      : "font-medium text-gray-600 hover:text-purple-600"
                  } transition`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="hidden md:block">
            <Link
              href="/templates"
              className="flex gap-1 items-center bg-gradient-to-b from-[#A78BFA] to-[#7C3AED] text-white px-4 py-2 rounded-full mt-2 hover:bg-purple-600 transition"
            >
              Get Started
              <Image
                className="rounded-full bg-white w-5 h-5"
                src={butonIcon}
                alt="icon"
              ></Image>
            </Link>
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
            <Link
              href="/templates"
              className="flex justify-center gap-1 items-center bg-gradient-to-b from-[#A78BFA] to-[#7C3AED] text-white px-4 py-2 rounded-full mt-2 hover:bg-purple-600 transition"
            >
              Get Started
              <Image
                className="rounded-full bg-white w-5 h-5"
                src={butonIcon}
                alt="icon"
              ></Image>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
