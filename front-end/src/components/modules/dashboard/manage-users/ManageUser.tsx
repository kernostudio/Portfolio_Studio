/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import UseAxiosPublic from "@/hooks/axiosPublic";
import Image from "next/image";
import { FaUserCircle } from "react-icons/fa";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

export default function ManageUser() {
  const axiosPublic = UseAxiosPublic();
  const [page, setPage] = useState(1);
  const [updating, setUpdating] = useState<string | null>(null);
  const limit = 10; // number of users per page

  const { data, refetch, isLoading } = useQuery({
    queryKey: ["users", page],
    queryFn: async () => {
      const res = await axiosPublic.get("/api/users", {
        params: { page, limit },
      });
      return res.data.data;
    },
    staleTime: 30000,
    refetchOnWindowFocus: false,
  });

  const users = data?.users || [];
  const meta = data?.meta || { totalPages: 1 };

  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await axiosPublic.delete(`/api/users/${id}`);
        toast.success("User deleted successfully!");
        refetch();
      } catch {
        toast.error("Failed to delete user.");
      }
    }
  };

  // ✅ Role update with SweetAlert2
  const handleRoleUpdate = async (id: string, currentRole: string) => {
    const newRole = currentRole === "admin" ? "user" : "admin";

    const result = await Swal.fire({
      title: "Change Role?",
      text: `Are you sure you want to make this user ${newRole}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, change it!",
      cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) return;

    setUpdating(id);
    try {
      await axiosPublic.patch(`/api/users/${id}`, { role: newRole });
      toast.success(`Role updated to ${newRole}`);
      refetch();
    } catch {
      toast.error("Failed to update role.");
    } finally {
      setUpdating(null);
    }
  };

  return (
    <div className="w-11/12 mx-auto mt-10">
      <h2 className="text-2xl font-semibold mb-5">Manage Users</h2>

      {isLoading ? (
        <p>Loading users...</p>
      ) : users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <>
          {/* 🖥️ Table view for medium & larger screens */}
          <div className="hidden md:block overflow-x-auto bg-white rounded-xl shadow border">
            <table className="min-w-full text-sm text-left">
              <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
                <tr>
                  <th className="px-4 py-3">Avatar</th>
                  <th className="px-4 py-3">Full Name</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Role</th>
                  <th className="px-4 py-3">Created At</th>
                  <th className="px-4 py-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user: any) => (
                  <tr key={user.id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-3">
                      {user.avatarUrl ? (
                        <Image
                          height={40}
                          width={40}
                          src={user.avatarUrl}
                          alt={user.fullName}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      ) : (
                        <FaUserCircle className="text-gray-400 w-10 h-10" />
                      )}
                    </td>
                    <td className="px-4 py-3 font-medium">{user.fullName}</td>
                    <td className="px-4 py-3">{user.email}</td>
                    <td className="px-4 py-3 capitalize">{user.role}</td>
                    <td className="px-4 py-3">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 flex justify-center gap-2">
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="px-3 py-1 bg-red-500 text-white rounded-md text-xs hover:bg-red-600"
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => handleRoleUpdate(user.id, user.role)}
                        disabled={updating === user.id}
                        className={`px-3 py-1 text-white rounded-md text-xs ${
                          user.role === "admin"
                            ? "bg-blue-500 hover:bg-blue-600"
                            : "bg-green-500 hover:bg-green-600"
                        }`}
                      >
                        {updating === user.id
                          ? "Updating..."
                          : user.role === "admin"
                          ? "Make User"
                          : "Make Admin"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 📱 Card view for mobile */}
          <div className="grid md:hidden gap-4">
            {users.map((user: any) => (
              <div
                key={user.id}
                className="bg-white border rounded-lg p-4 shadow-sm flex flex-wrap items-start gap-4"
              >
                {user.avatarUrl ? (
                  <Image
                    height={56}
                    width={56}
                    src={user.avatarUrl}
                    alt={user.fullName}
                    className="w-14 h-14 rounded-full object-cover"
                  />
                ) : (
                  <FaUserCircle className="text-gray-400 w-14 h-14" />
                )}
                <div className="flex-1 w-full">
                  <h3 className="font-medium text-lg">{user.fullName}</h3>
                  <p className="text-sm text-gray-500">{user.email}</p>
                  <p className="text-xs text-gray-400 capitalize mb-3">
                    Role: {user.role}
                  </p>
                  <div className="flex flex-wrap gap-2 w-full">
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="px-3 py-1 bg-red-500 text-white text-xs rounded-md hover:bg-red-600"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => handleRoleUpdate(user.id, user.role)}
                      disabled={updating === user.id}
                      className={`px-3 py-1 text-white text-xs rounded-md ${
                        user.role === "admin"
                          ? "bg-blue-500 hover:bg-blue-600"
                          : "bg-green-500 hover:bg-green-600"
                      }`}
                    >
                      {updating === user.id
                        ? "Updating..."
                        : user.role === "admin"
                        ? "Make User"
                        : "Make Admin"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 📄 Pagination */}
          <div className="flex justify-center mt-6 gap-3">
            <button
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              disabled={page === 1}
              className="px-4 py-2 border rounded-md disabled:opacity-50"
            >
              Previous
            </button>
            <span className="text-sm text-gray-600 mt-2">
              Page {page} of {meta?.totalPages || 1}
            </span>
            <button
              onClick={() =>
                setPage((p) =>
                  meta?.totalPages ? Math.min(p + 1, meta.totalPages) : p
                )
              }
              disabled={page === meta?.totalPages}
              className="px-4 py-2 border rounded-md disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}
