"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
import { MdOutlineCreateNewFolder } from "react-icons/md";
import { CgTemplate } from "react-icons/cg";

const Sidebar = () => {
  const { user, setUser } = useAuth();
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const userLinks = [
    {
      name: "Profile",
      href: "/dashboard/profile",
      icon: <ImProfile className="w-5 h-5" />,
    },
    {
      name: "My Templates",
      href: "/dashboard/templates",
      icon: <AiOutlineFileText className="w-5 h-5" />,
    },
    {
      name: "History",
      href: "/dashboard/history",
      icon: <FaHistory className="w-5 h-5" />,
    },
    {
      name: "Home",
      href: "/templates",
      icon: <BiHome className="w-5 h-5" />,
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
      href: "/dashboard/manage-templates",
      icon: <CgTemplate className="w-5 h-5" />,
    },
    {
      name: "Home",
      href: "/templates",
      icon: <BiHome className="w-5 h-5" />,
    },
  ];

  const links = user?.role === "admin" ? adminLinks : userLinks;

  // 🔹 Logout handler
  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
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
        className={`fixed lg:static top-0 left-0 h-full w-64 bg-gradient-to-b from-[#7C3AED] to-[#5B21B6] text-white p-6 z-40 transform ${
          open ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 transition-transform duration-300 ease-in-out`}
      >
        {/* Header */}
        <div className="flex items-center justify-between mt-8 mb-8">
          <h2 className="text-2xl font-bold">Dashboard</h2>
          <button
            className="lg:hidden text-white"
            onClick={() => setOpen(false)}
          >
            <FaTimes className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="space-y-2">
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 hover:bg-white/20 px-4 py-2 rounded-md transition-all"
            >
              {link.icon}
              <span>{link.name}</span>
            </Link>
          ))}
        </nav>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="mt-10 w-full flex items-center justify-center border-2 gap-3 bg-purple-800 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-md transition-all"
        >
          <FaSignOutAlt className="w-5 h-5" />
          Logout
        </button>

        {/* User Info (optional small footer) */}
        {user && (
          <div className="absolute bottom-6 left-6 right-6 bg-white/10 rounded-lg p-3 text-sm text-center">
            <p className="font-semibold">{user.name}</p>
            <p className="text-xs opacity-80">{user.role}</p>
          </div>
        )}
      </aside>
    </>
  );
};

export default Sidebar;
