/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import Image from "next/image";
import { FiEdit, FiSave } from "react-icons/fi";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UseAxiosPublic from "@/hooks/axiosPublic";

import { FaUserCircle } from "react-icons/fa";

interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  role?: string;
  avatarUrl?: string | null;
}

export default function Profile() {
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({ fullName: "" });
  const [file, setFile] = useState<File | null>(null);
  const axiosPublic = UseAxiosPublic();

  // Fetch profile
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

  useEffect(() => {
    if (profile) setFormData({ fullName: profile.fullName });
  }, [profile]);

  const updateMutation = useMutation({
    mutationFn: async (form: FormData) => {
      const res = await axiosPublic.patch("/api/auth/profile", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data.data.user as UserProfile;
    },
    onSuccess: () => {
      toast.success("Profile updated successfully!");
      refetch();
      setEditing(false);
      setFile(null);
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || "Update failed");
    },
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ fullName: e.target.value });
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) setFile(e.target.files[0]);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const form = new FormData();
    form.append("fullName", formData.fullName);
    if (file) form.append("file", file);
    updateMutation.mutate(form);
  };

  if (isLoading) return <div className="text-center mt-10">Loading...</div>;
  if (!profile)
    return <div className="text-center mt-10">No profile found</div>;

  return (
    <div className="flex justify-center p-4">
      <div className="w-full md:w-8/12 lg:w-6/12 bg-white shadow-md rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">Profile</h2>
          <button
            onClick={() => setEditing(!editing)}
            className="flex items-center gap-1 text-indigo-600 hover:text-indigo-800"
          >
            {editing ? (
              "Cancel"
            ) : (
              <>
                <FiEdit /> Edit
              </>
            )}
          </button>
        </div>

        <div className="flex flex-col items-center mb-6">
          <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-indigo-500 flex items-center justify-center bg-gray-100 text-gray-500">
            {profile.avatarUrl ? (
              <Image
                src={profile.avatarUrl}
                alt="Avatar"
                fill
                className="object-cover"
              />
            ) : (
              <FaUserCircle className="w-12 h-12" />
            )}
          </div>

          {editing && (
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="mt-3 text-sm text-gray-600"
            />
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              disabled={!editing}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none ${
                editing ? "border-gray-300" : "bg-gray-100"
              }`}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={profile.email}
              disabled
              className="w-full px-4 py-2 border rounded-lg bg-gray-100 cursor-not-allowed"
            />
          </div>

          {editing && (
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-purple-800 text-white py-2.5 rounded-lg font-medium hover:bg-indigo-700 transition-all"
            >
              <FiSave /> Save Changes
            </button>
          )}
        </form>
      </div>
    </div>
  );
}
