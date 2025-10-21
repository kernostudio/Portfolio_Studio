"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/Auth/AuthContext";
import {
  FaTimes,
  FaUserFriends,
  FaHistory,
  FaSignOutAlt,
} from "react-icons/fa";
import { BiMenu, BiHome, BiCategoryAlt } from "react-icons/bi";
import { AiOutlineFileText } from "react-icons/ai";
import { ImProfile } from "react-icons/im";
import { MdOutlineCreateNewFolder, MdPublish } from "react-icons/md";
import { CgTemplate } from "react-icons/cg";
import { ImExit } from "react-icons/im";

const Sidebar = () => {
  const { user, setUser, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname(); // Get current path for active link

  const userLinks = [
    {
      name: "Profile",
      href: "/dashboard/profile",
      icon: <ImProfile className="w-5 h-5" />,
    },
    {
      name: "My Templates",
      href: `/dashboard/myTemplates/${user?.id}`,
      icon: <AiOutlineFileText className="w-5 h-5" />,
    },
    {
      name: "Publish Requests",
      href: "/dashboard/myPublishRequest",
      icon: <MdPublish className="w-5 h-5" />,
    },
    {
      name: "Exit",
      href: "/templates",
      icon: <ImExit className="w-5 h-5" />,
    },
  ];

  const adminLinks = [
    {
      name: "Profile",
      href: "/dashboard/profile",
      icon: <ImProfile className="w-5 h-5" />,
    },
    {
      name: "Create Category",
      href: "/dashboard/create-category",
      icon: <BiCategoryAlt className="w-5 h-5" />,
    },
    {
      name: "Create Template",
      href: "/dashboard/create-template",
      icon: <MdOutlineCreateNewFolder className="w-5 h-5" />,
    },
    {
      name: "Manage Users",
      href: "/dashboard/manage-user",
      icon: <FaUserFriends className="w-5 h-5" />,
    },
    {
      name: "Manage Templates",
      href: "/dashboard/manageTemplates",
      icon: <CgTemplate className="w-5 h-5" />,
    },
    {
      name: "Publish Requests",
      href: "/dashboard/managePublishRequest",
      icon: <MdPublish className="w-5 h-5" />,
    },
  ];

  const links = user?.role === "admin" ? adminLinks : userLinks;

  // Check if a link is active
  const isActiveLink = (href: string) => {
    if (href === "/dashboard") {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  // 🔹 Logout handler
  const handleLogout = () => {
    logout();
    router.push("/templates/signin");
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        className="lg:hidden p-2 fixed top-4 left-4 z-50 bg-gray-200 rounded-md shadow-md"
        onClick={() => setOpen(!open)}
      >
        {open ? (
          <FaTimes className="w-6 h-6" />
        ) : (
          <BiMenu className="w-6 h-6" />
        )}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed lg:static top-0 left-0  w-64 border-t-2 bg-white lg:bg-[#ffffff] border-gray-200 text-black p-6 z-40 transform ${
          open ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 transition-transform duration-300 ease-in-out flex flex-col`}
      >
        {/* Header */}
        <div className="flex items-center justify-between mt-8 mb-8">
          <h2 className="text-2xl font-bold">Dashboard</h2>
          <button
            className="lg:hidden text-gray-600 hover:text-gray-800"
            onClick={() => setOpen(false)}
          >
            <FaTimes className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Links - Grow to take available space */}
        <nav className="space-y-2 flex-1">
          {links.map((link) => {
            const isActive = isActiveLink(link.href);
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-md transition-all ${
                  isActive
                    ? "bg-black text-white"
                    : "text-black hover:bg-gray-100"
                }`}
              >
                <span className={isActive ? "text-white" : "text-current"}>
                  {link.icon}
                </span>
                <span className="font-medium">{link.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* User Info */}

        {/* Logout Button - Always at the bottom */}
        <button
          onClick={handleLogout}
          className="flex items-center justify-center gap-3  hover:bg-black hover:text-white font-semibold py-3 px-4 rounded-md transition-all mt-auto"
        >
          <FaSignOutAlt className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </aside>
    </>
  );
};

export default Sidebar;
