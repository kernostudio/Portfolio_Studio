/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import Image from "next/image";
import {
  FiEdit,
  FiSave,
  FiCamera,
  FiUser,
  FiMail,
  FiCheck,
} from "react-icons/fi";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UseAxiosPublic from "@/hooks/axiosPublic";

interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  role?: string;
  avatarUrl?: string | null;
  createdAt: string;
}

// Date formatting utility functions
const formatMemberSince = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  const diffMonths = Math.floor(diffDays / 30);
  const diffYears = Math.floor(diffDays / 365);

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 30) return `${diffDays} days ago`;
  if (diffMonths === 1) return "1 month ago";
  if (diffMonths < 12) return `${diffMonths} months ago`;
  if (diffYears === 1) return "1 year ago";
  return `${diffYears} years ago`;
};

const formatExactDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export default function Profile() {
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({ fullName: "" });
  const [file, setFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const axiosPublic = UseAxiosPublic();

  // Fetch profile
  const {
    data: profile,
    isLoading,
    refetch,
  } = useQuery<UserProfile>({
    queryKey: ["profile"],
    queryFn: async () => {
      const res = await axiosPublic.get("/api/auth/profile");
      return res.data.data.user as UserProfile;
    },
  });

  useEffect(() => {
    if (profile) {
      setFormData({ fullName: profile.fullName });
      setImagePreview(profile.avatarUrl || null);
    }
  }, [profile]);

  const updateMutation = useMutation({
    mutationFn: async (form: FormData) => {
      const res = await axiosPublic.patch("/api/auth/profile", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data.data.user as UserProfile;
    },
    onSuccess: () => {
      toast.success("Profile updated successfully! 🎉");
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
    if (e.target.files?.[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);

      // Create preview
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const form = new FormData();
    form.append("fullName", formData.fullName);
    if (file) form.append("file", file);
    updateMutation.mutate(form);
  };

  if (isLoading) return <ProfileSkeleton />;
  if (!profile)
    return <div className="text-center mt-10">No profile found</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Profile Settings
          </h1>
          <p className="text-gray-600">
            Manage your account information and preferences
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {/* Left Column - Avatar & Stats */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-gray-100 p-6 h-full">
              {/* Avatar Section */}
              <div className="text-center mb-6">
                <div className="relative inline-block">
                  <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white bg-gradient-to-br from-blue-100 to-cyan-100">
                    {imagePreview ? (
                      <Image
                        src={imagePreview}
                        alt="Avatar"
                        fill
                        className="object-cover rounded-full"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <FiUser className="w-16 h-16 text-blue-400" />
                      </div>
                    )}
                  </div>

                  {editing && (
                    <label className="absolute bottom-2 right-2 bg-blue-500 text-white p-2 rounded-full cursor-pointer hover:bg-blue-600 transition-colors">
                      <FiCamera className="w-4 h-4" />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>

                <h2 className="text-xl font-semibold text-gray-900 mt-4">
                  {profile.fullName}
                </h2>
                <p className="text-gray-600">{profile.email}</p>
              </div>

              {/* Stats */}
              <div className="space-y-4 border-t border-gray-200 pt-6">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Member since</span>
                  <div className="text-right">
                    <div className="font-medium text-gray-900 text-sm">
                      {formatMemberSince(profile.createdAt)}
                    </div>
                    <div className="text-xs text-gray-500">
                      {formatExactDate(profile.createdAt)}
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Status</span>
                  <span className="flex items-center gap-1 text-green-600 font-medium">
                    <FiCheck className="w-4 h-4" />
                    Active
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl border border-gray-100 p-8 h-full">
              {/* Form Header */}
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    Personal Information
                  </h3>
                  <p className="text-gray-600 mt-1">
                    Update your personal details here
                  </p>
                </div>

                <button
                  onClick={() => setEditing(!editing)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                    editing
                      ? "text-gray-600 hover:text-gray-700 bg-gray-100 hover:bg-gray-200"
                      : "text-white hover:text-gray-700 bg-black hover:bg-gray-100"
                  }`}
                >
                  <FiEdit className="w-4 h-4" />
                  {editing ? "Cancel" : "Edit Profile"}
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Full Name Field */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                    <FiUser className="w-4 h-4" />
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    disabled={!editing}
                    className={`w-full px-4 py-3 border rounded-xl focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all ${
                      editing
                        ? "border-gray-300 bg-white shadow-sm"
                        : "border-gray-200 bg-gray-50"
                    }`}
                  />
                </div>

                {/* Email Field */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                    <FiMail className="w-4 h-4" />
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={profile.email}
                    disabled
                    className="w-full px-4 py-3 border border-gray-200 bg-gray-50 rounded-xl text-gray-600 cursor-not-allowed"
                  />
                  <p className="text-sm text-gray-500">
                    Email cannot be changed
                  </p>
                </div>

                {/* File Input for Mobile */}
                {editing && (
                  <div className="lg:hidden space-y-2">
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                      <FiCamera className="w-4 h-4" />
                      Profile Picture
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                  </div>
                )}

                {/* Save Button */}
                {editing && (
                  <div className="flex gap-3 pt-4">
                    {/* <button
                      type="submit"
                      disabled={updateMutation.isPending}
                      className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-3 px-6 rounded-xl font-medium hover:from-blue-600 hover:to-cyan-600 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {updateMutation.isPending ? "Saving..." : <>Save</>}
                    </button> */}

                    <button
                      type="submit"
                      disabled={updateMutation.isPending}
                      className={`cursor-pointer flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all text-white hover:text-gray-700 bg-black hover:bg-gray-100`}
                    >
                      {updateMutation.isPending ? "Saving..." : <>Save</>}
                    </button>

                    <button
                      type="button"
                      onClick={() => setEditing(false)}
                      className="cursor-pointer px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Skeleton Loader
function ProfileSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="h-8 bg-gray-200 rounded w-48 mx-auto mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-64 mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 animate-pulse">
              <div className="w-32 h-32 bg-gray-200 rounded-2xl mx-auto mb-4"></div>
              <div className="h-6 bg-gray-200 rounded w-3/4 mx-auto mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto mb-4"></div>
              <div className="h-8 bg-gray-200 rounded w-20 mx-auto"></div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl p-8 animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-48 mb-6"></div>
              <div className="space-y-4">
                <div className="h-4 bg-gray-200 rounded w-32"></div>
                <div className="h-12 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-32"></div>
                <div className="h-12 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
